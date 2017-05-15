/**
 * Created by sam on 2017/5/11.
 */

//数据库模型文件目录

var mongoose = require('mongoose')
var categoriesSchema = require('../schemas/categories')

module.exports = mongoose.model('Category', categoriesSchema)