const express = require("express")
const Setmeal = require('@models/setmeal')
const SetmealDish = require('@models/setmeal_dish')
const Dish = require('@models/dish')
const { failure, success } = require('@utils/responses')
const { Sequelize } = require('sequelize')
const router = express.Router()
/**
 * @description 条件查询
 */
router.get('/list', async (req, res) => {
  try {
    const { categoryId } = req.query
    const list = await Setmeal.findAll({
      where: {
        category_id: categoryId
      },
      attributes: {
        include: [
          ['category_id', 'categoryId'],
          ['create_user', 'createUser'],
          ['update_user', 'updateUser'],
        ],
        exclude: ['category_id', 'create_user', 'update_user']
      }
    })
    return res.json({
      code: 1,
      msg: "查询成功",
      data: list
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * 根据套餐id查询包含的菜品
 */
router.get('/dish/:id', async (req, res) => {
  try {
    const { id } = req.params
    const list = await SetmealDish.findAll({
      where: {
        setmeal_id: id
      },
      attributes: [
        [Sequelize.col('Dish.name'), 'name'],
        [Sequelize.col('Dish.image'), 'image'],
        [Sequelize.col('Dish.description'), 'description'],
        'copies'
      ],
      include: [
        {
          model: Dish,
          attributes: []
        }
      ]

    })
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