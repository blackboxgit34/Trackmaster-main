﻿var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    GetRefTempReport(null);
    $("body").find( '.widget-body .clearfix').remove();
});
$("#BtnSearch").click(function () {
    GetRefTempReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetRefTempDetailReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetRefTempDetailReport";
    DownloadData(url, downloadType);
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
function GetRefTempReport(downloadType) {
    deleteTable();
    var url = apiBase.apiurl + "ReportsApi/GetRefTempDetailReport";
    var offset = getUrlParameter('offset');
    var bbid = getUrlParameter('bbid');
    var startDate = getUrlParameter('beginDate');
    var stopDate = getUrlParameter('endDate');
    var TimeIntervals = getUrlParameter('TimeIntervals');


    console.log(startDate+" mm"+stopDate);
    table = $('#dt_basic_Master').DataTable({
        "oLanguage": {
            "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        },
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": bbid }, { "name": "beginDate", "value": startDate }, { "name": "endDate", "value": stopDate }, { "name": "CustId", "value": $custid }, { "name": "offset", "value": offset }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' }, { "name": "timeInterval", "value": TimeIntervals });
        },
     
        "columns": [
                { "data": "VehicleName" ,
                    "sClass":"hidden" },
                { "data": "DateTime" },
                { "data": "Temperature" },
                {
                    "data": "Location",
                    //"sClass": "hidden"
                },
                {
                    "data": "Speed",
                   // "sClass": "hidden"
                },
               
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

var TimeIntervals = getUrlParameter('TimeIntervals');
function DownloadData(url, downloadType) {
    var startDate = getUrlParameter('beginDate');
    var stopDate = getUrlParameter('endDate');
    if (startDate) {
        $beginDate = startDate;
        $endDate = stopDate;
    }
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'Refrigerator_Temp_Detail_Report_' + sdt + '_TO_' + edt;
    var $bbid = getUrlParameter('bbid');
    var offset = getUrlParameter('offset');
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&offset=" + offset + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&timeInterval=" + TimeIntervals + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}