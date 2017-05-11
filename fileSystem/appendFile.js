/**
 * Created by sam on 2017/5/10.
 */

var fs = require('fs')

var filename = '2.txt'
var filename2 = '3.txt'

// appendFile向文件中追加内容
/*
* fs.appendFile(filename, data, [options], callback)
* 向一个指定的文件中追加数据，如果文件不存在，怎创建
*
 * */

fs.appendFile(filename, '.js', function () {
  console.log(arguments)
})

fs.exists(filename2, function (isExists) {
  if(!isExists){
    fs.writeFile(filename2, 'hello', function (err) {
      if (err){
        console.log('error')
      }else {
        console.log('创建新文件成功')
      }
    })
  }else {
    fs.appendFile(filename2, '-node', function (err) {
      if (err){
        console.log('新内容追加失败')
      }else {
        console.log('新内容追加成功')
      }
    })
  }
})
