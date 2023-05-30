var table;
var poilist;
var inputval;


$(document).ready(function () {
    getchallans();
});


//var url = apiBase.apiurl + "ReportsAPI/getanaajchallans";
//var data = { "data": "challanNo" }, { "data": "truckno" },
//{ "data": "liftingdate" }, { "data": "accpetingDate" },
//{ "data": "sourcename" }, { "data": "destnname" },
//{ "data": "bags" }, { "data": "packing" },
//{ "data": "comocommodityName" }, { "data": "adistance" },
//{ "data": "distance" }, { "data": "trackingurl" },

function getchallans() {
    deleteTable();


    var url = baseUrl + "ReportsAPI/getanaajchallans";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate },{ "name": "downloadType", "value": "" }, { "name": "reportName", "value": 'RFID Report' });
        },

        "columns": [

        { "data": "challanNo" }, { "data": "truckno" },
        {
            "data": null, "orderable": false, "targets": 0,
            "render": function (data, type, full, meta) {
                return full.liftingdate.replace('T', ' ');
            }
        },
        {
            "data": null, "orderable": false, "targets": 0,
            "render": function (data, type, full, meta) {
                return full.accpetingDate.replace('T', ' ');
            }
        },
        { "data": "sourcename" }, { "data": "destnname" },
        { "data": "comocommodityName" }, { "data": "packing" },
        { "data": "bags" }, { "data": "adistance" },
        { "data": "distance" },
        {
            "data": null, "orderable": false, "targets": 0,
            "render": function (data, type, full, meta) {
                return '<a href='+full.trackingurl+' target="_blank">Click here</a>'
            }
        },
        ]
    });
}


$("#BtnSearch").click(function () {
    getchallans();
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "ReportsAPI/getanaajchallans";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "ReportsAPI/getanaajchallans";
    DownloadData(url, downloadType);
});

function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'RFID Report';

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

