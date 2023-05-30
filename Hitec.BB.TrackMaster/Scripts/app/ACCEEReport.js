function format(d) {
    var data = d;

    if (data.poisCovered > 0) {
        var a = data.poisCoveredList;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>POI Name</th><th>In Time</th><th>Out Time</th><th>Duration</th><th>POIType</th><th>Distance</th><th>cumulative </th></tr></thead>';
        a.forEach(function (element) {
            //console.log(element.Location);
            tableString = tableString +
                '<tr>' +
            '<td>' + element.POIName + '</td>' +
            '<td>' + element.Intime + '</td>' +
            '<td>' + element.OutTime + '</td>' +
            '<td>' + element.duration + '</td>' +
              '<td>' + element.POIType + '</td>' +
                '<td>' + element.Distance + '</td>' +
                '<td>' + element.TotalDistance + '</td>' +

                
            '</tr>'
        });

        tableString = tableString + '</table>';
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
   
    var url = baseUrl + "CustomAPI/ACCEEReport";
    console.log("custid: " + $custid);
    table = $('#dt_basic_Master').DataTable({
       
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": null }, { "name": "Interval", "value": $('#Timelist').val() }, { "name": "reportName", "value": 'Entry-Exit Report' });
        },

        "columns": [
              
                { "data": "VehName" },
                { "data": "driverName" },
                { "data": "poisCovered" },
                {
                    "orderable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }
        ],
        "rowCallback": function (row, data, index) {
          
            $.each(data,function(item,val)
            {
              
                if (item.poisCovered == 0) {

                    var target = $(row).find(".details-control");
                    var index = (target).index();
                    $(row).find('td:eq(' + index + ')').removeclass('details-control')
                }
            });

            
        }
    });
}



$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/ACCEEReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/ACCEEReport";
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

    var reportName = 'ACC_TRacking_Report';
 
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