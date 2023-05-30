var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    GetRefTempReport();
    $("body").find( '.widget-body .clearfix').remove();
});
$("#BtnSearch").click(function () {
    GetRefTempReport();
});

function GetRefTempReport() {
    deleteTable();
    var url = apiBase.apiurl + "ReportsApi/GetDumperLidDetail";
    var bbid = getUrlParameter('bbid');
    var startDate = getUrlParameter('beginDate');
    var stopDate = getUrlParameter('endDate');
    console.log(startDate+" mm"+stopDate);
    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": bbid }, { "name": "beginDate", "value": startDate }, { "name": "endDate", "value": stopDate }, { "name": "CustId", "value": $custid });
        },
     
        "columns": [
                { "data": "OpenDate" },
                { "data": "CloseDate" },
                { "data": "Duration" },
                { "data": "Location" },
        ],
        "rowCallback": function (row, data, index) {
            if (data.objRefTemperature == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
}

//get parameters from URL
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