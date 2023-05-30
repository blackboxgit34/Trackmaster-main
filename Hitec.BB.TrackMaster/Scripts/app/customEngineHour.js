﻿var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {


    var url = apiBase.apiurl + 'CommonApi/GetFuelVehicles';
    param = { custid: $custid };
    $.get(url, param, function (data) {
        
        $.each(data, function (key, value) {
            
            $("#Vehiclelist").append($("<option></option>").val(value.Value).html(value.Text));
        });
    GetGeoFenceVoilationReport(null);

    })
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
    var url = baseUrl + "CustomAPI/FuelFillingReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/FuelFillingReport";
    DownloadData(url, downloadType);
});

function GetGeoFenceVoilationReport(downloadType) {
    deleteTable();
    // var $custid = '4939';
    var deviceid = $("#Vehiclelist").val();
    var $BBID = '';
    var url = apiBase.apiurl + "CustomAPI/CustomEngineFuelDataGraph";
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
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "vehicleId", "value": deviceid }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate });
        },

        "columns": [
                          { "data": "DataDate" },
                          { "data": "EndDateTime"},
                          { "data": "Location"},
                          { "data": "engine"},
                          { "data": "FuelLevel" },
                          { "data": "EndFuelLevel"},
                          { "data": "Speed"},
                          { "data": "Distance"},

                         
         
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
    var reportName = 'Fuel_Filling_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

