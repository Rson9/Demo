/**
 * @description 自定义400错误
 */
class BadRequestError extends Error {
  constructor (message) {
    super(message);
    this.name = 'BadRequestError'
  }
}

/**
 * @description 自定义401错误
 */
class UnauthorizedError extends Error {
  constructor (message) {
    super(message);
    this.name = 'UnauthorizedError'
  }
}

/**
 * @description 自定义404错误
 */
class NotFoundError extends Error {
  constructor (message) {
    super(message);
    this.name = 'NotFoundError'
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  NotFoundError
}