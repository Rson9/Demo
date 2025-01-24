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
