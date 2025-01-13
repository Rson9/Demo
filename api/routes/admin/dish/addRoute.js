const express = require("express")
const { Op, Sequelize } = require('sequelize')
const { failure, success } = require('@utils/responses')
const { DishFlavor, Category, Dish } = require('@models')
const router = express.Router()
const upload = require('@utils/upload')
/**
 * @description 菜品分页查询
 */
router.get('/page', async (req, res) => {
  try {
    const query = req.query
    const currentPage = Math.abs(Number(query.page)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize
    const condition = {
      attributes: {
        include: [
          [Sequelize.col('Category.name'), 'categoryName'],
          [Sequelize.col('Category.id'), 'categoryId'],
        ],
        exclude: ['category_id']
      },
      offset: offset,
      limit: pageSize,
      include: [
        {
          model: Category,
          attributes: []
        }
      ],
      where: {}
    }
    if (query.name) {
      condition.where.name = {
        [Op.like]: `%${query.name}%`
      }
      condition.offset = 0
    }
    if (query.categoryId) {
      condition.where.category_id = {
        [Op.eq]: query.categoryId
      }
      condition.offset = 0
    }
    if (query.status) {
      condition.where.status = {
        [Op.eq]: query.status
      }
      condition.offset = 0
    }

    const { rows, count } = await Dish.findAndCountAll(condition)


    return res.json({
      code: 1,
      msg: "查询成功",
      data: {
        records: rows,
        total: count,
        currentPage,
        pageSize
      }
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 菜品起售、停售
 */
router.post('/status/:status', async (req, res) => {
  try {
    const { status } = req.params
    const { id } = req.query
    const user = await Dish.findByPk(id)
    await user.update({ status })
    return res.json({
      code: 1,
      msg: "修改成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 根据分类id查询菜品
 */

router.get('/list', async (req, res) => {
  try {
    const { categoryId } = req.query
    const dish = await Dish.findAll({
      where: {
        category_id: categoryId
      }
    })
    return res.json({
      code: 1,
      msg: "查询成功",
      data: dish
    })
  } catch (e) {
    failure(res, e)
  }

})

/**
 * @description 根据id查询菜品
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const dish = await Dish.findByPk(id, {
      attributes: {
        include: [
          [Sequelize.col('Category.name'), 'categoryName'],
        ],
        exclude: ['category_id']
      },
      include: [
        {
          model: DishFlavor,
          as: 'flavors',
          attributes: {
            exclude: ['dish_id']
          }
        },
        {
          model: Category,
          attributes: []
        }

      ]
    })
    return res.json({
      code: 1,
      msg: "查询成功",
      data: dish
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 菜品更新
 * 
 */
router.put('/', upload.single('image'), async (req, res) => {
  try {
    let { categoryId, description, flavors, id, image, name, price, status } = req.body
    //删除现有口味
    await DishFlavor.destroy({
      where: {
        dishId: id
      }
    })
    //添加新的口味
    const data = flavors.map(item => {
      return {
        dishId: id,
        name: item.name,
        value: item.value
      }
    })
    await DishFlavor.bulkCreate(data)


    //更新菜品本身
    const dish = await Dish.findByPk(id)
    await dish.update({
      categoryId,
      description,
      image,
      name,
      price,
      status
    })

    return res.json({
      code: 1,
      msg: "修改成功",
    })
  } catch (e) {
    failure(res, e)
  }

})

/**
 * @description 菜品新增
 */
router.post('/', async (req, res) => {
  try {
    const { categoryId, description, flavors, image, name, price, status } = req.body

    const dish = await Dish.create({
      categoryId,
      description,
      image,
      name,
      price,
      status
    })
    data = flavors.map(item => {
      return {
        dishId: dish.id,
        name: item.name,
        value: item.value
      }
    })
    //批量添加口味
    await DishFlavor.bulkCreate(data)

    return res.json({
      code: 1,
      msg: "添加成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 菜品删除
 */
router.delete('/', async (req, res) => {
  try {
    const ids = req.query.ids.split(',')
    if (!ids) {
      return res.json({
        code: 0,
        msg: "菜品未选择"
      })
    }
    await Dish.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
    return res.json({
      code: 1,
      msg: "删除成功",
    })
  } catch (e) {
    failure(res, e)
  }
})
module.exports = router