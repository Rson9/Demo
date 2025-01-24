const express = require("express")
const { failure, success } = require('@utils/responses')
const { OrderDetail, Order, User } = require('@models')
const { Op, Sequelize } = require('sequelize')
const router = express.Router()

/**
 * @description 导出Excel报表接口
*/
router.get('/export', async (req, res) => {
  try {
    return res.send(
      'hello'
    )
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 查询销量排名top10接口
 */
router.get('/top10', async (req, res) => {
  try {
    const { begin, end } = req.query
    // 先把区间范围的订单id查询出来
    const orderId = await Order.findAll({
      attributes: ['id'],
      where: {
        orderTime: {
          [Op.between]: [begin, end]
        }
      }
    })

    const orderDetails = await OrderDetail.findAll({
      attributes: ['name', [Sequelize.fn('sum', Sequelize.col('number')), 'sum']],
      group: ['name'],
      order: [['sum', 'desc']],
      limit: 10,
      where: {
        orderId: {
          [Op.in]: orderId.map(item => item.id)
        }
      },
      raw: true
    })
    let { names: nameList,
      sums: numberList } = orderDetails.reduce(
        (acc, { name, sum }) => {
          acc.names.push(name);
          acc.sums.push(sum);
          return acc;
        }, { names: [], sums: [] }
      );

    return success(res, "查询成功", {
      nameList: nameList.toString(),
      numberList: numberList.toString()
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 用户统计接口
 */
router.get('/userStatistics', async (req, res) => {
  try {
    const { begin, end } = req.query
    const dateList = generateDateRange(begin, end);
    const newUserList = [];
    const totalUserList = [];

    for (const date of dateList) {
      const beginTime = new Date(date);
      beginTime.setHours(0, 0, 0, 0); // 设置为当天的开始时间
      const endTime = new Date(date);
      endTime.setHours(23, 59, 59, 999); // 设置为当天的结束时间

      // 查询总用户数量
      const totalUser = await User.count({
        where: {
          createTime: {
            [Sequelize.Op.lte]: endTime
          }
        }
      });
      totalUserList.push(totalUser);

      // 查询新增用户数量
      const newUser = await User.count({
        where: {
          createTime: {
            [Sequelize.Op.between]: [beginTime, endTime]
          }
        }
      });
      newUserList.push(newUser);
    }

    // 封装返回结果
    const result = {
      dateList: dateList.map(date => date.toISOString().split('T')[0]).join(','),
      newUserList: newUserList.join(','),
      totalUserList: totalUserList.join(',')
    };

    return success(res, "查询成功", result)

  } catch (e) {
    failure(res, e)
  }
})



/**
 * @description 营业额统计接口
 */
router.get('/turnoverStatistics', async (req, res) => {
  try {
    const { begin, end } = req.query
    const dateList = generateDateRange(begin, end);
    const turnoverList = [];
    for (const date of dateList) {
      const beginTime = new Date(date);
      beginTime.setHours(0, 0, 0, 0); // 设置为当天的开始时间
      const endTime = new Date(date);
      endTime.setHours(23, 59, 59, 999); // 设置为当天的结束时间

      // 查询总营业额
      const totalTurnover = await Order.sum('amount', {
        where: {
          orderTime: {
            [Sequelize.Op.gte]: beginTime,
            [Sequelize.Op.lte]: endTime
          },
          status: {
            [Sequelize.Op.eq]: 5
          },
        },
        raw: true
      }) ?? 0;
      turnoverList.push(totalTurnover);
    }
    return success(res, "查询成功",
      {
        dateList: dateList.map(date => date.toISOString().split('T')[0]).join(','),
        turnoverList: turnoverList.join(',')
      }
    )
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 订单统计接口
 */
router.get('/ordersStatistics', async (req, res) => {
  try {
    const { begin, end } = req.query
    const dateList = generateDateRange(begin, end);
    const orderCountList = [];
    const validOrderCountList = [];
    // 先查一下订单总数
    const totalOrderCount = await Order.count({
      where: {
        orderTime: {
          [Sequelize.Op.gte]: begin,
          [Sequelize.Op.lte]: end
        }
      }
    })
    // 有效订单数,订单完成即为有效
    const validOrderCount = await Order.count({
      where: {
        orderTime: {
          [Sequelize.Op.gte]: begin,
          [Sequelize.Op.lte]: end
        },
        status: 5
      }
    })
    const orderCompletionRate = validOrderCount > 0 ? validOrderCount / totalOrderCount : 0
    for (const date of dateList) {
      const beginTime = new Date(date);
      beginTime.setHours(0, 0, 0, 0); // 设置为当天的开始时间
      const endTime = new Date(date);
      endTime.setHours(23, 59, 59, 999); // 设置为当天的结束时间
      const orderCount = await Order.count({
        where: {
          orderTime: {
            [Sequelize.Op.gte]: beginTime,
            [Sequelize.Op.lte]: endTime
          },
        }
      })
      orderCountList.push(orderCount)

      const validOrderCount = await Order.count({
        where: {
          orderTime: {
            [Sequelize.Op.gte]: beginTime,
            [Sequelize.Op.lte]: endTime
          },
          status: 5
        }
      })
      validOrderCountList.push(validOrderCount)

    }
    return success(res, '查询成功', {
      dateList: dateList.map(date => date.toISOString().split('T')[0]).join(','),
      orderCompletionRate,
      totalOrderCount,
      validOrderCount,
      orderCountList: orderCountList.toString(),
      validOrderCountList: validOrderCountList.toString()
    })
  } catch (e) {
    failure(res, e)
  }
})

function generateDateRange (begin, end) {
  const dateList = [];
  let currentDate = new Date(begin);

  while (currentDate <= new Date(end)) {
    dateList.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
}
module.exports = router


