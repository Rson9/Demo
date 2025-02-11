const express = require("express")
const { Category } = require('@models')
const { failure, success } = require('@utils/responses')
const redis = require('@utils/redis')
const router = express.Router()
/**
 * @description 条件查询
 */
router.get('/list', async (req, res) => {
  try {
    const { type } = req.query
    const cacheKey = `category${type ? ":" + type : ""}`
    const cachedData = await redis.get(cacheKey)
    if (cachedData) {
      return success(res, "查询成功", JSON.parse(cachedData))
    }
    const resultData = type ? await Category.findAll({
      where: {
        type: type
      }
    }) : await Category.findAll()
    await redis.setex(cacheKey, 3600, JSON.stringify(resultData))
    return success(res, "查询成功", resultData)
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router