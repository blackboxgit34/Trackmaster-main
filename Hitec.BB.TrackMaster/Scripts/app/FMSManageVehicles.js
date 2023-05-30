﻿var table;
$(document).ready(function () {

    GetTopInfoValues();

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
    var url = baseUrl + "FmsAPI/GetVehicleInfo";
    DownloadData(url, downloadType, null);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetVehicleInfo";
    DownloadData(url, downloadType, null);
});

function GetVehiclesInfo(downloadType, vehicleStatus) {

    // clear tables contents
    deleteTable();

    //var vehicleStatus = $("#vehicleStatus").val();

    var url = baseUrl + "FmsAPI/GetVehicleInfo";
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
                    "data": "VehicleId",
                    "class": "hidden"
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        var VehicleImagePath = full['VehicleImagePath'];
                        var VehicleImagePath = VehicleImagePath.split(',')[0];
                        var imgTag = '<img src="' + VehicleImagePath + '" height=40px width=40px/>';
                        return imgTag;
                    }
                },
                {
                    //"data": "VehicleName",
                    //"bSortable": false,
                    //render: $.fn.dataTable.render.text()
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        if (full['VehicleName'].indexOf('<del>') >= 0)
                            return '<span style="text-decoration: line-through;" href="#">' + full['VehicleName'] + '</span>';
                        else
                            return full['VehicleName'];
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        var VehicleName = full['VehicleName'];
                        VehicleName = VehicleName.replace(/ /g, "&nbsp;");
                        if (full['VehicleName'].indexOf('<del>') >= 0)
                            var str = full['driverName'];
                        else
                            var str = "<a href='javascript:' onclick=showDriverChangeDialog('" + full['BBID'] + "','" + full.VehicleId + "','" + VehicleName + "');>" + full['driverName'] + "</a>";
                        return str;
                    }
                },
                {
                    "data": "Make",
                    "bSortable": false
                },
                {
                    "data": "Model",
                    "bSortable": false
                },
                {
                    "data": "VehicleType",
                    "bSortable": false
                },
                {
                    "data": "OdometerReading",
                    "bSortable": false
                },
                {
                    "data": "VehicleStatus",
                    "bSortable": false
                },
                {
                    "data": "Remarks",
                    "bSortable": false
                },
                {
                    "data": "IsGPSEnabled",
                    "bSortable": false
                },

                {
                    "orderable": false,
                    "targets": 0,
                    "orderable": false,
                    "data": null,
                    "render": function (data, type, full, meta) {
                        var url = '/Report/Details?bbid=' + full.BBID + '&';
                        var vehicleIdFromMain = 'vehicleId=' + full.VehicleId;

                        if (full.BBID != "") {
                            var selectTag =
                            '<div class="dropdown">' +
                              '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                              '<span class="caret"></span></button>' +
                              '<ul class="dropdown-menu">' +
                                '<li><a href="/Fms/AddEditVehicles?vehicleId=' + full.VehicleId + '&vehicleName=' + full.VehicleName + '"  target = "_blank"class="editor_edit">Edit</a></li>' +
                                '<li><a href="' + url + vehicleIdFromMain + '"  class="editor_remove" target = "_blank">View</a></li>' +
                                '<li><a href="' + url1 + '?' + vehicleIdFromMain + '" target = "_blank">Add Document Reminder</a></li>' +
                                '<li><a href="' + url2 + '?' + vehicleIdFromMain + '" target = "_blank">Add Service Reminder</a></li>' +
                                '<li><a href="' + url3 + '?' + vehicleIdFromMain + '" target = "_blank">Add Repair/Maintenance</a></li>' +
                                '<li><a href="' + url4 + '?' + vehicleIdFromMain + '" target = "_blank">Add Fuel Entry</a></li>' +
                                '<li><a href="' + url5 + '?' + vehicleIdFromMain + '" target = "_blank">Add Tyre Fitting</a></li>' +
                              '</ul>' +
                            '</div>';
                        }
                        else
                        {
                            var selectTag =
                            '<div class="dropdown">' +
                              '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                              '<span class="caret"></span></button>' +
                              '<ul class="dropdown-menu">' +
                                '<li><a href="/Fms/AddEditVehicles?vehicleId=' + full.VehicleId + '&vehicleName=' + full.VehicleName + '"  target = "_blank"class="editor_edit">Edit</a></li>' +
                                '<li><a href="' + url1 + '?' + vehicleIdFromMain + '" target = "_blank">Add Document Reminder</a></li>' +
                                '<li><a href="' + url2 + '?' + vehicleIdFromMain + '" target = "_blank">Add Service Reminder</a></li>' +
                                '<li><a href="' + url3 + '?' + vehicleIdFromMain + '" target = "_blank">Add Repair/Maintenance</a></li>' +
                                '<li><a href="' + url4 + '?' + vehicleIdFromMain + '" target = "_blank">Add Fuel Entry</a></li>' +
                                '<li><a href="' + url5 + '?' + vehicleIdFromMain + '" target = "_blank">Add Tyre Fitting</a></li>' +
                              '</ul>' +
                            '</div>';
                        }
                        return selectTag;
                    }
                }
               
        ]
    });
}

function doNavigate(url, vehicleId) {
    window.open(url.value,'_blank');
}

function DownloadData(url, downloadType, vehicleStatus) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
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
        title: 'Change Driver Name',
        modal: true,
        open: function () {

            var url = "../fms/GetDriverChangePartialView?vehicleName=" + vehicleName + "&bbid=" + bbid + "&VehicleId=" + VehicleId + "&custid=" + $custid;
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

function GetTopInfoValues()
{
    
    var TopInfoValuesUrl = apiBase.apiurl + 'fmsapi/GetTopInfoValues';
    
    $.get(TopInfoValuesUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            if (value.Value == "")
                value.Value = "0";


            if (value.Name == 1) // "Accidental"
            {
                document.getElementById("accidental").innerHTML = value.Value;
            }
            else if (value.Name == 2) // "Not In Use"
            {
                document.getElementById("notInUse").innerHTML = value.Value;
            }
            else if (value.Name == 3) // "Under Repair"
            {
                document.getElementById("underRepair").innerHTML = value.Value;
            }
            else if (value.Name == 4) // "Not Available"
            {
                document.getElementById("notavailable").innerHTML = value.Value;
            }
            else if (value.Name == 7) // "Sold"
            {
                document.getElementById("sold").innerHTML = value.Value;
            }
            else if (value.Name == 8) // "In Use"
            {
                document.getElementById("inUse").innerHTML = value.Value;
            }
            else if (value.Name == "SUM") // "Total vehicles"
            {
                document.getElementById("totalVehicles").innerHTML = value.Value;
            }
        });
    });
}


