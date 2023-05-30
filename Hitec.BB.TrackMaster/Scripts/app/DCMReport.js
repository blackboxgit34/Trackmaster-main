
function format(d) {
    
    var data = d;

    if (data.dataCount > 0) {
        var a = data.objTravelReport;

        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>First IgnitionOn Date</th><th>Last IgnitionOff Date</th><th>Distance</th><th>Max Speed</th><th>Speed Limit</th><th>OverStoppages</th><th>StoppageTime</th><th>Driving Time</th><th>Idling Time</th><th>Over Speed Count </th><th>Start Location</th><th>Stop Location</th></tr></thead>';

        a.forEach(function (element) {
            //console.log(element.Location);
            debugger
            tableString = tableString +
              '<tr>' +
              '<td>' + element.Startdate + '</td>' +
              '<td>' + element.Enddate + '</td>' +
              '<td>' + element.Distance + '</td>' +
              '<td>' + element.MaxSpeed + '</td>' +
              '<td>' + element.SpeedLimit + '</td>' +
              '<td>' + element.OverStoppages + '</td>' +
              '<td>' + element.StoppageTime + '</td>' +
              '<td>' + element.Drivingduration + '</td>' +
               '<td>' + element.IdlingTime + '</td>' +
              '<td>' + element.OverSpeedings + '</td>' +
              '<td>' + element.StartLocation + '</td>' +  
              '<td>' + element.StopLocation + '</td>' +                       
              '</tr>'
        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}
var search;
$(document).ready(function () {

    search = "";
    GetDCMCabTravelReport(null);
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
    search = "Search";
    GetDCMCabTravelReport(null);
});

$("#BtnAllSearch").click(function () {
    search =null;
    GetDCMCabTravelReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Taxiapi/DMCReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Taxiapi/DMCReport";
    DownloadData(url, downloadType);
});

function GetDCMCabTravelReport(downloadType) {
    
  
    // clear tables contents
    deleteTable();
    var url = baseUrl + "Taxiapi/DMCReport";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        language: {
            searchPlaceholder: "Search Cab Number",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate },
                { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'DCM Cab  Report' }, { "name": "tripstatus", "value": parseInt($("#triptypeList").val()) }, { "name": "status", "value": parseInt($("#StatusList").val()) }, { "name": "search", "value": search });
        },

        "columns": [
                { "data": "CabNo" },
 { "data": "From" },
 { "data": "To" },
 
            { "data": "requestdate" },
            { "data": "hiredate" },
            { "data": "BookFor" },
 { "data": "Username" },
 //{ "data": "Isreceivedbytaxihead" },
 { "data": "driverid" },
 //{ "data": "taxid" },
 //{ "data": "isdriveractive" },

  {

      "data": null,
      "width": "20%",
      "orderable": false, "targets": 0,
      "render": function (data, type, full, meta) {
      
          return '   <img src="' + full.startodometerimage.replace("http", "http") + '" class="zoom"/>';
      
      }
  },
  {

      "data": null,
      "width": "20%",
      "orderable": false, "targets": 0,
      "render": function (data, type, full, meta) {


          return '   <img src="' + full.endodometerimage.replace("http", "http") + '" class="zoom"/>';

      }
  },
{

    "data": null,
    "width": "20%",
    "orderable": false, "targets": 0,
    "render": function (data, type, full, meta) {
      
        return '  <span> ' + full.startodometerreading + '<span/> km';
      
    }
},{

    "data": null,
    "width": "20%",
    "orderable": false, "targets": 0,
    "render": function (data, type, full, meta) {
      
        return '   <span>' + full.endodometerreading + '<span/> km';
      
    }
},
{

    "data": null,
    "width": "20%",
    "orderable": false, "targets": 0,
    "render": function (data, type, full, meta) {

        return '   <span>' + full.fuelreading + '<span/> Ltr';

    }
},
{

    "data": null,
    "width": "20%",
    "orderable": false, "targets": 0,
    "render": function (data, type, full, meta) {

        return '   <span>' + full.fuelprice + '<span/> Rs/Ltr';

    }
},
 
 {

     "data": null,
     "width": "11%",
     "orderable": false, "targets": 0,
     "render": function (data, type, full, meta) {




         return '   <img src="' +  full.fuelreceipt.replace("http", "http") + '" class="zoom"/>';

     }
 },
 //{ "data": "fuelreceipt" },
 
 { "data": "Tripstartdate" },
 { "data": "Tripenddate" },
 { "data": "status" },
 //{ "data": "alert" },
             
               
        ],
        "rowCallback": function (row, data, index) {
            
            if (data.dataCount == 0) {


                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });

    //for filter from live status
    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
}
function DownloadData(url, downloadType) {
    var tripstatus=parseInt($("#triptypeList").val());
    alert(tripstatus);
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");

    var reportName = 'DCM_Cab_Report_' + sdt + '_TO_' + edt;
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid= &downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&status=" + parseInt($("#StatusList").val()) + "&tripstatus=" + tripstatus + "&search=" + search + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;

   // var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate +"&bbid= &downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;


    window.onbeforeunload = function () {
        $('.body').block({
            message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>',
            centerX: true,
            centerY: true,
            css: {
                width: '300px',
                height: '300px',
                // border: '3px solid #FF9900',
                //  backgroundColor: '#000',
                color: 'black',
                padding: '25px'
            }
        });
        return null;
    }
}


