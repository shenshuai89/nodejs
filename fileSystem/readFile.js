/**
 * Created by sam on 2017/5/10.
 */

var fs = require('fs')

//readFile异步读取一个文件的全部内容
/*
* fs.readFile(filename, [options], callback)
* */

fs.readFile('./2.txt', 'utf-8', function (err, data) {
  console.log(err)
  console.log(data)
})
