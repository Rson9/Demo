const express = require("express")
const { Employee } = require('@models')
const { Op } = require('sequelize')
const { BadRequestError, NotFoundError } = require('@utils/errors')
const { failure, success } = require('@utils/responses')
const bcrypt = require('bcrypt')
const { signJWT, verifyJWT } = require('@utils/JWT')
const router = express.Router()
/** 
 * @description 用户登录
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      throw new BadRequestError('用户名或密码不能为空')
    }

    const user = await Employee.findOne({
      where: {
        username: username
      }
    });
    if (!user) {
      throw new NotFoundError('用户不存在，无法登录')
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return res.json({
        code: 0,
        msg: '密码错误',
      })

    }
    const token = signJWT(user.id)

    return res.json({
      data: {
        "id": user.id,
        "name": user.name,
        "token": token,
        "userName": user.username
      },
      code: 1,
      msg: '登录成功'
    })
  } catch (err) {
    failure(res, err)
  }
})

/**
 * @description 用户登出
 */
router.post('/logout', async (req, res) => {
  return res.json({
    code: 1,
    msg: '登出成功'
  })
})

/**
 * @description 密码修改
 */

router.put('/editPassword', async (req, res) => {
  try {
    const { newPassword, oldPassword } = req.body
    const id = req.id

    if (!newPassword || !oldPassword) {
      throw new BadRequestError('新密码和旧密码必须存在')
    }
    const user = await Employee.findByPk(id)
    if (!user) {
      throw new NotFoundError('用户不存在')
    }
    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password)

    if (!isPasswordValid) {
      return res.json({
        code: 0,
        msg: "旧密码错误"
      })

    }
    await user.update({ password: newPassword })
    return res.json({
      code: 1,
      msg: "密码修改成功"
    })
  }
  catch (e) {
    failure(res, e)
  }
})


/**
 * @description 添加用户
 */
router.post("/", async (req, res) => {
  try {
    const { idNumber, name, phone, sex, username } = req.body
    if (!idNumber || !name || !phone || !sex || !username) {
      throw new BadRequestError('信息不完整')
    }
    const user = await Employee.create({ idNumber, name, phone, sex, username })
    return res.json({
      code: 1,
      msg: "添加成功",
      data: user
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 用户分页查询
 */
router.get("/page", async (req, res) => {
  try {
    const query = req.query
    const currentPage = Math.abs(Number(query.page)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize
    const condition = {
      order: [['id', 'asc']],
      offset: offset,
      limit: pageSize
    }
    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${query.name}%`
        }
      }
      condition.offset = 0
    }
    const { count, rows } = await Employee.findAndCountAll(condition)
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
 * @description 用户账号状态修改
 */
router.post("/status/:status", async (req, res) => {
  try {
    const status = req.params.status

    const id = req.query.id
    const user = await Employee.findByPk(id)
    if (!user) {
      throw new NotFoundError('用户不存在')
    }
    await user.update({ status: status })
    return res.json({
      code: 1,
      msg: "禁用成功"
    })
  }
  catch (e) {
    failure(res, e)
  }

})
/**
 * @description 根据id查询员工
 */

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await Employee.findByPk(id)
    if (!user) {
      throw new NotFoundError('用户不存在')
    }

    return res.json({
      code: 1,
      msg: "查询成功",
      data: user
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 用户信息修改
 */
router.put('/', async (req, res) => {
  try {
    const { id, idNumber, name, phone, sex, username } = req.body
    const user = await Employee.findByPk(id)
    if (!user) {
      throw new NotFoundError('用户不存在')
    }
    await user.update({ id_number: idNumber, name, phone, sex, username })
    return res.json({
      code: 1,
      msg: "修改成功",
    })

  } catch (e) {
    failure(res, e)
  }
})
module.exports = router