/*
 Navicat Premium Dump SQL

 Source Server         : demo
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : takeout

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 20/03/2025 20:49:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address_books
-- ----------------------------
DROP TABLE IF EXISTS `address_books`;
CREATE TABLE `address_books`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户id',
  `consignee` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '收货人',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '性别',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '手机号',
  `province_code` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '省级区划编号',
  `province_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '省级名称',
  `city_code` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '市级区划编号',
  `city_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '市级名称',
  `district_code` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '区级区划编号',
  `district_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '区级名称',
  `detail` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '详细地址',
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签',
  `is_default` tinyint(1) NOT NULL DEFAULT 0 COMMENT '默认 0 否 1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '地址簿' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of address_books
-- ----------------------------
INSERT INTO `address_books` VALUES (4, 6, '李鹏杰', '0', '18846056888', '23', '黑龙江省', '2301', '哈尔滨市', '230103', '南岗区', '哈尔滨理工大学', '1', 1);
INSERT INTO `address_books` VALUES (6, 6, '张三', '0', '13928261741', '11', '北京市', '1101', '市辖区', '110102', '西城区', '北京大学', '1', 0);

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` tinyint NULL DEFAULT NULL COMMENT '类型   1 菜品分类 2 套餐分类',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '分类名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '顺序',
  `status` tinyint(1) NULL DEFAULT NULL COMMENT '分类状态 0:禁用，1:启用',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint NULL DEFAULT NULL COMMENT '创建人',
  `update_user` bigint NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_category_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '菜品及套餐分类' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (11, 1, '酒水饮料', 10, 1, '2022-06-09 22:09:18', '2024-10-30 23:00:40', 1, 1);
INSERT INTO `categories` VALUES (12, 1, '传统主食', 9, 1, '2022-06-09 22:09:32', '2024-10-30 23:02:13', 1, 1);
INSERT INTO `categories` VALUES (13, 2, '人气套餐', 12, 1, '2022-06-09 22:11:38', '2024-10-25 16:27:09', 1, 1);
INSERT INTO `categories` VALUES (15, 2, '商务套餐', 13, 1, '2022-06-09 22:14:10', '2025-01-13 13:11:23', 1, 1);
INSERT INTO `categories` VALUES (16, 1, '蜀味烤鱼', 4, 1, '2022-06-09 22:15:37', '2022-08-31 14:27:25', 1, 1);
INSERT INTO `categories` VALUES (17, 1, '蜀味牛蛙', 5, 1, '2022-06-09 22:16:14', '2022-08-31 14:39:44', 1, 1);
INSERT INTO `categories` VALUES (18, 1, '特色蒸菜', 6, 1, '2022-06-09 22:17:42', '2024-10-26 21:29:56', 1, 1);
INSERT INTO `categories` VALUES (19, 1, '新鲜时蔬', 7, 1, '2022-06-09 22:18:12', '2022-06-09 22:18:28', 1, 1);
INSERT INTO `categories` VALUES (20, 1, '水煮鱼', 8, 1, '2022-06-09 22:22:29', '2022-06-09 22:23:45', 1, 1);
INSERT INTO `categories` VALUES (21, 1, '汤类', 11, 1, '2022-06-10 10:51:47', '2022-06-10 10:51:47', 1, 1);

-- ----------------------------
-- Table structure for dish_flavors
-- ----------------------------
DROP TABLE IF EXISTS `dish_flavors`;
CREATE TABLE `dish_flavors`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dish_id` bigint NOT NULL COMMENT '菜品',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '口味名称',
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '口味数据list',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 137 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '菜品口味关系表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dish_flavors
-- ----------------------------
INSERT INTO `dish_flavors` VALUES (136, 46, '温度', '[\"热饮\",\"常温\",\"去冰\",\"少冰\",\"多冰\"]');

-- ----------------------------
-- Table structure for dishes
-- ----------------------------
DROP TABLE IF EXISTS `dishes`;
CREATE TABLE `dishes`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '菜品名称',
  `category_id` bigint NOT NULL COMMENT '菜品分类id',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '菜品价格',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '图片',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '描述信息',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT '0 停售 1 起售',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint NULL DEFAULT NULL COMMENT '创建人',
  `update_user` bigint NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_dish_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 85 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '菜品' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dishes
-- ----------------------------
INSERT INTO `dishes` VALUES (46, '王老吉', 11, 6.00, 'http://localhost:8080/uploads/1736764189733-panda.jpg', '', 1, '2022-06-09 22:40:47', '2025-02-11 07:00:48', 1, 1);
INSERT INTO `dishes` VALUES (47, '北冰洋', 11, 4.00, '', '还是小时候的味道', 1, '2022-06-10 09:18:49', '2024-10-10 22:31:28', 1, 1);
INSERT INTO `dishes` VALUES (48, '雪花啤酒', 11, 4.00, '', '', 1, '2022-06-10 09:22:54', '2025-01-13 13:11:45', 1, 1);
INSERT INTO `dishes` VALUES (49, '米饭', 12, 2.00, '', '精选五常大米', 1, '2022-06-10 09:30:17', '2024-10-10 22:30:46', 1, 1);
INSERT INTO `dishes` VALUES (50, '馒头', 12, 1.00, '', '优质面粉', 1, '2022-06-10 09:34:28', '2024-10-10 22:30:30', 1, 1);
INSERT INTO `dishes` VALUES (51, '老坛酸菜鱼', 20, 56.00, '', '原料：汤，草鱼，酸菜', 1, '2022-06-10 09:40:51', '2024-10-10 22:35:28', 1, 1);
INSERT INTO `dishes` VALUES (52, '经典酸菜鮰鱼', 20, 66.00, '', '原料：酸菜，江团，鮰鱼', 1, '2022-06-10 09:46:02', '2024-10-10 22:28:13', 1, 1);
INSERT INTO `dishes` VALUES (53, '蜀味水煮草鱼', 20, 38.00, '', '原料：草鱼，汤', 1, '2022-06-10 09:48:37', '2024-10-10 22:29:01', 1, 1);
INSERT INTO `dishes` VALUES (54, '清炒小油菜', 19, 18.00, '', '原料：小油菜', 1, '2022-06-10 09:51:46', '2024-10-10 22:26:45', 1, 1);
INSERT INTO `dishes` VALUES (55, '蒜蓉娃娃菜', 19, 18.00, '', '原料：蒜，娃娃菜', 1, '2022-06-10 09:53:37', '2024-10-10 22:26:06', 1, 1);
INSERT INTO `dishes` VALUES (56, '清炒西兰花', 19, 18.00, '', '原料：西兰花', 1, '2022-06-10 09:55:44', '2024-10-10 22:25:49', 1, 1);
INSERT INTO `dishes` VALUES (57, '炝炒圆白菜', 19, 18.00, '', '原料：圆白菜', 1, '2022-06-10 09:58:35', '2024-10-10 22:26:28', 1, 1);
INSERT INTO `dishes` VALUES (58, '清蒸鲈鱼', 18, 98.00, '', '原料：鲈鱼', 1, '2022-06-10 10:12:28', '2024-10-10 22:24:36', 1, 1);
INSERT INTO `dishes` VALUES (59, '东坡肘子', 18, 138.00, '', '原料：猪肘棒', 1, '2022-06-10 10:24:03', '2024-10-10 22:23:50', 1, 1);
INSERT INTO `dishes` VALUES (60, '梅菜扣肉', 18, 58.00, '', '原料：猪肉，梅菜', 1, '2022-06-10 10:26:03', '2024-10-10 22:23:23', 1, 1);
INSERT INTO `dishes` VALUES (61, '剁椒鱼头', 18, 66.00, '', '原料：鲢鱼，剁椒', 1, '2022-06-10 10:28:54', '2024-10-10 22:24:53', 1, 1);
INSERT INTO `dishes` VALUES (62, '金汤酸菜牛蛙', 17, 88.00, '', '原料：鲜活牛蛙，酸菜', 1, '2022-06-10 10:33:05', '2024-10-10 22:22:47', 1, 1);
INSERT INTO `dishes` VALUES (63, '香锅牛蛙', 17, 88.00, '', '配料：鲜活牛蛙，莲藕，青笋', 1, '2022-06-10 10:35:40', '2024-10-10 22:22:34', 1, 1);
INSERT INTO `dishes` VALUES (64, '馋嘴牛蛙', 17, 88.00, '', '配料：鲜活牛蛙，丝瓜，黄豆芽', 1, '2022-06-10 10:37:52', '2024-10-10 22:22:22', 1, 1);
INSERT INTO `dishes` VALUES (65, '草鱼2斤', 16, 68.00, '', '原料：草鱼，黄豆芽，莲藕', 1, '2022-06-10 10:41:08', '2024-10-10 22:20:43', 1, 1);
INSERT INTO `dishes` VALUES (66, '江团鱼2斤', 16, 119.00, '', '配料：江团鱼，黄豆芽，莲藕', 1, '2022-06-10 10:42:42', '2024-11-02 15:04:37', 1, 1);
INSERT INTO `dishes` VALUES (67, '鮰鱼2斤', 16, 72.00, '', '原料：鮰鱼，黄豆芽，莲藕', 1, '2022-06-10 10:43:56', '2024-06-24 13:19:47', 1, 1);
INSERT INTO `dishes` VALUES (68, '鸡蛋汤', 21, 4.00, '', '配料：鸡蛋，紫菜', 1, '2022-06-10 10:54:25', '2024-10-10 22:19:22', 1, 1);
INSERT INTO `dishes` VALUES (69, '平菇豆腐汤', 21, 6.00, '', '配料：豆腐，平菇', 1, '2022-06-10 10:55:02', '2024-08-20 08:49:25', 1, 1);
INSERT INTO `dishes` VALUES (84, '红烧肉', 12, 9.99, 'http://localhost:8080/uploads/1736773315532-huiyuan.png', '最爱的肉', 0, '2025-01-13 13:04:51', '2025-01-13 13:05:10', NULL, NULL);

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '姓名',
  `username` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '用户名',
  `password` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '密码',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '手机号',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '性别',
  `id_number` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '身份证号',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态 0:禁用，1:启用',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint NULL DEFAULT NULL COMMENT '创建人',
  `update_user` bigint NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '员工信息' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES (1, '管理员', 'admin', '$2b$10$dnjVvQEj3bUEMhyfE88jtuCxwyQ.41yhGguVhnFvOJ/hHcPB/QTr6', '13812312312', '1', '110101199001010047', 1, '2022-02-15 15:51:20', '2025-01-13 13:10:44', 10, 1);
INSERT INTO `employees` VALUES (2, '张三', 'user', '$2b$10$RNEm5Q30.sn7ABvK2O7MKuJBiYQ2ClCp1MFfqvUvHn0PRSghOLgg2', '13056332614', '1', '513732615256134144', 1, '2025-01-13 12:59:25', '2025-01-13 13:11:12', NULL, NULL);

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '名字',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '图片',
  `order_id` bigint NOT NULL COMMENT '订单id',
  `dish_id` bigint NULL DEFAULT NULL COMMENT '菜品id',
  `setmeal_id` bigint NULL DEFAULT NULL COMMENT '套餐id',
  `dish_flavor` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '口味',
  `number` int NOT NULL DEFAULT 1 COMMENT '数量',
  `amount` decimal(10, 2) NOT NULL COMMENT '金额',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '订单明细表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of order_details
-- ----------------------------
INSERT INTO `order_details` VALUES (20, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 13, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_details` VALUES (21, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 14, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_details` VALUES (22, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 15, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_details` VALUES (23, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 16, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_details` VALUES (24, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 17, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_details` VALUES (25, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 18, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_details` VALUES (26, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 19, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_details` VALUES (27, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 20, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_details` VALUES (28, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 20, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_details` VALUES (29, '江团鱼2斤', 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', 20, 66, NULL, '不辣', 1, 119.00);
INSERT INTO `order_details` VALUES (30, '馒头', 'http://localhost:8080/static/image/8658a618-4235-4368-a4e1-ada09571dd21.png', 20, 50, NULL, NULL, 1, 1.00);
INSERT INTO `order_details` VALUES (31, '米饭', 'http://localhost:8080/static/image/ad443635-39e9-4fe7-9e9d-da42ba01337f.png', 20, 49, NULL, NULL, 1, 2.00);
INSERT INTO `order_details` VALUES (32, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 21, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_details` VALUES (33, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 21, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_details` VALUES (34, '江团鱼2斤', 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', 21, 66, NULL, '不辣', 1, 119.00);
INSERT INTO `order_details` VALUES (35, '馒头', 'http://localhost:8080/static/image/8658a618-4235-4368-a4e1-ada09571dd21.png', 21, 50, NULL, NULL, 1, 1.00);
INSERT INTO `order_details` VALUES (36, '米饭', 'http://localhost:8080/static/image/ad443635-39e9-4fe7-9e9d-da42ba01337f.png', 21, 49, NULL, NULL, 1, 2.00);
INSERT INTO `order_details` VALUES (37, '江团鱼2斤', 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', 22, 66, NULL, '重辣', 1, 119.00);
INSERT INTO `order_details` VALUES (38, '草鱼2斤', 'http://localhost:8080/static/image/63658914-9d4d-4409-b1aa-b131d47d415f.png', 22, 65, NULL, '不辣', 1, 68.00);
INSERT INTO `order_details` VALUES (39, '江团鱼2斤', 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', 23, 66, NULL, '重辣', 1, 119.00);
INSERT INTO `order_details` VALUES (40, '草鱼2斤', 'http://localhost:8080/static/image/63658914-9d4d-4409-b1aa-b131d47d415f.png', 23, 65, NULL, '不辣', 1, 68.00);
INSERT INTO `order_details` VALUES (50, '北冰洋', '', 31, 47, NULL, NULL, 2, 4.00);
INSERT INTO `order_details` VALUES (51, '雪花啤酒', '', 32, 48, NULL, NULL, 2, 4.00);
INSERT INTO `order_details` VALUES (52, '雪花啤酒', '', 33, 48, NULL, NULL, 2, 4.00);
INSERT INTO `order_details` VALUES (53, '北冰洋', '', 34, 47, NULL, NULL, 2, 4.00);
INSERT INTO `order_details` VALUES (54, '江团鱼2斤', '', 35, 66, NULL, '中辣', 1, 119.00);
INSERT INTO `order_details` VALUES (55, '王老吉', 'http://localhost:8080/uploads/1736764189733-panda.jpg', 36, 46, NULL, NULL, 1, 6.00);
INSERT INTO `order_details` VALUES (56, '雪花啤酒', '', 36, 48, NULL, NULL, 1, 4.00);
INSERT INTO `order_details` VALUES (57, '北冰洋', '', 37, 47, NULL, NULL, 2, 4.00);
INSERT INTO `order_details` VALUES (58, '北冰洋', '', 38, 47, NULL, NULL, 2, 4.00);
INSERT INTO `order_details` VALUES (59, '王老吉', 'http://localhost:8080/uploads/1736764189733-panda.jpg', 39, 46, NULL, NULL, 1, 6.00);
INSERT INTO `order_details` VALUES (60, '雪花啤酒', '', 39, 48, NULL, NULL, 1, 4.00);
INSERT INTO `order_details` VALUES (61, '江团鱼2斤', '', 39, 66, NULL, '中辣', 1, 119.00);
INSERT INTO `order_details` VALUES (62, '江团鱼2斤', '', 40, 66, NULL, '中辣', 1, 119.00);
INSERT INTO `order_details` VALUES (63, '王老吉', 'http://localhost:8080/uploads/1736764189733-panda.jpg', 41, 46, NULL, NULL, 1, 6.00);
INSERT INTO `order_details` VALUES (64, '啊啊啊', '', 42, NULL, 38, NULL, 1, 1111.00);
INSERT INTO `order_details` VALUES (65, '馋嘴牛蛙', '', 43, 64, NULL, NULL, 2, 88.00);
INSERT INTO `order_details` VALUES (66, '米饭', '', 44, 49, NULL, NULL, 1, 2.00);
INSERT INTO `order_details` VALUES (67, '红烧肉', 'http://localhost:8080/uploads/1736773315532-huiyuan.png', 44, 84, NULL, NULL, 1, 9.99);
INSERT INTO `order_details` VALUES (68, '草鱼2斤', '', 44, 65, NULL, NULL, 1, 68.00);
INSERT INTO `order_details` VALUES (69, '鮰鱼2斤', '', 44, 67, NULL, NULL, 1, 72.00);
INSERT INTO `order_details` VALUES (70, '王老吉', 'http://localhost:8080/uploads/1736764189733-panda.jpg', 45, 46, NULL, '少冰', 1, 6.00);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `number` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '订单号',
  `status` int NOT NULL DEFAULT 1 COMMENT '订单状态 1待付款 2待接单 3待派送 4派送中 5已完成 6已取消 7已退款',
  `user_id` bigint NOT NULL COMMENT '下单用户',
  `address_book_id` bigint NOT NULL COMMENT '地址id',
  `order_time` datetime NOT NULL COMMENT '下单时间',
  `checkout_time` datetime NULL DEFAULT NULL COMMENT '结账时间',
  `pay_method` int NOT NULL DEFAULT 1 COMMENT '支付方式 1微信,2支付宝',
  `pay_status` tinyint NOT NULL DEFAULT 0 COMMENT '支付状态 0未支付 1已支付 2退款',
  `amount` decimal(10, 2) NOT NULL COMMENT '实收金额',
  `remark` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '备注',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '手机号',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '地址',
  `user_name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '用户名称',
  `consignee` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '收货人',
  `cancel_reason` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '订单取消原因',
  `rejection_reason` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '订单拒绝原因',
  `cancel_time` datetime NULL DEFAULT NULL COMMENT '订单取消时间',
  `estimated_delivery_time` datetime NULL DEFAULT NULL COMMENT '预计送达时间',
  `delivery_status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '配送状态  1立即送出  0选择具体时间',
  `delivery_time` datetime NULL DEFAULT NULL COMMENT '送达时间',
  `pack_amount` int NULL DEFAULT NULL COMMENT '打包费',
  `tableware_number` int NULL DEFAULT NULL COMMENT '餐具数量',
  `tableware_status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '餐具数量状态  1按餐量提供  0选择具体数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '订单表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (36, '61737446279141', 6, 6, 4, '2025-01-21 07:57:59', '2025-01-21 07:57:59', 1, 2, 18.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', NULL, '订单量较多，暂时无法接单', '2025-01-21 08:30:02', '2025-01-21 08:57:00', 0, NULL, 2, 0, 0);
INSERT INTO `orders` VALUES (37, '61737448302646', 6, 6, 4, '2025-01-21 08:31:42', NULL, 1, 0, 16.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', '客户电话取消', NULL, '2025-01-21 08:47:04', '2025-01-21 10:30:00', 0, NULL, 2, 0, 0);
INSERT INTO `orders` VALUES (38, '61737449308762', 1, 6, 4, '2025-01-21 08:48:28', '2025-01-21 08:48:28', 1, 2, 16.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', '客户电话取消', NULL, '2025-01-21 08:51:31', '2025-01-21 09:48:00', 0, '2025-01-21 08:51:13', 2, 0, 0);
INSERT INTO `orders` VALUES (39, '61737702428290', 1, 6, 4, '2025-01-24 07:07:08', NULL, 1, 0, 138.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', NULL, NULL, NULL, '2025-01-24 08:07:00', 0, NULL, 3, 0, 0);
INSERT INTO `orders` VALUES (40, '61737721865964', 5, 6, 4, '2025-01-24 12:31:05', NULL, 1, 1, 126.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', NULL, NULL, NULL, '2025-01-24 13:31:00', 0, '2025-01-24 12:33:00', 1, 0, 0);
INSERT INTO `orders` VALUES (41, '61738823269233', 6, 6, 4, '2025-02-06 06:27:49', '2025-02-06 06:27:50', 1, 1, 13.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', '用户取消', '订单量较多，暂时无法接单', '2025-02-06 07:43:52', '2025-02-06 07:27:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (42, '61739268911832', 6, 6, 4, '2025-02-11 10:15:11', NULL, 1, 0, 1118.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', '用户取消', NULL, '2025-02-11 10:30:12', '2025-02-11 11:15:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (43, '61739270684529', 1, 6, 4, '2025-02-11 10:44:44', NULL, 1, 0, 184.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', NULL, NULL, NULL, '2025-02-11 11:44:00', 0, NULL, 2, 0, 0);
INSERT INTO `orders` VALUES (44, '61741164335700', 6, 6, 4, '2025-03-05 08:45:35', NULL, 1, 2, 161.99, '挂我脑袋上', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', NULL, '订单量较多，暂时无法接单', '2025-03-05 08:48:16', '2025-03-05 09:45:00', 0, NULL, 4, 0, 0);
INSERT INTO `orders` VALUES (45, '61741601670848', 3, 6, 4, '2025-03-10 10:14:30', '2025-03-10 10:14:30', 1, 1, 13.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', 'placid.', '李鹏杰', NULL, NULL, NULL, '2025-03-10 11:14:00', 0, NULL, 1, 0, 0);

-- ----------------------------
-- Table structure for setmeal_dishes
-- ----------------------------
DROP TABLE IF EXISTS `setmeal_dishes`;
CREATE TABLE `setmeal_dishes`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `setmeal_id` bigint NULL DEFAULT NULL COMMENT '套餐id',
  `dish_id` bigint NULL DEFAULT NULL COMMENT '菜品id',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '菜品名称 （冗余字段）',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '菜品单价（冗余字段）',
  `copies` int NULL DEFAULT NULL COMMENT '菜品份数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 109 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '套餐菜品关系' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of setmeal_dishes
-- ----------------------------
INSERT INTO `setmeal_dishes` VALUES (82, 38, 66, '江团鱼2斤', 119.00, 1);
INSERT INTO `setmeal_dishes` VALUES (83, 38, 67, '鮰鱼2斤', 72.00, 1);
INSERT INTO `setmeal_dishes` VALUES (84, 38, 67, '鮰鱼2斤', 72.00, 1);

-- ----------------------------
-- Table structure for setmeals
-- ----------------------------
DROP TABLE IF EXISTS `setmeals`;
CREATE TABLE `setmeals`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `category_id` bigint NOT NULL COMMENT '菜品分类id',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '套餐名称',
  `price` decimal(10, 2) NOT NULL COMMENT '套餐价格',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT '售卖状态 0:停售 1:起售',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '描述信息',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '图片',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint NULL DEFAULT NULL COMMENT '创建人',
  `update_user` bigint NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_setmeal_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '套餐' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of setmeals
-- ----------------------------
INSERT INTO `setmeals` VALUES (37, 13, '超便宜', 50.00, 0, '啊啊啊', '', '2024-11-02 11:54:10', '2025-01-13 13:12:03', 1, 1);
INSERT INTO `setmeals` VALUES (38, 13, '啊啊啊', 1111.00, 1, '啊啊啊', '', '2024-11-02 11:56:22', '2024-11-02 15:18:07', 1, 1);

-- ----------------------------
-- Table structure for shopping_carts
-- ----------------------------
DROP TABLE IF EXISTS `shopping_carts`;
CREATE TABLE `shopping_carts`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '商品名称',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '图片',
  `user_id` bigint NOT NULL COMMENT '主键',
  `dish_id` bigint NULL DEFAULT NULL COMMENT '菜品id',
  `setmeal_id` bigint NULL DEFAULT NULL COMMENT '套餐id',
  `dish_flavor` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '口味',
  `number` int NOT NULL DEFAULT 1 COMMENT '数量',
  `amount` decimal(10, 2) NOT NULL COMMENT '金额',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 392 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '购物车' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of shopping_carts
-- ----------------------------
INSERT INTO `shopping_carts` VALUES (391, '北冰洋', '', 6, 47, NULL, NULL, 1, 4.00, '2025-03-10 11:00:01');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `openid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '微信用户唯一标识',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '手机号',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '性别',
  `id_number` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '身份证号',
  `avatar` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '头像',
  `create_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '用户信息' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (6, 'o7nhM5XHSFth7dtuqrppRfITFqAM', 'placid.', NULL, '0', NULL, 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKN92vnmGu8cBK2SnmAjt6SklBAeyF4I9Ts2A35sUlGxnBq1Fz0ByjQl7TV5y1qS1JOzNkdictFIM0X6L8icticfgfoIsTaD5R4YgsrSprPzcQVw/132', '2025-01-24 00:57:28');

SET FOREIGN_KEY_CHECKS = 1;
