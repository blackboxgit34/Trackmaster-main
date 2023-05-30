var table;
function format(d) {
    var data = d;

    if (data.Count > 0) {
        var a = data.objGEnsetEngine;
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



$(document).ready(function () {
    GetFuelEngineWorkingReport(null);
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {

        debugger;
        var tr = $(this).closest('tr');

   

        var row = table.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
         

            
        }
        else {
          row.child(format(row.data())).show();
          tr.addClass('shown');
  
           
          
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
    var url = baseUrl + "Reportsapi/GetGensetdetails";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetGensetdetails";
    DownloadData(url, downloadType);
});

function GetFuelEngineWorkingReport(downloadType) {

    deleteTable();
    var url = baseUrl + "ReportsApi/GetGensetdetails";
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
                //{ "data": "Location" },

                //{ "data": "SITE" },

                { "data": "EQUIPNO" },

                { "data": "GensetCapacity" },
            
                { "data": "TotalFuelConsumption" },

                //{ "data": "MonthlyConsumption" },

                { "data": "filling" },

                //{ "data": "Monthlyfilling" },
                                  
                { "data": "Drainage" },

                //{ "data": "MonthlyDrainage" },
                       
                { "data": "GensetEngine" },

                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
        ],
        "rowCallback": function (row, data, index) {
            debugger;
            if (data.Count == 0) {
              
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control');

               
             
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