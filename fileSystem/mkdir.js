/**
 * Created by sam on 2017/5/10.
 */

var fs = require('fs')
//fs.mkdir创建文件夹

/*fs.mkdir('./1', function () {
 console.log(arguments)
 })*/

/*//fs.rmdir 移出一个文件夹
 fs.rmdir('./1', function () {
 console.log(arguments)
 })*/

fs.readdir('./', function (err, fileList) {
  //console.log(fileList)

  fileList.forEach(function (f) {
    fs.stat(f, function (err, data) {
      switch (data.mode) {
        case 16822:
          console.log('[文件夹] ' + f)
          break;
        case 33206:
          console.log('[文件] ' + f)
          break;
        default :
          console.log('[其他类型] ' + f)
          break;
      }
    })
  })
})
