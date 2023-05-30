﻿///// This report is used for Driver Behaviour system.

$(document).ready(function () {
    dashBoardGetOverSpeed();
    // Add event listener for opening and closing details
});

function dashBoardGetOverSpeed() {

    var url = apiBase.apiurl + "AdminAPI/GetAverageSpeedReport";

    table = $('#dt_basic_MasterOverSpeed').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img id='loaderGif' src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 5,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "custid", "value": $custid }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, {"name":"bbid", "value":""});
        },

        "columns": [
                { "data": "VehicleName" },
                { "data": "OverSpeedLimit" },
                {
                 "class": "hidden",
                 "render": function (data, type, full, meta) {
                    
                     //for getting percentage under overspeed limit
                     var num = parseInt(full.Count) - parseInt(full.OverSpeedLimitCount);
                     var percentage = num * 100 / full.Count;

                     return '<span>' + percentage.toFixed() + '% </span>';
                 }
               },
               {
                  "render": function (data, type, full, meta) {
                      var num = parseInt(full.Count) - parseInt(full.OverSpeedLimitCount);
                      var percentage = num * 100 / full.Count;
                     
                      if (percentage) {
                          if (percentage > 99) {
                              
                              return '<span class="stars-container   stars-100">★★★★★</span>';
                          }
                          else
                          {
                             

                              var score;
                              if (parseInt(percentage.toFixed().toString()[1]) > 5) {
                                  score = (parseInt(percentage.toFixed().toString()[0])) * 10 + 10;
                              }
                              else {
                                  
                                  score = (parseInt(percentage.toFixed().toString()[0])) * 10;
                              }

                              return '<span class="stars-container   stars-' + score.toString() + '">★★★★★</span>';
                          }
                      }
                      return '<span>No Data</span>';
                  }
               },
               {
                   "orderable": false,
                   "targets": 0,
                   "class": "hidden",
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



