﻿var vehicletype;
function format(d) {
    var data = d;

    if (data.dataCount > 0) {
        var a = data.objInOutDetails;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Swipe Time</th><th>Location</th></tr></thead>';
        a.forEach(function (element) {
            //console.log(element.Location);
            tableString = tableString +
                '<tr>' +
            '<td>' + element.swipeTime + '</td>' +
            '<td>' + element.location + '</td>' +
            '</tr>'
        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$("#VehicleTypeList").change(function () {
    vehicletype = $("#VehicleTypeList").val();
    GetRfidReport(null);
});

$(document).ready(function () {
    vehicletype = "0";
    GetVehicleTypesList();
    GetRfidReport(null);
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
    GetRfidReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/RFIDReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/RFIDReport";
    DownloadData(url, downloadType);
});

function GetRfidReport(downloadType) {
    // clear tables contents
    deleteTable();


    var url = baseUrl + "AddOnAPI/RFIDReport";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'RFID Report' }, { "name": "Type", "value": vehicletype });
        },

        "columns": [

        {
            
          
            "data": null,
            "orderable": false, "targets": 0,
            "render": function (data, type, full, meta) {
                if ($custid == 6387) {
                  
                    return full.VSName;

                }
                else {
                    return full.name;
                }

            }

        },
                { "data": "rfTagId" },
                { "data": "checkInTime" },
                { "data": "checkInLocation" },
                { "data": "checkOutTime" },
                { "data": "checkOutLocation" },
                { "data": "duration" },
                  //{ "data": "dataCount" },


                   {


                       "data": null,
                       "orderable": false, "targets": 0,
                       "render": function (data, type, full, meta) {
                           if (full.dataCount == 0) {

                               return 1;

                           }
                           else {
                               return full.dataCount;
                           }

                       }

                   },
                
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
}

function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'RFID Report';

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0+"&type="+vehicletype;
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


