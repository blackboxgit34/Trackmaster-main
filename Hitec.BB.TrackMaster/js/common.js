﻿function popUpPage(pageName)
{
    newwindow=window.open('AdminLogin.aspx?pgname='+pageName ,'administrator','top=150,left=300,width=400,height=200');
    newwindow.focus();
}

function popUp(pageName, width, height) {
    var centerWidth = (window.screen.width - 800)/2;
    var centerHeight = (window.screen.height - 500)/2;
    mywindow = window.open(pageName, "mywindow", "location=1,status=1,scrollbars=1,  width=" + width + ",height=" + height + ",left=" + centerWidth + ",top=" + centerHeight);
}


// Reference: http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
function GET() {
    debugger;
    var data = [];
    var param;
    for (x = 0; x < arguments.length; ++x) {
        param = location.href.match(new RegExp("/\?".concat(arguments[x], "=", "([^\n&]*)")));
        if (param == null) {
            data.push("");
        } else {
            data.push(param[1]);
        }
    }
    return data;
}


