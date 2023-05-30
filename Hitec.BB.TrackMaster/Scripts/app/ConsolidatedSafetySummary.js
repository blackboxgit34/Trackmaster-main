var vehicletype;


$(document).ready(function () {
      $("#pdfExport").css("display", "none");
    GetOverSpeed(null);
  

});

$("#BtnSearch").click(function () {
    GetOverSpeed(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/Drivingviolation";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetDrivingviolation";
    DownloadData(url, downloadType);
});

function GetOverSpeed(downloadType) {
    deleteTable();
    var url = baseUrl + "Reportsapi/GetDrivingviolation";
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
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "Vehname" },
                { "data": "Drivername" },
                 { "data": "NightDriving" },
                  { "data": "Continousdriving" },
                   { "data": "Overspeed" },
                    { "data": "Acceleration" },
                     { "data": "DeAcceleration" }


               

        ],
        //"fnInitComplete": function () {
        //   // $('.dataTables_filter input').attr('type', 'text');
        //    alert("inside fnInit");
        //    $(".dataTables_filter:eq(0)").after("<button class='pull-right btn btn-default' style=display:none; type=button id='x'>x</button>");
        //    $(".dataTables_filter").keyup(function (e) {
        //        if($(this).val()!=""){ $("#x").hide(); }
        //        else {$("#x").show();}
        //    });
        //    //for cross button in filter
        //    $("#x").click(function (e) {
        //        alert("cliced");
        //        $(".dataTables_filter").val('');
        //        table.search('').draw();
        //        $(this).hide();
        //    });
        //},
     
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
    var reportName = 'SafetySummary_Report_' + sdt + '_To_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&mode=over&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0 + "&mode=DeAcceleration";
    window.location = url1;
}
