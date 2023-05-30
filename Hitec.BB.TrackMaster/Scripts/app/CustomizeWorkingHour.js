var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    GetWorkingHourReport();

});
$("#BtnSearch").click(function () {
    GetWorkingHourReport();

});

function GetWorkingHourReport() {
  
    deleteTable();
    
    var $custid = '4586';
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/ReportsApi/GetWokingHourreport";
    var url = apiBase.apiurl + "ReportsApi/GetWokingHourreport";
    console.log('Calling URL: ' + url + ' to get Report data.');
    table = $('#dt_basic_Master').DataTable({
        "oLanguage": {
            "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        },
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid });
        },

        "columns": [
                { "data": "VehName" , "orderable": true },
                { "data": "MainEngineWorkingHours", "orderable": false },
                { "data": "auxip3WorkingHours", "orderable": false },
                { "data": "auxip4WorkingHours", "orderable": false },
                { "data": "distance", "orderable": false }
        ]
       
    });
}