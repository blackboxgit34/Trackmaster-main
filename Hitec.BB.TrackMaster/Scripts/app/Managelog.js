var table;
$(document).ready(function () {

    GetVehiclesInfo(null, null);


    //$('menuddl').on('change', function (e) {
    //    console.log($(this));
    //});

    $('menuddlT005').change(function () {
        alert();
        // set the window's location property to the value of the option the user has selected
        window.location = $(this).val();
    });

});

$(document).on('click', '.top-info-square', function (e) {
    e.preventDefault();
    var vehicleStatus = $(this)[0].id;
    console.log('val: ' + vehicleStatus);
    GetVehiclesInfo(null, vehicleStatus);
});


$("#BtnSearch").click(function () {
    GetVehiclesInfo(null, null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsAPI/GetlogInfo";
    DownloadData(url, downloadType, null);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetlogInfo";
    DownloadData(url, downloadType, null);
});

function GetVehiclesInfo(downloadType, vehicleStatus) {

    // clear tables contents
    deleteTable();

    //var vehicleStatus = $("#vehicleStatus").val();

    var url = baseUrl + "FmsAPI/GetlogInfo";
    var vehicleId = 0;
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
            param.push({ "name": "vehicleId", "value": vehicleId }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "vehicleStatus", "value": vehicleStatus }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "BBID",
                    "class": "hidden",
                    "bSortable": false
                },
                    {
                        "data": null,
                        "bSortable": false,
                        "render": function (data, type, full) {
                            var VehicleImagePath = full['VehicleImagePath'];
                            var VehicleImagePath = VehicleImagePath.split(',')[0];
                            VehicleImagePath = VehicleImagePath.replace("~/", "/");
                            var imgTag = '<img src="' + VehicleImagePath + '" height=40px width=40px/>';
                            return imgTag;
                        }
                    },
                    {
                        "data": "VehicleName",
                        "bSortable": false
                    },
                    {
                        "data": "startdate",
                        "bSortable": false
                    },
                {
                    "data": "enddate",
                    "bSortable": false
                },
                 {
                     "data": "driverName",
                     "bSortable": false

                 },
                {
                    "data": "ConductorName",
                    "bSortable": false                  
                },
               
               {
                   "data": "ETMNo",
                   "bSortable": false
               },

        ]
    });
}

function doNavigate(url, vehicleId) {
    window.open(url.value, '_blank');
}

function DownloadData(url, downloadType, vehicleStatus) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = '';
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var vehicleId = 0;
    var reportName = 'VehiclesList';
    //var vehicleStatus = $("#vehicleStatus").val();
    var url1 = url + "?downloadType=" + downloadType + "&vehicleId=" + vehicleId + "&vehicleStatus=" + vehicleStatus + "&beginDate=" + $beginDate + "&endDate=" + $endDate + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}






