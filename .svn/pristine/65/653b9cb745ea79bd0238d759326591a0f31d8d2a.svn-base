$(document).ready(function () {
    GetEmployeeRfidReport(null);
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
    GetEmployeeRfidReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/EmployeeRFIDReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/EmployeeRFIDReport";
    DownloadData(url, downloadType);
});

function GetEmployeeRfidReport(downloadType) {
    // clear tables contents
    deleteTable();
    // set date-time
    //setDateTime();

    console.log($beginDate);
    console.log($endDate);
    console.log($custid);

    var url = baseUrl + "AddOnAPI/EmployeeRFIDReport";
    console.log(url);
    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img id='loaderGif' src='../Content/Trackmaster_files/loader.gif'/>"
        //},
       "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Employee Rfid Report' });
        },

        "columns": [
                { "data": "RfTagId" },
                { "data": "Username" },
                { "data": "FirstName" },
                { "data": "DataDate" },
                {
                    "data": "Location",
                    "width": "40%"
                },
                
                //{
                //    "orderable": false,
                //    "targets": 0,
                //    "className": 'details-control',
                //    "orderable": false,
                //    "data": null,
                //    "defaultContent": ''
                //}
        ]
    });
}




function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'Employee RFID Report';

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;


    window.onbeforeunload = function () {
        $('.body').block({
            message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>',
            centerX: true,
            centerY: true,
            css: {
                width: '300px',
                height: '300px',
                // border: '3px solid #FF9900',
                //  backgroundColor: '#000',
                color: 'black',
                padding: '25px'
            }
        });
        return null;
    }
}