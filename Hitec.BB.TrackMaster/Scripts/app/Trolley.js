var table;
function format(d) {
    var data = d;

    if (data.IgnitionOnOffCounter > 0) {
        var a = data.objIgnitionStatusReport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Vehicle Name</th><th>Ignition On Time</th><th>Ignition Off Time</th><th>Ignition On Location</th><th>Ignition Off Location</th><th>Duration(Days-hh-mm-ss)</th></tr></thead>';
        a.forEach(function (element) {

            tableString = tableString +
                '<tr>' +
                '<td>' + d.VehicleName + '</td>' +
            '<td>' + element.IgnitionOnTime + '</td>' +

            '<td>' + element.IgnitionOffTime + '</td>' +

            '<td>' + element.SLocation + '</td>' +
               '<td>' + element.ELocation + '</td>' +
                  '<td>' + element.Duration + '</td>' +
            '</tr>'
        });

        tableString = tableString + '</table>';

    }

    // `d` is the original data object for the row
    return tableString;
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    $("#reportrange").css("display", "none");
    GetStationaryReport();

    // Add event listener for opening and closing details
    //$('#dt_basic_Master tbody').on('click', 'td.details-control', function () {

    //    var tr = $(this).closest('tr');
    //    var row = table.row(tr);

    //    if (row.child.isShown()) {
    //        // This row is already open - close it
    //        row.child.hide();
    //        tr.removeClass('shown');
    //    }
    //    else {

    //        // Open this row
    //        row.child(format(row.data())).show();
    //        tr.addClass('shown');
    //    }

    //    $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
    //    $("#subTbl th").css("color", "White");

    //})


});
$("#BtnSearch").click(function () {
    GetStationaryReport(null);

});


function GetStationaryReport() {

    deleteTable();
    //   var $custid = '1619';
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://api1.trackmaster.in/api/Reportsapi/GetStationaryReport";
  
    var url = apiBase.apiurl + "ReportsApi/GetTrolleyReport";
    console.log('Calling URL: ' + url + ' to get Report data.');
    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        //},
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
            param.push( { "name": "bbid", "value": "" }, { "name": "CustId", "value": $custid }, { "name": "downloadtype", "value": "" });
        },

        "columns": [

                { "data": "VehicleNo", "orderable": false },
                { "data": "Size", "orderable": false },
                { "data": "TrailerAttach", "orderable": false },
                { "data": "Group", "orderable": false },
                { "data": "tstatus", "orderable": false },
                { "data": "tyre", "orderable": false },
                { "data": "Status", "orderable": false },
                { "data": "StopSince", "orderable": false },
                { "data": "Distance", "orderable": false },
                { "data": "StatusTime", "orderable": false },
                { "data": "Location", "orderable": false },
                { "data": "tremarks", "orderable": false }
        ]


    });
    $("#excelExport").click(function () {
        var downloadType = 'Excel';
        var url = "http://localhost:3970/api/Reportsapi/GetTrolleyReport";
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

        var $bbid = '';
       
        var url1 = url + "?bbid=" + $bbid + "&CustId=" + $custid + "&downloadtype=" + downloadType + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
        window.location = url1;
    }
}