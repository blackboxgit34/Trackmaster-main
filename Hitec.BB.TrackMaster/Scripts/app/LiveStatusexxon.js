﻿//Global variable
var length;
var liveStatusAuto = true;
var param1;
var table;
var vehicletype;
var statusCode = null; // by default 
function format(d) {

    
    // `d` is the original data object for the row
    var table = '<table cellpadding="5" cellspacing="0" border="0">' +
        '<tr>' +
             '<td  style="color: black;">BBID:</td>' +
            '<td>' + d.BBID + '</td>' +
          '<td  style="color: black;">Driver Name:</td>' +
            '<td>' + d.DriverName + '</td>' +
         '<td  style="color: black;">Driver Mobile number:</td>' +
            '<td>' + d.DriverMobileNumber + '</td>' +
    '<td  style="color: black;">Coordinates : ' + d.Latitude + ',' + d.Longitude + '</td>' +
        //    '<td>' + d.Latitude + '</td>' +
        //'<td  style="color: black;">Longitude:</td>' +
        //    '<td>' + d.Longitude + '</td>' +
        '<td  style="color: black;">Two Way communication:</td>' +
        //static value yet
            '<td>' + d.Simno + '</td>';


    if (d.Remarks != "NA") {

        table += '<td  style="color: black;">Remarks</td>' +

                '<td>' + d.Remarks + '</td>' +
                '<td  style="color: black;">Docs</td>' +
            '<td><a href="javascript:" onclick="showDocsWindow(\'' + d.VehicleName.replace(' ', '') + '\',\'' + d.BBID.replace(' ', '') + '\');" >See Docs</a></td></tr></table>'
    }
    else {
        table += '</tr></table>'
    }
    return table;

}



function GetVehicleTypesList() {
    var VehicleTypeUrl = apiBase.apiurl + 'fmsapi/GetVehicleTypesWithcustid?custid=' + localStorage["custID"];
   
    $('#VehicleTypeList').find('option:not(:first)').remove();
    $.get(VehicleTypeUrl, function (data) {
        $('#VehicleTypeList').append($('<option style="background-image:url(~/Trackmaster_files/4.png);"></option>').val(0).html("All Type's"));
        $.each(data, function (key, value) {
            $("#VehicleTypeList").append($("<option></option>").val(value.typeId).html(value.vehicleType));
        })
    });
}


$(document).ready(function () {
    vehicletype = 0;
    GetVehicleTypesList();
    LiveStatus();
    vehicletype = "0";

    setInterval(LiveStatus, 90 * 1000);
    $('#dt_basic_Master').on('draw.dt', function () {

        $('[data-toggle="tooltip"]').tooltip();
        var mouseOnDiv = $('.mouseon-examples');
        var tipContent = $(
            '<p><a href="#" onClick="myClick()"; class="reportToolTip">Report1sfdfsdfdfsdfd</a></p>' +
            '<p><a href="#" class="reportToolTip">Report1</a></p>' +
            '<p><a href="#" class="reportToolTip">Report1</a></p>' +
            '<p><a href="#" class="reportToolTip">Report1</a></p>'
        );
        mouseOnDiv.data('powertipjq', tipContent);
        mouseOnDiv.powerTip({
            placement: 's',
            mouseOnToPopup: true,
            smartPlacement: true,
        });

     
        $('.mouseon-examples').on('click', function () {
        
            $.powerTip.hide();
            $.powerTip.show(this);
        });

        $('.mouseon-examples').on({
            powerTipPreRender: function () {
                
                var vehicleName = $(this).parents('tr:first').find('td:eq(2)').text();
                var bbid = $(this).parents('tr:first').find('td:eq(7)').text();
                $(this).data('powertip', '<a href="/report/SpeedAnalysisReport?vehName=' + vehicleName + '">Speed Analysis </a></p>' +
                    '<p><a href="/report/distance?vehName=' + vehicleName + '">Distance Report </a></p>' +
                    '<p><a href="/report/summary?vehName=' + vehicleName + '">Summary Report </a></p>' +
                    '<p><a href="/report/StoppageAnalysisReport?vehName=' + vehicleName + '">Stoppage Analysis </a></p>' +
                    '<p><a href="/report/ignition?vehName=' + vehicleName + '">Igntion Analysis </a></p>' +

                    '<p><a href="/report/Idling?vehName=' + vehicleName + '">Idling Analysis </a></p>' +
                    '<p><a href="/customReport/tripreport?vehName=' + vehicleName + '">Trip Report </a></p>' +
                    '<p><a href="/map/replay?tableNameLvStatus=' + bbid + '&vehicleNameLvStatus=' + vehicleName + '">Route PlayBack</a></p>'

                    );
            },
            mouseenter: function (event) {
                $.powerTip.show(this, event);
            },
            mouseleave: function () {
                $.powerTip.hide(this);
            }

        });
    });

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
    });



});


