const express = require("express")
const axios = require('axios')
const User = require('@models/user')
const bcrypt = require('bcrypt')
const { signJWT, verifyJWT } = require('@utils/JWT')
const { failure, success } = require('@utils/responses')
const router = express.Router()
const APPID = 'wx52ff38c16d2f6779'
const APPSECRET = '58c6d6ccadc6f73a0f69c90e09ff7bfe'

/**
 * @description 用户登录
 */
router.post('/login', async (req, res) => {
  try {
    const { code } = req.body
    if (!code) {
      return res.status(400).json({
        code: 0,
        msg: "code不能为空"
      })
    }
    const { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: APPID,
        secret: APPSECRET,
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


    //先查询是否存在，然后再创建用户
    const [user, created] = await User.findCreateFind({
      where: {
        openid: data.openid
      }
    }, {
      default: {
        openid: data.openid
      }
    })

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