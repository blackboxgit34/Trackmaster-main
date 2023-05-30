﻿function format(d) {
    var data = d;
   
    if (data.Count > 0) {
        var a = data.vodadata;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Date Time</th><th>Datatype</th><th>Location</th><th><span> BatteryVoltage  </span></th><th><span> BatteryCurrent  </span></th><th><span> RemainCapacity  </span></th><th><span> RemainLvL  </span></th><th><span> DischargeCycles  </span></th><th><span> Temperature  </span></th><th><span> BatteryErrorCode  </span></th><th><span> fullstr  </span></th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
                '<tr>' +
            '<td>' + moment(element.DateTime).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
             '<td>' + element.datatype + '</td>' +
            '<td>' + element.Location + '</td>' +
            '<td>' + element.BatteryVoltage + '</td>' +

            '<td>' + element.BatteryCurrent + '</td>' +
            '<td>' + element.RemainCapacity + '</td>' +
            '<td>' + element.RemainLvL + '</td>' +
            '<td>' + element.DischargeCycles + '</td>' +
            '<td>' + element.Temperature + '</td>' +
            '<td>' + element.BatteryErrorCode + '</td>' +
             '<td>' + element.fullstr + '</td>' +
            '</tr>'
        });
        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    
    GetOverSpeed(null);
    // Add event listener for opening and closing details
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        //for getting bbid from datatable
        bbid = tr[0].lastChild.innerHTML;
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
    GetOverSpeed(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetVodafonecanereport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetVodafonecanereport";
    DownloadData(url, downloadType);
});

function GetOverSpeed(downloadType) {
    deleteTable();
    var url = baseUrl + "Reportsapi/GetVodafonecanereport";
    table = $('#dt_basic_Master').DataTable({
        searching: true,
        info: true,
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "bFilter": true,
        "sAjaxSource": url,
        "iDisplayLength": 10,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "vehname" },
               
               
                {
                    "orderable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                {
                    "data": "bbid",
                    "class": "hidden"
                }
        ],
      
        "rowCallback": function (row, data, index) {
            if (data.Count == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
    //for onload filter
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
    var reportName = 'Battery Analysis-' + $beginDate + '_TO_' + $endDate;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}


