/*
 Navicat MySQL Data Transfer

 Source Server         : aa
 Source Server Type    : MySQL
 Source Server Version : 80034
 Source Host           : localhost:3306
 Source Schema         : bk_to_class

 Target Server Type    : MySQL
 Target Server Version : 80034
 File Encoding         : 65001

 Date: 01/12/2024 13:41:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address_book
-- ----------------------------
DROP TABLE IF EXISTS `address_book`;
CREATE TABLE `address_book`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(0) NOT NULL COMMENT '用户id',
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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '地址簿' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address_book
-- ----------------------------
INSERT INTO `address_book` VALUES (4, 5, '李鹏杰', '0', '18846056888', '23', '黑龙江省', '2301', '哈尔滨市', '230103', '南岗区', '哈尔滨理工大学', '1', 1);
INSERT INTO `address_book` VALUES (5, 5, '黎家鑫', '1', '18888888888', '51', '四川省', '5117', '达州市', '511703', '达川区', '啊啊', '2', 0);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int(0) NULL DEFAULT NULL COMMENT '类型   1 菜品分类 2 套餐分类',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '分类名称',
  `sort` int(0) NOT NULL DEFAULT 0 COMMENT '顺序',
  `status` int(0) NULL DEFAULT NULL COMMENT '分类状态 0:禁用，1:启用',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint(0) NULL DEFAULT NULL COMMENT '创建人',
  `update_user` bigint(0) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_category_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '菜品及套餐分类' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (11, 1, '酒水饮料', 10, 1, '2022-06-09 22:09:18', '2024-10-30 23:00:40', 1, 1);
INSERT INTO `category` VALUES (12, 1, '传统主食', 9, 1, '2022-06-09 22:09:32', '2024-10-30 23:02:13', 1, 1);
INSERT INTO `category` VALUES (13, 2, '人气套餐', 12, 1, '2022-06-09 22:11:38', '2024-10-25 16:27:09', 1, 1);
INSERT INTO `category` VALUES (15, 2, '商务套餐', 13, 1, '2022-06-09 22:14:10', '2022-06-10 11:04:48', 1, 1);
INSERT INTO `category` VALUES (16, 1, '蜀味烤鱼', 4, 1, '2022-06-09 22:15:37', '2022-08-31 14:27:25', 1, 1);
INSERT INTO `category` VALUES (17, 1, '蜀味牛蛙', 5, 1, '2022-06-09 22:16:14', '2022-08-31 14:39:44', 1, 1);
INSERT INTO `category` VALUES (18, 1, '特色蒸菜', 6, 1, '2022-06-09 22:17:42', '2024-10-26 21:29:56', 1, 1);
INSERT INTO `category` VALUES (19, 1, '新鲜时蔬', 7, 1, '2022-06-09 22:18:12', '2022-06-09 22:18:28', 1, 1);
INSERT INTO `category` VALUES (20, 1, '水煮鱼', 8, 1, '2022-06-09 22:22:29', '2022-06-09 22:23:45', 1, 1);
INSERT INTO `category` VALUES (21, 1, '汤类', 11, 1, '2022-06-10 10:51:47', '2022-06-10 10:51:47', 1, 1);
INSERT INTO `category` VALUES (38, 1, '麻辣毛蛋', 14, 0, '2024-10-28 19:14:15', '2024-10-28 19:14:15', 1, 1);

-- ----------------------------
-- Table structure for dish
-- ----------------------------
DROP TABLE IF EXISTS `dish`;
CREATE TABLE `dish`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '菜品名称',
  `category_id` bigint(0) NOT NULL COMMENT '菜品分类id',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '菜品价格',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '图片',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '描述信息',
  `status` int(0) NULL DEFAULT 1 COMMENT '0 停售 1 起售',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint(0) NULL DEFAULT NULL COMMENT '创建人',
  `update_user` bigint(0) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_dish_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 84 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '菜品' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dish
-- ----------------------------
INSERT INTO `dish` VALUES (46, '王老吉', 11, 6.00, 'http://localhost:8080/static/image/03a905e4-4dd4-45b2-8ee3-c08e0cfbae57.png', '', 1, '2022-06-09 22:40:47', '2024-10-10 22:31:44', 1, 1);
INSERT INTO `dish` VALUES (47, '北冰洋', 11, 4.00, 'http://localhost:8080/static/image/85326057-3eb0-431d-aeac-3b16f4a23877.png', '还是小时候的味道', 1, '2022-06-10 09:18:49', '2024-10-10 22:31:28', 1, 1);
INSERT INTO `dish` VALUES (48, '雪花啤酒', 11, 4.00, 'http://localhost:8080/static/image/c377580e-576c-435d-9afc-43d2863e12f5.png', '', 0, '2022-06-10 09:22:54', '2024-11-02 14:52:41', 1, 1);
INSERT INTO `dish` VALUES (49, '米饭', 12, 2.00, 'http://localhost:8080/static/image/ad443635-39e9-4fe7-9e9d-da42ba01337f.png', '精选五常大米', 1, '2022-06-10 09:30:17', '2024-10-10 22:30:46', 1, 1);
INSERT INTO `dish` VALUES (50, '馒头', 12, 1.00, 'http://localhost:8080/static/image/8658a618-4235-4368-a4e1-ada09571dd21.png', '优质面粉', 1, '2022-06-10 09:34:28', '2024-10-10 22:30:30', 1, 1);
INSERT INTO `dish` VALUES (51, '老坛酸菜鱼', 20, 56.00, 'http://localhost:8080/static/image/d96d0443-3c86-489b-99bc-3754fe95bf4d.png', '原料：汤，草鱼，酸菜', 1, '2022-06-10 09:40:51', '2024-10-10 22:35:28', 1, 1);
INSERT INTO `dish` VALUES (52, '经典酸菜鮰鱼', 20, 66.00, 'http://localhost:8080/static/image/7478808d-f1f6-4050-84f7-48883d1d0ace.png', '原料：酸菜，江团，鮰鱼', 1, '2022-06-10 09:46:02', '2024-10-10 22:28:13', 1, 1);
INSERT INTO `dish` VALUES (53, '蜀味水煮草鱼', 20, 38.00, 'http://localhost:8080/static/image/61dbc061-1849-4bc8-aa2c-4dfbb4cb08c5.png', '原料：草鱼，汤', 1, '2022-06-10 09:48:37', '2024-10-10 22:29:01', 1, 1);
INSERT INTO `dish` VALUES (54, '清炒小油菜', 19, 18.00, 'http://localhost:8080/static/image/b498922a-f7d7-4ba6-b614-f354a501ab56.png', '原料：小油菜', 1, '2022-06-10 09:51:46', '2024-10-10 22:26:45', 1, 1);
INSERT INTO `dish` VALUES (55, '蒜蓉娃娃菜', 19, 18.00, 'http://localhost:8080/static/image/c6813987-b4bc-4e26-9431-49e2cc34be4b.png', '原料：蒜，娃娃菜', 1, '2022-06-10 09:53:37', '2024-10-10 22:26:06', 1, 1);
INSERT INTO `dish` VALUES (56, '清炒西兰花', 19, 18.00, 'http://localhost:8080/static/image/b97dfb48-b8ea-4636-9c94-1976b2cd6c04.png', '原料：西兰花', 1, '2022-06-10 09:55:44', '2024-10-10 22:25:49', 1, 1);
INSERT INTO `dish` VALUES (57, '炝炒圆白菜', 19, 18.00, 'http://localhost:8080/static/image/6999d207-0aac-45e7-b50a-9ec7ff03147a.png', '原料：圆白菜', 1, '2022-06-10 09:58:35', '2024-10-10 22:26:28', 1, 1);
INSERT INTO `dish` VALUES (58, '清蒸鲈鱼', 18, 98.00, 'http://localhost:8080/static/image/908fd976-d4d9-4c72-ae12-08a692d88a95.png', '原料：鲈鱼', 1, '2022-06-10 10:12:28', '2024-10-10 22:24:36', 1, 1);
INSERT INTO `dish` VALUES (59, '东坡肘子', 18, 138.00, 'http://localhost:8080/static/image/24ddb4dc-9ab1-4b75-93bd-a109ce6ace20.png', '原料：猪肘棒', 1, '2022-06-10 10:24:03', '2024-10-10 22:23:50', 1, 1);
INSERT INTO `dish` VALUES (60, '梅菜扣肉', 18, 58.00, 'http://localhost:8080/static/image/185222aa-61e6-42e2-be5d-d923d2c1ca42.png', '原料：猪肉，梅菜', 1, '2022-06-10 10:26:03', '2024-10-10 22:23:23', 1, 1);
INSERT INTO `dish` VALUES (61, '剁椒鱼头', 18, 66.00, 'http://localhost:8080/static/image/d8be7fef-2ea9-40e4-ae12-dfa69c769374.png', '原料：鲢鱼，剁椒', 1, '2022-06-10 10:28:54', '2024-10-10 22:24:53', 1, 1);
INSERT INTO `dish` VALUES (62, '金汤酸菜牛蛙', 17, 88.00, 'http://localhost:8080/static/image/73854aec-98bb-4019-a28c-c170a9019728.png', '原料：鲜活牛蛙，酸菜', 1, '2022-06-10 10:33:05', '2024-10-10 22:22:47', 1, 1);
INSERT INTO `dish` VALUES (63, '香锅牛蛙', 17, 88.00, 'http://localhost:8080/static/image/b3522e83-5e43-44dd-b42f-15b6b3331da7.png', '配料：鲜活牛蛙，莲藕，青笋', 1, '2022-06-10 10:35:40', '2024-10-10 22:22:34', 1, 1);
INSERT INTO `dish` VALUES (64, '馋嘴牛蛙', 17, 88.00, 'http://localhost:8080/static/image/e2486946-da90-4eae-a43b-abe9338cc918.png', '配料：鲜活牛蛙，丝瓜，黄豆芽', 1, '2022-06-10 10:37:52', '2024-10-10 22:22:22', 1, 1);
INSERT INTO `dish` VALUES (65, '草鱼2斤', 16, 68.00, 'http://localhost:8080/static/image/63658914-9d4d-4409-b1aa-b131d47d415f.png', '原料：草鱼，黄豆芽，莲藕', 1, '2022-06-10 10:41:08', '2024-10-10 22:20:43', 1, 1);
INSERT INTO `dish` VALUES (66, '江团鱼2斤', 16, 119.00, 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', '配料：江团鱼，黄豆芽，莲藕', 1, '2022-06-10 10:42:42', '2024-11-02 15:04:37', 1, 1);
INSERT INTO `dish` VALUES (67, '鮰鱼2斤', 16, 72.00, 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', '原料：鮰鱼，黄豆芽，莲藕', 1, '2022-06-10 10:43:56', '2024-06-24 13:19:47', 1, 1);
INSERT INTO `dish` VALUES (68, '鸡蛋汤', 21, 4.00, 'http://localhost:8080/static/image/a87cd2db-6a3e-49d2-891b-45600298fec2.png', '配料：鸡蛋，紫菜', 1, '2022-06-10 10:54:25', '2024-10-10 22:19:22', 1, 1);
INSERT INTO `dish` VALUES (69, '平菇豆腐汤', 21, 6.00, 'http://localhost:8080/static/image/3462e218-3c82-41f8-99c4-d2b714751c92.png', '配料：豆腐，平菇', 1, '2022-06-10 10:55:02', '2024-08-20 08:49:25', 1, 1);
INSERT INTO `dish` VALUES (82, '111', 16, 1111.00, 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', '啊啊', 1, '2024-10-28 19:21:43', '2024-11-01 22:15:14', 1, 1);
INSERT INTO `dish` VALUES (83, '1111', 16, 111.00, 'http://localhost:8080/static/image/5450031d-1f15-44aa-b0fd-faeb84658b64..png', '1111', 0, '2024-10-28 19:42:50', '2024-10-28 19:42:50', 1, 1);

-- ----------------------------
-- Table structure for dish_flavor
-- ----------------------------
DROP TABLE IF EXISTS `dish_flavor`;
CREATE TABLE `dish_flavor`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dish_id` bigint(0) NOT NULL COMMENT '菜品',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '口味名称',
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '口味数据list',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 134 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '菜品口味关系表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dish_flavor
-- ----------------------------
INSERT INTO `dish_flavor` VALUES (40, 10, '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES (41, 7, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (42, 7, '温度', '[\"热饮\",\"常温\",\"去冰\",\"少冰\",\"多冰\"]');
INSERT INTO `dish_flavor` VALUES (45, 6, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (46, 6, '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES (47, 5, '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES (48, 5, '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES (49, 2, '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES (50, 4, '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES (51, 3, '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES (52, 3, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (108, 67, '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES (111, 66, '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES (112, 65, '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES (113, 60, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (115, 56, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (116, 57, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (117, 54, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\"]');
INSERT INTO `dish_flavor` VALUES (120, 52, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (121, 52, '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES (124, 53, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (125, 53, '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES (126, 51, '忌口', '[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]');
INSERT INTO `dish_flavor` VALUES (127, 51, '辣度', '[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]');
INSERT INTO `dish_flavor` VALUES (131, 82, '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');
INSERT INTO `dish_flavor` VALUES (132, 82, '温度', '[\"热饮\",\"常温\",\"去冰\",\"少冰\",\"多冰\"]');
INSERT INTO `dish_flavor` VALUES (133, 83, '甜味', '[\"无糖\",\"少糖\",\"半糖\",\"多糖\",\"全糖\"]');

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '姓名',
  `username` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '用户名',
  `password` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '密码',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '手机号',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '性别',
  `id_number` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '身份证号',
  `status` int(0) NOT NULL DEFAULT 1 COMMENT '状态 0:禁用，1:启用',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint(0) NULL DEFAULT NULL COMMENT '创建人',
  `update_user` bigint(0) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '员工信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES (1, '管理员', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '13812312312', '1', '110101199001010047', 1, '2022-02-15 15:51:20', '2024-10-23 22:51:01', 10, 1);
INSERT INTO `employee` VALUES (11, 'assaaaaaazz', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', '18846056898', '1', '410727200406172314', 1, '2024-10-15 22:38:48', '2024-10-25 23:00:42', 10, 1);
INSERT INTO `employee` VALUES (19, 'aaa', 'asda', 'e10adc3949ba59abbe56e057f20f883e', '1111', '1', '1234', 1, '2024-10-16 18:55:56', '2024-10-26 21:28:41', 10, 1);
INSERT INTO `employee` VALUES (52, 'aaaa', 'aaa', 'e10adc3949ba59abbe56e057f20f883e', '18846056898', '1', '410727200406172314', 1, '2024-10-16 19:42:12', '2024-10-26 21:29:02', 1, 1);

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '名字',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '图片',
  `order_id` bigint(0) NOT NULL COMMENT '订单id',
  `dish_id` bigint(0) NULL DEFAULT NULL COMMENT '菜品id',
  `setmeal_id` bigint(0) NULL DEFAULT NULL COMMENT '套餐id',
  `dish_flavor` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '口味',
  `number` int(0) NOT NULL DEFAULT 1 COMMENT '数量',
  `amount` decimal(10, 2) NOT NULL COMMENT '金额',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '订单明细表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_detail
-- ----------------------------
INSERT INTO `order_detail` VALUES (20, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 13, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_detail` VALUES (21, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 14, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_detail` VALUES (22, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 15, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_detail` VALUES (23, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 16, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_detail` VALUES (24, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 17, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_detail` VALUES (25, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 18, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_detail` VALUES (26, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 19, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_detail` VALUES (27, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 20, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_detail` VALUES (28, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 20, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_detail` VALUES (29, '江团鱼2斤', 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', 20, 66, NULL, '不辣', 1, 119.00);
INSERT INTO `order_detail` VALUES (30, '馒头', 'http://localhost:8080/static/image/8658a618-4235-4368-a4e1-ada09571dd21.png', 20, 50, NULL, NULL, 1, 1.00);
INSERT INTO `order_detail` VALUES (31, '米饭', 'http://localhost:8080/static/image/ad443635-39e9-4fe7-9e9d-da42ba01337f.png', 20, 49, NULL, NULL, 1, 2.00);
INSERT INTO `order_detail` VALUES (32, '111', 'http://localhost:8080/static/image/369b532e-60db-4be7-88ed-ca40bbd6239f..png', 21, 82, NULL, '无糖,热饮', 1, 1111.00);
INSERT INTO `order_detail` VALUES (33, '鮰鱼2斤', 'http://localhost:8080/static/image/6226c7d9-1baa-4e6a-b5f2-996e21ab1afd.png', 21, 67, NULL, '不辣', 1, 72.00);
INSERT INTO `order_detail` VALUES (34, '江团鱼2斤', 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', 21, 66, NULL, '不辣', 1, 119.00);
INSERT INTO `order_detail` VALUES (35, '馒头', 'http://localhost:8080/static/image/8658a618-4235-4368-a4e1-ada09571dd21.png', 21, 50, NULL, NULL, 1, 1.00);
INSERT INTO `order_detail` VALUES (36, '米饭', 'http://localhost:8080/static/image/ad443635-39e9-4fe7-9e9d-da42ba01337f.png', 21, 49, NULL, NULL, 1, 2.00);
INSERT INTO `order_detail` VALUES (37, '江团鱼2斤', 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', 22, 66, NULL, '重辣', 1, 119.00);
INSERT INTO `order_detail` VALUES (38, '草鱼2斤', 'http://localhost:8080/static/image/63658914-9d4d-4409-b1aa-b131d47d415f.png', 22, 65, NULL, '不辣', 1, 68.00);
INSERT INTO `order_detail` VALUES (39, '江团鱼2斤', 'http://localhost:8080/static/image/b3b125ff-686d-476d-8af8-4d186b97d0a4.png', 23, 66, NULL, '重辣', 1, 119.00);
INSERT INTO `order_detail` VALUES (40, '草鱼2斤', 'http://localhost:8080/static/image/63658914-9d4d-4409-b1aa-b131d47d415f.png', 23, 65, NULL, '不辣', 1, 68.00);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `number` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '订单号',
  `status` int(0) NOT NULL DEFAULT 1 COMMENT '订单状态 1待付款 2待接单 3已接单 4派送中 5已完成 6已取消 7退款',
  `user_id` bigint(0) NOT NULL COMMENT '下单用户',
  `address_book_id` bigint(0) NOT NULL COMMENT '地址id',
  `order_time` datetime(0) NOT NULL COMMENT '下单时间',
  `checkout_time` datetime(0) NULL DEFAULT NULL COMMENT '结账时间',
  `pay_method` int(0) NOT NULL DEFAULT 1 COMMENT '支付方式 1微信,2支付宝',
  `pay_status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '支付状态 0未支付 1已支付 2退款',
  `amount` decimal(10, 2) NOT NULL COMMENT '实收金额',
  `remark` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '备注',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '手机号',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '地址',
  `user_name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '用户名称',
  `consignee` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '收货人',
  `cancel_reason` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '订单取消原因',
  `rejection_reason` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '订单拒绝原因',
  `cancel_time` datetime(0) NULL DEFAULT NULL COMMENT '订单取消时间',
  `estimated_delivery_time` datetime(0) NULL DEFAULT NULL COMMENT '预计送达时间',
  `delivery_status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '配送状态  1立即送出  0选择具体时间',
  `delivery_time` datetime(0) NULL DEFAULT NULL COMMENT '送达时间',
  `pack_amount` int(0) NULL DEFAULT NULL COMMENT '打包费',
  `tableware_number` int(0) NULL DEFAULT NULL COMMENT '餐具数量',
  `tableware_status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '餐具数量状态  1按餐量提供  0选择具体数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '订单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (13, '1732347842492', 1, 5, 4, '2024-11-23 15:44:02', NULL, 1, 0, 79.00, '', '18846056888', NULL, NULL, '李鹏杰', NULL, NULL, NULL, '2024-11-23 16:43:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (14, '1732348258377', 1, 5, 4, '2024-11-23 15:50:58', NULL, 1, 0, 79.00, '', '18846056888', NULL, NULL, '李鹏杰', NULL, NULL, NULL, '2024-11-23 16:50:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (15, '1732350806006', 1, 5, 5, '2024-11-23 16:33:26', NULL, 1, 0, 1118.00, '', '18888888888', NULL, NULL, '黎家鑫', NULL, NULL, NULL, '2024-11-23 17:33:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (16, '1732452885038', 6, 5, 4, '2024-11-24 20:54:45', NULL, 1, 0, 79.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', NULL, '李鹏杰', NULL, NULL, NULL, '2024-11-24 21:54:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (17, '1732455312896', 6, 5, 4, '2024-11-24 21:35:13', NULL, 1, 0, 1118.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', NULL, '李鹏杰', NULL, NULL, NULL, '2024-11-24 22:35:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (18, '1732458187417', 6, 5, 4, '2024-11-24 22:23:07', NULL, 1, 0, 1118.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', NULL, '李鹏杰', NULL, NULL, NULL, '2024-11-24 23:23:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (19, '1732943934521', 6, 5, 4, '2024-11-30 13:18:55', NULL, 1, 0, 79.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', NULL, '李鹏杰', NULL, NULL, NULL, '2024-11-30 14:18:00', 0, NULL, 1, 0, 0);
INSERT INTO `orders` VALUES (20, '1732943949503', 6, 5, 4, '2024-11-30 13:19:10', NULL, 1, 0, 1316.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', NULL, '李鹏杰', NULL, NULL, NULL, '2024-11-30 14:19:00', 0, NULL, 5, 0, 0);
INSERT INTO `orders` VALUES (21, '1732955370797', 6, 5, 4, '2024-11-30 16:29:31', NULL, 1, 2, 1316.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', NULL, '李鹏杰', '用户取消', NULL, '2024-11-30 16:44:02', '2024-11-30 17:29:00', 0, NULL, 5, 0, 0);
INSERT INTO `orders` VALUES (22, '1732956767447', 6, 5, 4, '2024-11-30 16:52:47', NULL, 1, 1, 195.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', NULL, '李鹏杰', '订单量较多，暂时无法接单', NULL, '2024-11-30 17:19:09', '2024-11-30 17:52:00', 0, NULL, 2, 0, 0);
INSERT INTO `orders` VALUES (23, '1732957848289', 6, 5, 4, '2024-11-30 17:10:48', NULL, 1, 2, 195.00, '', '18846056888', '黑龙江省哈尔滨市南岗区哈尔滨理工大学', NULL, '李鹏杰', NULL, '订单量较多，暂时无法接单', '2024-11-30 17:12:20', '2024-11-30 18:10:00', 0, NULL, 2, 0, 0);

-- ----------------------------
-- Table structure for setmeal
-- ----------------------------
DROP TABLE IF EXISTS `setmeal`;
CREATE TABLE `setmeal`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `category_id` bigint(0) NOT NULL COMMENT '菜品分类id',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '套餐名称',
  `price` decimal(10, 2) NOT NULL COMMENT '套餐价格',
  `status` int(0) NULL DEFAULT 1 COMMENT '售卖状态 0:停售 1:起售',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '描述信息',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '图片',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `create_user` bigint(0) NULL DEFAULT NULL COMMENT '创建人',
  `update_user` bigint(0) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_setmeal_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '套餐' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of setmeal
-- ----------------------------
INSERT INTO `setmeal` VALUES (37, 13, '超便宜', 50.00, 0, '啊啊啊', 'http://localhost:8080/static/image/051defa1-f607-4746-a36c-ee798e68a60e..png', '2024-11-02 11:54:10', '2024-11-02 15:17:57', 1, 1);
INSERT INTO `setmeal` VALUES (38, 13, '啊啊啊', 1111.00, 1, '啊啊啊', 'http://localhost:8080/static/image/7278507b-8f9c-4c13-8a81-c904ffff91a0..png', '2024-11-02 11:56:22', '2024-11-02 15:18:07', 1, 1);

-- ----------------------------
-- Table structure for setmeal_dish
-- ----------------------------
DROP TABLE IF EXISTS `setmeal_dish`;
CREATE TABLE `setmeal_dish`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `setmeal_id` bigint(0) NULL DEFAULT NULL COMMENT '套餐id',
  `dish_id` bigint(0) NULL DEFAULT NULL COMMENT '菜品id',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '菜品名称 （冗余字段）',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '菜品单价（冗余字段）',
  `copies` int(0) NULL DEFAULT NULL COMMENT '菜品份数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 95 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '套餐菜品关系' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of setmeal_dish
-- ----------------------------
INSERT INTO `setmeal_dish` VALUES (82, 38, 66, '江团鱼2斤', 119.00, 1);
INSERT INTO `setmeal_dish` VALUES (83, 38, 67, '鮰鱼2斤', 72.00, 1);
INSERT INTO `setmeal_dish` VALUES (84, 38, 67, '鮰鱼2斤', 72.00, 1);
INSERT INTO `setmeal_dish` VALUES (92, NULL, 66, '江团鱼2斤', 119.00, 1);
INSERT INTO `setmeal_dish` VALUES (93, NULL, 65, '草鱼2斤', 68.00, 1);
INSERT INTO `setmeal_dish` VALUES (94, NULL, 65, '草鱼2斤', 68.00, 1);
INSERT INTO `setmeal_dish` VALUES (95, NULL, 66, '江团鱼2斤', 119.00, 1);

-- ----------------------------
-- Table structure for shopping_cart
-- ----------------------------
DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE `shopping_cart`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '商品名称',
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '图片',
  `user_id` bigint(0) NOT NULL COMMENT '主键',
  `dish_id` bigint(0) NULL DEFAULT NULL COMMENT '菜品id',
  `setmeal_id` bigint(0) NULL DEFAULT NULL COMMENT '套餐id',
  `dish_flavor` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '口味',
  `number` int(0) NOT NULL DEFAULT 1 COMMENT '数量',
  `amount` decimal(10, 2) NOT NULL COMMENT '金额',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 99 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '购物车' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shopping_cart
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `openid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '微信用户唯一标识',
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '手机号',
  `sex` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '性别',
  `id_number` varchar(18) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '身份证号',
  `avatar` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT '头像',
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '用户信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (5, 'ozzft6374zaRmA9Jwqx4QXhysZvA', NULL, NULL, NULL, NULL, NULL, '2024-11-18 21:33:52');

SET FOREIGN_KEY_CHECKS = 1;
