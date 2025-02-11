const express = require("express")
const { Setmeal, Dish } = require('@models')
const { failure, success } = require('@utils/responses')
const redis = require('@utils/redis')
const router = express.Router()
/**
 * @description 条件查询
 */
router.get('/list', async (req, res) => {
  try {
    const { categoryId } = req.query

    // 参数校验
    if (!categoryId) {
      return failure(res, "缺少分类ID参数");
    }
    // 构造 Redis 缓存键
    const cacheKey = `setmeal:list:${categoryId}`;

    // 1. 先尝试从 Redis 读取缓存
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // 2. 缓存命中直接返回
      return success(res, "查询成功", JSON.parse(cachedData));
    }
    const resultData = await Setmeal.findAll({
      where: {
        category_id: categoryId
      },
      attributes: {
        include: [
          ['category_id', 'categoryId'],
          ['create_user', 'createUser'],
          ['update_user', 'updateUser'],
        ],
        exclude: ['category_id', 'create_user', 'update_user']
      }
    })
    await redis.setex(cacheKey, 3600, JSON.stringify(resultData));
    return success(res, "查询成功", resultData)
  } catch (e) {
    failure(res, e)
  }
})

/**
 * 根据套餐id查询包含的菜品
 */
router.get('/dish/:id', async (req, res) => {
  try {
    const { id } = req.params
    const list = await Setmeal.findByPk(id
      , {
        attributes: [],
      include: [
        {
          model: Dish,
          through: {
            attributes: ['copies']
          },
          attributes: ['image', 'name', 'description']
        }
        ],
    })

    const resultData = list.toJSON().dishes.map(item => {
      return {
        image: item.image,
        name: item.name,
        description: item.description,
        copies: item.setmeal_dish.copies
      }
    });

    return success(res, "查询成功", resultData)

  } catch (e) {
    failure(res, e)
  }
})

module.exports = router