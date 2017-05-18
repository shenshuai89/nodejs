/**
 * Created by sam on 2017/5/18.
 */
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
            console.log(responseData)
            $('#messageContent').val('')
            //renderComment(responseData.data)
        }
    })
})

function renderComment(comments) {

}