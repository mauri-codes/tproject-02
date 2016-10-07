$(document).ready(function(){

    var ele = "<div class='back-announce'><div class='announce'> " +
        "<div class='divImage'>" +
        "<img class= 'loading' src='/images/ajax-loader.gif' alt='Be patient...' />" +
        "</div><div class='loadingmessage'>waiting Fingerprint Scanner connection</div></div></div>";

    $(".delUser").on("click", function(){
        $('.container').prepend(ele);
        setLink();
        //var name = $(this).attr("id");
        //ajaxDelete(name);
        //$(this).parent().parent().remove();
    });

});
function ajaxDelete(name) {
    $.ajax({
        type:'POST',
        url: '/delete',
        data: {"name": name, "process": "delUser"},
        success: function () {
            alert("success delete");
        },
        error: function () {
            alert("error delete");
        }
    });
}
function setLink() {
    var namex = $(".hello").attr('id');
    console.log(namex);
    $.ajax({
        type:'POST',
        url: '/setlink',
        data: {
               "name": namex,
               "status": "WaitingF",
               "process": "delUser",
               "id": Random(1,10000)
        },
        success: function (data) {
            alert("success setLink: " + data.hi);
        },
        error: function () {
            alert("error setlink");
        }
    });
}
function Random(min, max) {
    return Math.random() * (max - min) + min;
}