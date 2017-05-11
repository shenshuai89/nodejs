/**
 * Created by sam on 2017/5/10.
 */

var http = require('http')
var fs = require('fs')
var url = require('url')
var querystring = require('querystring')

var server = http.createServer()

var HtmlDir = __dirname +'/html/'

server.on('request',function (req, res) {
  var urlStr = url.parse( req.url )

  switch ( urlStr.pathname ){
    case '/':
      sendData( HtmlDir + 'index.html', req, res)
      break;
    case '/user':
      sendData( HtmlDir + 'user.html', req, res)
      break;
    case '/login':
      sendData( HtmlDir + 'login.html', req, res)
      break;
    case '/login/check':
      console.log(req.method)

      //使用get方式提交的获取数据
      //console.log( querystring.parse(urlStr.query))

      //使用post方式提交的获取数据
      if (req.method.toUpperCase() == 'POST'){
        var str = ''
        req.on('data', function (chunk) {
          str += chunk
        })

        req.on('end', function () {
          console.log(querystring.parse(str))
        })
      }

      break;

    default:
      sendData( HtmlDir + 'error.html', req, res)
      break;
  }
})

function sendData(file, req, res) {
  fs.readFile( file, function (err, data) {
    if (err){
      res.writeHead(404, {
        'content-type' : 'text/html;charset=utf-8'
      })
      res.end("<h1 style='color:red'>404页面丢失</h1>")
    }else{
      res.writeHead(200, {
        'content-type' : 'text/html;charset=utf-8'
      })
      res.end(data)
    }
  })
}

server.listen(8666, 'localhost')
