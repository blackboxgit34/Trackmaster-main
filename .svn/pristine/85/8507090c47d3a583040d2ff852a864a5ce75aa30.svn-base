var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    GetLoadPickupReport();
});
$("#BtnSearch").click(function () {
    GetLoadPickupReport();

});
var getUrlParameter = function getUrlParameter(sParam) {
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
function GetLoadPickupReport() {

    deleteTable(); 
    var bbid = getUrlParameter('bbid');
    var startDate = getUrlParameter('beginDate');
    var stopDate = getUrlParameter('endDate');
    
    // var $custid = '1619';
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/ReportsApi/GetLoadDetailReport";
    var url = apiBase.apiurl + "CustomAPI/GetLoadDetailReport";
    //console.log('Calling URL: ' + url + ' to get Report data.');
    table = $('#dt_basic_Master').DataTable({
        "oLanguage": {
            "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        },
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        fixedHeader: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            
            param.push({ "name": "bbid", "value": bbid }, { "name": "beginDate", "value": startDate }, { "name": "endDate", "value": stopDate }, { "name": "CustId", "value": $custid });
        },

        "columns": [

                { "data": "Dateime" },
                { "data": "Location" },
                { "data": "Load" }

        ]


    });
}