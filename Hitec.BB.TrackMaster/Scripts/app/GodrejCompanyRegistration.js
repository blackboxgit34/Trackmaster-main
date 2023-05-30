$('document').ready(function () {
    debugger;
    $('#invalid_email').hide();
    BindNoOfVehicle();
    

    $('#CreatedOn').datepicker({ dateFormat: 'mm/dd/yy' });
    $('form').on('keydown', ' #txtOwenrMobile', '#txtContactNo', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });
    
});

$('#txtemail').on('keypress', function () {
    var re = /([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(this.value);
    if (!re) {
        $('#invalid_email').show();
    } else {
        $('#invalid_email').hide();
    }
})


$('#txtUserName').on('keypress', function () {
    var username = $('#txtUserName').val();
    var urlGet = apiBase.apiurl + "AddOnAPI/CheckUsername"
    debugger
    $.ajax({
        url: urlGet,
        data: {Username:username},
        type: 'GET',
        success: function (data) {
          
            if (data ==1) {
                toastr.error("Already exist")
            } 
            
        },
        error: function (data) {
            alert('Please try again:' + data.responseText);
        }
    });
})
function BindNoOfVehicle() {
    $("#ddlvehicleno").append($("<option value='0,0'>No. Of Vehicle Parked </option>"));
    $("#ddlvehicleno").append($("<option value='1'>1 </option>"));
    $("#ddlvehicleno").append($("<option value='2'>2</option>"));
    $("#ddlvehicleno").append($("<option value='3'>3 </option>"));
    $("#ddlvehicleno").append($("<option value='4'>4</option>"));
    $("#ddlvehicleno").append($("<option value='5'>5</option>"));
    $("#ddlvehicleno").append($("<option value='6'>6</option>"));
    $("#ddlvehicleno").append($("<option value='7'>7</option>"));
    $("#ddlvehicleno").append($("<option value='8'> 8</option>"));
    $("#ddlvehicleno").append($("<option value='9'> 9</option>"));
    $("#ddlvehicleno").append($("<option value='10'>10</option>"));
}

$('#BtnSubmit').click(function () {
   
    var compname = $('#txtCompany').val();
    var unitno = $('#txtUnitno').val();
    var name = $('#txtOwnerName').val();
    var Mobile = $('#txtOwenrMobile').val();
    var ContactNo = $("#txtContactNo").val();
    
    var Email = $('#txtemail').val();
    var floorno = $('#txtfloor').val();
    var vehiclecount = $('#ddlvehicleno option:selected').text();
    var username = $('#txtUserName').val();
    var password = $('#txtPassword').val();
    alert(password);
    if (compname == "" || unitno == "" || name == "" || Mobile == "" || ContactNo == "" || Email == "" || floorno == "" || username=="" ||password=="") {
        toastr.error("All Feilds are required.")
    }
    else {
        var obj = [];
        var Main = {
            CompanyName: compname,
            UnitNo: unitno,
            OwnerName: name,
            Mobile: Mobile,
            ContactNo: ContactNo,
            Email: Email,
            FloorNo: floorno,
            VehCount: vehiclecount,
            Username: username,
            Pwd: password
        }
        var data1 = JSON.stringify(Main);
        var data = JSON.parse(data1);
        console.log(data);
        var urlGet = apiBase.apiurl + "AddOnAPI/GodrejCompanyRegistration"
        debugger
        $.ajax({
            url: urlGet,
            data: data,
            type: 'GET',
            success: function (data) {
                alert(data);
                if (data == 0) {
                    toastr.error("Duplicate Values")
                } if (data == 1) {
                    toastr.success("Vehicle details Added Successfully!")
                    window.setTimeout(function () {
                        window.location.href = '/addOn/CompanyDetails';
                    }, 1000);
                }
                else {
                    toastr.error("Error")
                }
            },
            error: function (data) {
                alert('Please try again:' + data.responseText);
            }
        });
    }
});