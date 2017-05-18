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
    // 关联字段-用户ID
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //添加时间
    addTime:{
        type:Date,
        default:new Date()
    },
    //阅读量
    views:{
        type:Number,
        default:0
    },
    //内容简介
    description:{
        type:String,
        default:''
    },
    //内容正文
    content:{
        type:String,
        default:''
    },
    //评论
    comments:{
        type:Array,
        default:[]
    }
})
