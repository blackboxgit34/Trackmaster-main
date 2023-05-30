var table;



$(document).ready(function () {
  

    var start = moment().subtract(1, 'years').startOf('day');
    var end = moment().add(1, 'years').startOf('day');;

    $('#reportrange span').html(start.format('MMM D YYYY, h:mm:ss a') + ' - ' + end.format('MMM D YYYY, h:mm:ss a'));
    $beginDate = start.format('MMM D YYYY h:mm:ss a');
    $endDate = end.format('MMM D YYYY h:mm:ss a');
    GetMCBLocationDetails(null);

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
    GetMCBLocationDetails(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/GetHouseDetailsMCB";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/GetHouseDetailsMCB";
    DownloadData(url, downloadType);
});


function GetMCBLocationDetails(downloadType) {
    
   
    deleteTable();    
    
 

  
    var url = baseUrl + "CustomAPI/GetHouseDetailsMCB";

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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate },{ "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "Zone",
                    "bSortable": false
                },
                {
                    "data": "HouseNo",
                    "bSortable": false
                },
                 {
                     "data": "Society",
                     "bSortable": false
                 },
                  {
                      "data": "DateTime",
                      "bSortable": false
                  },
                   {
                       "data": "Location",
                       "bSortable": false
                   },
                   
        ]
        
    });
}



function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'House_Details_Report_' + $beginDate + '_TO_' + $endDate;

   
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}