$("#VehicleTypeList").change(function () {
    vehicletype = $("#VehicleTypeList").val();
    LiveStatus();
});
$('#dt_basic_Master').on('length.dt', function (e, settings, len) {

    length = $("select[name=dt_basic_Master_length]").val();

});
function calcDistance() {
    
    var cellIndexMapping = { 7: true };


    $("#dt_basic_Master tr").each(function (rowIndex) {
        $(this).find("td").each(function (cellIndex) {

            if (cellIndexMapping[cellIndex]) {
                var bbid1 = $.trim($(this).text());
                //$(this).next().html('<img src="@Url.Content("~/Content/img/elements/loaders/5s.gif")">');
                $.ajax({
                    url: apiBase.apiurl + "LiveStatus/GetDistance", // to get the right path to controller from TableRoutes of Asp.Net MVC
                    dataType: "json", //to work with json format
                    type: "GET", //to do a post request 
                    contentType: 'application/json; charset=utf-8', //define a contentType of your request
                    cache: false, //avoid caching results
                    data: { bbid: $.trim($(this).text()) },
                    success: function (data) {

                        var col = 8;
                        $('#dt_basic_Master tr:eq(' + rowIndex + ') td:eq(' + col + ')').text(data);

                        //$("td:contains('" + bbid1 + "')").next().text(data);

                    },
                    error: function (xhr) {
                        console.log('error');
                    }
                });
            }
        });
    });
}


