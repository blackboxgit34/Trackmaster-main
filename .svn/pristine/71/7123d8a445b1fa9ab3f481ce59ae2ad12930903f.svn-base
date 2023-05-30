var table;
function format(d) {
    
    var data = d;

    if (data.AcceCount > 0) {
        var a = data.objAccelerationReport;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th>Start Date</th><th>End Date</th><th> Location</th><th>Initial Speed</th><th>End Speed</th><th>Limit</th></tr></thead>';
        a.forEach(function (element) {
            

            tableString = tableString +
                '<tr>' +
                '<td>' + element.StartDate + '</td>' +
            '<td>' + element.EndDate + '</td>' +

            '<td>' + element.StartLocation + '</td>' +

            //'<td>' + element.EndLocation + '</td>' +

                '<td>' + element.InitialSpeed + '</td>' +
                  '<td>' + element.EndSpeed + '</td>' +
                    '<td>' + element.Limit + '</td>' +

            '</tr>'
        });

        tableString = tableString + '</table>';
       
    }

    // `d` is the original data object for the row
    return tableString;
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    GetAcclerationReport();

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
    GetAcclerationReport();

});

function GetAcclerationReport() {
    
    deleteTable();
   
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/Reportsapi/GetAccelerationReport";

    var url = apiBase.apiurl + "AdminAPI/GetAccelerationReport";
    console.log('Calling URL: ' + url + ' to get Report data.');
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "bbid", "value": "" });
        },

        "columns": [
                { "data": "VehicleName" },
                { "data": "DriverName" },
                { "data": "AcceCount" },
                { "data": "Rating" },
                {
                   "render": function (data, type, full, meta) {
                       
                       var percentage = full.Rating;
                       if (percentage) {
                           var score;
                           if (parseInt(full.Rating.toFixed()) > 5) {
                               score = parseInt(percentage.toFixed());
                           }
                           else {
                               score = (parseInt(percentage.toFixed())) * 10;
                           }

                           //addScore(score, $("#fixture" + full.BBID));
                           return '<span class="stars-container   stars-' + score.toString() + '">★★★★★</span>';
                       }
                       return '<span class="stars-container   stars-10'  + '">★★★★★</span>';
                   }


                },

                 
                {
                    "orderable": false, "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }


        ],
        "rowCallback": function (row, data, index) {
            //console.log(data);
            
            if (data.AcceCount == "0") {
                
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
        //"rowCallback": function (row, data, index) {
        //    if (data.IgnitionOnOffCounter == 0) {
        //        $(row).find('td:eq(5)').removeClass('details-control')
        //    }
        //}
    });
}