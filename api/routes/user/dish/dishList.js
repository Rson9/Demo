const express = require("express")
const { Dish, DishFlavor, Category } = require('@models')
const { Sequelize } = require('sequelize')
const { failure, success } = require('@utils/responses')
const redis = require('@utils/redis')
const router = express.Router()
/**
 * @description 条件查询
 */
router.get('/list', async (req, res) => {
  try {
    const { categoryId } = req.query

    if (!categoryId) {
      return failure(res, "缺少分类ID参数")
    }

    const cacheKey = `dish:list:${categoryId}`
    const cachedData = await redis.get(cacheKey)
    if (cachedData) {
      return success(res, "查询成功", JSON.parse(cachedData))
    }
    const resultData = await Dish.findAll({
      where: {
        category_id: categoryId
      },
      attributes: {
        include: [
          ['category_id', 'categoryId'],
          [Sequelize.col('Category.name'), 'categoryName'],
        ],
        exclude: ['category_id', 'createTime']
      },
      include: [
        {
          model: DishFlavor,
          as: 'flavors',
          attributes: {
            include: [['dish_id', 'dishId']],
            exclude: ['dish_id']
          }
        },
        {
          model: Category,
          attributes: []
        }

      ]
    })
    await redis.setex(cacheKey, 3600, JSON.stringify(resultData))
    return success(res, "查询成功", resultData)
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router