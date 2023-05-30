function format(d) {
    var data = d;

    if (data.overstoppageCount > 0) {
        var a = data.overStoppageData;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Start Date</th><th>End Date</th><th>Location</th><th>Duration</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
                '<tr>' +
            '<td>' + moment(element.StartDate).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
            '<td>' + moment(element.StopDate).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
            '<td>' + element.StopLocation + '</td>' +
            '<td>' + element.Duration + '</td>' +
            '</tr>'
        });

        tableString = tableString + '</table>';
    }

    // `d` is the original data object for the row
    return tableString;
}
var table;
$(document).ready(function () {
    GetOverStoppage(null);
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
    GetOverStoppage(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetOverStoppageReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetOverStoppageReport";
    DownloadData(url, downloadType);
});

function GetOverStoppage(downloadType) {
    deleteTable();
    var url = baseUrl + "Reportsapi/GetOverStoppageReport";
    var reportName = 'Stoppage_Analysis_Report_' + $beginDate + '_' + $endDate;
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": reportName });
        },

        "columns": [
                { "data": "vehname" },
                { "data": "driverName" },
                { "data": "overstoppageCount" },
                { "data": "overstoppageLimit" },
                { "data": "overstoppageDuration" },
                 {
                     "orderable": false, "targets": 0,
                     "className": 'details-control',
                     "orderable": false,
                     "data": null,
                     "defaultContent": ''

                 }
        ],
        "rowCallback": function (row, data, index) {
            if (data.overstoppageCount == 0) {
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
    var reportName = 'Stoppage_Analysis_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}





