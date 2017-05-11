/**
 * Created by sam on 2017/5/10.
 */
var fs = require('fs')

// 打开文件
/*
* fs.open(path, flags, [mode], callback)
*   path: 要打开的文件的路径
*   flags: 打开文件的方式  读/写
*   mode: 设置文件的模式 读/写/执行
*   callback: 回调
*     err: 文件打开失败的错误保存在err里面，成功err则为null
*     fd: 被打开文件的标识
* */
fs.open('./1.txt', 'r', function (err, fd) {
  console.log(arguments);  //
  console.log(fd)
  if (err) {
    console.log('fail')
  } else {
    console.log('success')
  }
})
