const express = require("express")
const { failure, success } = require('@utils/responses')
const addressBook = require('@models/address_book')

const router = express.Router()


/**
 * @description 查询地址
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
 * @description 新增地址
 */
router.post('/', async (req, res) => {
  try {
    return res.json({
      code: 1,
      msg: "添加成功",
    })
  } catch (e) {
    failure(res, e)
  }
})
/**
 * @description 删除地址
 */
router.delete('/delete', async (req, res) => {
  try {
    return res.json({
      code: 1,
      msg: "删除成功",
    })
  } catch (e) {
    failure(res, e)
  }
})
/**
 * @description 修改地址
 */
router.put('/update', async (req, res) => {
  try {
    return res.json({
      code: 1,
      msg: "修改成功",
    })
  } catch (e) {
    failure(res, e)
  }
})


module.exports = router