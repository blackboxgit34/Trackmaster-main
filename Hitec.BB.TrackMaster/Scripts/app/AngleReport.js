﻿var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    GetAngleReport();
});
$("#BtnSearch").click(function () {
    GetAngleReport();
   

});

function GetAngleReport() {

    deleteTable();
    
    //var $custid = '1619';
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/ReportsApi/GetAnglereport";
    var url = apiBase.apiurl + "CustomAPI/GetAnglereport";
    //console.log('Calling URL: ' + url + ' to get Report data.');
    table = $('#dt_basic_Master').DataTable({
        "oLanguage": {
            "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        },
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        fixedHeader: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid });
        },

        "columns": [
                { "data": "VehName" },
                { "data": "CurrentAngle" },
                { "data": "Lowest" },
                { "data": "Highest" },
                 {
                     "orderable": false, "targets": 0,
                     "render": function (data, type, full, meta) {
                         return '<div class="mouseon-examples">' + '<a href="/CustomReport/AngleDetailReport">Details</a>' + '</div>';
                     }
                 },
        ]


    });
}