var table;
function format(d) {
    var data = d;
    debugger;
    //  if (data.IgnitionOnOffCounter > 0) {
    var a = data.objDetailPage;
    console.log(a);
    var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Date </th><th>Main Engine Working Hour</th><th>Actual Engine Working Hours</th><th>Idling Time</th><th>Distance</th></tr></thead>';
    a.forEach(function (element) {


        var Date = moment(element.Date).format("MMM D YYYY")
        if (Date == "Invalid date") {
            Date = "";
        }
        else {
            Date = moment(element.Date).format("MMM D YYYY")
        }


        tableString = tableString +
            '<tr>' +
                '<td>' + Date + '</td>' +
                '<td>' + element.Duration + '</td>' +
                '<td>' + element.RDuration + '</td>' +
                '<td>' + element.Idling + '</td>' +
                 '<td>' + element.Distance + '</td>' +
        '</tr>'
    });

    tableString = tableString + '</table>';

    //}

    // `d` is the original data object for the row
    return tableString;
}

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    $("#pdfExport").hide();
    GetIgnitionReport(null);
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
    GetIgnitionReport(null);

});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddonAPI/AlloneConsolidateEngHoursReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddonAPI/AlloneConsolidateEngHoursReport";
    DownloadData(url, downloadType);
});

function GetIgnitionReport(downloadType) {
    debugger;
    deleteTable();


    var url = apiBase.apiurl + "AddonAPI/AlloneConsolidateEngHoursReport";

    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        fixedHeader: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {

            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custId", "value": $custid }, { "name": "downloadType", "value": '' }, { "name": "reportName", "value": '' });
        },
        "columns": [
                {
                    "data": "bbid",
                    "class": "hidden"
                },
                { "data": "VehicleName" },
                { "data": "DriverName" },
                { "data": "TotalWorkingHours" },
                { "data": "TotalRearWorkingHours" },
                { "data": "TotalIdealTime" },
                { "data": "Distance" },

                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
        ],
        "rowCallback": function (row, data, index) {
            //console.log(data);
            if (data.TotalWorkingHours == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
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
    var reportName = 'Engine_WorkingHours_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}