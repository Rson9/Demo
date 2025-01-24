module.exports.orderStatus = {
  WAIT_PAY: 1, //待付款
  WAIT_DELIVERY: 2, //待接单
  DELIVERING: 3, //待派送
  DELIVERY: 4, //派送中
  FINISHED: 5, //已完成
  /**
  * @description 已取消
  */
  CANCELLED: 6,
}


module.exports.payStatus = {
  UNPAID: 0, //未支付
  PAID: 1, //已支付
  REFUND: 2, //已退款
}