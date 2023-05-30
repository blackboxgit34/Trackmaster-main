var table;


$(document).ready(function () {
    GetBatterydisconnectionReport(null);
    // Add event listener for opening and closing details

});

$("#BtnSearch").click(function () {
    GetBatterydisconnectionReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetAllinoneAceReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetAllinoneAceReport";
    DownloadData(url, downloadType);
});

function GetBatterydisconnectionReport(downloadType) {

    deleteTable();
    var url = baseUrl + "ReportsApi/GetAllinoneAceReport";
    console.log('Calling URL: ' + url + ' to get Report data.');
    table = $('#dt_basic_Master').DataTable({
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
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [

                { "data": "VehicleName" },
                //{ "data": "DriverName" },

                { "data": "TotalEngine" },
                { "data": "TotalThresher" },
        { "data": "Distance" },
         //{
         //    "orderable": false, "targets": 0,
         //    "render": function (data, type, full, meta) {
         //        var area = full.Area;
         //        debugger;
         //        var link = "/CustomReport/Threshermap?bbid=" + full.bbid + "&fromdate=" + $beginDate + "&Todate=" + $endDate + "";

         //        return '<a href=' + link + ' target="_blank">' + area + '</a>';
         //    }
         //}
          { "data": "Area" }



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
    var reportName = 'Consolidated_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}