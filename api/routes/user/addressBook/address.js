const express = require("express")
const { failure, success } = require('@utils/responses')
const addressBook = require('@models/address_book')

const router = express.Router()


/**
 * @description 查询当前登录用户的所有地址信息
 */
router.get('/list', async (req, res) => {
  try {
    const userid = req.id
    const addressList = await addressBook.findAll({
      where: {
        user_id: userid
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
    const addressid = req.body.id

    //取消原来默认地址
    await addressBook.update({ is_default: 0 }, { where: { is_default: 1, user_id: req.id } })
    //设置新默认地址
    await addressBook.update({ is_default: 1 }, { where: { id: addressid, user_id: req.id } })
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
    const address = await addressBook.findOne({
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
      provinceCode: province_code, provinceName: province_name, cityCode: city_code,
      cityName: city_name, districtCode: district_code, districtName: district_name,
      detail, label, consignee } = req.body
    await addressBook.create({
      user_id: req.id,
      name, phone, type, sex,
      province_code, province_name, city_code,
      city_name, district_code, district_name,
      detail, label, consignee
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
    await addressBook.update({
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
    const address = await addressBook.findByPk(req.params.id, {
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
    await addressBook.destroy({ where: { id: req.body.id } })
    return res.json({
      code: 1,
      msg: "删除成功",
    })
  } catch (e) {
    failure(res, e)
  }
})



module.exports = router