function format(d) {
    var data = d;
    debugger;
    var records = 0;
    if (data.poisCovered > 0) {
        var a = data.poisCoveredList;
        var tableString = '<div class="table-users"> <div class="header"><b >Records </b> ' + data.poisCovered + '</div> <div class="header">Details</div><table  cellspacing="0">  <tr> <th></th><th>Poi</th><th>Outtime</th> <th>Intime</th> <th>Duration</th><th>Distance</th> <th>status</th><th>Link</th></tr>';

     
        a.forEach(function (element) {

            records =parseInt( records) + 1;
           
            tableString = tableString +
                '<tr >' +
    ' <td><img src="http://trackmaster.in/Trackmaster_files/CustomReportIcons/truck-logo.jpg" alt=""  style="border-radius: 50%; height: 60px;  width: 60px;"/></td>' +
            '<td>' + element.POIName + '</td>' +

            
            '<td>' + element.OutTime + '</td>' +
             
                 '<td>' + element.Intime + '</td>' +
         
            '<td>' + element.duration + '</td>' +
                '<td>' + element.Distance + '</td>' +
             '<td>' + element.status + '</td>' +
            '<td><a href="/map/replay?tableNameLvStatus=' + element.bbid + '&begindate=' + element.OutTime + '&enddate=' + element.Intime + '&vehicleNameLvStatus=' + element.Vehname + '" target="_blank;">Route PlayBack</a><td>'
             
            '</tr>'

            
        });

        tableString = tableString + '</table></div>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    GetEntryExitReport();
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
    GetEntryExitReport();
});

function GetEntryExitReport() {
    
    deleteTable();
  
    var url = baseUrl + "CustomAPI/GetTripsCountthroughPOI";
    console.log("custid: " + $custid);
    table = $('#dt_basic_Master').DataTable({
      
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": null }, { "name": "reportName", "value": 'Exit_Entry Report' });
        },

        "columns": [
               {
                   "orderable": false,
                   "targets": 0,
                   "className": 'details-control',
                   "orderable": false,
                   "data": null,
                   "defaultContent": ''
               },
                { "data": "VehName" },
                { "data": "driverName" },
                { "data": "poisCovered" },
              
                
                
        ],
        "rowCallback": function (row, data, index) {
            if (data.poisCovered == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
}

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/GetTripsCountthroughPOI";
    DownloadData(url, downloadType);
});

function DownloadData(url, downloadType) {
    
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");

    var reportName = 'Exit_Entry Report';
    //var reportName = 'Distance_Report_' + sdt + '_TO_' + edt;

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



