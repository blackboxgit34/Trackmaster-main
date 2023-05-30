
$(document).ready(function () {
   
    GetReport(null);


});

$("#BtnSearch").click(function () {
    GetReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AdminAPI/GetDutyRoaster";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {

    var downloadType = 'PDF';
    var url = baseUrl + "AdminAPI/GetDutyRoaster";

    DownloadData(url, downloadType);
});

function GetReport(downloadType) {

    deleteTable();
    var url = baseUrl + "AdminAPI/GetDutyRoaster";
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Distance Report' });
        },

        "columns": [
                { "data": "startdate" },
                { "data": "enddate" },
                { "data": "RouteName" },
                { "data": "Vehname" },
                { "data": "startLocation" },
                { "data": "EndLocation" },
                 
                { "data": "Via" },
                    
                { "data": "speed" },
                { "data": "Departure" },
                { "data": "arrivaltime" },
                      
                   

                   
        ]
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

    var reportName = 'Distance Report';
    //var reportName = 'Distance_Report_' + sdt + '_TO_' + edt;

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid= &downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0 + "&type=" + vehicletype;

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


