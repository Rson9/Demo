const express = require("express")
const { failure, success } = require('@utils/responses')
const { orderStatus } = require('@utils/enums')
const { Order, OrderDetail } = require('@models')
const sequelize = require('sequelize')
const { payStatus } = require('../../../utils/enums')
const router = express.Router()

// 订单搜索
router.get('/conditionSearch', async (req, res) => {
  try {
    const query = req.query
    const currentPage = Math.abs(Number(query.page)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize
    const condition = {
      offset,
      limit: pageSize,
      where: {},
      order: [['orderTime', 'desc']],
    }
    if (query.status) {
      condition.where.status = query.status
    }
    if (query.beginTime && query.endTime) {
      condition.where.orderTime = {
        [Op.gte]: query.orderTime,
        [Op.lte]: query.endTime
      }
    }
    if (query.number) {
      condition.where.number = query.number
    }
    if (query.phone) {
      condition.where.phone = query.phone
    }
    const { rows, count } = await Order.findAndCountAll(condition)
    return success(res, "查询成功", { records: rows, total: count })
  }
  catch (e) {
    failure(res, e)
  }
})

// 各个状态的订单数量统计
router.get('/statistics', async (req, res) => {
  try {
    const rows = await Order.findAll({
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'count']],
      group: ['status'],
    })

    let confirmed, deliveryInProgress, toBeConfirmed;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].status === 2) {
        toBeConfirmed = rows[i].count
      }
      if (rows[i].status === 3) {
        confirmed = rows[i].count
      }
      if (rows[i].status === 4) {
        deliveryInProgress = rows[i].count
      }
    }


    return success(res, "查询成功", { confirmed, deliveryInProgress, toBeConfirmed })
  } catch (e) {
    failure(res, e)
  }
})


//查询订单详情
router.get('/details/:id', async (req, res) => {
  try {
    const orderId = req.params.id
    const orderDetailList = await Order.findOne({
      where: {
        id: orderId
      },
      include: [
        {
          model: OrderDetail,
          as: 'orderDetailList',
        }
      ]
    })

    return success(res, "查询成功", orderDetailList)
  } catch (e) {
    failure(res, e)
  }
})


// 接单
router.put('/confirm', async (req, res) => {
  try {
    const orderId = req.body.id
    await Order.update({ status: 3 }, { where: { id: orderId } })
    return success(res, "接单成功")
  } catch (e) {
    failure(res, e)
  }
})

//拒单
router.put('/rejection', async (req, res) => {
  try {
    const { id, rejectionReason } = req.body
    const orderData = await Order.findByPk(id)
    let payStatus1 = orderData.payStatus
    //订单存在并且是待接单才能拒单
    if (!orderData || orderData.status !== orderStatus.WAIT_DELIVERY) {
      throw new NotFoundError('订单状态异常')
    }
    //如果已经支付，给用户退款
    if (orderData.payStatus === orderStatus.PAID) {
      console.log('已退款');
      payStatus1 = payStatus.REFUND
    }
    await Order.update({ payStatus: payStatus1, status: orderStatus.CANCELLED, rejectionReason, cancelTime: new Date() }, { where: { id } })
    return success(res, "拒单成功")
  } catch (e) {
    failure(res, e)
  }
})

// 取消订单
router.put('/cancel', async (req, res) => {
  try {
    const { cancelReason, id } = req.body
    const orderData = await Order.findByPk(id)
    let payStatus1 = orderData.payStatus
    if (orderData.payStatus === payStatus.PAID) {
      console.log('退款');
      payStatus1 = payStatus.REFUND
    }

    await Order.update({ payStatus: payStatus1, status: orderStatus.CANCELLED, cancelReason, cancelTime: new Date() }, { where: { id } })
    return success(res, "取消成功")
  } catch (e) {
    failure(res, e)
  }
})

//派送订单
router.put('/delivery/:id', async (req, res) => {
  try {
    const orderId = req.params.id
    await Order.update({ status: 4 }, { where: { id: orderId } })
    return success(res, "派单成功")
  } catch (e) {
    failure(res, e)
  }
})

//完成订单
router.put('/complete/:id', async (req, res) => {
  try {
    const orderId = req.params.id
    await Order.update({ status: 5, deliveryTime: new Date() }, { where: { id: orderId } })
    return success(res, "订单完成")
  } catch (e) {
    failure(res, e)
  }
})
module.exports = router