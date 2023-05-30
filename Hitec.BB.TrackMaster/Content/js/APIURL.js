var apiBase;
var CID = 0;
    if (JSON.parse(localStorage.getItem("cid")) != null) {
        logindata = JSON.parse(localStorage.getItem("cid"));
        CID = logindata.data.CustId;
    }
else {
    if (JSON.parse(localStorage.getItem("staffId")) != null) {
        CID = JSON.parse(localStorage.getItem("custID"));
    }
    CID = JSON.parse(localStorage.getItem("custID"));
}


if (CID > 13000) {
    apiBase = {
        //for live
      //  apiurl: 'https://api1.trackmaster.in/api/'

         //apiurl: 'http://112.196.27.102:97/api/',
        //for local
      apiurl: 'http://localhost:3970/api/',
    };
}
else {
    apiBase = {
        //for live
 //  apiurl: 'https://api1.trackmaster.in/api/'
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


