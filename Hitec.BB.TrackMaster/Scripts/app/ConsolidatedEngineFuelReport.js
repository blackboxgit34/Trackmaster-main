var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};

$(document).ready(function () {
    GetConsolidatedEngineFuelReport(null);
});

$("#BtnSearch").click(function () {
    GetConsolidatedEngineFuelReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/ConsolidatedEngineFuelReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/ConsolidatedEngineFuelReport";
    DownloadData(url, downloadType);
});

function GetConsolidatedEngineFuelReport(downloadType) {

    deleteTable();

    var url = apiBase.apiurl + "CustomAPI/ConsolidatedEngineFuelReport";

    console.log('Calling URL: ' + url + ' to get Report data.');

    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {

            param.push({ "name": "CustId", "value": $custid }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate },  { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
            { "data": "SNo" },
            { "data": "VehName" },
            { "data": "TotalWorkingHours" },
            { "data": "TotalConsumption" },
            { "data": "TotalConsumptionPerHour" },
            { "data": "TotalFilling" },
            { "data": "TotalDrainage" },
        ],
        "rowCallback": function (row, data, index) {
            
            console.log(data);
            //if (data.IgnitionOnOffCounter == 0) {

            //    var target = $(row).find(".details-control");
            //    var index = (target).index();
            //    $(row).find('td:eq(' + index + ')').removeClass('details-control')
            //}
        }
    });
}

function DownloadData(url, downloadType) {
   
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'Consolidated Engine Fuel Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;

    console.log("?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0);

   
}


















