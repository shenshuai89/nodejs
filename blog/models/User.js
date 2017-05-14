/**
 * Created by sam on 2017/5/11.
 */

//数据库模型文件目录

var mongoose = require('mongoose')
var usersSchema = require('../schemas/users')

module.exports = mongoose.model('User', usersSchema)