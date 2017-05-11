/**
 * Created by sam on 2017/5/10.
 */

var fs = require('fs')

/*
* fs.watch(filename, [options], [listener])
*   监听文件变化
* */

var filename = './1.txt'

fs.watch(filename, function (ev, fn) {
  console.log(ev)

  if (fn){
    console.log(fn+' 发生改变')
  }else{
    console.log('.........')
  }
})
