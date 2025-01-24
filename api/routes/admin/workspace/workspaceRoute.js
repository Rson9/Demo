const express = require("express")
const { failure, success } = require('@utils/responses')
const { Op } = require('sequelize')
const moment = require('moment')
moment.locale('zh-cn')
const { User, Order, Setmeal, Dish } = require('@models')
const router = express.Router()

/**
 * @description 查询今日运营数据
*/
router.get('/businessData', async (req, res) => {
  try {
    const startOfDay = moment().startOf('day').toDate();
    // 今日新增用户
    const newUsers = await User.count({ where: { createTime: { [Op.gte]: startOfDay } } })
    // 总订单数
    const todayOrderAll = await Order.count({ where: { orderTime: { [Op.gte]: startOfDay } } })
    //有效订单：已完成订单
    const validOrderCount = await Order.count({ where: { orderTime: { [Op.gte]: startOfDay }, status: 5 } })
    //订单完成率
    const orderCompletionRate = todayOrderAll > 0 ? validOrderCount / todayOrderAll : 0

    // 今日营业额,已完成订单总金额
    const turnover = await Order.sum('amount', { where: { orderTime: { [Op.gte]: startOfDay }, status: 5 } }) ?? 0
    //平均客单价：营业额/有效订单数
    const unitPrice = validOrderCount > 0 ? turnover / validOrderCount : 0

    return success(res, "查询成功", {
      newUsers,
      orderCompletionRate,
      turnover,
      unitPrice,
      validOrderCount
    }
    )
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 查询套餐总览
 */
router.get('/overviewSetmeals', async (req, res) => {
  try {
    const discontinued = await Setmeal.count({ where: { status: 0 } })
    const sold = await Setmeal.count({ where: { status: 1 } })
    return success(res, "查询成功", {
      discontinued,
      sold
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 查询菜品总览
 */
router.get('/overviewDishes', async (req, res) => {
  try {
    const discontinued = await Dish.count({ where: { status: 0 } })
    const sold = await Dish.count({ where: { status: 1 } })
    return success(res, "查询成功", {
      discontinued,
      sold
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 查询订单管理数据
 */
router.get('/overviewOrders', async (req, res) => {
  try {
    const allOrders = await Order.count({ group: ['status'] })
    let cancelledOrders, completedOrders, deliveredOrders, waitingOrders;
    allOrders.forEach(item => {
      if (item.status === 6) {
        cancelledOrders = item.count
      }
      if (item.status === 5) {
        completedOrders = item.count
      }
      if (item.status === 3) {
        deliveredOrders = item.count
      }
      if (item.status === 2) {
        waitingOrders = item.count
      }
    });
    return success(res, "查询成功", {
      allOrders: allOrders.length,
      cancelledOrders,
      completedOrders,
      deliveredOrders,
      waitingOrders
    })
  } catch (e) {
    failure(res, e)
  }
})
module.exports = router