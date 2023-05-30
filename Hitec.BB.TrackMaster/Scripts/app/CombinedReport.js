﻿var table;
function format(d) {
    
    var data = d;

    if (data.count > 0) {
        var a = data.Combinereport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Ingnition On Location</th><th>Ignition On Time </th><th>Ignition Off Location</th><th>Ignition Off Time</th><th>Distance KM</th><th>Travel Duration</th><th>cumulative Travel Duration</th><th>Stop Duration(Days-hh-mm-ss)</th><th>cumulative stoppage Duration(Days-hh-mm-ss)</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
                '<tr>' +
               '<td>' + element.StartLocation + '</td>' +
                '<td>' + element.StartDate + '</td>' +
                 '<td>' + element.StopLocation + '</td>' +
            '<td>' + element.StopDate + '</td>' + 
              '<td>' + element.DistanceCovered + '</td>' +
              
            '<td>' + element.TravelDuration + '</td>' +
              '<td>' + element.TotalTravelDuration + '</td>' +
            '<td>' + element.StopDuration + '</td>' +
             '<td>' + element.totalstopduration + '</td>' +
             //'<td>' + element.IdlingDuration + '</td>' +
             //'<td>' + element.TotalIdlingDuration + '</td>' +
               
             //      '<td>' + element.addpoi + '</td>' +
                    
                   
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
    $(".js-example-basic-single").select2();
    GetCombinereport(null);

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
        GetCombinereport(null);

    });

});
$("#BtnSearch").click(function () {

    var oneday = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var totalDays = Math.round(Math.abs((new Date($beginDate).getTime() - new Date($endDate).getTime()) / (oneday)));
    //if (totalDays > 1) {
    //    toastr.warning("Data Difference should not be more than one day");
    //    return false;
    //}
    GetCombinereport(null);

});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetCombineReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetCombineReport";
    DownloadData(url, downloadType);
});

function GetCombinereport(downloadType) {
    
    deleteTable();
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/Reportsapi/GetCombineReport";
 
    var url = apiBase.apiurl + "ReportsApi/GetCombineReport";
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "vehname" },
                { "data": "driverName" },
                { "data": "Totaldistance" },
               

                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }


        ],
        "rowCallback": function (row, data, index) {
          
            if (data.count == "0") {
                
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
    var reportName = 'Combined__Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
   
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&CustId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}