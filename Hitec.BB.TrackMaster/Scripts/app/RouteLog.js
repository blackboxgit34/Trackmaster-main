$(document).ready(function () {
    debugger;
    GetVehListReport(null);
    BindCompany();
    debugger;
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
    GetVehListReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/GetRouteLog";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/GetRouteLog";
    DownloadData(url, downloadType);
});

function GetVehListReport(downloadType) {
    debugger;
    // clear tables contents
    deleteTable();

    var search = null;
    var url = baseUrl + "AddOnAPI/GetRouteLog";
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "search", "value": search }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [
             { "data": "CompanyName" },
               { "data": "vehname" },
                { "data": "ReaderName" },
                  { "data": "InDate" },
                  
                   
                      { "data": "OutDate" },
                      {"data":"Outgate"},
                        { "data": "duration" }
                       

                        

        ],

    });


    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
}
function DownloadData(url, downloadType) {
    debugger;
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");

    var reportName = 'RegisterdVehicles' + sdt + '_TO_' + edt;

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid= &downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
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

function BindCompany() {
    var Url = apiBase.apiurl + 'AddOnAPI/GetGodrejCompanyList';

    $.get(Url, function (data) {
        $("#ddlCompanyName").append($("<option>Select Company Name </option>"));
        $.each(data, function (key, value) {
           
            $("#ddlCompanyName").append($("<option> </option>").val(value.Value).html(value.Name));
        });
    });
}

$("#ddlCompanyName").change(function () {
    deleteTable();
    var downloadType = null;
   
    var search = $('#ddlCompanyName option:selected').text();
   
    var url = baseUrl + "AddOnAPI/GetRouteLog";
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "search", "value": search }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [

                { "data": "ReaderName" },
                  { "data": "InDate" },
                    { "data": "vehname" },
                    { "data": "CompanyName" },
                      { "data": "OutDate" },
                      { "data": "Outgate" },
                        { "data": "duration" }




        ],

    });


    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
   

});