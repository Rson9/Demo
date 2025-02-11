const Redis = require('ioredis');
const config = require('@config/redis').development
module.exports = new Redis({
  host: config.host, // Redis 服务器的主机名
  port: config.port,        // Redis 服务器的端口
  password: config.password //Redis 服务器密码
});