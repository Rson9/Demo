const express = require("express")
const Category = require('@models/category')
const { Op, where } = require('sequelize')
const { BadRequestError, NotFoundError } = require('@utils/errors')
const { failure, success } = require('@utils/responses')
const bcrypt = require('bcrypt')
const { signJWT, verifyJWT } = require('@utils/JWT')
const router = express.Router()
/**
 * @description 新增分类
 */
router.post('/', async (req, res) => {
  try {
    const { name, sort, type } = req.body
    const user = await Category.create({ name, sort, type })
    return res.json({
      code: 1,
      msg: "添加成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 分类分页查询
 */

router.get('/page', async (req, res) => {
  try {
    const query = req.query
    const currentPage = Math.abs(Number(query.page)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize
    const condition = {
      attributes: { include: [['create_user', 'createUser'], ['update_user', 'updateUser']] },
      order: [['sort', 'asc']],
      offset: offset,
      limit: pageSize,
      where: {}
    }
    if (query.name) {
      condition.where.name = {
        [Op.like]: `%${query.name}%`
      }
      condition.offset = 0
    }
    if (query.type) {
      condition.where.type = {
        [Op.eq]: query.type
      }
      condition.offset = 0
    }
    const { rows, count } = await Category.findAndCountAll(condition)

    return res.json({
      code: 1,
      msg: "查询成功",
      data: {
        total: count,
        records: rows
      }
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 修改分类
 */
router.put('/', async (req, res) => {
  try {
    const { id, name, sort, type } = req.body
    const user = await Category.findByPk(id)
    await user.update({ name, sort, type })
    return res.json({
      code: 1,
      msg: "修改成功",
    })

  } catch (e) {
    failure(res, e)
  }

})

/**
 * @description 根据id删除分类
 */

router.delete('/', async (req, res) => {
  try {
    const { id } = req.query
    const user = await Category.findByPk(id)
    await user.destroy()
    return res.json({
      code: 1,
      msg: "删除成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 启用、禁用分类
 */
router.post('/status/:status', async (req, res) => {
  try {
    const { status } = req.params
    const { id } = req.query
    const user = await Category.findByPk(id)
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
 * @description 根据类型查询分类
 * @deprecated 没用上
 */
router.get('/list', async (req, res) => {
  try {
    const { type } = req.query
    const user = await Category.findAll({
      attributes: { include: [['create_user', 'createUser'], ['update_user', 'updateUser']] },
      where: { type }
    })
    return res.json({
      code: 1,
      msg: "查询成功",
      data: user
    })
  } catch (e) {
    failure(res, e)
  }
})
module.exports = router