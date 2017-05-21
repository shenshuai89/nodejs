/**
 * Created by sam on 2017/5/18.
 */

var perpage = 2
var page = 1
var pages = 0
var comments =[]

// 提交评论
$('#messageBtn').on('click',function () {
    $.ajax({
        type:'POST',
        url:'/api/comment/post',
        data:{
            contentid : $('.contentId').val(),
            content : $('#messageContent').val()
        },
        success:function (responseData) {
            // console.log(responseData)
            $('#messageContent').val('')
            comments = responseData.data.comments.reverse()
            renderComment(comments)
        }
    })
})

//
$.ajax({
    url:'/api/comment',
    data:{
        contentid : $('.contentId').val()
    },
    success:function (responseData) {
        $('#messageContent').val('')
        comments = responseData.data.reverse()
        renderComment(comments)
    }
})

$('.commentPage').delegate('a','click', function () {
    if($(this).parent().hasClass('prev')){
        page--
    }else {
        page++
    }
    renderComment()
})

function renderComment() {
    $('.commentNum').html(comments.length)

    pages = Math.max(1,Math.ceil(comments.length / perpage))

    var start =Math.max(0,(page-1)*perpage)
    var end = Math.min(start +perpage,comments.length)
    var $lis = $('.commentPage li')
    $lis.eq(1).html(page+'/'+pages)

    if (page<=1){
        page =1
        $lis.eq(0).html('<span>没有上一页</span>')
    }else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>')
    }
    if(page>=pages){
        page = pages
        $lis.eq(2).html('<span>没有下一页</span>')
    }else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>')
    }

    if (comments.length == 0){
        $('.messageList').html('<div class="messageBox"><p>还没有评论内容</p></div>')
    }else {
        var html = ''
        for (var i=start;i<end;i++){
            html += '<div class="messageBox">'+
                '<p class="commentInfo clearfix">'+
                '<span class="fl">'+ comments[i].username +'</span><span class="fr time">'+ formatDate(comments[i].postTime) +'</span></p>'+
                '<p class="commentContent">'+ comments[i].content +'</p>'+
                '</div>'
        }
        $('.messageList').html(html)
    }


}


function formatDate(d) {
    var date1 = new Date(d)
    return date1.getFullYear()+'年'+(date1.getMonth()+1)+'月'+date1.getDate()+'日 '+date1.getHours()+':'+date1.getMinutes()+':'+date1.getSeconds()
}