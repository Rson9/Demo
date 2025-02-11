const express = require("express")
const router = express.Router()
const { success, failure } = require('../../utils/responses')
const redis = require('@utils/redis')
/**
 * @description 获取营业状态
 */
router.get('/status', async (req, res) => {
  try {
    const status = await redis.get('status')
    return success(res, "查询成功",
      parseInt(status)
    )
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
    await redis.set('status', status)
    return success(res, "修改成功")
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router