$(document).ready(function () {
    GetMonthReport(null);
});

$("#BtnSearch").click(function () {
    GetMonthReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetMonthlyReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetMonthlyReport";
    DownloadData(url, downloadType);
});

function GetMonthReport(downloadType) {
    deleteTable();
    var url = baseUrl + "Reportsapi/GetMonthlyReport";
    console.log(url);
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,  
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                //{ "data": "VehicleNo" },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        if (full['VehicleNo'].indexOf('<del>') >= 0)
                            return '<span style="text-decoration: line-through;" href="#">' + full['VehicleNo'] + '</span>';
                        else
                            return full['VehicleNo'];
                    }
                },
                    { "data": "StartLocation" },
                        { "data": "OpeningDistance" },
                            { "data": "LastLocation" },
                        { "data": "ClosingDistance" },
                { "data": "DistanceTravelled" },
                { "data": "IgnitionOnHours" },
                { "data": "DrivingTime" },
                { "data": "StoppageTime" },
                { "data": "OverStoppageCount" },
        ]
    });

    //for filter from live status
    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
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
    var reportName = 'Summary_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}


