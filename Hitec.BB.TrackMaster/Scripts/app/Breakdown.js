var table;
function format(d) {
    debugger;
    var data = d;

    if (data.Count > 0) {
        var a = data.objBreakDownReport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Start Date</th><th>End Date</th><th>Start Location</th><th>End Location</th><th>Duration(Days-hh-mm-ss)</th></tr></thead>';
        a.forEach(function (element) {
       
            tableString = tableString +
                '<tr>' +
                '<td>' + element.StartDate + '</td>' +
            '<td>' + element.StopDate + '</td>' +

            '<td>' + element.StartLocation + '</td>' +
             '<td>' + element.StopLocation + '</td>' +
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
    GetBreakDownReport(null);

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
    $("#interval").change(function () {
        GetBreakDownReport(null);

    });

});
$("#BtnSearch").click(function () {

    //var oneday = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    //var totalDays = Math.round(Math.abs((new Date($beginDate).getTime() - new Date($endDate).getTime()) / (oneday)));
    //if (totalDays > 1) {
    //  toastr.warning("Data Difference should not be more than one day");
    //return false;
    //}
    GetBreakDownReport(null);

});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetBreakdownReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetBreakdownReport";
    DownloadData(url, downloadType);
});

function GetBreakDownReport(downloadType) {

    deleteTable();
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/Reportsapi/GetBreakdownReport";
  
    var url = apiBase.apiurl + "ReportsApi/GetBreakdownReport";
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
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10], [5, 10]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "bbid", "value": "" }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "VehicleName" },
              
              
                { "data": "Count" },
                { "data": "TotalBreakdowntime" },

                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }


        ],
        "rowCallback": function (row, data, index) {
            //console.log(data);

            if (data.Count == "0") {

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
    var reportName = 'BreakDown_Analysis_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
   
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid  + "&downloadType=" + downloadType + "&reportName=" + reportName + "&CustId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}