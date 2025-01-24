const express = require('express')
const { failure, success } = require('@utils/responses')
const { Order, OrderDetail, AddressBook, sequelize, ShoppingCart, User } = require('@models')
const router = express.Router()
/**
 * @description 历史订单查询
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

// 提交订单
router.post('/submit', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { addressBookId, amount, deliveryStatus,
      estimatedDeliveryTime, packAmount, payMethod,
      remark, tablewareNumber, tablewareStatus } = req.body

    // 获取购物车中的商品
    const orderDetailList = await ShoppingCart.findAll({ where: { userId: req.id } }, { transaction: t })
    //生成订单号
    const number = generateOrderNumber(req.id)
    const addressList = await AddressBook.findByPk(addressBookId, {
      attributes: [
        'consignee',
        'phone',
        'provinceName',
        'cityName',
        'districtName',
        'detail',
        'userId'
      ],
      transaction: t
    })
    const user = await User.findByPk(addressList.userId, {
      attributes: ['name'],
      transaction: t
    })

    const address = addressList.provinceName + addressList.cityName + addressList.districtName + addressList.detail
    // 创建订单记录
    const order = await Order.create({
      number,
      addressBookId,
      amount,
      userName: user.name,
      deliveryStatus,
      estimatedDeliveryTime,
      packAmount,
      payMethod,
      remark,
      phone: addressList.phone,
      consignee: addressList.consignee,
      tablewareNumber,
      tablewareStatus,
      userId: addressList.userId,
      orderTime: new Date(),
      address,
      status: 1
    }, { transaction: t })
    // 提交购物车中的商品
    await OrderDetail.bulkCreate(orderDetailList.map(item => {
      return {
        name: item.name,
        image: item.image,
        orderId: order.id,
        dishId: item.dishId,
        setmealId: item.setmealId,
        dishFlavor: item.dishFlavor,
        number: item.number,
        amount: item.amount
      }
    }), { transaction: t })
    // 清空购物车
    await ShoppingCart.destroy({ where: { userId: req.id } }, { transaction: t })


    //todo 添加计时器

    await t.commit()
    return res.json({
      code: 1,
      data: {
        id: order.id,
        orderAmount: order.amount,
        orderNumber: order.number,
        orderTime: order.orderTime
      },
      msg: "提交成功",
    })

  } catch (e) {
    await t.rollback()
    failure(res, e)
  }
})

// 支付
router.put('/payment', async (req, res) => {
  try {
    //需要更新订单状态和支付状态
    return res.json({
      code: 1,
      data: {
        nonceStr: "2019-08-24T14:15:22.123Z",
        paySign: "string",
        timeStamp: "string",
        signType: "string",
        packageStr: "string"
      },
      msg: "支付成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

// 取消订单
router.put('/cancel/:id', async (req, res) => {
  try {
    const orderId = req.params.id

    //更新订单状态
    await Order.update({ status: 6, cancelReason: '用户取消', cancelTime: new Date() }, { where: { id: orderId } })
    return res.json({
      code: 1,
      msg: "取消成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

// 再来一单
router.post('/repetition/:id', async (req, res) => {
  try {
    const orderId = req.params.id
    const orderDetailList = await OrderDetail.findAll({ where: { orderId } })
    await ShoppingCart.bulkCreate(orderDetailList.map(item => {
      return {
        userId: req.id,
        name: item.name,
        image: item.image,
        dishId: item.dishId,
        setmealId: item.setmealId,
        dishFlavor: item.dishFlavor,
        number: item.number,
        amount: item.amount
      }
    }))
    return res.json({
      code: 1,
      msg: "再来一单",
    })
  } catch (e) {
    failure(res, e)
  }
})

// todo 催单，需要websocket 
router.get('/reminder/:id', async (req, res) => {
  try {
    return res.json({
      code: 1,
      msg: "催单成功",
    })
  } catch (e) {
    failure(res, e)
  }
})
//生成订单号
function generateOrderNumber (userId) {
  const timestamp = Date.now();
  const orderId = `${userId}${timestamp}`;
  return orderId;
}
module.exports = router