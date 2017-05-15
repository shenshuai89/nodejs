/**
 * Created by sam on 2017/5/11.
 */

var mongoose = require('mongoose')

//用户的表结构
var Schema = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String,
    //是否是管理员
    isAdmin: {
        type:Boolean,
        default:false
    }
})

module.exports = Schema
