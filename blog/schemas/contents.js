/**
 * Created by sam on 2017/5/11.
 */

//数据库结构文件目录

var mongoose = require('mongoose')

//分类的表结构
module.exports = new mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    //内容标题
    title: String,
    //内容简介
    description:{
        type:String,
        default:''
    },
    //内容正文
    content:{
        type:String,
        default:''
    }
})
