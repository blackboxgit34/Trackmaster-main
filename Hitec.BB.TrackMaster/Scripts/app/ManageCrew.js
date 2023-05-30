﻿var table;
$(document).ready(function () {

    GetVehiclesInfo(null, null);


    //$('menuddl').on('change', function (e) {
    //    console.log($(this));
    //});

    $('menuddlT005').change(function () {
        alert();
        // set the window's location property to the value of the option the user has selected
        window.location = $(this).val();
    });

});

$(document).on('click', '.top-info-square', function (e) {
    e.preventDefault();
    var vehicleStatus = $(this)[0].id;
    console.log('val: ' + vehicleStatus);
    GetVehiclesInfo(null, vehicleStatus);
});


$("#BtnSearch").click(function () {
    GetVehiclesInfo(null, null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsAPI/GetConductorInfo";
    DownloadData(url, downloadType, null);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetConductorInfo";
    DownloadData(url, downloadType, null);
});

function GetVehiclesInfo(downloadType, vehicleStatus) {

    // clear tables contents
    deleteTable();

    //var vehicleStatus = $("#vehicleStatus").val();

    var url = baseUrl + "FmsAPI/GetConductorInfo";
    var vehicleId = 0;
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
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "vehicleId", "value": vehicleId }, { "name": "vehicleStatus", "value": vehicleStatus }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "BBID",
                    "class": "hidden",
                    "bSortable": false
                },
                    {
                        "data": null,
                        "bSortable": false,
                        "render": function (data, type, full) {
                            var VehicleImagePath = full['VehicleImagePath'];
                            var VehicleImagePath = VehicleImagePath.split(',')[0];
                            VehicleImagePath = VehicleImagePath.replace("~/", "/");
                            var imgTag = '<img src="' + VehicleImagePath + '" height=40px width=40px/>';
                            return imgTag;
                        }
                    },
                {
                    "data": "VehicleName",
                    "bSortable": false
                },
                 {
                     "data": "driverName",
                     "bSortable": false

                     //                  "data": null,
                     //                "bSortable": false,
                     //                "render": function (data, type, full) {
                     //    var VehicleName = full['VehicleName'];
                     //    VehicleName = VehicleName.replace(/ /g, "&nbsp;");
                     //    return "<a href='javascript:' onclick=showDriverChangeDialognn('" + full['BBID'] + "','" + full.VehicleId + "','" + VehicleName + "');>"+full['driverName']+"</a>";
                     //}
                 },
                {
                    "data": "ConductorName",
                    "bSortable": false
                    //"data": null,
                    //"bSortable": false,
                    //"render": function (data, type, full) {
                    //    var VehicleName = full['VehicleName'];
                    //    VehicleName = VehicleName.replace(/ /g, "&nbsp;");

                    //    return "<a href='javascript:' onclick=showDriverChangeDialog('" + full['BBID'] + "','" + full.VehicleId + "','" + VehicleName + "');>Assign</a>";
                    //}
                },
               

        ]
    });
}

function doNavigate(url, vehicleId) {
    window.open(url.value, '_blank');
}

function DownloadData(url, downloadType, vehicleStatus) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = '';
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var vehicleId = 0;
    var reportName = 'VehiclesList';
    //var vehicleStatus = $("#vehicleStatus").val();
    var url1 = url + "?downloadType=" + downloadType + "&vehicleId=" + vehicleId + "&vehicleStatus=" + vehicleStatus + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

function showDriverChangeDialog(bbid, VehicleId, vehicleName) {

    $("#DriverChangeDialog").dialog({
        autoOpen: true,
        position: { my: "center", at: "200", of: window },
        width: 500,
        height: 250,
        resizable: true,
        title: 'Change Conductor for vehicle',
        modal: true,
        open: function () {

            var url = "../fms/GetConductorChangePartialView?vehicleName=" + vehicleName + "&bbid=" + bbid + "&VehicleId=" + VehicleId + "&custid=" + $custid;
            $(this).load(url);
            $(".ui-dialog-titlebar-close").hide();
        },
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
    return false;
}




