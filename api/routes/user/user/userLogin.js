const express = require("express")
const axios = require('axios')
const { User } = require('@models')
const bcrypt = require('bcrypt')
const { signJWT, verifyJWT } = require('@utils/JWT')
const { failure, success } = require('@utils/responses')
const router = express.Router()

/**
 * @description 用户登录
 */
router.post('/login', async (req, res) => {
  try {
    const { code, name, avatar, sex } = req.body


    if (!code) {
      return res.status(400).json({
        code: 0,
        msg: "code不能为空"
      })
    }
    const { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: process.env.APP_ID,
        secret: process.env.APP_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })

    if (!data.openid) {
      return res.status(500).json({
        code: 0,
        msg: "服务器错误"
      })
    }

    console.log(name, avatar, sex);

    //先查询是否存在，然后再创建用户
    let user = await User.findOne({
      where: {
        openid: data.openid
      }
    })
    if (!user) {
      user = await User.create({
        openid: data.openid,
        name,
        avatar,
        sex
      })
    }
    return res.json({
      code: 1,
      msg: "登录成功",
      data: {
        id: user.id,
        openid: user.openid,
        token: signJWT(user.openid)
      }
    })

  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 退出登录
 */
router.post('/logout', async (req, res) => {
  try {
    return res.json({
      code: 1,
      msg: "退出成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

module.exports = router