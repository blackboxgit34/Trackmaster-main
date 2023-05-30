﻿var table;
function format(d) {
   
    var data = d;

    if (data.Datacount > 0) {
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr><th>Supplier Location</th><th>Entry Time</th><th>Exit Time</th></tr></thead>';
        data.SupplierModel.forEach(function (element) {
            
            console.log(element);
            tableString = tableString +
           '<tr>' +
           '<td>' + element.SupplierPOI + '</td>' +
         
           '<td>' + element.Intime + '</td>' +
             '<td>' + element.outime + '</td>'                 
            if (element.DeliveryModel.length > 0) {

                tableString = tableString + '<td><button type="button" class="btn btn-info btn-sm Show"  >Delivery Locations </button></td><tr><td colspan="12"><div class="divshow" style="display:none">' +
                                               '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" >' +
                                                   '<thead ><tr"><th>Delivery Location</th><th>Entry Time</th><th>Exit Time</th><th>Duration(HH:MM:SS)</th></tr></thead>';

                element.DeliveryModel.forEach(function (Innerelement) {


                    tableString = tableString + '<tr>' +
               '<td>' + Innerelement.DeliveryPOI + '</td>' +
               '<td>' + Innerelement.Intime + '</td>' +
               '<td>' + Innerelement.outime + '</td>' +
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
   
    tableName = null;
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

    tableName = null;
    GetTripSummaryReport(tableName, null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/ACCRouteReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/ACCRouteReport";
    DownloadData(url, downloadType);
});

function GetTripSummaryReport(tableName, downloadType) {
   
    deleteTable();
    var $BBID = '';
    var url = apiBase.apiurl + "CustomAPI/ACCRouteReport";
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
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "routeId", "value": tableName }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "VehicleName" },
                { "data": "Datacount" },
                {"data":"Totaldistance"},
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
    var reportName = 'ACCTracking_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var tableName = null;
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&routeId=" + tableName + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}