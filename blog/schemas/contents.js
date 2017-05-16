/**
 * Created by sam on 2017/5/16.
 */

var mongoose = require('mongoose')

// 内容的表结构
module.exports = new mongoose.Schema({
    // 关联字段 - 分类的ID
    category:{
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category'
    },
    // 分类标题
    title: String,
    // 简介
    description:{
        type:String,
        default: ''
    },
    // 内容
    content:{
        type:String,
        default: ''
    }
})
