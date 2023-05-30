//var apiBase = {
//   //apiurl: 'http://112.196.27.102:89/api/',

//   //apiurl:"http://192.168.0.201:55/",

//    apiurl: 'http://localhost:3970/api/',
//};

var apiBase;
var custId;
if (!custId) {
    if (JSON.parse(localStorage.getItem("cid")) != null) {
        logindata = JSON.parse(localStorage.getItem("cid"));
        custId = logindata.data.CustId;
    }
}
else if (!custId) {
    if (JSON.parse(localStorage.getItem("staffId")) != null) {
        custId = JSON.parse(localStorage.getItem("custID"));
    }
}
//else if(!custId) {
//    custId = JSON.parse(localStorage.getItem("staffId"));
//}
//else if (!custId) {
//    custId = JSON.parse(localStorage.getItem("custId"));
//}
else {
    custId= 1000;
}

if (custId > 13000) {
    apiBase = {
        //for live
        // apiurl: 'http://112.196.27.102:97/api/',
        //for local
        apiurl: 'http://localhost:3970/api/',
    };
}
else {
    apiBase = {
        //for live
        // apiurl: 'http://112.196.27.102:89/api/',
        //for local
        apiurl: 'http://localhost:3970/api/',
    };
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


