/**
 * Created by sam on 2017/5/10.
 */

var http = require('http')

var server = http.createServer()

server.on('error', function (err) {
  console.log(err)
})

server.on('listening', function () {
  console.log('listening.....')
})

server.on('request', function (req, res) {
  console.log('有客户端请求了')
  //req客户端向服务器端发送的请求
  // console.log(req)

  res.setHeader('hello', 'node')

  //状态头信息
  res.writeHead(200, 'this is ok',{
    // 'content-type' : 'text/plain',   //纯文本
    'content-type' : 'text/html;charset=utf-8'
  })

  //res 服务器端返回客户端的数据
  res.write("<h1>hello</h1>")

  res.end()

})
server.listen(8666,'localhost')
