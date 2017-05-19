/**
 * Created by sam on 2017/5/18.
 */

var perpage = 2
var page = 3
var pages = 0

// 提交评论
$('#messageBtn').on('click',function () {
    $.ajax({
        type:'POST',
        url:'/api/comment/post',
        data:{
            contentid : $('#contentId').val(),
            content : $('#messageContent').val()
        },
        success:function (responseData) {
            // console.log(responseData)
            $('#messageContent').val('')

            renderComment(responseData.data.comments.reverse())
        }
    })
})

//每次页面重载的时候获取一下该文章的所有评论
$.ajax({
    url:'/api/comment',
    data:{
        contentid : $('#contentId').val(),
    },
    success:function (responseData) {

        renderComment(responseData.data.reverse())
    }
})

$('.commentPage').delegate('a', 'click', function () {
    if ($(this).parent().hasClass('prev')){
        alert('shang')
    }else{
        alert('xia')
    }
})

function renderComment(comments) {

    $('#commentNum').html(comments.length)
    var pages = Math.ceil(comments.length / perpage)
    var start =(page-1)*perpage

    var end = start + perpage
    var $lis = $('.commentPage li')
    $lis.eq(1).html( page +'/' + pages )

    if (page<=1){
        page = 1
        $lis.eq(0).html('<span>没有上一页了</span>>')
    }else{
        $lis.eq(0).html('<a href="javascript:;">上一页</a>')
    }

    if (page>=pages){
        page = pages
        $lis.eq(2).html('<span>没有下一页了</span>')
    }else{
        $lis.eq(2).html('<a href="javascript:;">下一页</a>')
    }

    var html = ''
    for(var i=start; i < end; i++){
        html += '<div class="messageBox">'+
            '<p class="commentInfo clearfix">'+
            '<span class="fl">'+ comments[i].username +'</span><span class="fr time">'+ formatDate(comments[i].postTime) +'</span></p>'+
            '<p class="commentContent">'+ comments[i].content +'</p>'+
            '</div>'
    }
    $('.messageList').html(html)
}

function formatDate(d) {
    var date1 = new Date(d)
    return date1.getFullYear() + '年' +(date1.getMonth() + 1)+'月'+ date1.getDate()+'日' + date1.getHours() +':'+date1.getMinutes()+':'+date1.getSeconds()
}