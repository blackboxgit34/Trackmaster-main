




function fn(tripid) {
    debugger;
    showPasswordDialog(tripid);
}



function showPasswordDialog(tripid) {

    //   $('#MainWindow').css("display", "none");
    $("#PasswordDialog").dialog({
        autoOpen: true,
        position: { my: "center", at: "200", of: window },
        width: 500,
        height: 150,
        resizable: true,
        title: 'Please enter the Admin password to continue',
        modal: true,
        open: function () {
            debugger;
            var url = "../Security/TripCheckPassword?custid=" + $custid+"&tripid="+tripid;
            $(this).load(url);
            $(".ui-dialog-titlebar-close").hide();
        }
    });
    $('.ui-widget-overlay').click(function () {
        F = 0;
        $('#PasswordDialog').dialog("close");
    });


}




var stdate = null;

document.onmousemove = function () {

    //clearTimeout(timeout);
    //timeout = setTimeout(function () { alert("move your mouse"); }, 60000);
    if (stdate == null) {
        stdate = new Date();


    }
    else {
        // Do your operations
        var edDate = new Date();
        var seconds = (edDate.getTime() - stdate.getTime()) / 1000;

        if (parseInt(seconds) > 200) {
            $("button").attr('disabled', 'disabled');
            showPasswordDialog();
        }
        stdate = new Date();
    }
}

var keystdate = null;
document.onkeypress = function () {

    //clearTimeout(timeout);
    //timeout = setTimeout(function () { alert("move your mouse"); }, 60000);
    if (keystdate == null) {
        keystdate = new Date();


    }
    else {
        // Do your operations
        var keyedDate = new Date();
        var seconds = (keyedDate.getTime() - keystdate.getTime()) / 1000;

        if (parseInt(seconds) > 200) {
            showPasswordDialog();
        }
        keystdate = null;
    }
}