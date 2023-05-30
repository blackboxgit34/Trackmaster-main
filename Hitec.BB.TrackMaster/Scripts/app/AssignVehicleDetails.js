var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
 
};
function submitUpdateSettings() {
    debugger;
    var custId = $custid;


    var TripName = $("#tripname").val();
    var vehname = $("#ddlVehicleList").val();

    $.blockUI({ message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>' });

    var baseurl = apiBase.apiurl;
    var url = baseurl + "adminapi/GetvehicleInformation";
    $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: { custId: custId, Fromdate: $beginDate, TripName: TripName, Todate: $endDate, bbid: vehname },

        success: function (data) {
            $.unblockUI();
            toastr.success('successfully Done!');

        },
        error: function (err) {
            $.unblockUI();
            toastr.warning('something went wrong!');
        }

    });

    return false;
    GetPoidetails();
}
$(document).ready(function () {
 
  GetPoidetails();
  $('#dt_basic_Master tbody').on('click', 'button', function () {


 
        
        var data = table.row($(this).parents('tr')).data();
        var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));
      
        var PL = bbidArray.selector.rows;
        if (PL == null) {
            PL = "";
        }
        $.ajax({
            dataType: "json", type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "AdminAPI/UpdateManagePOIforeach",
            data: { poiIds: data.ID, bbidList:PL.toString(), custId: $custid },
            success: function (data) {
                
                toastr.success('successfully Done!');
            }
        });
    });
 

  

  
    


    

});





function GetPoidetails() {

  
    deleteTable();
  
    var url = apiBase.apiurl + "Commonapi/GetVehiclesOnTrip";
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
                { "data": "TripName", "orderable": false },
           
              { "data": "Vehname", "orderable": false },
                 { "data": "FromDate", "orderable": false },
                    { "data": "ToDate", "orderable": false },
       
                      

                  
               
        ]


    });

 
}