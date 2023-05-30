var table;

function format(d) {

    var data = d;
    console.log(data);

    if (data.TotalSubRecords > 0) {
        var a = data.objTiltReport;
        var tableString = '<table id="subTbl' + data.bbid + '" cellpadding="5" class="table table-hover test" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th> Open Time</th><th>Closed Time</th><th>Duration (Day-hh:mm:ss)</th><th>Open Location</th><th>Close Location</th><th>Lift Angle</th></tr></thead>';
        a.forEach(function (element) {

            tableString = tableString +
                '<tr>' +
            '<td>' + element.OpenDate + '</td>' +
            '<td>' + element.CloseDate + '</td>' +
            '<td>' + element.Duration + '</td>' +
            '<td>' + element.OpenLocation + '</td>' +
            '<td>' + element.CloseLocation + '</td>' +
            '<td><canvas id="myCanvas' + element.Angle + '" width="150" height="150"style=" pointer-events:none;"></canvas> </td>'
            '</tr>'

        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    debugger;
    getfuellocation(null);
    //$('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
    //    var tr = $(this).closest('tr');
    //    var row = table.row(tr);
    //    if (row.child.isShown()) {
    //        // This row is already open - close it
    //        row.child.hide();
    //        tr.removeClass('shown');
    //    }
    //    else {

    //        // Open this row
    //        row.child(format(row.data())).show();
    //        debugger;
    //        Fungraph(row.data());
    //        tr.addClass('shown');

    //    }

    //    $(".test th").css("background-color", "rgba(128, 128, 128, 0.74)");
    //    $(".test th").css("color", "White");

    //})

});
$("#BtnSearch").click(function () {
    getfuellocation(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AdminAPI/getfuellocations";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AdminAPI/getfuellocations";
    DownloadData(url, downloadType);
});

function getfuellocation(downloadType) {
    deleteTable();
    var url = apiBase.apiurl + "AdminAPI/getfuellocations";

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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid });
        },

        "columns": [
                {
                    "render": function (data, type, full, meta) {
                        return full.addedon.replace('T', ' ');
                    }
                },
                { "data": "vehname" },
                { "data": "location" },
                {
                    "render": function (data, type, full, meta) {
                        if (full.completedon == '') {
                            return "Pending";
                        }
                        else {
                            return full.completedon.replace('T', ' ');
                        }
                    }
                },
                 {
                     "render": function (data, type, full, meta) {
                         if (full.completedon == '') {
                             return "Pending";
                         }
                         else {
                             return full.duration;
                         }
                     }
                 },
                {
                    "render": function (data, type, full, meta) {
                        if (full.completedon == '') {
                            return "Pending";
                        }
                        else {
                            return full.intime.replace('T', ' ');
                        }
                    }
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
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'Tilt_Angle_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0 + "&CommandName=" + $('#Typelist').val();
    window.location = url1;
}
