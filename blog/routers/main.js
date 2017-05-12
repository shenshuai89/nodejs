/**
 * Created by sam on 2017/5/11.
 */

var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
    //res.send('首页')

    //console.log(req.userInfo)

    res.render('main/index', {
        userInfo: req.userInfo
    })
})

module.exports = router