var table;
var s;
var mode;
function format(d) {
    var data = d;

    if (data.Count > 0) {
        var a = data.objIgnitionStatusReport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Start Date/Time</th><th>End Date/Time</th><th>Start Location</th><th>End Location</th><th>Duration(d-hh:mm:ss)</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
            '<tr>' +
                //'<td>' + d.VehicleName + '</td>' +
                '<td>' + moment(element.OnTime).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
                '<td>' + moment(element.OffTime).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
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

$(document).ready(function () {
    mode = getUrlParameter('mode');
    s = "1";
    GetIgnitionReport(null);
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
    s = "2";
    GetIgnitionReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetConsolidatedFuelDiscondetailStatus";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetConsolidatedFuelDiscondetailStatus";
    DownloadData(url, downloadType);
});

function GetIgnitionReport(downloadType) {

    deleteTable();
    var url = baseUrl + "ReportsApi/GetConsolidatedFuelDiscondetailStatus";
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
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' }, { "name": "mode", "value":mode });
        },

        "columns": [
                {
                    "data": "bbid",
                    "class": "hidden"
                },
                { "data": "VehicleName" },
                { "data": "DriverName" },
                { "data": "Count" },
                { "data": "Duration" },
                 {
                     "orderable": false,
                     "targets": 0,
                     "className": 'details-control',
                     "orderable": false,
                     "data": null,
                     "defaultContent": ''
                 },


        ],
        "rowCallback": function (row, data, index) {
            if (data.Count == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });


    //for filter from live status
    if (s == "1") {
        var vehicleName = getUrlParameter('Vehicleno');
        if (vehicleName) {
            debugger;
            var from = getUrlParameter('From');
            var To = getUrlParameter('To');

            $beginDate = from;
            $endDate = To;
            table.search(vehicleName).draw();
        }
    }

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
    var reportName = 'FuelRodDisconnection_detail_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&mode=" + mode + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;

}