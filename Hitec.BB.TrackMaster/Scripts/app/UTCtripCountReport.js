var table;
var vehicletype ;
function format(d) {
    debugger;
    
    var data = d;

    if (data.Datacount > 0) {
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr><th>Start Location</th><th>Start Date Time</th><th>End Location</th><th>End Date Time</th> <th>Operated KM</th><th>Dead KM</th></tr></thead>';
        data.TripChildModel.forEach(function (element) {
            
            console.log(element);
            tableString = tableString +
           '<tr>' +
           '<td>' + element.StartLocation + '</td>' +
         
           '<td>' + element.DepartTime + '</td>' +
             '<td>' + element.EndLocation + '</td>' +
           '<td>' + element.ArrivalTime + '</td>' +
           //'<td>' + element.ExpectedTime + '</td>' +
           //'<td>' + element.DetentionTimeAtStartPOI + '</td>' +
           //'<td>' + element.DetentionTimeAtEndPOI + '</td>' +
           '<td>' + element.OperatedDistance + 'Km</td>' +
            '<td>' + element.DeadDistance + 'Km</td>' +      
            '<td>' + element.DailyDistance + '</td>' 
           //'<td>' + element.DeviationTime + '</td>'
            

            if (element.objTripDrllDown.length>0) {

                tableString = tableString + '<td><button type="button" class="btn btn-info btn-sm Show"  >Crossed POIs</button></td><tr><td colspan="12"><div class="divshow" style="display:none">' +
                                               '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" >' +
                                                   '<thead ><tr"><th>POI Name</th><th>In Time</th><th>Out Time</th><th>Duration</th></tr></thead>';

                element.objTripDrllDown.forEach(function (Innerelement) {


                    tableString = tableString + '<tr>' +
               '<td>' + Innerelement.POIName + '</td>' +
               '<td>' + Innerelement.InTime + '</td>' +
               '<td>' + Innerelement.OutTime + '</td>' +
               '<td>' + Innerelement.Duration + '</td>' +
               '</tr>'
                });
                tableString = tableString + '</table></div></td></tr>'
            }
        });

        tableString = tableString + '</table>';

    }
  

    return tableString;
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};

$(document).ready(function () {
    vehicletype = null;
    tableName = $('#routelist').val();
    GetTripSummaryReport(tableName, null);
    GetVehicleTypesList();
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

function GetVehicleTypesList() {
    var VehicleTypeUrl = apiBase.apiurl + 'fmsapi/GetVehicleTypesWithcustid?custid=' + localStorage["custID"];

    $('#VehicleTypeList').find('option:not(:first)').remove();
    $.get(VehicleTypeUrl, function (data) {
        $('#VehicleTypeList').append($('<option style="background-image:url(~/Trackmaster_files/4.png);"></option>').val(null).html("All Type's"));
        $.each(data, function (key, value) {
            $("#VehicleTypeList").append($("<option></option>").val(value.typeId).html(value.vehicleType));
        })
    });
}
$("#BtnSearch").click(function () {
    vehicletype = $("#VehicleTypeList").val();
    tableName = $('#routelist').val();
    //alert(tableName);
    GetTripSummaryReport(tableName, null);
});

$("#excelExport").click(function () {
    vehicletype = $("#VehicleTypeList").val();
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/UTCRouteReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    vehicletype = $("#VehicleTypeList").val();
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/UTCRouteReport";
    DownloadData(url, downloadType);
});

function GetTripSummaryReport(tableName, downloadType) {
    
    deleteTable();
    //var $custid = '4939';
    var $BBID = '';
    var url = apiBase.apiurl + "CustomAPI/UTCRouteReport";
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
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "routeId", "value": tableName }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' }, { "name": "type", "value": vehicletype });
        },

        "columns": [
                { "data": "VehicleName" },
                { "data": "Datacount" },
                { "data": "Totaldistance" },
                { "data": "DeadKilometer" },
                
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
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'UTC-Tracking_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var tableName = $('#routelist').val();


    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&routeId=" + tableName + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}