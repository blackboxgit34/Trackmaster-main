var table;

function format(d) {
    debugger;
    
    var data = d;

    if (data.objCount > 0) {
        var totaldrainage = 0;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Before Drain Date</th><th>Before Drain </th><th>After Drain Date</th><th>After Drain </th><th >Drainage(Ltr)</th><th >Drainage Area </th></tr></thead>';
        data.FueltheftMainModel.forEach(function (element) {
            debugger;
           
            tableString = tableString +
                '<tr>' +
                '<td>' + element.StartDateTime + '</td>' +
                '<td>' + parseInt(element.FirstFilling) + '(Ltr)</td>' +
                '<td>' + element.EndateTime + '(Ltr)</td>' +
                '<td>' + parseInt(element.LastFiliing) + '(Ltr)</td>' +
                //'<td>' + element.Distance + '(Km)</td>' +
                '<td>' + parseInt(element.DifferenceFuelLevel) + '(Ltr)</td>' +
                 '<td>' + element.StartLocation + '</td>' +
                   '<td><select  onchange="myFunction( \'' + element.StartDateTime + '\', \'' + element.EndateTime + '\',\'' + element.bbid + '\')" id="ddft"><option value="0">Select Reason</option><option value="1">Fake Theft</option> <option value="2">Real Theft </option></select></td>' +

            '</tr>'
        });

        tableString = tableString + '</table>';

        
      
    }
    // `d` is the original data object for the row
    return tableString;
}

function myFunction(sdate, edate,bbid) {
    debugger;
    if (confirm("Do you want to Update the  selected Value of Fuel ?")) {
        var urlss = apiBase.apiurl + 'AdminAPI/getFakefuelvalue';


     
        $.get(urlss, { sdate: sdate, edate: edate, bbid: bbid,fueltype:$("#ddft").val() }, function (data) {


            alert("Successfully Updated.");
        });

        
    }
    else
        return false;

}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {

    debugger;

    //var vid = $('#vehiclefromdate').val();
    //if (vid.length > 0) {

    //    $beginDate = vid;
    //    $endDate = $('#vehicleIdTodate').val();

      

    //    $('#reportrange span').html($beginDate + ' - ' + $endDate);

      
    //   var searchveh= $('#vehicledeviceid').val();
        
    //   $('input[type=search]').val(searchveh);
    //    $('#vehiclefromdate').val("");
        
    //}
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

    
});

$("#BtnSearch").click(function () {
    GetGeoFenceVoilationReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/FuelTheftQatarReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/FuelTheftQatarReport";
    DownloadData(url, downloadType);
});

function GetGeoFenceVoilationReport(downloadType) {
    deleteTable();
    // var $custid = '4939';
    var $BBID = '';
    var url = apiBase.apiurl + "CustomAPI/FuelTheftQatarReport";
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
            { "data": "TotalTheft" },
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

    //var vehicleName = $("input[type='search']").val();
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
    var reportName = 'Fuel_Theft_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

