$(document).ready(function(){

    var waitingAnnounce = "<div class='back-announce'><div class='announce'> " +
        "<div class='divImage'>" +
        "<img class= 'loading' src='/images/ajax-loader.gif' alt='Be patient...' />" +
        "</div><div class='loadingmessage'>Wait a little while please</div></div></div>";

    $(".delUser").on("click", function(){
        $('.container').prepend(waitingAnnounce);
        setLink();
        //var name = $(this).attr("id");
        //ajaxDelete(name);
        //$(this).parent().parent().remove();
    });

});
//Deletes a document from users collection with username name
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
//sets a "waiting connection" status in the database,
//waiting for the fingerprint scanner to connect.
function setLink() {
    var namex = $(".hello").attr('id');
    $.ajax({
        type:'POST',
        url: '/setlink',
        data: {
               "name": namex,
               "status": "WaitingF",
               "process": "delUser",
               "id": parseInt(Random(1,100000))
        },
        success: function (databack) {
            // alert(databack.id);
            findConnection(6, databack.id);
        },
        error: function () {
            alert("error setlink");
        }
    });
}
//Once the waiting connection status is set, the fingerprint scanner
//will change it, this function will repeatedly search for that change
//n times with Link id, if found, it will change the status to "done".
function findConnection(n, id) {
    //var namex = $(".hello").attr('id');
    if(n === 0)
        return;
    $.ajax({
        type:'POST',
        url: '/getconnection',//this could become a parameter to make it a more general purpose function
        data: {
            "name": "just some random stuff",
            "id": id,
            "process": "delUser",//and this too
        },
        success: function (data) {
            if(data.status === "waiting"){
                alert(n + " done " + data.link.username);
                setTimeout(findConnection, 5000, n-1, 3134);
            }
            if (data.status === "Fingerprint"){
                alert("fingerprint success");
            }

        },
        error: function () {
            alert("error setlink");
        }
    });

}
function Random(min, max) {
    return Math.random() * (max - min) + min;
}