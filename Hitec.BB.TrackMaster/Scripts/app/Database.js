
var table;


$(document).ready(function () {
   
    GetDatabaseSize();


});



function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};




function GetDatabaseSize() {
    debugger;
    var baseUrl = "http://localhost:3970/api/";
    deleteTable();
    var url = baseUrl + "TrackerReport/GetDatabaseSize";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 50,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[50], [50]],
        "fnServerParams": function (param) {
            param.push({ "name": "custid", "value": "0" });
        },

        "columns": [
      
    { "data": "Dbname", "orderable": false },
{ "data": "DbStatus", "orderable": false },
{ "data": "Recovery_Model", "orderable": false },
{ "data": "DBSizee", "orderable": false },
{ "data": "File_size", "orderable": false },
{ "data": "Space_used", "orderable": false },
{ "data": "Free_Space", "orderable": false },
{ "data": "Log_File_size", "orderable": false },
{ "data": "Log_space_used", "orderable": false },
{ "data": "Log_free_space", "orderable": false },
{ "data": "Db_Freespace", "orderable": false },

               
        ]
      
    });

   
}



