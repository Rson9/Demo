const { User } = require('@models')
const { UnauthorizedError } = require('@utils/errors')
const { verifyJWT } = require('@utils/JWT')
const { failure } = require('@utils/responses')

const userAuth = async (req, res, next) => {
  try {

    const { authentication } = req.headers;

    if (!authentication) {
      throw new UnauthorizedError('需要传入authentication')
    }
    const decoded = verifyJWT(authentication);
    const { id } = decoded

    const user = await User.findOne({
      where: {
        openid: id
      }
    })
    if (!user) {
      throw new UnauthorizedError('用户不存在')
    }
    req.openid = user.openid;
    req.id = user.id;
    next();
  } catch (e) {
    failure(res, e)
  }
};

module.exports = userAuth