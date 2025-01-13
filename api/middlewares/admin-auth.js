const { Employee } = require('@models')
const { UnauthorizedError } = require('@utils/errors')
const { verifyJWT } = require('@utils/JWT')
const { failure } = require('@utils/responses')

const adminAuth = async (req, res, next) => {
  try {
    // 登录放行
    if (req.path === '/login') {
      next();
      return;
    }

    const { token } = req.headers;

    if (!token) {
      throw new UnauthorizedError('需要传入token')
    }
    const decoded = verifyJWT(token);
    const { id } = decoded
    const user = await Employee.findByPk(id)
    if (!user) {
      throw new UnauthorizedError('用户不存在')
    }
    req.id = id;
    next();
  } catch (e) {
    failure(res, e)
  }
};

module.exports = adminAuth