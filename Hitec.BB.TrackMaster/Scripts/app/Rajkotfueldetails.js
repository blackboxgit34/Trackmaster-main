var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    
};
$(document).ready(function () {
    GetallstoppageReport(null);

   
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {

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
    $("#interval").change(function () {
        GetallstoppageReport(null);

    });

});
$("#BtnSearch").click(function () {

    
    GetallstoppageReport(null);

});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetrajkotfuelReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetrajkotfuelReport";
    DownloadData(url, downloadType);
});

function GetallstoppageReport(downloadType) {
    
    deleteTable();
   
   
   
    var url = apiBase.apiurl + "ReportsApi/GetrajkotfuelReport";
    var i = 0;
    table = $('#dt_basic_Master').DataTable({
       
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50,100], [5, 10, 20, 25, 50,100]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "bbid", "value": "" }, { "name": "interval", "value": null }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
             {
                 "orderable": false, "targets": 0,
                 "render": function (data, type, full, meta) {
                     i++;

                     return i;



                 }
             },
                 { "data": "VehicleName" },
                
                 { "data": "type" },
                 { "data": "daystart" },
                  { "data": "dayend" },
                  { "data": "TotalDistance" },
                
                 //{ "data": "Theft" },
                 { "data": "Totalconsumption" },
                 { "data": "TotalMileage" },
                 { "data": "TotalFilling" },
                 //{ "data": "drainlocation" },
                
        ],
        "rowCallback": function (row, data, index) {
           
            if (data.StoppageCount == "0") {
                
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
    var reportName = 'Rajkot_FuelData_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
   
    var $interval =null;
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&interval=" + $interval + "&downloadType=" + downloadType + "&reportName=" + reportName + "&CustId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}