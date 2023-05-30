var vehicletype;
var s;
function format(d) {
    var data = d;

    if (data.Count > 0) {
        var a = data.overSpeedData;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Date Time</th><th>Location</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
                '<tr>' +
            '<td>' + moment(element.DateTime).format("MMM D YYYY, hh:mm:ss a") + '</td>' +
            '<td>' + element.Location + '</td>' +
           
            '</tr>'
        });
        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}
$("#VehicleTypeList").change(function () {
    //vehicletype = $("#VehicleTypeList").val();
    GetOverSpeed(null);
});
$(document).ready(function () {
    $("#pdfExport").css("display", "none");
    s = "1";
    //vehicletype = "0";
    //GetVehicleTypesList();
    //    swal({
    //        title: "ALERT!",
    //        text: "Want to change the Over-Speed Limit? Click OK to change over-speed Limit.",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "OK",
    //        cancelButtonText: "Cancel",
    //        closeOnConfirm: false,
    //        closeOnCancel: false, timer: 5000
    //    },
    //function (isConfirm) {
    //    if (isConfirm) {
    //        window.location.href = '/admin/UpdateOverSpeedStopSettings/';

    //    }
    //    else {
    //        // location.reload();
    //        swal("Done");
    //    }
    //});
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
    s = "2";
    GetOverSpeed(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetAccelerationReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetAccelerationReport";
    DownloadData(url, downloadType);
});

function GetOverSpeed(downloadType) {
    deleteTable();
    var url = baseUrl + "Reportsapi/GetAccelerationReport";
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' }, { "name": "mode", "value": 'Deacceleration' });
        },

        "columns": [
                { "data": "vehname" },
                { "data": "driverName" },
                 { "data": "Count" },

               // { "data": "maxSpeed" },


                //{ "data": "overSpeedDuration" },
                {
                    "orderable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }

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
        "rowCallback": function (row, data, index) {
            if (data.Count == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
    if (s == "1") {
        var vehicleName = getUrlParameter('Vehicleno');
        if (vehicleName) {
            debugger;
            var from = getUrlParameter('From');
            var To = getUrlParameter('To');

            $beginDate = from;
            $endDate = To;
            table.search(vehicleName).draw();
        }


    }
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
    var reportName = 'DeAcceleration_Report_' + sdt + '_To_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&mode=over&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0 + "&mode=Deacceleration";
    window.location = url1;
}
