var table;
function format(d) {
    
    var data = d;

    if (data.objCount > 0) {
        
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Vehicle Name</th><th>Location</th><th>GeoTime</th><th>FenceStatus</th></tr></thead>';
        data.GeoFenceStatus.forEach(function (element) {
            

            console.log(element);
            tableString = tableString +
                '<tr>' +
                '<td>' + element.VehicleName + '</td>' +
            '<td>' + element.Location + '</td>' +

            '<td>' + element.GeoTime + '</td>' +
            '<td>' + element.FenceStatus + '</td>' +

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
    GetGeoFenceVoilationReport(null);
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
    GetGeoFenceVoilationReport(null);
});


$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "GeofenceAPI/GetGeoFenceVoilationReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "GeofenceAPI/GetGeoFenceVoilationReport";
    DownloadData(url, downloadType);
});

function GetGeoFenceVoilationReport(downloadType) {
    deleteTable();
    var $BBID = '';
    var url = apiBase.apiurl + "GeofenceAPI/GetGeoFenceVoilationReport";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "bbid", "value": $BBID }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "vehname" },
                { "data": "objCount" },

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
            if (data.objCount == 0) {
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
    var reportName = 'Geofence_Violations_Report_' + sdt + '_TO_' + edt;
    var $BBID = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $BBID + "&downloadType=" + downloadType + "&reportName=" + reportName + "&CustId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}