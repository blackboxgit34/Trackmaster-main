var table;
function format(d) {
    debugger;
    
    var data = d;

    if (data.Datacount > 0) {
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr><th>Start Location</th><th>Start Date Time</th><th>End Location</th><th>End Date Time</th><th>Expected Time to Travel(HH:mm:ss)</th> <th>Operated KM</th><th>Total Time Taken(HH:mm:ss)</th><th >Driving Deviation Time Taken(HH:mm:ss)</th><th>Status</th></tr></thead>';
        data.RouteChildModel.forEach(function (element) {
            
            console.log(element);
            tableString = tableString +
           '<tr>' +
           '<td>' + element.StartLocation + '</td>' +         
           '<td>' + element.DepartTime + '</td>' +
           '<td>' + element.EndLocation + '</td>' +
           '<td>' + element.ArrivalTime + '</td>' +
           '<td>' + element.ExpectedTime + '</td>' +          
           '<td>' + element.OperatedDistance + 'Km</td>' +
            
           '<td>' + element.TravelDuration + '</td>' +
           '<td>' + element.DeviationTime + '</td>'+
           '<td>' + element.Status + '</td>' 
            

            if (element.RouteInfo != null) {

                tableString = tableString + '<td><button type="button" class="btn btn-info btn-sm Show"  >Crossed POIs</button></td><tr><td colspan="12"><div class="divshow" style="display:none">' +
                                               '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" >' +
                                                   '<thead ><tr"><th>POI Name</th><th>In Time</th><th>Out Time</th><th>Duration</th></tr></thead>';

                element.RouteInfo.forEach(function (Innerelement) {


                 tableString = tableString + '<tr>' +
               '<td>' + Innerelement.POIName + '</td>' +
               '<td>' + Innerelement.InTime + '</td>' +
               '<td>' + Innerelement.OutTime + '</td>' +
               '<td>' + Innerelement.Duration + '</td>' +
               '</tr>'
                });
                tableString = tableString + '</table></div></td>'
            }
        });

        tableString = tableString + '</tr></table>';

    }
  

    return tableString;
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};

$(document).ready(function () {
    tableName = $('#routelist').val();
    GetTripSummaryReport(tableName, null);
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

    $("body").on("click", "button.Show", function () {

        $(this).closest('tr').next().find('.divshow').toggle();

    });

});
$("#BtnSearch").click(function () {

    tableName = $('#routelist').val();
    //alert(tableName);
    GetTripSummaryReport(tableName, null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/TripSummaryReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/TripSummaryReport";
    DownloadData(url, downloadType);
});

function GetTripSummaryReport(tableName, downloadType) {
    
    deleteTable();
    var $BBID = '';
    var url = apiBase.apiurl + "CustomAPI/TripSummaryReport";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "sAjaxSource": url,
        "iDisplayLength": 50,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' }, { "name": "routeId", "value": tableName }, { "name": "status", "value": $('#statusid').val() });
        },

        "columns": [
                { "data": "VehicleName" },
                { "data": "Datacount" },
                //{"data":"Totaldistance"},
                {
                    "orderable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },

        ],
        "rowCallback": function (row, data, index) {
            if (data.Datacount == 0) {
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
    var sSearch = '';
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'Route_Report_' + sdt + '_TO_' + edt;
    var $bbid = ''; 
    var tableName = $('#routelist').val();
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&routeId=" + tableName + "&status=" + $('#statusid').val() + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}