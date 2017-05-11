/**
 * Created by sam on 2017/5/10.
 */

var fs = require('fs')

//fs.rename()重命名文件

fs.rename('./2.txt', './second.txt', function () {
  console.log(arguments)
})
