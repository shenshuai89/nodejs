/**
 * Created by sam on 2017/5/10.
 */

var fs = require('fs')

var filename = '2.txt'

// writeFile新建一个文件
/*
* fs.writeFile(filename, data, [options], callback)
* 向一个指定的文件中写入数据，如果该文件不存在，则新建，如果存在，则覆盖原有的文件内容
*
 * */
fs.writeFile(filename, 'hello node', function () {
  console.log(arguments)
})
