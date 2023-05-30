var s;
var table;
function format(d) {

    var data = d;

    if (data.Count > 0) {
        var a = data.objTravelReport;

        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>S no.</th><th>Vehicle no</th><th>Distance(Km)</th><th>Driving Duration</th><th>From Location</th><th>To Location</th></tr></thead>';

        a.forEach(function (element) {
            //console.log(element.Location);
            debugger
            tableString = tableString +
              '<tr>' +
              '<td>' + element.SNo + '</td>' +
              '<td>' + element.Vehicle + '</td>' +
              '<td>' + element.Distance + '</td>' +
              '<td>' + element.Duration + '</td>' +
              '<td>' + element.FromLocation + '</td>' +
              '<td>' + element.ToLocation + '</td>' +
              '</tr>'
        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    $("#pdfExport").css("display", "none");
    s="1";
    GetDistanceTravelReport(null);
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
    s="2";
    GetDistanceTravelReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/NightDrivingDailyReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/NightDrivingDailyReport";
    DownloadData(url, downloadType);
});

function GetDistanceTravelReport(downloadType) {

    // clear tables contents
    deleteTable();


    var url = baseUrl + "AddOnAPI/NightDrivingDailyReport";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 1000,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[500, 1000], [500, 1000]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Distance Report' });
        },

        "columns": [
                {
                    "data": "Date",
                    "className": 'date'
                },
                 { "data": "Count" },


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

            if (data.Count == 0) {


                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });

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

    var reportName = 'Night_Daily_Report_' + sdt + '_TO_' + edt;

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid= &downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
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


