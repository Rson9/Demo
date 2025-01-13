const express = require("express")
const { Dish, DishFlavor, Category } = require('@models')
const { Sequelize } = require('sequelize')
const { failure, success } = require('@utils/responses')
const router = express.Router()
/**
 * @description 条件查询
 */
router.get('/list', async (req, res) => {
  try {
    const { categoryId } = req.query
    const dish = await Dish.findAll({
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
    return res.json({
      code: 1,
      msg: "查询成功",
      data: dish
    })
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router