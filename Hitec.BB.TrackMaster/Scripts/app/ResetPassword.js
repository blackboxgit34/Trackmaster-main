var baseUrl = apiBase.apiurl;
var custId
var table;

$(document).ready(function () {
   
    custId = $custid;
   
    var VehicleUrl = baseUrl + "TaxiAPI/GetTexiUserList";
    
    $.get(VehicleUrl, { custid: custId }, function (data) {

        $.each(data, function (key, value) {
            $("#User").append($("<option></option>").val(value.custid).html(value.CustName));
        });
    });

});

$("#User").change(function () {
    var value = $('select#User option:selected').val();
  

})



$("#Submit").click(function () {

    var value = $('select#User option:selected').val();
    alert(value);
  
    var baseurl = apiBase.apiurl;
    var url = baseurl + 'TaxiAPI/Resetpassword';
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: url,
        data: { custid: value },
        success: function (result) {
            
                toastr.success("Password Reset Successfully!");
                setTimeout(function () {
                  
                    location.reload(true);
                }, 500);

        },
        error: function (error) {
            toastr.error("something went wrong!");
            return;
        }
    });


})