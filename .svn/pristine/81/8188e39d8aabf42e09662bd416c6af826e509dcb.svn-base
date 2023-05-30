var baseUrl = apiBase.apiurl;
var custId
$(function () {
custId = $custid;
var BelongsToUrl = baseUrl + "ComplaintAPI/GetBelongTo";
$.get(BelongsToUrl, { custid: custId }, function (data) {
    $("#belongsto").val(data);
});

var VehicleUrl = baseUrl + 'AdminAPI/GetVehicles';
$.get(VehicleUrl, { custid: custId }, function (data) {
    $.each(data, function (key, value) {
        $("#VehicleName").append($("<option></option>").val(value.Value).html(value.Text));
    });
});

var DepartmentUrl = baseUrl + "ComplaintAPI/GetDepartment";
$.get(DepartmentUrl, function (data) {
    $.each(data, function (key, value) {
        $("#ComplainRelTo ").append($("<option></option>").val(value.DepId).html(value.BelongsTo));
    });
});





});

function AddServicePostApiCall() {
    var belongsto = $('#belongsto').val();
    var VehicleName = $("#VehicleName option:selected").text();
    var ComplainRelT = '9'; // $('#ComplainRelTo').val(); //9 for service as vadiya sir told
    var Commentss = $('#txtComment').val();
    var vname = $("#VehicleName option:selected").text();
    var bbid = $("#VehicleName").val().toString();
    var email = $("#txtMail").val();
    //var Description1 = $('#txtdecripation').val();
    var Status = "Open";
    if (Commentss == null) {
        Commentss = 'N/A';
    }
    //if (Description1 == null) {
    //    Description1 = "Other";
    //}
    var selectedAnswer = [];
    $('#divChkbox input:checked').each(function () {
        selectedAnswer.push($(this).attr('name'));
    });

    var AddComplaintUrl = baseUrl + "AdminAPI/AddComplaint";
    $.ajax({
        type: "GET",
        data: { Custid: custId, BBID: bbid, VehicleName: vname, Status: Status, Description: selectedAnswer.toString(), BelongsTo: belongsto, Comments: Commentss, ComplaintRelatedTo: ComplainRelT, email: email },
        url: AddComplaintUrl,
        success: function (data) {
            if (data)
                $('#ErrorMessage').text("Your Complaint has been registered Successfully with Complaint Id " + data + "");
            else
                $('#ErrorMessage').text("Record Not Saved.");
        }
    });
}

function getDriverDetail(bbid) {

    var driverDetailUrl = baseUrl + "ComplaintAPI/GetDriverDetail";
    $.ajax({
        type: "GET",
        data: { Bbid: bbid },
        url: driverDetailUrl,
        success: function (data) {
            if (data.DriverName) {
                $('.a1').html(data.DriverName);
                name = $('.a1').text()
            }
            else { $('.a1').html("NA"); }
            if (data.DriverMobileNo) {
                $('.b1').html(data.DriverMobileNo);
                mobile = $('.b1').text()
            }
            else { $('.b1').html("NA"); }
            var drivername = ("Driver Name: " + name);
            var mobileNumber = ("Mobile No: " + mobile);
            $("#txtComment").val(drivername + "  " + mobileNumber);
        }
    });
}