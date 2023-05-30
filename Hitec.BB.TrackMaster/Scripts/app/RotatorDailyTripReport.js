
function format(d) {

    var data = d;

    if (data.dataCount > 0) {
        var a = data.objTravelReport;

        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Trip No</th><th>Unloading Place</th><th>plant out date</th><th>plant out time</th><th>site in date</th><th>site in time</th><th>duration plant to site</th><th>Distance plant to site</th><th>Max speed plant to site</th><th>Average speed plant to site</th><th>site out date</th><th>site out time</th><th>plant in date</th><th>plant in time</th><th>duration site to plant</th> <th>distance site to plant</th><th>Max speed site to plant</th><th>Average speed site to plant</th><th>Time at site</th><th>unloading time</th><th>cycle</th><th>Total distance</th></thead>';

        a.forEach(function (element) {

            debugger
            tableString = tableString +
              '<tr>' +
              '<td>' + element.tripno + '</td>' +
              '<td>' + element.unloadingplace + '</td>' +
              '<td>' + element.plantoutdate + '</td>' +
               '<td>' + element.plantouttime + '</td>' +
              '<td>' + element.siteindate + '</td>' +
              '<td>' + element.siteintime + '</td>' +
                '<td>' + element.durationplanttosite + '</td>' +
                     '<td>' + element.distancep2s + '</td>' +
                      '<td>' + element.maxspeed + '</td>' +
                       '<td>' + element.avgspeed + '</td>' +
                      '<td>' + element.siteoutdate + '</td>' +
                     '<td>' + element.siteouttime + '</td>' +
                       '<td>' + element.plantindate + '</td>' +
              '<td>' + element.plantintime + '</td>' +

              '<td>' + element.durationsitetoplant + '</td>' +
                '<td>' + element.distances2p + '</td>' +
                 '<td>' + element.maxspeed2 + '</td>' +
                       '<td>' + element.avgspeed2 + '</td>' +
                  '<td>' + element.timeatsite + '</td>' +
                    '<td>' + element.totalunloadingtime + '</td>' +
                      '<td>' + element.cycle + '</td>' +
                       '<td>' + element.totalkm + '</td>' +









              '</tr>'
        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
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
    GetDistanceTravelReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/RotatorDailyTripsReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/RotatorDailyTripsReport";
    DownloadData(url, downloadType);
});

function GetDistanceTravelReport(downloadType) {

    // clear tables contents
    deleteTable();


    var url = baseUrl + "AddOnAPI/RotatorDailyTripsReport";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50, 1000], [5, 10, 20, 25, 50, 1000]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Distance Report' });
        },

        "columns": [
                { "data": "VehicleName" },
                 { "data": "Branch" },
                 { "data": "zone" },


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

            if (data.dataCount == 0) {


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

    var reportName = 'Daily_Report_Trip' + sdt + '_TO_' + edt;

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


