const express = require("express")
const { failure, success } = require('@utils/responses')
const { ShoppingCart, Dish, Setmeal } = require('@models')
const router = express.Router()

/**
 * @description 添加购物车
 */
router.post('/add', async (req, res) => {
  try {
    const { dishFlavor, dishId, setmealId } = req.body
    //添加的是菜品
    if (!setmealId) {
      const dish = await ShoppingCart.findOne({
        where: {
          dishId,
          userId: req.id,
          dishFlavor
        }
      })
      if (dish) {
        await dish.increment({ number: 1 });
      } else {
        const dishData = await Dish.findOne({
          attributes: ['image', 'name', 'price'],
          where: {
            id: dishId
          }
        })
        await ShoppingCart.create({
          name: dishData.name,
          image: dishData.image,
          dishFlavor,
          userId: req.id,
          dishId,
          amount: dishData.price
        })
      }
    }
    else {
      const setmeal = await ShoppingCart.findOne({
        where: {
          setmealId,
          user_id: req.id
        }
      })
      if (setmeal) {
        await setmeal.increment({ number: 1 });
      } else {
        const setmealData = await Setmeal.findOne({
          attributes: ['image', 'name', 'price'],
          where: {
            id: setmealId
          }
        })
        await ShoppingCart.create({
          name: setmealData.name,
          image: setmealData.image,
          userId: req.id,
          setmealId,
          amount: setmealData.price
        })
      }
    }
    return res.json({
      code: 1,
      msg: "添加成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 查看购物车
 */
router.get('/list', async (req, res) => {
  try {
    const id = req.id
    const data = await ShoppingCart.findAll({
      where: {
        user_id: id
      }
    })

    return res.json({
      code: 1,
      data: data,
      msg: "查询成功",
    })
  } catch (e) {
    failure(res, e)
  }
})


/**
 * @description 清空购物车
 */
router.delete('/clean', async (req, res) => {
  try {
    await ShoppingCart.destroy({
      where: {
        userId: req.id
      }
    })
    return res.json({
      code: 1,
      msg: "清空成功",
    })
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
    //删除的是菜品
    if (!setmealId) {
      const dish = await ShoppingCart.findOne({
        where: {
          dishId,
          userId: req.id,
          dishFlavor
        }
      })
      if (!dish) { }
      else if (dish.number === 1) {
        await dish.destroy()
      }
      else {
        await dish.decrement({ number: 1 });
      }
    }
    else {
      const setmeal = await ShoppingCart.findOne({
        where: {
          setmealId,
          userId: req.id
        }
      })
      if (!setmeal) { }
      else if (setmeal.number === 1) {
        await setmeal.destroy()
      }
      else {
        await setmeal.decrement({ number: 1 });
      }
    }
    return res.json({
      code: 1,
      msg: "删除成功",
    })
  } catch (e) {
    failure(res, e)
  }
})
module.exports = router