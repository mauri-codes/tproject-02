$(document).ready(function(){

    var waitingAnnounce = "<div class='back-announce'><div class='announce'> " +
        "<div class='divImage'>" +
        "<img class= 'loading' src='/images/ajax-loader.gif' alt='Be patient...' />" +
        "</div><div class='loadingmessage'>Waiting for fingerprint scanner connection</div></div></div>";

    $(".delUser").on("click", function(){
        $('.container').prepend(waitingAnnounce);
        var nameToDelete = $(this).attr("id");
        setLink(nameToDelete);
    });

});
function removeMessage() {
    $(".back-announce").remove();
}
//Deletes a document from users collection with username name
function ajaxDelete(nameToDelete) {
    $.ajax({
        type:'POST',
        url: '/delete',
        data: {"name": nameToDelete, "process": "delUser"},
        success: function () {
            $(".loadingmessage").text("User Deleted from Database");
            $(".loadingmessage").css({ 'font-weight': 'bold' });
            setTimeout(removeMessage, 2000);
            $("#"+nameToDelete).parent().parent().remove();
            //sometimes I feel I shouldn't use setTimeout so heavily
        },
        error: function () {
            alert("error delete");
        }
    });
}
//sets a "waiting connection" status in the database,
//waiting for the fingerprint scanner to connect.
function setLink(nameToDelete) {
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
            findConnection(6, databack.id, nameToDelete);
        },
        error: function () {
            alert("error setlink");
        }
    });
}
//Once the waiting connection status is set, the fingerprint scanner
//will change it, this function will repeatedly search for that change
//n times with Link id, if found, it will change the status to "done".
function findConnection(n, id, nameToDelete) {
    if(n === 0){
        $(".loadingmessage").text("Time elapsed, canceling request");
        $(".loadingmessage").css({ 'font-weight': 'bold' });
        setTimeout(removeMessage, 2000);
        return;
    }
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
                setTimeout(findConnection, 5000, n-1, id, nameToDelete);
            }
            if (data.status === "Fingerprint"){
                ajaxDelete(nameToDelete);
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