/**
 * Created by sam on 2017/5/11.
 */

//加载express模块
var express = require('express')

//加载模板模块
var swig = require('swig')

//创建app应用  等同于nodejs的http.createServer()
var app = express()

var User = require('./models/User')

//加载数据库模块
var mongoose = require('mongoose')

//加载body-parser,用来处理post提交过来的数据
var bodyParser = require('body-parser')

//加载cookies模板
var Cookies = require('cookies')

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回__dirname + '/public' 对应下的文件
app.use('/public', express.static(__dirname + '/public'))

//配置模板
//定义当前应用使用的模板引擎
//第一个参数：模板引擎的名称，也是模板文件的后缀；第二个参数，表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile)
//设置模板存放的目录,第一个参数必须是views，第二个参数是目录
app.set('views', './views')
//注册模板引擎，第一个参数必须是view engine，第二个参数和app.engine方法中定义的模板引擎的名称的第一个参数保持一致
app.set('view engine', 'html')

//开发过程中，需要不断的修改模板，需要取消模板的缓存
swig.setDefaults({cache:false})

//bodyParser配置
app.use( bodyParser.urlencoded({
    extended: true
}) )

//对cookies的设置
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res)

    //解析用户登录的cookies信息
    req.userInfo = {}
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'))

            //获取当前登录用户的身份类型
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin)
                next()
            })
        }catch (e){

        }
    }else {
        next()
    }

})

/*
//首页
app.get('/', function (req, res, next) {
    //res.send("<h1>welcome my blog</h1>")  //直接显示到客户端页面

    /!*
    * 设置views目录下的制定文件，解析并返回给客户端
    * 第一个参数：表示模板文件，相对于views目录  views/index.html
    * 第二个参数：传递给模板使用的数据
    * *!/
    res.render('index')
})*/

/*
* 根据不同的功能，划分模块
* */
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))


//监听http请求
mongoose.connect('mongodb://localhost:27018/blog', function (err) {
    if(err){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功')
        app.listen(8888, 'localhost')  //只有数据库连接成功后，才进行端口监听，页面请求
    }
})

