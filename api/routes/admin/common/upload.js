const express = require("express")
const router = express.Router()
const path = require('path')
const upload = require('@utils/upload')
const { failure, success } = require('@utils/responses')
/**
 * @description 上传图片
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  const { path: newpath } = req.file
  const fileRath = process.env.UPLOAD_URL + path.basename(newpath)
  return success(res, "上传成功", fileRath)
})

module.exports = router