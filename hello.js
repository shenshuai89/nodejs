/**
 * Created by sam on 2017/5/9.
 */

/*console.log('hello nodejs')

function Person(name) {
  this.name = name;
}

Person.prototype.run = function () {
  console.log(this.name +' '+ "running")
}

var p1 = new Person('ll')
p1.run()

console.log(__filename)
console.log(__dirname)*/


/*setInterval(function () {
  var d = new Date();
  console.log('现在是:'+ d.getFullYear() +' 年 '+(d.getMonth()+1)+' 月 '+d.getDate() +' 日 '
    +d.getHours()+':'+d.getMinutes()+':'+d.getSeconds())
},1000)*/

//console.log(process.title)

/*function show(data) {
  process.stdout.write('用户输入了:'+data)
}
show('123');*/

//process.stdin.resume()

/*//用户输入
process.stdin.on('data',function (data) {
  console.log('用户输入了:'+data);
  process.exit();
})*/

/*var a,b;
process.stdout.write('请输入a的值');
process.stdin.on('data',function (data) {
  if(!a){
    a = Number(data);

    process.stdout.write('请输入b的值')
  }else{
    b = Number(data);

    process.stdout.write('a加b的值是：'+(a+b))
  }
})*/


/*
// Buffer

var arr = [1,'a',3]
//console.log(new Buffer(arr))

var bf= new Buffer(4)
bf[5] = 5
//console.log(bf[5])

var bfs = new Buffer('hello','utf-8')
console.log(bfs)

for(var i=0; i<bfs.length; i++){
  console.log(bfs[i].toString(16)+' ' + String.fromCharCode(bfs[i]))
}

var str1 = 'hello'
var bf1 = new Buffer(str1)
console.log(bf1.length)
console.log(str1.length)

var str2 = '文字'
var bf2 = new Buffer(str2)
console.log(str2.length)
console.log(bf2.length)

var bf3 = new Buffer([8,2,3])
console.log(bf3.toJSON())*/


