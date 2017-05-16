/**
 * Created by sam on 2017/5/11.
 */

var express = require('express')
var router = express.Router()

var User = require('../models/User')
var Category = require('../models/Category')
var Content = require('../models/Content')

router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        res.send("权限不够，只有管理员才能进入")
        return
    } else {
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

        pages = Math.ceil(count / limit)
        //取值不能超过pages
        page = Math.min(page, pages)
        //取值不能小于1
        page = Math.max(page, 1)

        var skip = (page - 1) * limit

        User.find().limit(limit).skip(skip).then(function (users) {
            // console.log(users)
            res.render('admin/user_index', {
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
    var limit = 5
    //计算出总的页数
    var pages = 0

    Category.count().then(function (count) {

        pages = Math.ceil(count / limit)
        //取值不能超过pages
        page = Math.min(page, pages)
        //取值不能小于1
        page = Math.max(page, 1)

        var skip = (page - 1) * limit

        Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function (categories) {
            // console.log(users)
            res.render('admin/category_index', {
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

    // console.log(req.body)

    var name = req.body.name || ''
    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        })
        return
    }

    Category.findOne({
        name: name
    }).then(function (rs) {
        if (rs) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类已经存在了'
            })
            return Promise.reject()
        } else {
            return new Category({
                name: name
            }).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        })
    })
})


/*
 * 分类编辑
 * */
router.get('/category/edit', function (req, res) {

    var id = req.query.id || ''

    //获取要修改的分类信息,通过Id进行查询。用表单的形式展现出来
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            })
        }
    })
})
/*
 * 分类修改保存
 * */
router.post('/category/edit', function (req, res) {
    //获取要修改的分类信息
    var id = req.query.id || ''
    var name = req.body.name || ''

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
            return Promise.reject()
        } else {
            //第一种情况，当用户没有做任何修改的时候，进行提交
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                })
                return Promise.reject()
            } else {
                //第二种情况，被修改的分类名称是否在数据库已经存在
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                })
            }

        }
    }).then(function (sameCategory) {
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中已经存在同名分类'
            })
            return Promise.reject()
        } else {
            return Category.update({
                _id: id
            }, {
                name: name
            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        })
    })
})

/*
 * 分类删除
 * */
router.get('/category/delete', function (req, res) {

    //获取要删除的分类ID
    var id = req.query.id || ''
    Category.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        })
    })
})


// 内容首页
router.get('/content', function (req, res) {


    var page = Number(req.query.page || 1)
    var limit = 5
    //计算出总的页数
    var pages = 0

    Content.count().then(function (count) {

        pages = Math.ceil(count / limit)
        //取值不能超过pages
        page = Math.min(page, pages)
        //取值不能小于1
        page = Math.max(page, 1)

        var skip = (page - 1) * limit

        Content.find().sort({_id: -1}).limit(limit).skip(skip).populate('category').then(function (contents) {
            // console.log(users)
            //console.log(contents)
            res.render('admin/content_index', {
                userInfo: req.userInfo,
                contents: contents,

                page: page,
                count: count,
                pages: pages,
                limit: limit
            })
        })
    })
})

// 添加内容页面
router.get('/content/add', function (req, res) {
    Category.find().sort({_id:-1}).then(function (categories) {
        //console.log(categories)
        res.render('admin/content_add', {
            userInfo: req.userInfo,
            categories: categories
        })
    })

})

// 内容保存
router.post('/content/add', function (req, res) {
    // console.log(req.body)

    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return
    }

    //保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).save().then(function (rs) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    })
})

//修改内容
router.get('/content/edit', function (req, res) {

    var id = req.query.id || ''
    var categories = []

    Category.find().sort({_id: -1}).then(function (rs) {

        categories = rs

        return Content.findOne({
            _id: id
        }).populate('category')
    }).then(function (content) {
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '指定的内容不存在'
            })
            return Promise.reject()
        } else {
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                categories: categories,
                content: content
            })
        }
    })
})

// 保存修改内容
router.post('/content/edit', function (req, res) {
    var id = req.query.id || ''

    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return
    }

    Content.update({
        _id: id
    }, {
        category: req.body.category,
        title:req.body.title,
        description:req.body.description,
        content: req.body.content
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message :'内容保存成功',
            url:'/admin/content/edit?id=' + id
        })
    })
})

//  内容删除
router.get('/content/delete', function (req, res) {
    var id = req.query.id || ''
    Content.remove({
        _id:id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url:'/admin/category'
        })
    })
})


module.exports = router