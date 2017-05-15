/**
 * Created by sam on 2017/5/11.
 */

var express = require('express')
var router = express.Router()

var User = require('../models/User')
var Category = require('../models/Category')

router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin){
        res.send("权限不够，只有管理员才能进入")
        return
    }else{
        next()
    }
})
/*
*  首页
* */
router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    })
})

/*
* 用户管理
* */

router.get('/user', function (req, res, next) {

    /*
    * 从数据库中读取所有的用户数据，渲染到页面
    * limit(Number),限制获取的数据条数
    * skip(2):忽略数据条数
    * */

    var page = Number(req.query.page || 1)
    var limit = 3
    //计算出总的页数
    var pages = 0

    User.count().then(function (count) {

        pages = Math.ceil(count/limit)
        //取值不能超过pages
        page = Math.min(page, pages)
        //取值不能小于1
        page = Math.max(page,1)

        var skip = (page-1)*limit

        User.find().limit(limit).skip(skip).then(function (users) {
            // console.log(users)
            res.render('admin/user_index',{
                userInfo: req.userInfo,
                users: users,

                page: page,
                count: count,
                pages: pages,
                limit: limit
            })
        })
    })


})

/*
 * 分类管理首页
 * */

router.get('/category', function (req, res) {


    var page = Number(req.query.page || 1)
    var limit = 3
    //计算出总的页数
    var pages = 0

    Category.count().then(function (count) {

        pages = Math.ceil(count/limit)
        //取值不能超过pages
        page = Math.min(page, pages)
        //取值不能小于1
        page = Math.max(page,1)

        var skip = (page-1)*limit

        Category.find().limit(limit).skip(skip).then(function (categories) {
            // console.log(users)
            res.render('admin/category_index',{
                userInfo: req.userInfo,
                categories: categories,

                page: page,
                count: count,
                pages: pages,
                limit: limit
            })
        })
    })
})

/*
 * 添加分类
 * */

router.get('/category/add', function (req, res, next) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
})

/*
* 分类的保存
* */
router.post('/category/add', function (req, res, next) {

    console.log(req.body)

    var name = req.body.name || ''
    if(name == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message:'名称不能为空'
        })
        return
    }

    Category.findOne({
        name:name
    }).then(function (rs) {
        if(rs){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message:'分类已经存在了'
            })
            return Promise.reject()
        }else{
            return new Category({
                name: name
            }).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message:'分类保存成功',
            url:'/admin/category'
        })
    })
})


/*
* 分类编辑
* */
router.get('/category/edit', function (req, res) {

    var id = req.query.id || ''

    //获取要修改的分类信息
    Category.findOne({
        id:id
    }).then(function (category) {
        console.log(category)
        if (category){
            res.render('admin/error', {
                userInfo: res.userInfo,
                message:'分类信息不存在'
            })
        }else {
            res.render('admin/category_edit', {
                userInfo: res.userInfo,
                category:category
            })
        }
    })
})

/*
 * 分类删除
 * */
router.get('/category/delete', function (req, res) {

})

module.exports = router