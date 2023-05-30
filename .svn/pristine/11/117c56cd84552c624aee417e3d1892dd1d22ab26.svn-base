
function format(d) {
    
    var data = d;

    if (data.Count > 0) {
        
        //var a = data.overSpeedData;
        var inRange = parseInt(data.InRangeSpeed);
        var outRange = parseInt(data.Count) - parseInt(data.InRangeSpeed);
        var bbid = data.BBID;


        //console.log(element.Location);
        //console.log(element.Location);
        tableString = '<div id=' + data.BBID + ' style="width: 500px; height: 250px;"></div>';
        // google.setOnLoadCallback(drawChart);

        tableString = tableString;

        //  google.charts.load("current", { packages: ["corechart"] });
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            
            var data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['Average in Range', inRange],
              ['Out of range', outRange],
              //['Commute', 2],
              //['Watch TV', 2],
              //['Sleep', 7]
            ]);

            var options = {
                title: 'Average Speed Range'
            };
            var chart;
            try {
                document.getElementById('popup').style.display = 'block';
                chart = new google.visualization.PieChart(document.getElementById('graphDiv'));
            }
            catch (exe) {
                toastr.warning("Please minimize, already opened graph.");
            }

            chart.draw(data, options);
        }
    }
    else {
        var tableString = '<div>';

        //console.log(element.Location);
        tableString = tableString +
            '<p>' +
        'There is no data for <b>' + data.VehicleName + '</b> between selected Dates.';
        tableString = tableString + '</p></div>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    GetOverSpeed();
    // Add event listener for opening and closing details
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        
        var tr = $(this).closest('tr');
        //for getting bbid from datatable
        bbid = tr[0].lastChild.innerHTML;
        var row = table.row(tr);

        if (row.child.isShown()) {
            
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            location.reload(true);
        }
        else {
            
            var inRange = parseInt(row.data().InRangeSpeed);
            var outRange = parseInt(row.data().Count) - parseInt(row.data().InRangeSpeed);
            //  google.charts.load("current", { packages: ["corechart"] });
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                
                var data = google.visualization.arrayToDataTable([
                  ['Task', 'Hours per Day'],
                  ['Average in Range', inRange],
                  ['Out of range', outRange],
                  //['Commute', 2],
                  //['Watch TV', 2],
                  //['Sleep', 7]
                ]);

                var options = {
                    title: 'Average Speed Range For: ' + row.data().VehicleName,
                    pieHole: 0.3,
                    colors: ['#8e9d13', '#faa732']

                };
                var chart;
                try {
                    //var div= document.getElementById('popup');
                    // document.getElementById('popup').style.display = 'block';
                    // div.css({
                    //     position: "absolute",
                    //     top: event.pageY,
                    //     left: event.pageX
                    // });
                    document.getElementById('popup').style.display = 'block';

                    var d = document.getElementById('popup');
                    var e = window.event;

                    var width = $(window).width() / 2;
                    var height = $(window).height() / 2;

                    var top = e.offsetY - $(window).scrollTop();
                    
                    //if (top > (height - 250)) {
                    //    d.style.top = top - $(this).height() + 'px';
                    // //   $('#popup').css('top', top - $('#popup').height() - $(this).height() + 'px');
                    //}
                    //else {
                    //    d.style.top = top + $(this).height() + 'px';
                    //   // $('#popup').css('top', top + $(this).height() + 'px');
                    //}
                    d.style.position = "fixed";
                    d.style.right = width - 200 + 'px';
                    d.style.top = height - 100 + 'px';
                    //document.getElementById('popup').style.position = 'absolute';
                    //document.getElementById('popup').style.top = event.pageY;
                    //document.getElementById('popup').style.left = event.pageX;

                    //.css( {position:"absolute", top:event.pageY, left: event.pageX});
                    chart = new google.visualization.PieChart(document.getElementById('graphDiv'));
                }
                catch (exe) {
                    toastr.warning("Please minimize, already opened graph.");
                }

                chart.draw(data, options);
            }
            // Open this row
            //row.child(format(row.data())).show();
            //tr.addClass('shown');

        }
        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })

});

$("#BtnSearch").click(function () {
    GetOverSpeed();
});

$("#GraphClose").click(function () {
    document.getElementById('popup').style.display = 'none';
});


function GetOverSpeed() {
    // clear tables contents
    deleteTable();
    // set date-time
    //setDateTime();
    // set export URL
    getOverSpeedExcel($beginDate, $endDate);

    var url = baseUrl + "AdminAPI/GetAverageSpeedReport";
    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img id='loaderGif' src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "custid", "value": $custid }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" });
        },

        "columns": [
                { "data": "VehicleName" },
                { "data": "DriverName" },

                
                { "data": "SpeedRangeProp" },
                {
                 "render": function (data, type, full, meta) {
                     var percentage = (parseInt(full.InRangeSpeed) * 100) / full.Count;
                     debugger
                     return '<span>' + percentage.toFixed() + '% </span>';
                                                             }
                },
                {
                  "render": function (data, type, full, meta) {
                      var percentage = (parseInt(full.InRangeSpeed) * 100) / full.Count;
                      debugger
                      if (percentage) {
                          var score;
                          
                          if (parseInt(percentage.toFixed().toString()[1]) > 5) {
                              score = (parseInt(percentage.toFixed().toString()[0])) * 10 + 10;
                          }
                          else {
                              score = (parseInt(percentage.toFixed().toString()[0])) * 10;
                          }

                          //addScore(score, $("#fixture" + full.BBID));
                          return '<span class="stars-container   stars-' + score.toString() + '">★★★★★</span>';
                      }
                      return '<span>No Data</span>';
                  }


              },
               {
                   "orderable": false,
                   "targets": 0,
                   "className": 'details-control',
                   "orderable": false,
                   "data": null,
                   "defaultContent": ''
               },
                {
                    "data": "BBID",
                    "class": "hidden"
                }
        ],
        "rowCallback": function (row, data, index) {
            if (data.overspeedCount == 0) {

                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
}
function getOverSpeedExcel(start, end) {
    var url = baseUrl + "test/export?custId=1619&v=1.00.000";
    $('#excelDown').attr('href', url);
}