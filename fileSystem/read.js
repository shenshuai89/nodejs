/**
 * Created by sam on 2017/5/10.
 */

var fs = require('fs')

fs.open('./1.txt', 'r', function (err, fd) {
  if(err){
    console.log('fail')
  }else {
    console.log('success')

    /* //读取fd的数据文件，并将数据添加到buffer对象中
    *
    * fs.read(fd, buffer, offset, length, position, callback)
    *   fd:通过open方法成功打开一个文件返回的编号
    *   buffer: buffer对象
    *   offset: 读取的数据内容添加到buffer中的起始位置
    *   length: 添加到buffer对象中内容的长度
    *   position: 读取的文件中的起始位置
    *   callback: 回调
    *     err:
    *     length:
    *     buffer:
    * */
    var bf = new Buffer('0123456789')

    console.log(bf)
    fs.read(fd, bf, 0, 4, 1, function (err, len, buf) {
      console.log(bf)
      console.log(len)
    })
  }
})
