var table;
function format(d) {
    var data = d;

    if (data.AcOnOffCounter > 0) {
        var a = data.objACReport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Dispenser On Time</th><th>Dispenser Off Time</th><th>Dispenser On Location</th><th>Dispenser Off Location</th><th>Duration(Days-hh-mm-ss)</th></tr></thead>';
        a.forEach(function (element) {

            tableString = tableString +
                '<tr>' +
                    '<td>' + element.OnTime + '</td>' +
                    '<td>' + element.OffTime + '</td>' +
                    '<td>' + element.eLocation + '</td>' +
                    '<td>' + element.sLocation + '</td>' +
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
    GetAcReport(null);

    // Add event listener for opening and closing details
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {

        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {

            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }

        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");

    })


});
$("#BtnSearch").click(function () {
    GetAcReport(null);

});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "ReportsApi/GetConsolidatedACReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "ReportsApi/GetConsolidatedACReport";
    DownloadData(url, downloadType);
});

function GetAcReport(downloadType) {
    deleteTable();

    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/Reportsapi/GetConsolidatedACReport";
    var select = document.getElementById("mode");
    var $mode = select.options[select.selectedIndex].value;
    var url = apiBase.apiurl + "ReportsApi/GetConsolidatedACReport";
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
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "mode", "value": $mode }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "bbid",
                    "class": "hidden"
                },
                { "data": "VehicleName" },
                { "data": "DriverName" },
                { "data": "AcOnOffCounter" },
                { "data": "TotalWorkingHours" },
                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },


        ],
        "rowCallback": function (row, data, index) {
            if (data.AcOnOffCounter == "0") {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
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
    var reportName = 'AC_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var select = document.getElementById("mode");
    var $mode = select.options[select.selectedIndex].value;
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&mode=" + $mode + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}