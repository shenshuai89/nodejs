/**
 * Created by sam on 2017/5/11.
 */

var express = require('express')
var router = express.Router()

var Category = require('../models/Category')

router.get('/', function (req, res, next) {
    //res.send('首页')

    //console.log(req.userInfo)
    //读取所有的分类信息
    Category.find().then(function (categories) {
        res.render('main/index', {
            userInfo: req.userInfo,
            categories:categories
        })
    })


})

module.exports = router