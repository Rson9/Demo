const express = require("express")
const Setmeal = require('../../models/setmeal')
const Category = require('../../models/category')
const SetmealDish = require('../../models/setmeal_dish')
const { Op, Sequelize } = require('sequelize')
const { failure, success } = require('../../utils/responses')
const router = express.Router()
/**
 * @description 分页查询
 */
router.get('/page', async (req, res) => {
  try {
    const query = req.query
    const currentPage = Math.abs(Number(query.page)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize
    const condition = {
      attributes: {
        include: [
          [Sequelize.col('Category.name'), 'categoryName'],
          [Sequelize.col('Category.id'), 'categoryId'],
        ],
        exclude: ['category_id']
      },
      offset: offset,
      limit: pageSize,
      include: [
        {
          model: Category,
          attributes: []
        }
      ],
      where: {}
    }
    if (query.name) {
      condition.where.name = {
        [Op.like]: `%${query.name}%`
      }
      condition.offset = 0
    }
    if (query.categoryId) {
      condition.where.category_id = {
        [Op.eq]: query.categoryId
      }
      condition.offset = 0
    }
    if (query.status) {
      condition.where.status = {
        [Op.eq]: query.status
      }
      condition.offset = 0
    }

    const { rows, count } = await Setmeal.findAndCountAll(condition)
    return res.json({
      code: 1,
      msg: "查询成功",
      data: {
        records: rows,
        total: count,
      }
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 根据id查询套餐
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const condition = {
      attributes: { include: [['category_id', 'categoryId'], [Sequelize.col('Category.name'), 'categoryName']] },
      include: [
        {
          model: Category,
          attributes: []
        },
        {
          model: SetmealDish
        }
      ]
    }
    const setmeal = await Setmeal.findByPk(id, condition)
    if (!setmeal) {
      throw new NotFoundError('套餐不存在')
    }
    return res.json({
      code: 1,
      msg: "查询成功",
      data: setmeal
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 套餐起售、停售
 */
router.post('/status/:status', async (req, res) => {
  try {
    const { status } = req.params
    const { id } = req.query
    const user = await Setmeal.findByPk(id)
    await user.update({ status })
    return res.json({
      code: 1,
      msg: "修改成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 批量删除套餐
 */
router.delete('/', async (req, res) => {
  try {
    const ids = req.query.ids.split(',')
    if (!ids) {
      return res.json({
        code: 0,
        msg: "没选择套餐"
      })
    }
    await Setmeal.destroy({ where: { id: { [Op.in]: ids } } })
    return res.json({
      code: 1,
      msg: "删除成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 新增套餐
 */
router.post('/', async (req, res) => {
  try {
    const { categoryId, description, image, name, price, setmealDishes, status } = req.body
    const dishdata = setmealDishes.map(item => {
      copies, dishId, id, name, price, setmealId
    }
    )
    //查询分类是否存在
    const category = await Category.findByPk(categoryId)
    if (!category) {
      return res.json({
        code: 0,
        msg: "分类不存在"
      })
    }

    return res.json({
      code: 1,
      msg: "新增成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router