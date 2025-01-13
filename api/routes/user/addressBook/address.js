const express = require("express")
const { failure, success } = require('@utils/responses')
const { AddressBook } = require('@models')

const router = express.Router()


/**
 * @description 查询当前登录用户的所有地址信息
 */
router.get('/list', async (req, res) => {
  try {
    const userId = req.id
    const addressList = await AddressBook.findAll({
      where: {
        userId
      }
    })

    return res.json({
      code: 1,
      data: addressList,
      msg: "查询成功",
    })


  } catch (e) {
    failure(res, e)
  }

})


/**
 * @description 设置默认地址 
 */
router.put('/default', async (req, res) => {
  try {
    //取消原来默认地址
    await AddressBook.update({ isDefault: 0 }, { where: { isDefault: 1, userId: req.id } })
    //设置新默认地址
    await AddressBook.update({ isDefault: 1 }, { where: { id: req.body.id, userId: req.id } })
    return res.json({
      code: 1,
      msg: "设置成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 获取默认地址
 */
router.get('/default', async (req, res) => {
  try {
    const address = await AddressBook.findOne({
      where: {
        user_id: req.id,
        is_default: 1
      },
      attributes: [
        'id', ['user_id', 'userId'],
        'consignee', 'phone', 'sex',
        ['province_code', 'provinceCode'],
        ['province_name', 'provinceName'],
        ['city_code', 'cityCode'],
        ['city_name', 'cityName'],
        ['district_name', 'districtName'],
        ['district_code', 'districtCode'],
        'detail', 'label',
        ['is_default', 'isDefault']],
    })
    return res.json({
      code: 1,
      data: address,
      msg: "查询成功",
    })
  } catch (e) {
    failure(res, e)
  }
})
/**
 * @description 新增地址
 */
router.post('/', async (req, res) => {
  try {
    const { name, phone, type, sex,
      provinceCode, provinceName, cityCode,
      cityName, districtCode, districtName,
      detail, label, consignee } = req.body
    await AddressBook.create({
      name, phone, type, sex,
      provinceCode, provinceName, cityCode,
      cityName, districtCode, districtName,
      detail, label, consignee,
      userId: req.id
    })

    return res.json({
      code: 1,
      msg: "添加成功",
    })
  } catch (e) {
    failure(res, e)
  }
})
/**
 * @description 根据id修改地址
 * @param {number} id
 */
router.put('/', async (req, res) => {
  try {
    const { name, phone, type, sex,
      provinceCode: province_code, provinceName: province_name, cityCode: city_code,
      cityName: city_name, districtCode: district_code, districtName: district_name,
      detail, label, consignee } = req.body
    await AddressBook.update({
      name, phone, type, sex,
      province_code, province_name, city_code,
      city_name, district_code, district_name,
      detail, label, consignee
    }, { where: { id: req.body.id } })

    return res.json({
      code: 1,
      msg: "修改成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 根据id查询地址
 * @param {number} id
 */
router.get('/:id', async (req, res) => {
  try {
    const address = await AddressBook.findByPk(req.params.id, {
      attributes: [
        'id', ['user_id', 'userId'],
        'consignee', 'phone', 'sex',
        ['province_code', 'provinceCode'],
        ['province_name', 'provinceName'],
        ['city_code', 'cityCode'],
        ['city_name', 'cityName'],
        ['district_name', 'districtName'],
        ['district_code', 'districtCode'],
        'detail', 'label',
        ['is_default', 'isDefault']],
    })
    return res.json({
      code: 1,
      data: address,
      msg: "查询成功",
    })
  } catch (e) {
    failure(res, e)
  }
})

/**
 * @description 根据id删除地址
 */
router.delete('/', async (req, res) => {
  try {
    await AddressBook.destroy({ where: { id: req.body.id } })
    return res.json({
      code: 1,
      msg: "删除成功",
    })
  } catch (e) {
    failure(res, e)
  }
})



module.exports = router