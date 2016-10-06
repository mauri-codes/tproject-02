$(document).ready(function(){
    $(".delUser").on("click", function(){
        var name = $(this).attr("id");
        ajaxDelete(name);
        $(this).parent().parent().remove();
    });
});
function ajaxDelete(name) {
    $.ajax({
        type:'POST',
        url: '/delete',
        data: {"name": name},
        success: function () {
            alert("success");
        },
        error: function () {
            alert("error deleting");
        }
    });
}