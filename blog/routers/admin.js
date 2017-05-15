/**
 * Created by sam on 2017/5/11.
 */

var express = require('express')
var router = express.Router()

var User = require('../models/User')
var Category = require('../models/Category')

router.use(function (req, res, next) {
    if(!req.userInfo.isAdmin){
        res.send("权限不够，只有管理员才可以进入后台管理")
        return
    }
    next()
})

/*
* 后台管理首页
* */
router.get('/', function (req, res, next) {
    res.render('admin/index',{
        userInfo: req.userInfo
    })
})

/*
* 用户管理
* */
router.get('/user', function (req, res) {
    /*
    * 从数据库中读取所有的用户数据
    * limit(num),限制获取数据的条数
    * skip(num),忽略数据的条数
    * */
    var page = Number(req.query.page || 1)
    var limit = 2
    var pages = 0;  //总页数

    User.count().then(function (count){
        pages = Math.ceil( count/limit )
        page = Math.min(page, pages)    //取值不能超过总页数pages
        page = Math.max(page, 1)        //取值不能小于1
        var skip = (page - 1)*limit

        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo:req.userInfo,
                users: users,

                page:page,
                limit:limit,
                count:count,
                pages:pages
            })
        })
    })

})

/*
* 分类首页
* */
router.get('/category', function (req, res) {
    /*res.render('admin/category_index',{
        userInfo: req.userInfo
    })*/

    var page = Number(req.query.page || 1)
    var limit = 2
    var pages = 0;  //总页数

    Category.count().then(function (count){
        pages = Math.ceil( count/limit )
        page = Math.min(page, pages)    //取值不能超过总页数pages
        page = Math.max(page, 1)        //取值不能小于1
        var skip = (page - 1)*limit

        Category.find().limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category_index', {
                userInfo:req.userInfo,
                categories: categories,

                page:page,
                limit:limit,
                count:count,
                pages:pages
            })
        })
    })

})
/*
* 分类的添加
* */
router.get('/category/add', function (req, res) {
    res.render('admin/category_add',{
        userInfo: req.userInfo
    })
})
/*
 * 分类的保存
 * */
router.post('/category/add', function (req, res) {
    var name = req.body.name || ''
    if(name == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message:'名称不能为空'
        })
        return
    }
    //数据库中是否已经存在同名分类名称
    Category.findOne({
        name:name
    }).then(function (rs) {
        if(rs){
            //如果成立，说明数据库中已经存在该分类名称
            res.render('admin/error',{
                userInfo: req.userInfo,
                message:'名称已经存在'
            })
            return Promise.reject()
        }else {
            return new Category({
                name:name
            }).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '保存分类信息数据成功',
            url:'/admin/category'
        });
    })

})


/*
* 分类的修改
* */
router.get('/category/edit', function (req, res) {
    var id = req.query.id || ''
    Category.findOne({
        _id:id
    }).then(function (category) {
        if(!category){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
        }else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            })
        }
    })
})
/*
 * 分类的修改保存
 * */
router.post('/category/edit', function (req, res) {
    //获取要修改的分类信息，并且用表单的形式展现出来
    var id = req.query.id || ''
    //获取post提交过来的名称
    var name = req.body.name || ''

    Category.findOne({
        _id:id
    }).then(function (category) {
        if(!category){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
            return Promise.reject()
        }else {
            //当用户没有做任何的修改提交的时候
            if (name == category.name ){
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '分类信息修改成功',
                    url:'/admin/category'
                })
                return Promise.reject()
            }else{
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                })
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message:'数据库中已经存在同名分类'
            })
            return Promise.reject()
        }else {
            return Category.update({
                _id:id
            },{
                name:name
            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '分类信息修改成功',
            url:'/admin/category'
        })
    })
})

/*
 * 分类的删除
 * */
router.get('/category/delete', function (req, res) {
    //获取到要删除的分类的Id
    var id = req.query.id || ''

    Category.remove({
        _id:id
    }).then(function(){
        res.render('admin/success', {
        userInfo: req.userInfo,
        message: '删除成功',
        url:'/admin/category'
    })
    })
})


module.exports = router