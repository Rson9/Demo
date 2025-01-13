const express = require("express")
const router = express.Router()
const { success, failure } = require('../../utils/responses')
const { ShopStatus } = require('@models')
/**
 * @description 获取营业状态
 */
router.get('/status', async (req, res) => {
  try {
    const { status } = await ShopStatus.findByPk(1, { attributes: ['status'] })
    return res.json({
      code: 1,
      msg: "查询成功",
      data: status
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 修改营业状态
 */
router.put('/:status', async (req, res) => {
  try {
    const { status } = req.params
    await ShopStatus.update({ status }, { where: { id: 1 } })
    return res.json({
      code: 1,
      msg: "修改成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router