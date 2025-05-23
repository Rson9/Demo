## 项目描述
一个基于苍穹外卖二次开发的nodejs项目，项目开箱即用
## 项目结构
mysql/,redis/,nginx作为数据持久化目录，数据库文件已经准备好了，在mysql里面的init目录，在第一次启动之后会自动加载
```
demo/
├── api/
|-- mysql/
|-- redis/
|-- nginx/
|-- docker-compose.yml
|-- README.md
|-- .gitignore
```

## mysql，redis，nginx
都使用了docker-compose进行部署
```bash
# 第一次启动命令
docker-compose up -d
# 启动命令
docker-compose start
# 停止命令
docker-compose stop
# 重启命令
docker-compose restart
# 查看日志
docker-compose logs
# 进入容器
docker exec -it mysql bash
# 完全清除容器
docker-compose down
```
## 项目启动

首先确保启动了docker-compose，因为项目分为微信小程序端，商家后台端和api，
微信小程序直接在微信开发者工具中导入mp-weixin，后台端已经打包放在nginx目录中，可以直接运行，啥也不用管
后台服务启动：
```
# 进入api目录，下载依赖
$ pnpm i
# 记得在.env中配置你的微信小程序相关信息
# 运行项目
$ pnpm run dev
```
