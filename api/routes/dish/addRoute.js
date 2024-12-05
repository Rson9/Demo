const express = require("express")
const Dish = require('../../models/dish')
const { Op, where, Sequelize } = require('sequelize')
const { BadRequestError, NotFoundError } = require('../../utils/errors')
const { failure, success } = require('../../utils/responses')
const bcrypt = require('bcrypt')
const { signJWT, verifyJWT } = require('../../utils/JWT')
const Category = require('../../models/category')
const router = express.Router()
/**
 * @description 菜品分页查询
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
          ['create_user', 'createUser'],
          ['update_user', 'updateUser'],
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

    const { rows, count } = await Dish.findAndCountAll(condition)


    return res.json({
      code: 1,
      msg: "查询成功",
      data: {
        records: rows,
        total: count,
        currentPage,
        pageSize
      }
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 菜品起售、停售
 */
router.post('/status/:status', async (req, res) => {
  try {
    const { status } = req.params
    const { id } = req.query
    const user = await Dish.findByPk(id)
    await user.update({ status })
    return res.json({
      code: 1,
      msg: "修改成功",
    })
  } catch (e) {
    failure(res, e)
  }
})
module.exports = router