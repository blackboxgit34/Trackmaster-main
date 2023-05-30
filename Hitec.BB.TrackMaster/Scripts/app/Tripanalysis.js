var table;


function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();

};
$(document).ready(function () {
    GetallstoppageReport(null);

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
        GetallstoppageReport(null);

    });

});
$("#BtnSearch").click(function () {

    //var oneday = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    //var totalDays = Math.round(Math.abs((new Date($beginDate).getTime() - new Date($endDate).getTime()) / (oneday)));
    //if (totalDays > 1) {
    //  toastr.warning("Data Difference should not be more than one day");
    //return false;
    //}
    GetallstoppageReport(null);

});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetTripanalysis";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetTripanalysis";
    DownloadData(url, downloadType);
});

function GetallstoppageReport(downloadType) {

    deleteTable();

    var select = document.getElementById("interval");
    var $interval = select.options[select.selectedIndex].value;
    var url = apiBase.apiurl + "ReportsApi/GetTripanalysis";
    console.log('Calling URL: ' + url + ' to get Report data.');
    table = $('#dt_basic_Master').DataTable({

        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 20, 25, 50, 100], [5, 10, 20, 25, 50, 100]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "bbid", "value": "" }, { "name": "interval", "value": $interval }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "TransportName" },
                { "data": "Type" },
                { "data": "VehicleName" },

                { "data": "Groupname" },
                
             
                  { "data": "Distamce" },
                  { "data": "amount" },
                     { "data": "DrivingTime" },
                        { "data": "StoppageTime" },
                         
                           
                             { "data": "startlocation" },
                               { "data": "starttime" },

                            
                                { "data": "EndLocation" },

                             
                                  { "data": "Endtime" },
                                  






        ],

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
    var reportName = 'Navkar_Distance_Analysis_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var select = document.getElementById("interval");
    var $interval = select.options[select.selectedIndex].value;
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&interval=" + $interval + "&downloadType=" + downloadType + "&reportName=" + reportName + "&CustId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}