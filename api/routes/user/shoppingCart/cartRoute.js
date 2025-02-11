const express = require("express")
const { failure, success } = require('@utils/responses')
const { ShoppingCart, Dish, Setmeal } = require('@models')
const redis = require('@utils/redis')
const router = express.Router()

/**
 * @description 添加购物车
 */
router.post('/add', async (req, res) => {
  try {
    const { dishFlavor, dishId, setmealId } = req.body
    const userId = req.id;
    const redisKey = `cart:${userId}`;
    if (dishId) {
      await addItemToCart('dish', userId, dishId, dishFlavor, redisKey);
    } else if (setmealId) {
      await addItemToCart('setmeal', userId, setmealId, null, redisKey);
    }

    // 设置Redis键过期时间（7天）
    await redis.expire(redisKey, 604800);

    return res.json({
      code: 1,
      msg: "添加成功",
    });
  } catch (e) {
    failure(res, e);
  }
});

/**
 * @description 查看购物车
 */
router.get('/list', async (req, res) => {
  try {
    const userId = req.id
    const redisKey = `cart:${userId}`
    const redisData = await redis.hgetall(redisKey)
    let resultData
    if (Object.keys(redisData).length === 0) {
      resultData = await ShoppingCart.findAll({
      where: {
          userId
        },
        raw: true
      })
    } else {
      resultData = Object.values(redisData).map(item =>
        JSON.parse(item));
    }

    return success(res, "查询成功", resultData)
  } catch (e) {
    failure(res, e)
  }
})


/**
 * @description 清空购物车
 */
router.delete('/clean', async (req, res) => {
  try {
    const userId = req.id
    await ShoppingCart.destroy({
      where: {
        userId: req.id
      }
    })
    await redis.del(`cart:${userId}`)
    return success(res, "清空成功")
  } catch (e) {
    failure(res, e)
  }

})

/**
 * @description 删除购物车中一个商品
 */
router.post('/sub', async (req, res) => {
  try {
    const { dishFlavor, dishId, setmealId } = req.body
    const userId = req.id
    const redisKey = `cart:${userId}`
    if (dishId) {
      await subItemToCart('dish', userId, dishId, dishFlavor, redisKey)
    }
    else if (setmealId) {
      await subItemToCart('setmeal', userId, setmealId, null, redisKey)
    }
    return success(res, "删除成功")
  } catch (e) {
    failure(res, e)
  }
})


async function addItemToCart (type, userId, id, flavor, redisKey) {
  try {
    // 参数校验
    if (!['dish', 'setmeal'].includes(type)) {
      throw new Error('无效的商品类型');
    }
    if (!userId || !id) {
      throw new Error('用户ID和商品ID不能为空');
    }

    const field = `${type}_${id}${flavor ? `_${flavor}` : ''}`;

    // 检查是否已存在相同商品
    const existingItem = await ShoppingCart.findOne({
      where: {
        userId,
        [type === 'dish' ? 'dishId' : 'setmealId']: id,
        dishFlavor: flavor || null
      }
    });

    if (existingItem) {
      // 存在 → 更新数量
      await existingItem.increment('number', { by: 1 });
      existingItem.number += 1;
      await redis.hset(
        redisKey,
        field,
        JSON.stringify({ ...existingItem.toJSON(), type })
      );
    } else {
      // 不存在 → 创建新记录
      const model = type === 'dish' ? Dish : Setmeal;
      const data = await model.findOne({
        attributes: ['image', 'name', 'price'],
        where: { id }
      });

      if (!data) {
        throw new Error('商品不存在或已被删除');
      }

      const newItem = {
        name: data.name,
        image: data.image,
        dishFlavor: flavor || null,
        [type === 'dish' ? 'dishId' : 'setmealId']: id,
        userId,
        amount: data.price,
        number: 1
      };

      const createdItem = await ShoppingCart.create(newItem);

      await redis.hset(
        redisKey,
        field,
        JSON.stringify({ ...createdItem.toJSON(), type })
      );
    }
  } catch (e) {
    console.error('添加商品到购物车失败:', e);
    failure(res, e)
  }
};

async function subItemToCart (type, userId, id, flavor, redisKey) {
  const field = `${type}_${id}${flavor ? `_${flavor}` : ''}`;

  const existingItem = await ShoppingCart.findOne({
    where: {
      userId,
      [type === 'dish' ? 'dishId' : 'setmealId']: id,
      dishFlavor: flavor || null
    }
  });
  if (existingItem) {
    // 如果存在，更新数量
    if (existingItem.number === 1) {
      await existingItem.destroy();
      await redis.hdel(redisKey, field);
      }
      else {
      await existingItem.decrement('number', { by: 1 });
      existingItem.number -= 1
      await redis.hset(redisKey, field, JSON.stringify({ ...existingItem.toJSON(), type }));
      }
  }
}

module.exports = router