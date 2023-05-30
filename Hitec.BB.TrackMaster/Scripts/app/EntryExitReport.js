function format(d) {
    var data = d;

    if (data.poisCovered > 0) {
        var a = data.poisCoveredList;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>POI Name</th><th>In Time</th><th>Out Time</th><th>Duration</th></tr></thead>';
        a.forEach(function (element) {
          
            tableString = tableString +
                '<tr>' +
            '<td>' + element.POIName + '</td>' +
            '<td>' + element.Intime + '</td>' +
            '<td>' + element.OutTime + '</td>' +
            '<td>' + element.duration + '</td>' +
            '</tr>'
        });

        tableString = tableString + '</table>';
    }
    return tableString;
}

$(document).ready(function () {
    $("#interval").change(function () {
        GetEntryExitReport();

    });
    GetEntryExitReport();
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
    GetEntryExitReport();
});

function GetEntryExitReport() {
    debugger;
    // clear tables contents
    deleteTable();
    // set date-time
    //setDateTime();
    // set export URL
    //getOverSpeedExcel($beginDate, $endDate);
    //  $custid = '6627';
    var select = document.getElementById("interval");
    var $interval = select.options[select.selectedIndex].value;
    var url = baseUrl + "CustomAPI/EntryExitReport";
    console.log("custid: " + $custid);
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": null }, { "name": "reportName", "value": 'Entry-Exit Report' }, { "name": "interval", "value": $interval });
        },

        "columns": [
               
                { "data": "VehName" },
                { "data": "driverName" },
                { "data": "poisCovered" },
                {
                    "orderable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }
        ],
        "rowCallback": function (row, data, index) {
          
            if (data.poisCovered == "0") {

                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control');
            }
          


        }
    });
}



$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/EntryExitReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/EntryExitReport";
    DownloadData(url, downloadType);
});

function DownloadData(url, downloadType) {

    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var select = document.getElementById("interval");
    var $interval = select.options[select.selectedIndex].value;
    var reportName = 'Entry_Exit Report';
    //var reportName = 'Distance_Report_' + sdt + '_TO_' + edt;

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid= &downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&interval=" + $interval + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;

    window.location = url1;


    window.onbeforeunload = function () {
        $('.body').block({
            message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>',
            centerX: true,
            centerY: true,
            css: {
                width: '300px',
                height: '300px',
                color: 'black',
                padding: '25px'
            }
        });
        return null;
    }
}