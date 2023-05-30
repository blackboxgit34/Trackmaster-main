var table;
function format(d) {

    
    var data = d;

    if (data.objCount > 0) {
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Before Filling Date</th><th>Before Filling </th><th>After Filling Date</th><th>After Filling </th><th >Filling</th><th >Filling Station </th></tr></thead>';
        data.FuelFillingMainModel.forEach(function (element) {
            
            console.log(element);
            tableString = tableString +
                '<tr>' +
                '<td>' + element.StartDateTime + '</td>' +
                '<td>' + parseInt(element.FirstFilling) + '(Ltr)</td>' +
                '<td>' + element.EndateTime + '(Ltr)</td>' +
                '<td>' + parseInt(element.LastFiliing) + '(Ltr)</td>' +
                //'<td>' + element.Distance + '(Km)</td>' +
                '<td>' + parseInt(element.DifferenceFuelLevel) + '(Ltr)</td>' +
                 '<td>' + element.StartLocation + '</td>' +

            '</tr>'
        });

        tableString = tableString + '</table>';

    }
    // `d` is the original data object for the row
    return tableString;
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    debugger;
    debugger;
    var vid = getUrlParameter('fromdate');
    // var vid = $('#vehiclefromdate').val();
    //if (vid.length > 0) {
    if (vid != undefined) {
        $beginDate = vid;
        $endDate = getUrlParameter('Todate');
        // $endDate = $('#vehicleIdTodate').val();

        //$('#reportrange').daterangepicker({
        //    timePicker: true,
        //    startDate: $beginDate,
        //    endDate: $endDate,
        //    locale: {
        //        format: 'M/DD hh:mm A'
        //    }
        //});


        $('#reportrange span').html($beginDate + ' - ' + $endDate);

        //$("#reportrange").data('daterangepicker').setStartDate($beginDate);
        //$("#reportrange").data('daterangepicker').setEndDate($endDate);
        // var searchveh= $('#vehicledeviceid').val();

        var searchveh = getUrlParameter('vehicleid');

        $('input[type=search]').val(searchveh);
        $('#vehiclefromdate').val("");
        ;
    }
    GetGeoFenceVoilationReport(null);
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

    swal({
        html: true,
        title: 'Decalaration !',
        text: "(1)Fuel Graphical Report is more accurate than tabular report.So always verify fuel filling and theft report through Graphical Report. (2)Tank Fuel Level may vary with tyre pressure ,load in the vehicle and vehicle standing position.Also vary with atmospheric temperature changes.",
        icon: "warning",
        buttons: true,
        dangerMode: true,

    })
});

$("#BtnSearch").click(function () {
    GetGeoFenceVoilationReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/FuelFillingReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/FuelFillingReport";
    DownloadData(url, downloadType);
});

function GetGeoFenceVoilationReport(downloadType) {
    debugger;
    deleteTable();
   // var $custid = '4939';
    var $BBID = '';
    var url = apiBase.apiurl + "CustomAPI/FuelFillingReport";
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
        "iDisplayLength": 50,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "bbid", "value": $BBID }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                { "data": "VehicleName" },
                { "data": "objCount" },
{"data":"TotalFilling"},
                  {
                      "orderable": false,
                      "targets": 0,
                      "className": 'details-control',
                      "orderable": false,
                      "data": null,
                      "defaultContent": ''
                  },
        ],
        "rowCallback": function (row, data, index) {
            if (data.objCount == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
    var vehicleName = getUrlParameter('vehicleid');
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
    var reportName = 'Fuel_Filling_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

