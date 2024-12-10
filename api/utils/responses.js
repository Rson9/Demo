function success (res, msg, data, code = 200) {
  res.status(code).json({
    code: 1,
    msg,
    data
  })
}

function failure (res, error) {
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map(err => err.message)
    res.status(400).json({
      code: 0,
      message: "请求参数错误",
      errors
    })
  }
  else if (error.name === 'NotFoundError') {
    res.status(404).json({
      code: 0,
      message: '资源不存在',
      errros: [error.message]
    })
  }
  else if (error.name === 'TokenExpiredError') {
    res.status(401).json({
      code: 0,
      message: '认证失败',
      errors: ['token已过期']
    })
  }
  else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      code: 0,
      message: '认证失败',
      errors: ['token无效']
    })
  }
  else if (error.name === 'BadRequestError') {
    res.status(400).json({
      code: 0,
      message: '请求参数错误',
      errors: [error.message]
    })
  }
  else if (error.name === 'UnauthorizedError') {
    res.status(401).json({
      code: 0,
      message: '未授权',
      errors: [error.message]
    })
  }
  else if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(200).json({
      code: 0,
      msg: '菜品名已存在',
    })
  }
  else {
    res.status(500).json({
      code: 0,
      message: '服务器错误',
      errors: [error.message]
    })
  }
}
module.exports = {
  success,
  failure
}