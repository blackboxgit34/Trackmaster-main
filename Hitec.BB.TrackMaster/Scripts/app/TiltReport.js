var table;
function getVal(val) {
    switch (val) {
        case 10:
            return 210;
            break;
        case 20:
            return 0;
            break;
        case 30:
            return 160;
            break;
        case 40:
            return 320;
            break;
        case 50:
            return 110;
            break;
        case 60:
            return 270;
            break;
        case 70:
            return 60;
            break;
        case 80:
            return 220;
            break;
    }
}
function graph(angle) {
    var id = "myCanvas" + angle;
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    x1 = 125; y1 = 125; r = 100;
    var theta;
    var val = angle;
    var degree = getVal(Math.round(val / 10) * 10);
   
    var xx, yy;

    ctx.font = "20px Arial";
    ctx.fillText(val + "° Lift", 10, 40);
    ctx.font = "10px Arial";
    ctx.fillText("0°", 10, 128);
    ctx.font = "10px Arial";
    ctx.fillText("90°", 120, 20);
    theta = ((degree - 4.718) * 360) / (6.28 - 4.718);
    ctx.moveTo(x1, y1);
    xx = x1 - r * Math.cos(theta);
    yy = y1 + r * Math.sin(theta);

    if (val >= 50) { ctx.strokeStyle = '#ff0000'; }
    ctx.lineTo(xx, yy);
    ctx.stroke();

    theta = 4.718;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - r * Math.cos(theta), y1 + r * Math.sin(theta));
    ctx.stroke();

    theta = 6.28;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - r * Math.cos(theta), y1 + r * Math.sin(theta));
    ctx.stroke();
}
function Fungraph(d) {
    var data = d;
    var a = data.objTiltReport;
    a.forEach(function (element) {
        debugger;
        graph(element.Angle);
    });
}
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
            '<td><canvas id="myCanvas'+element.Angle+'" width="150" height="150"style=" pointer-events:none;"></canvas> </td>' 
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
            debugger;
            Fungraph(row.data());
            tr.addClass('shown');
           
        }

        $(".test th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $(".test th").css("color", "White");

    })

});
$("#BtnSearch").click(function () {
    GetDumperLidReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetConsolidatedTiltReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetConsolidatedTiltReport";
    DownloadData(url, downloadType);
});

function GetDumperLidReport(downloadType) {
    deleteTable();
    var url = apiBase.apiurl + "ReportsApi/GetConsolidatedTiltReport";

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
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' }, { "name": "CommandName", "value": $('#Typelist').val() });
        },

        "columns": [
                {
                    "data": "bbid",
                    "class": "hidden"
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
    var reportName = 'Tilt_Angle_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0 + "&CommandName=" + $('#Typelist').val();
    window.location = url1;
}