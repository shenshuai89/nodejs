/**
 * Created by sam on 2017/5/10.
 */

var fs = require('fs')

fs.open('./1.txt', 'r+', function (err, fd) {
  /*  //数据写入文件
  * fs.write(fd, buffer, offset, length, [position], callback)
  *   fd: 打开的文件
  *   buffer: 要写入的数据
  *   offset: buffer对象中要写入的数据的起始位置
  *   length: 要写入buffer数据的长度
  *   position: fd中的起始位置
  *   callback: 回调函数
  * */

  if (err){
    console.log('打开文件失败')
  }else{
    var bf = new Buffer('0123456')
    fs.write(fd, bf, 0, 4, 5, function (err, fd, buf) {
      console.log(arguments)
      console.log(fd)
      console.log(buf)
    })
    fs.close(fd, function (err) {
      console.log(arguments)
    })
  }
})

