const express = require('express')
const { failure, success } = require('@utils/responses')
const { Order, OrderDetail } = require('@models')
const router = express.Router()
/**
 * @description 获取订单列表
 */
router.get('/historyOrders', async (req, res) => {
  try {
    const query = req.query
    const currentPage = Math.abs(Number(query.page)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize
    const condition = {
      offset,
      limit: pageSize,
      where: {
        userId: req.id
      },
      order: [['orderTime', 'desc']],
      include: [
        {
          model: OrderDetail,
          as: 'orderDetailList',
        }
      ]
    }
    if (query.status) {
      condition.where.status = query.status
    }
    const list = await Order.findAll(condition)
    return res.json({
      code: 1,
      msg: "查询成功",
      data: {
        total: list.length,
        records: list
      }
    })
  } catch (e) {
    failure(res, e)
  }
})

//获取订单详情
router.get('/orderDetail/:id', async (req, res) => {
  try {
    const id = req.params.id
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderDetail,
          as: 'orderDetailList',
        }
      ]
    })
    return res.json({
      code: 1,
      msg: "查询成功",
      data: order
    })
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router