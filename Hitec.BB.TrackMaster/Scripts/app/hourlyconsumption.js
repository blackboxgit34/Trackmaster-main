var table;



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

 
});

$("#BtnSearch").click(function () {
    GetFuelEngineWorkingReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetDGWorkingReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetDGWorkingReport";
    DownloadData(url, downloadType);
});

function GetFuelEngineWorkingReport(downloadType) {

    deleteTable();
    var url = baseUrl + "ReportsApi/GetDGWorkingReport";
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
                    {"data":"Detaildate"},
                    //{ "data": "BTSId" },
                    { "data": "DGName" },
                    //{ "data": "Circle" },
                    //{ "data": "Cluster" },
                    //{ "data": "District" },
                    { "data": "OpeningFuel" },
                    { "data": "ClosingFuel" },
                    { "data": "Consumption" },
                    { "data": "FuelFilling" },
                    { "data": "DGworkingHour" },
                    { "data": "Consumptionperhour" },
                    { "data": "Drainage" },

                
        ],
   
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
    var reportName = 'DG_Working_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}