function LiveStatus() {
    if (liveStatusAuto) {
        if (length == 0) {
            length = 20;
        }
        deleteTable();
        var url = apiBase.apiurl + "LiveStatus/LiveStatusWithAjax";
        sum = 0;
        table = $('#dt_basic_Master').DataTable({
            "processing": true,
            "serverSide": true,
            destroy: true,
            retrieve: true,
            "drawCallback": function (settings) {
                calcDistance();
            },
            "iDisplayLength": length,
            "aLengthMenu": [[5, 10, 20, 25, 50, 100, 300], [5, 10, 20, 25, 50, 100, 300]],
            "sAjaxSource": url,
            "aaSorting": [],
            language: {
                searchPlaceholder: "Search Vehicle Name",
                sSearch: ""
            },
            "fnServerParams": function (param) {
                param.push({ "name": "custid", "value": $custid }, { "name": "StatusCode", "value": statusCode }, { "name": "type", "value": vehicletype });
             
            },
            "columns": [

                {
                    "orderable": false, "targets": 0,
                    "data": "Sno",
                    "width": "2%"
                },
                 {
                     "render": function (data, type, full, meta) {
                         
                         return '<span>' + full.VSNAme + '</span>';

                     }
                 },

                {
                    "orderable": false, "targets": 0,
                    "render": function (data, type, full, meta) {
                        Vicon = full.VIcon.replace("~/", "/");



                        return '<img  data-toggle="tooltip" title="' + full.VIconName + '" src="' + Vicon + '">';



                    }
                },
                {
                    "render": function (data, type, full, meta) {
                       
                        return '<span>' + full.VehicleName + '</span>';

                    }
                },
                  {
                      "render": function (data, type, full, meta) {
                         
                          return '<span>' + full.DriverLNo + '</span>';

                      }
                  },
                {
                    "orderable": false, "targets": 0,
                    "render": function (data, type, full, meta) {

                        VehStatus = full.Status.replace("~/", "../../");
                        return '<span>' + '<img src="' + VehStatus + '">' + '</span>';
                    }
                },
                {
                    "orderable": false, "targets": 0,
                    "data": "DateTime"
                },
                {
                    "orderable": false, "targets": 0,
                    "data": "Location",
                    "width": "30%"
                },
                {
                    //"orderable": false, "targets": 0,
                    //"data": "Speed"
                    "render": function (data, type, full, meta) {

                        if (full.Speed >= full.Overspeed) {
                            
                            //return '<a href="/Report/Details?bbid=' + full.BBID + '">' + full.VehicleName + '</a>';
                            return '<span style="color:red;">' + full.Speed + '</span>';
                        }
                        else {
                            return '<span >' + full.Speed + '</span>';
                        }
                    }


                },
                {
                    "class": "hidden",
                    "render": function (data, type, full, meta) {

                        return '<span class="hidden">' + full.BBID + '</span>';
                    }
                },
                {
                    "orderable": false, "targets": 0,
                    "data": "Distance"
                },
                {
                    "orderable": false, "targets": 0,
                    "render": function (data, type, full, meta) {
                        GSMSignal = full.antenaText.replace("~/", "../../");
                        return '<img src="' + GSMSignal + '">';
                    }
                },
                {
                    "orderable": false, "targets": 0,
                    "render": function (data, type, full, meta) {
                        GPSText = full.gpsText.replace("~/", "../../");
                        return '<img src="' + GPSText + '">';
                    }
                },
                {
                    "orderable": false, "targets": 0,
                    "render": function (data, type, full, meta) {
                        BatteryText = full.batteryText.replace("~/", "../../");

                        return '<img data-toggle="tooltip" title="' + full.batteryTooltip + '" src="' + BatteryText + '">';
                    }
                },
                 {
                     "orderable": false, "targets": 0,
                     "render": function (data, type, full, meta) {

                         if (full.ACTooltip.replace(" ", "") == "ACOff" || full.ACTooltip.replace(" ", "") == "ACOn") {


                             if (full.FuelActiveNTM == "1") {
                                 return '<span title="For Details go to add-on report"><b style="color:grey;"  ><a href="/AddOn/ac?vehName=' + full.VehicleName + '"><img src="../../Trackmaster_files/Fuel/' + full.AcActive.replace(" ", "") + '.png" style="height:16px"/></a></b></br><b style="color:grey;"><a href="/fuel/FuelGraph?bbid=' + full.BBID + '"><img src="../../Trackmaster_files/Fuel/Fuel.png" /></a></b>' +
                                     '</span>';
                             }
                             else {
                                 return '<span title="For Details go to add-on report"><a href="/AddOn/ac?vehName=' + full.VehicleName + '"><img src="../../Trackmaster_files/Fuel/' + full.AcActive.replace(" ", "") + '.png" style="height:16px"/></a></b>' +
                                    '</span>';
                             }
                         }

                     }
                 },

                {
                    "orderable": false, "targets": 0,
                    "width": "4%",
                    "render": function (data, type, full, meta) {

                        if (full.batteryTooltip.includes("VehBattery Disconnected") || full.SimDisconnectNTM.includes("Sim Disconnected") || full.DemoVehcileNTM.includes("Demo Vehicle")) {
                            var title = full.batteryTooltip + '&#013;' + full.SimDisconnectNTM
                                + '&#013;' +
                                full.DemoVehcileNTM
                            return '<div><span class="badge badge-important" style="position: relative; left: 0px; background-color: red; color: white !important;"><i data-toggle="tooltip" class="fa fa-exclamation-triangle" title="' + title + '"></i></span></div>';
                        }
                        else {
                            return '<div></div>';
                        }

                    }
                },
                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''

                },
                {
                    "orderable": false, "targets": 0,
                    "width": "7%",
                    "render": function (data, type, full, meta) {
                        if (full.Remarks != "NA") {

                            return '<div><span class="mouseon-examples"><button class="btn btn-default btn-small"  data-toggle="tooltip" title="report options."><i class="fa fa-info" aria-hidden="true"></i></button></span> <a class="btn btn-success btn-small" target="_blank" href="/Report/Details?bbid=' + full.BBID + '"  data-toggle="tooltip" title="click to view detail page"><i class="fa fa-eye" aria-hidden="true"></i></a></div>&nbsp; <div ><img src="../Trackmaster_files/Fuel/siren.gif" alt="Smiley face" height="42" width="42"></div>';
                        }
                        else {
                            return '<div><span class="mouseon-examples"><button class="btn btn-default btn-small"  data-toggle="tooltip" title="report options."><i class="fa fa-info" aria-hidden="true"></i></button></span> <a class="btn btn-success btn-small" target="_blank" href="/Report/Details?bbid=' + full.BBID + '"  data-toggle="tooltip" title="click to view detail page"><i class="fa fa-eye" aria-hidden="true"></i></a></div>';
                        }

                    }
                }
            ],
            "order": [[3, "desc"]]
        });
    }

};


window.LegendClick = function (id) {

    statusCode = id;
    LiveStatus()
}


$('#tglAutoRefresh').change(function () {
    if ($(this).prop('checked')) {
        liveStatusAuto = true;
        LiveStatus();
    } else {
        liveStatusAuto = false;
    }
})


$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "LiveStatus/LiveStatusexcel";
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

    var reportName = 'Live-Status Report';
    //var reportName = 'Distance_Report_' + sdt + '_TO_' + edt;
    //statusCode = null;
    //alert(statusCode);
    var url1 = url + "?StatusCode=" + statusCode + "&downloadType=" + downloadType + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;

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




