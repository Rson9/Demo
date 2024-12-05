const jwt = require('jsonwebtoken');
module.exports.signJWT = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '30d' });
}
module.exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.SECRET);
}