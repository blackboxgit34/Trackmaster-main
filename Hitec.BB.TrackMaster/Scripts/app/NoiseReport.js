var table;
function format(d) {
    var data = d;
    debugger;
    if (data.count > 0) {
        var a = data.objnoise;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Date</th><th>Time</th><th>00</th><th>05</th><th>10</th><th>15</th><th>20</th><th>25</th><th>30</th><th>35</th><th>40</th><th>45</th><th>50</th><th>55</th><th>1 HR Leq</th><th>12 HR Leq</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
            '<tr>' +
                //'<td>' + d.VehicleName + '</td>' +
                '<td>' + moment(element.Date).format("MMM D YYYY") + '</td>' +
                '<td>' + element.Time + '</td>' +
                '<td>' + element.NoiseLevel00 + '</td>' +
                '<td>' + element.NoiseLevel05 + '</td>' +
                '<td>' + element.NoiseLevel10 + '</td>' +
               '<td>' + element.NoiseLevel15 + '</td>' +
                '<td>' + element.NoiseLevel20 + '</td>' +
                '<td>' + element.NoiseLevel25 + '</td>' +
                  '<td>' + element.NoiseLevel30 + '</td>' +
                '<td>' + element.NoiseLevel35 + '</td>' +
                '<td>' + element.NoiseLevel40 + '</td>' +
                  '<td>' + element.NoiseLevel45 + '</td>' +
                '<td>' + element.NoiseLevel50 + '</td>' +
                '<td>' + element.NoiseLevel55 + '</td>' +
                  '<td>' + element.NoiseLevel1Hr + '</td>' +
                '<td>' + element.NoiseLevel12Hr + '</td>' +
                
            '</tr>'
        });
        tableString = tableString + '</table>';
    }

    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    GetIgnitionReport(null);
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
    GetIgnitionReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetNoiseLevelReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetNoiseLevelReport";
    DownloadData(url, downloadType);
});

function GetIgnitionReport(downloadType) {

    deleteTable();
    var url = baseUrl + "ReportsApi/GetNoiseLevelReport";
    console.log('Calling URL: ' + url + ' to get Report data.');
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
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
              
                { "data": "VehicleName" },
               
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
            if (data.count == 0) {
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
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'Noise_Level_Report' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}