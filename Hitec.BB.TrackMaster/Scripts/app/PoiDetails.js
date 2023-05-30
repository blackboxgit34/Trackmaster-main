var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {

    GetPoidetails();


});
function active(id) {
    
    var status;
    var id1 = "#btnactive" + id + "";
    if ($(id1).html() == "InActive") {
        status="1"
    }
    else
    {
        status="0";
    }
    $.ajax({
       
        url: apiBase.apiurl + "Commonapi/ActiveInActivePOI",
        type: "GET",
        data: { id: id, status: status },


        //contentType: 'application/json',

        success: function (data) {
            
            if (data == "1") {
             
                if ($(id1).html() == "InActive") {
                    
                    $(id1).html('Active');
                    $(id1).removeClass('label label-error');
                    $(id1).addClass('label label-success');
                }
                else {

                    $(id1).html('InActive');
                    $(id1).removeClass('label label-success');
                    $(id1).addClass('label label-error');
                }
            }
        }
    
    });
}
function Deletepoi(id) {
    
    if (confirm("Do you really want to delete this poi?")) {

        $.ajax({

            url: apiBase.apiurl + "Commonapi/deletepoi",
            type: "GET",
            data: { id: id },


            //contentType: 'application/json',

            success: function (data) {
                
                if (data == "1") {
                    GetPoidetails();

                }
            }

        });
    }
    return false;

}
function GetPoidetails() {
    
    deleteTable();
   // var $custid = '45';
    //var baseUrl = '@System.Configuration.ConfigurationManager.AppSettings["ApiBaseUrl"]';
    //var url = "http://localhost:3970/api/Commonapi/GetPOIDetails";
    var url = apiBase.apiurl + "Commonapi/GetPOIDetails";
    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
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
            param.push( { "name": "CustId", "value": $custid },{ "name": "poiid", "value": "" });
        },

        "columns": [
                { "data": "Location", "orderable": false },
                { "data": "Latitude", "orderable": false },
                { "data": "Longitude", "orderable": false },
             
                { "data": "Distance", "orderable": false },
                //{ "data": "PoiStatus", "orderable": false },
                { "data": "delete", "orderable": false }
        ]


    });
}