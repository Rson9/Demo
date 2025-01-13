const express = require("express")
const { Category } = require('@models')
const { failure, success } = require('@utils/responses')
const router = express.Router()
/**
 * @description 条件查询
 */
router.get('/list', async (req, res) => {
  try {
    const { type } = req.query

    let list
    if (!type) {
      list = await Category.findAll()
    }
    else {
      list = await Category.findAll({
        where: {
          type: type
        }
      })
    }
    return res.json({
      code: 1,
      msg: "查询成功",
      data: list
    })
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router