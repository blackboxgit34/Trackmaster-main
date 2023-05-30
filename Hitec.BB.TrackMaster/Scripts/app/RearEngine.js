var table;
function format(d) {
    var data = d;

    if (data.IgnitionOnOffCounter > 0) {
        var a = data.objIgnitionStatusReport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Rear Engine On Time</th><th>Rear Engine Off Time</th><th>Rear Engine On Location</th><th>Rear Engine Off Location</th><th>Duration (Days-hh-mm-ss)</th></tr></thead>';
        a.forEach(function (element) {
            var IgnitionOnTime = moment(element.IgnitionOnTime).format("MM/DD/YYYY");
            if (IgnitionOnTime == "Invalid date") {
                IgnitionOnTime = "";
            }
            else {
                IgnitionOnTime = moment(element.IgnitionOnTime).format("MMM D YYYY, hh:mm:ss a")
            }

            var IgnitionOffTime = moment(element.IgnitionOffTime).format("MM/DD/YYYY");
            if (IgnitionOffTime == "Invalid date") {
                IgnitionOffTime = "";
            }
            else {
                IgnitionOffTime = moment(element.IgnitionOffTime).format("MMM D YYYY, hh:mm:ss a")
            }

            tableString = tableString +
                '<tr>' +
                    '<td>' + IgnitionOnTime + '</td>' +
                    '<td>' + IgnitionOffTime + '</td>' +
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
    GetIgnitionReport(null);

});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "ReportsApi/GetPumpWorkingHoursReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "ReportsApi/GetRearWorkingHoursReport";
    DownloadData(url, downloadType);
});

function GetIgnitionReport(downloadType) {

    deleteTable();

    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/ReportsApi/GetPumpWorkingHoursReport";
    var url = apiBase.apiurl + "ReportsApi/GetRearWorkingHoursReport";
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

            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "bbid",
                    "class": "hidden"
                },
                { "data": "VehicleName" },

                { "data": "IgnitionOnOffCounter" },
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
            //console.log(data);
            if (data.IgnitionOnOffCounter == 0) {

                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
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
    var reportName = 'Rear_Engine_WorkingHours_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}














