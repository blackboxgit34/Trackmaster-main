function format(d) {
    var data = d;

    if (data.overspeedCount > 0) {
        var a = data.overSpeedData;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-bordered" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Date Time</th><th>Location</th><th>Speed</th></tr></thead>';
        a.forEach(function (element) {
            //console.log(element.Location);
            tableString = tableString +
                '<tr>' +
            '<td>' + element.DateTime + '</td>' +

            '<td>' + element.Location + '</td>' +

            '<td>' + element.Speed + '</td>' +
            '</tr>'
        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    GetOverSpeed();
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
    GetOverSpeed();
});

function GetOverSpeed() {
    // clear tables contents
    deleteTable();
    // set date-time
    console.log($beginDate);
    console.log($endDate);

    var url = baseUrl + "Reportsapi/GetOverSpeedReport";
    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img id='loaderGif' src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        //"processing": true,
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid });
        },

        "columns": [
                { "data": "vehname" },
                { "data": "driverName" },
                { "data": "overspeedCount" },
                { "data": "overspeedLimit" },
                { "data": "maxSpeed" },
                { "data": "overSpeedDuration" },
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
            //if (data.overspeedCount == 0) {

            //    var target = $(row).find(".details-control");
            //    var index = (target).index();
            //    $(row).find('td:eq(' + index + ')').removeClass('details-control')
            //}
        }
    });
}

