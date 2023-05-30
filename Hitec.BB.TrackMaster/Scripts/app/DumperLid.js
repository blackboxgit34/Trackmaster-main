var table;

function format(d) {
    
    var data = d;
    console.log(data);

    if (data.TotalSubRecords > 0) {
        var a = data.objDumperReport;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th> Open Time</th><th>Closed Time</th><th>Duration (Day-hh:mm:ss)</th><th>Location</th></tr></thead>';
        a.forEach(function (element) {
            //console.log(element.Location);
            tableString = tableString +
                '<tr>' +
            '<td>' + element.OpenDate + '</td>' +
            '<td>' + element.CloseDate + '</td>' +
            '<td>' + element.Duration + '</td>' +
            '<td>' + element.Location + '</td>' +
            '</tr>'
        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    GetDumperLidReport(null);
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
    GetDumperLidReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetConsolidatedDumperReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetConsolidatedDumperReport";
    DownloadData(url, downloadType);
});

function GetDumperLidReport(downloadType) {
    deleteTable();
    var url = apiBase.apiurl + "ReportsApi/GetConsolidatedDumperReport";

    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' },{ "name": "CommandName", "value": $('#Typelist').val() });
        },

        "columns": [
                {
                    "data": "bbid",
                    "class":"hidden"
                },
                { "data": "VehName" },
                { "data": "driverName" },
                { "data": "TotalSubRecords" },
                //{
                //    "data": null,
                //    "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                        
                //        $(nTd).html("<a href='/Report/DumperLidDetail?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + oData.bbid +"'>Detail</a>");
                //    }
                //},
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
            
            if (data.TotalSubRecords == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
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
    var reportName = 'DumperTilt_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0 + "&CommandName=" + $('#Typelist').val() ;
    window.location = url1;
}