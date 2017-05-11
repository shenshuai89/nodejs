/**
 * Created by sam on 2017/5/10.
 */
var fs = require('fs')

// 同步打开文件
/*
 * fs.openSync(path, flags, [mode])
 *   path: 要打开的文件的路径
 *   flags: 打开文件的方式  读/写
 *   mode: 设置文件的模式 读/写/执行
 * */
var fd = fs.openSync('./1.txt', 'r')

console.log(fd)
