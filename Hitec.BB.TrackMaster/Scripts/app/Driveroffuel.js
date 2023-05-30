var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {

    Getdriverdetails();


});

function GetPoidetails() {
    
    deleteTable();
   
    var url = apiBase.apiurl + "Commonapi/GetPOIDetails";
    table = $('#dt_basic_Master').DataTable({
       
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
            param.push( { "name": "CustId", "value": $custid },{ "name": "poiid", "value": "" });
        },

        "columns": [
                { "data": "Location", "orderable": false },
                { "data": "Latitude", "orderable": false },
                { "data": "Longitude", "orderable": false },
             
                { "data": "Distance", "orderable": false },
             
                { "data": "delete", "orderable": false }
        ]


    });
}