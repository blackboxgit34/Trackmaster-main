





var F = 0;
function fg() {
    if (F == 0) {
    
      //  disableScreen()
        showPasswordDialog();
        F = 1;
        // setInterval('autoRefresh_div()', 5000)
    }

}




function disableScreen() {
  
    // creates <div class="overlay"></div> and 
    // adds it to the DOM
    var div = document.createElement("div");
    div.className += "overlay";
    document.body.appendChild(div);
}


function showPasswordDialog() {

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
            var url = "../Security/CheckPassword?custid=" + $custid;
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