## 项目结构
demo/
├── api/
|-- mysql/
|-- redis/
|-- nginx/
|-- docker-compose.yml
|-- mysql.sql
|-- README.md
|-- .gitignore

表对应关系

菜品：dishes
套餐：setmeals
口味：flavors
分类：categories
员工表：employees
用户表：users
地址表：address_book
订单表：orders
订单详情表：order_details

中间表

1. 套餐和菜品对应关系:setmeal_dish
   多对多

2. 菜品和口味对应关系
   一对多，一个菜品可以有多个口味

3. 分类和菜品（套餐）对应关系
   一对多关系
   一个分类可以有多个菜品或者多个套餐

4. 订单表和订单详情表
一对多，一个订单表对应多个菜品的详细信息

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

## 记录
1. 事务一致性问题
   在用户提交订单时，购物车中的数据提交到订单详情表和清空购物车要保证一致。
2. 购物车添加问题
   在使用redis缓存时，由于菜品的口味不同，但是忘记了对键分离，导致添加菜品把之前的给覆盖掉，因此对菜品的键需要添加上口味，从而区分开。
3. redis使用的地方
   主要对Categories，dish，setmeal，shoppingcart做了redis处理。