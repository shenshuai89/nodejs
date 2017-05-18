/**
 * Created by sam on 2017/5/11.
 */

var express = require('express')
var router = express.Router()
var User = require('../models/User')
var Content = require('../models/Content')

//统一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})

//注册
router.post('/user/register', function (req, res, next) {
    //res.send('API -User')

    //打印客户端输入的数据
    console.log(req.body)  //{code: 0, message: "登录成功", userInfo: {_id: "5915489d27bcbb3100482d70", username: "test"}}

    var username = req.body.username;
    var password = req.body.password;
    var againpassword = req.body.againpassword;

    if (username == ''){
        responseData.code = 1
        responseData.message = "用户名不能为空"
        res.json(responseData)
        return
    }

    if (password == ''){
        responseData.code = 2
        responseData.message = "密码不能为空"
        res.json(responseData)
        return
    }

    if (password != againpassword ){
        responseData.code = 3
        responseData.message = "两次输入密码不一致"
        res.json(responseData)
        return
    }

    //用户名是否被注册，如果数据库中已经存在和我们要注册的用户名同名的数据，说明已经被注册
    User.findOne({
        username:username
    }).then(function (userInfo) {
        // console.log(userInfo)  显示数据库的信息
        if (userInfo){
            //如果userInfo存在，表示数据库中存在该条数据
            responseData.code = 4
            responseData.message = "用户名已经被注册"
            res.json(responseData)
            return
        }

        //保存用户注册的信息到数据库中
        var user = new User({
            username : username,
            password : password
        })
        return user.save()

    }).then(function (newUserInfo) {
        responseData.message = "注册成功"
        res.json(responseData)
    })

})

//登录
router.post('/user/login',function (req, res) {
    //获取到客户端输入的数据
    var username = req.body.username,
        password = req.body.password
    if(username ==' ' || password==''){
        responseData.code = 1
        responseData.message = "用户名和密码不能为空"
        res.json(responseData)
        return
    }

    //查询数据库中用户名和密码是否存在，如果存在则登录成功
    User.findOne({
        username:username,
        password:password
    }).then(function (userInfo ) {
        if(!userInfo){
            responseData.code = 2
            responseData.message = "用户名或密码错误"
            res.json(responseData)
            return
        }
        responseData.message = "登录成功"
        responseData.userInfo = {
            _id : userInfo._id,
            username: userInfo.username
        }

        req.cookies.set('userInfo', JSON.stringify({
            _id : userInfo._id,
            username : userInfo.username
        }))

        res.json(responseData)
        return
    })
})

/*
* 退出
* */
router.get('/user/logout', function (req, res) {
    //退出，就把cookies信息给清除掉了
    req.cookies.set('userInfo', null)
    res.json(responseData)
})

//评论的提交
router.post('/comment/post', function (req, res) {
    //内容的ID
    var contentId = req.body.contentid || ''

    var postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content
    }

    //查询当前这篇文章的信息
    Content.findOne({
        _id: contentId
    }).then(function (content) {
        content.comments.push(postData)
        return content.save()
    }).then(function (newContent) {
        responseData.message = '评论成功'
        responseData.data = newContent
        res.json(responseData)
    })
})

module.exports = router