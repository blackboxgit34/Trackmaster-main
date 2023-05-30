var table;
function format(d) {
    var data = d;

    if (data.Count > 0) {
        var a = data.objTravelReport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Front Engine start Date</th><th>Front Engine End Date</th><th>Front Engine Working Hour Duration (dd-hh-mm-ss)</th><th>Cumulative Duration</th><th>Fuel Level(liter)</th><th>Location</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
                '<tr>' +
            '<td>' +  moment(element.startdate).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
             '<td>' + moment(element.enddate).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
            //'<td>' + element.Distance + '</td>' +
            '<td>' + element.engine + '</td>' +
            '<td>' + element.cumulative + '</td>' +
             //'<td>' + element.fuelconsumption + '</td>' +
            '<td>' + element.FuelLevel + '</td>' +
            '<td>' + element.Location + '</td>' +
            '</tr>'
        });
        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

function format1(d) {
    var data = d;
    debugger;
    if (data.Count > 0) {
        var a = data.objrearengine;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Rear Engine start Date</th><th>Rear Engine End Date</th><th>Rear Engine Working Hour Duration (dd-hh-mm-ss)</th><th>Cumulative Duration</th><th>Fuel Level(liter)</th><th>Location</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
             '<tr>' +
             '<td>' + moment(element.startdate).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
             '<td>' +moment(element.enddate).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
             //'<td>' + element.Distance + '</td>' +
             '<td>' + element.Duration + '</td>' +
             '<td>' + element.cumulative + '</td>' +
             //'<td>' + element.fuelconsumption + '</td>' +
             '<td>' + element.FuelLevel + '</td>' +
             '<td>' + element.Location + '</td>' +
             '</tr>'
        });
        tableString = tableString + '</table>';
    }
    return tableString;
}

$(document).ready(function () {
    GetFuelEngineWorkingReport(null);
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {

        debugger;
        var tr = $(this).closest('tr');

        //var trextra = $(this).closest('tr').class('')
        //var rowexra = table.row(trextra);

        var row = table.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
          //  $(this).parent().find("td.details-control-extra").addClass('shown');

            
        }
        else {
          row.child(format(row.data())).show();
          tr.addClass('shown');
      //    $(this).parent().find("td.details-control-extra").removeClass('shown');
           
          
        }


        
       

        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })

    $('#dt_basic_Master tbody').on('click', 'td.details-control-extra', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
           // $(this).parent().find("td.details-control").addClass('shown');;
        }
        else {
            row.child(format1(row.data())).show();
            tr.addClass('shown');
        //  $(this).parent().find("td.details-control").hide();
          //  $(this).parent().find("td.details-control").removeClass('shown');
        }
        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })
});

$("#BtnSearch").click(function () {
    GetFuelEngineWorkingReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetTabularEnginehour";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetTabularEnginehour";
    DownloadData(url, downloadType);
});

function GetFuelEngineWorkingReport(downloadType) {

    deleteTable();
    var url = baseUrl + "ReportsApi/GetTabularEnginehour";
    console.log('Calling URL: ' + url + ' to get Report data.');
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
        "aLengthMenu": [[5, 10], [5, 10]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "bbid",
                    "class": "hidden"
                },
                { "data": "VehicleName" },
                { "data": "TotalFuelConsumption" },
                    { "data": "filling" },
                        { "data": "Drainage" },
                { "data": "Distance" },
                { "data": "FrontEngine" },
                 
                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                { "data": "RearEngine" },
                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control-extra',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
        ],
        "rowCallback": function (row, data, index) {
            if (data.Count == 0) {
              
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control');

               
             
            }

            if (data.RearCount == 0) {
                var target = $(row).find(".details-control-extra");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control-extra');
            }
        }
    });

    //for filter from live status
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
    var reportName = 'Fue_Engine_Hour_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}