var table;
function format(d) {
    var data = d;

    if (data.ReverseCounter > 0) {
        var a = data.objIgnitionStatusReport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Reverse Travel start Time</th><th>Reverse Travel End Time</th><th>Reverse Travel start Location</th><th>Reverse Travel End Location</th><th>Duration(Days-hh-mm-ss)</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
            '<tr>' +
                //'<td>' + d.VehicleName + '</td>' +
                '<td>' + moment(element.ReverseOnTime).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
                '<td>' + moment(element.ReverseOffTime).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
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
    GetBatterydisconnectionReport(null);
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
    GetBatterydisconnectionReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetReverseTravelReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetReverseTravelReport";
    DownloadData(url, downloadType);
});

function GetBatterydisconnectionReport(downloadType) {

    deleteTable();
    var url = baseUrl + "ReportsApi/GetReverseTravelReport";
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
                {
                    "data": "bbid",
                    "class": "hidden"
                },
                { "data": "VehicleName" },
                //{ "data": "DriverName" },
                { "data": "ReverseCounter" },
                { "data": "ReverseTime" },
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
            if (data.ReverseCounter == 0) {
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
    var reportName = 'Reverse_Travel_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}