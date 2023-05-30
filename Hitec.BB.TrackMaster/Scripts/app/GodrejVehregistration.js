$('document').ready(function () {
   
    BindCompany();
    BindVehicleMake();

    $('#CreatedOn').datepicker({ dateFormat: 'mm/dd/yy' });
    $('form').on('keydown', ' #txtMobile', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });
    debugger;
    var tagidurl = getUrlParameter("TagId");
    if (tagidurl != null)  {
        $("#txtTagId").val(tagidurl);
       
        var vehDetail = apiBase.apiurl + 'AddOnAPI/GetTagIdDetails';
        $.get(vehDetail, { TagId: tagidurl }, function (data) {
            console.log(data);
            $.each(data, function (item, value) {
                debugger;
                switch (item) {
                    case "IsPrime":
                        if (value == 'False')
                        {

                        }
                        else {
                            $("#vehicle1").prop('checked', value);
                        }
                        
                        break;
                        
                    case "CompanyName":
                        $("#ddlCompanyName").find('option').filter(function () {
                            return $(this).text().trim() === value;
                        }).attr('selected', 'selected');
                        break;
                    case "VehType":
                        if (value == "Two")
                        {
                            $('input[name="fav_language"][value="Two"]').prop('checked', value);
                        }
                        else
                        {
                            $('input[name="fav_language"][value="Four"]').prop('checked', value);
                        }
                       
                       

                        break;
                    case "VehName":
                        $("#txtVehName").val(value);
                        break;
                    case "OwnerName":
                        $("#txtName").val(value);
                        break;
                    case "OwnerNo":
                        $("#txtMobile").val(value);
                        break;

                    case "VehMake":
                    
                        $("#ddlVehMake").find('option').filter(function () {
                            return $(this).text().trim() === value;
                        }).attr('selected', 'selected');
                        break;
                    case "Model":
                        $("#txtVehModel").val(value);
                        break;

                    
                     
                    
                }

            });
        });
        $("#BtnSubmit").hide();
        $("#BtnUpdate").show();
    }
    




})

function BindVehicleMake() {
    var Url = apiBase.apiurl + 'AddOnAPI/GetVehicleMake';
   
    $.get(Url,  function (data) {
        $.each(data, function (key, value) {
            $("#ddlVehMake").append($("<option></option>").val(value.Value).html(value.Name));
        });
    });
}

function BindCompany() {
    var Url = apiBase.apiurl + 'AddOnAPI/GetGodrejCompanyList';

    $.get(Url, function (data) {
        $.each(data, function (key, value) {
            $("#ddlCompanyName").append($("<option></option>").val(value.Value).html(value.Name));
        });
    });
}


$('#BtnSubmit').click(function () {    
    var tagid = $('#txtTagId').val();
    var custid = $custid;
    var vehname = $('#txtVehName').val();
    var model = $('#txtVehModel').val();
    var vehmake = $('#ddlVehMake option:selected').text();
    var compname = $('#ddlCompanyName option:selected').text();
    var primeveh
        //= $('input[name="vehicle1"]:checked').val();
    var ownername = $('#txtName').val();
    var ownerno = $('#txtMobile').val();
    var vehicletype = $('input[name="fav_language"]:checked').val();
   

    if ($('input[name="vehicle1"').prop('checked') == true) {
        primeveh = 'true';
    }
    else {
        primeveh = 'false';
    }
    
    if (tagid == "" || vehname == "" || model == "" || vehmake == "" || compname == "" || ownername == "" || ownerno=="") {
        toastr.error("All Feilds are required.")
    }
    else {
        var obj = [];
        var Main = {
            TagId: tagid,
            Custid: custid,
            VehName: vehname,
            VehModel: model,
            VehMake: vehmake,
            CompName: compname,
            PrimeVeh: primeveh,
            OwnerName: ownername,
            OwnerNumber: ownerno,
            VehType: vehicletype
        }
        var data1 = JSON.stringify(Main);
        var data = JSON.parse(data1);
        console.log(data);
        var urlGet = apiBase.apiurl + "AddOnAPI/VehicleRegistration"
        debugger
        $.ajax({
            url: urlGet,
            data: data,
            type: 'GET',
            success: function (data) {
                alert(data);
                if (data = -1) {
                    toastr.error("Duplicate Values")
                } if (data = 1)
                {
                    toastr.success("Vehicle details Added Successfully!")
                    window.setTimeout(function () {
                        window.location.href = '/addOn/Godrejvehregistration';
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




$('#BtnUpdate').click(function () {
    var tagid = $('#txtTagId').val();
    var custid = $custid;
    var vehname = $('#txtVehName').val();
    var model = $('#txtVehModel').val();
    var vehmake = $('#ddlVehMake option:selected').text();
    var compname = $('#ddlCompanyName option:selected').text();
    var primeveh;
   
    var ownername = $('#txtName').val();
    var ownerno = $('#txtMobile').val();
    var vehicletype = $('input[name="fav_language"]:checked').val();


    if ($('input[name="vehicle1"').prop('checked') == true) {
        primeveh = 'true';
    }
    else {
        primeveh = 'false';
    }
   
    if (tagid == "" || vehname == "" || model == "" || vehmake == "" || compname == "" || ownername == "" || ownerno == "") {
        toastr.error("All Feilds are required.")
    }
    else {
        var obj = [];
        var Main = {
            TagId: tagid,
            Custid: custid,
            VehName: vehname,
            VehModel: model,
            VehMake: vehmake,
            CompName: compname,
            PrimeVeh: primeveh,
            OwnerName: ownername,
            OwnerNumber: ownerno,
            VehType: vehicletype
        }
        var data1 = JSON.stringify(Main);
        var data = JSON.parse(data1);
        console.log(data);
        var urlGet = apiBase.apiurl + "AddOnAPI/UpdateVehicleRegDetails"
        debugger
        $.ajax({
            url: urlGet,
            data: data,
            type: 'GET',
            success: function (data) {
               
                if (data = -1) {
                    toastr.error("Duplicate Values")
                } if (data = 1) {
                    toastr.success("Vehicle details Added Successfully!")
                    window.setTimeout(function () {
                        window.location.href = '/addOn/GodrejvehList';
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



$("#ApiValue").click(function () {
    var custid = $custid;
    var urlGet = apiBase.apiurl + "CustomAPI/getcurrenttag?csifid=" + custid;
    $.ajax({
        url: urlGet,
        type: 'GET',
        success: function (data) {

            if (data.tagid == null) {
                alert("No Tag found.");
            }
            else {
                if (data.vehname == '') {
                    $('#txtTagId').val(data.tagid);
                }
                else {
                    alert("Vehicle already mapped. " + data.vehname);
                }
            }

        },
        error: function (data) {
            alert('Please try again:' + data.responseText);
        }
    });


});