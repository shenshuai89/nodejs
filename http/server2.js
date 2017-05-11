/**
 * Created by sam on 2017/5/10.
 */

//url对象

var http = require('http')
var url = require('url')

var server = http.createServer()

server.on('request', function (req, res) {
  var urlStr = url.parse(req.url)
  // req.url = "http://www.baidu.com:6666/a/b/index.html?a=1#b=2"
  /*
   Url {
   protocol: 'html:',
   slashes: true,
   auth: null,
   host: 'www.baidu.com:6666',
   port: '6666',
   hostname: 'www.baidu.com',
   hash: '#b=2',
   search: '?a=1',
   query: 'a=1',
   pathname: '/a/b/index.html',
   path: '/a/b/index.html?a=1',
   href: 'http://www.baidu.com:6666/a/b/index.html?a=1#b=2' }
   */

  switch (urlStr.pathname) {
    case  '/':
      res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
      })
      res.end('<h1>这里是首页</h1>')
      break;
    case '/user':
      res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
      })
      res.end('<h1>这里是用户页面</h1>')
      break;
    default:
      res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
      })
      res.end('<h1>页面丢失</h1>')
      break;
  }


})

server.listen(8666, 'localhost')
