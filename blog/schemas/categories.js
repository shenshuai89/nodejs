/**
 * Created by sam on 2017/5/11.
 */

//数据库结构文件目录

var mongoose = require('mongoose')

//分类的表结构
var Schema = new mongoose.Schema({
    //分类名称
    name: String
})

module.exports = Schema
