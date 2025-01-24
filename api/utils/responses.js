function success (res, msg, data) {
  res.json({
    code: 1,
    msg,
    data
  })
}

function failure (res, error) {
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map(err => err.message)
    res.json({
      code: 0,
      msg: `请求参数错误: ${errors.join(',')}`,
    })
  }
  else if (error.name === 'NotFoundError') {
    res.json({
      code: 0,
      msg: `资源不存在: ${error.message}`,
    })
  }
  else if (error.name === 'TokenExpiredError') {
    res.json({
      code: 0,
      msg: '认证失败: token已过期',
    })
  }
  else if (error.name === 'JsonWebTokenError') {
    res.json({
      code: 0,
      msg: '认证失败: token无效',
    })
  }
  else if (error.name === 'BadRequestError') {
    res.json({
      code: 0,
      msg: `请求参数错误: ${error.message}`,
    })
  }
  else if (error.name === 'UnauthorizedError') {
    res.json({
      code: 0,
      msg: `未授权: ${error.message}`,
    })
  }
  else if (error.name === 'SequelizeUniqueConstraintError') {
    res.json({
      code: 0,
      msg: `请求参数错误: ${error.message}`,
    })
  }
  else {
    res.json({
      code: 0,
      msg: `未知异常: ${error.message}`,
    })
  }
}
module.exports = {
  success,
  failure
}