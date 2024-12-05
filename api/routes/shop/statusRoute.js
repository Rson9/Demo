const express = require("express")
const router = express.Router()
const { success, failure } = require('../../utils/responses')
/**
 * @description 获取营业状态
 */
router.get('/status', async (req, res) => {
  try {
    return res.json({
      code: 1,
      msg: "查询成功",
      data: {
        status: 1
      }
    })
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router