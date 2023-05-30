var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    GetLoadPickupReport(null);
});
$("#BtnSearch").click(function () {
    GetLoadPickupReport(null);

});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/GetLoadReport";
    DownloadData(url, downloadType);
});
function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'Load_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}
function GetLoadPickupReport(downloadType) {

    deleteTable();
    
    //var $custid = '1619';
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/ReportsApi/GetLoadReport";
    var url = apiBase.apiurl + "CustomAPI/GetLoadReport";
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
            
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "VehName" },
                { "data": "CurrentLoad" },
                { "data": "Lowest" },
                { "data": "Highest" },
                 {
                     "orderable": false, "targets": 0,
                     "render": function (data, type, full, meta) {
                         return '<div class="mouseon-examples">' + '<a href="/CustomReport/LoadDetailReport?beginDate=' + $beginDate + '&endDate=' + $endDate + '&bbid=' + full.bbid + '" target="_blank">Details</a>' + '</div>';
                     }
                 },
        ]

       
    });
}