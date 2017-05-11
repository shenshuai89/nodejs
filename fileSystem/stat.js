/**
 * Created by sam on 2017/5/10.
 */

var fs = new require('fs')

//fs.stat
//显示文件的信息


fs.stat('./second.txt', function () {
  console.log(arguments)
})
