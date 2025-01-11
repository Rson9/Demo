const express = require("express")
const router = express.Router()
const path = require('path')
const upload = require('@utils/upload')
/**
 * @description 上传图片
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  const { path: newpath } = req.file
  const fileRath = 'http://localhost:8080/uploads/' + path.basename(newpath)
  return res.json({
    code: 1,
    msg: "上传成功",
    data: fileRath,
  })
})

module.exports = router