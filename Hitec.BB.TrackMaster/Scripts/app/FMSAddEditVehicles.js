var customerid;
var imageCount = 1;
var spanId = 0;
var f = [];
$('document').ready(function () {

    $('#VehName').hide();
    //$('h4.panel-title a span.pull-right').removeClass("glyphicon glyphicon-minus").addClass("glyphicon glyphicon-plus");
    $('#fittingDate,#RegistrationDate,#ManufaturingYear,#RegistrationDate,#RCRenewalDate,#InsuranceDate,#InsuranceDueDate,#accidentalFromDate,#accidentalToDate').datepicker({ dateFormat: 'mm/dd/yy' });
    $('#PurchaseDate,#VehiclePurchaseDate,#OdometerDateTime').datepicker({ dateFormat: 'mm/dd/yy' });
    $('#WarrantyExpirationDate,#G_tax_deposite_date,#DueDate_Good_Tax').datepicker({ dateFormat: 'mm/dd/yy' });
    $('#NationPermitDepositeDate,#DueDate_NationalPermit,#StatePermitDepositeDate,#Token_tax_depositeDate,#DueDate_Tokentax,#DateServiceAlert,#Fitness_CertificateDate,#Fitness_CertificateDueDate').datepicker({ dateFormat: 'mm/dd/yy' });
   
    $('#PUCDate,#DueDate_StatePermit').datepicker({ dateFormat: 'mm/dd/yy' })


    $("#BBID").on("change", function (e) {
        var vhname = $("#BBID").val();
        vhname = vhname.replace(/\s/g, '');
        $("#VehicleNo").val(vhname);
    });

    $("#VehName").on("change", function (e) {
        var vhname = $("#VehName").val();
        vhname = vhname.replace(/\s/g, '');
        $("#VehicleNo").val(vhname);
    });

    $('form').on('keydown', '#Price, #CostPerVehicle, #Premium, #Good_tax, #NationalPemit,#StatePemit, #Token_tax', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });
    if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function (e) {
            var files = e.target.files,
            filesLength = files.length;
            imageCount = imageCount + filesLength - 1;
            var file_size = $('#files')[0].files[0].size;

            if (imageCount < 2) {
                //extension check
                var ext = $('#files').val().split('.').pop().toLowerCase();
                if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                    alert('Invalid File Type! Please upload an image file only.');
                }
                else if (file_size > 100000) {
                    alert("File size greater than 100 Kb is not allowed");
                } 
                else {
                    //alert(filesLength)
                    imageCount = imageCount - filesLength + 1;
                    if (filesLength < 2) {
                        for (var i = 0; i < filesLength; i++) {
                            imageCount = imageCount + 1;
                            f.push(files[i]);
                            var fileReader = new FileReader();
                            fileReader.onload = (function (e) {
                                var file = e.target;
                                $("<span class=\"pip\" id='pip" + spanId + "'>" +
                                  "<img id=\"Image" + (spanId) + "\" class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + files[i - 1].name + "\"/>" +
                                  "<br/><span  class=\"remove\" onClick='UpdateImageRemove(this.id);' id='" + spanId + "' >Remove</span>" +
                                  "</span>").insertAfter("#files");
                            });
                            fileReader.readAsDataURL(files[i]);
                        }
                    }
                    else {
                        alert('You can upload 1 image only!');
                        return false;
                    }
                }
            }
            else {

                imageCount = imageCount - filesLength + 1;
                alert('You can upload 1 image only!');
                return false;
            }

        });
    } else {
        alert("Your browser doesn't support to File API")
    }
    // GetUnregisteredFMSVehicles();
    GetVehicleTypesList();
    GetDriverNames();
    GetAllTyres();
    var vehid = getUrlParameter("vehicleId");
    var vehname = getUrlParameter("vehicleName");
    if ((vehid != null && vehid > 0) && (vehname != null && vehname.length > 0)) {
        $("#VehicleId").val(vehid);
        $('#TyreInventoryEditMode').show();
        $('#VehDiv5').hide();
        $('#statusText').html('Update Vehicle');
        $('#BBID').hide();
        $('#VehName').text(vehname).val(vehname).show();
        //GetVehicleTypesList();
        //GetDriverNames();
        //GetAllTyres();
        var vehDetail = apiBase.apiurl + 'FmsAPI/GetVehicleDetailByVehId';
        $.get(vehDetail, { custid: $custid, vehid: vehid }, function (data) {
            $.each(data, function (item, value) {
                switch (item) {
                    case "IsActive":
                        $("#IsActiveStatus").prop('checked', value);
                        break;
                    case "IsGPSEnabled":
                        $("#IsGPSEnabledStatus").prop('checked', value);
                        $("#IsGPSEnabledStatus").prop("disabled", true);

                        break;
                    case "PurchaseDate":

                        var date = moment(value).format("MM/DD/YYYY");
                        if (date == "Invalid date") {
                            date = "";
                        }
                        else {
                            $("#VehiclePurchaseDate").val(date);
                        }
                        break;
                    case "VehicleImagePath":
                        if (value.length > 0) {
                            var arr = value.split(',');
                            var count = 0;
                            $.each(arr, function () {

                                var fpath = this;

                                fpath = fpath.replace(/\\/g, '/');

                                var fname = fpath.substring(fpath.lastIndexOf('/') + 1, fpath.lastIndexOf('.'));


                                if (this.length > 0) {
                                    //for restrict images to upload
                                    imageCount = imageCount + 1;

                                    $("<span class=\"pip\" id='" + fname + "'>" +
                              "<img id=\"Image" + (this.length--) + "\" class=\"imageThumb\" src=\"" + this + "\" title=\"" + this + "\"/>" +
                              "<br/><span class=\"remove\" onClick='DeleteImage(this.id);' id='" + this + "'  >Remove</span>" +
                              "</span>").insertAfter("#files");
                                }
                            });
                        }
                        break;
                    case "ManufaturingYear":
                    case "OdometerDateTime":
                    case "InsuranceDate":
                    case "InsuranceDueDate":
                    case "Fitness_CertificateDate":
                    case "G_tax_deposite_date":
                    case "DueDate_Good_Tax":
                    case "NationPermitDepositeDate":
                    case "DueDate_NationalPermit":
                    case "Token_tax_depositeDate":
                    case "DueDate_Tokentax":
                    case "accidentalFromDate":
                    case "accidentalToDate":
                    case "RCRenewalDate":
                    case "RegistrationDate":
                    case "Fitness_CertificateDueDate":
                    case "PUCDate":
                    case "StatePermitDepositeDate":
                    case "DueDate_StatePermit":


                        var date = moment(value).format("MM/DD/YYYY");
                        if (date == "Invalid date" || date == "NA" || date == "01/01/1900") {
                            date = "";
                        }
                        else {
                            $("#" + item).val(date);
                        }
                        break;


                    case "VehicleType":
                        $("#VehicleTypeList").find('option').filter(function () {
                            return $(this).text().trim() === value;
                        }).attr('selected', 'selected');
                        break;
                    case "DriverName":
                        window.setTimeout(function () {
                            $("#DriverId").find('option').filter(function () {
                                return $(this).text().trim() === value;
                            }).attr('selected', 'selected');
                        }, 1000);
                        break;
                    case "VehicleName":
                        $("#VehName").val(value);
                        break;
                    case "BBID":
                        $("#bbidOnEdit").val(value);
                        break;
                    case "Status":
                        $("#Status").val(value);
                        $("#Status").trigger("change");
                        break;
                    case "Good_tax":
                        if (value == 0) {
                            $("#" + item).val('');
                        }
                        else
                            $("#" + item).val(value);
                        break;
                    case "Premium":
                        if (value == 0) {
                            $("#" + item).val('');
                        }
                        else
                            $("#" + item).val(value);
                        break;
                    default:
                        $("#" + item).val(value);
                        break;
                }

            });
        });
    }
    else {
        $("#IsGPSEnabledStatus").prop('checked', false);
        $("#IsGPSEnabledStatus").prop("disabled", true);
        $('#TyreInventoryEditMode').hide();
        $('#VehDiv5').show();
        $('#statusText').val('Add Vehicle');
    }


  
});

$("#Status").bind("change", function () {
    var type = $(this).val();
    if (type == '1') {
        $('#accidentalFromDiv').show();
        $('#accidentalToDiv').show();
    }
    else {
        $('#accidentalFromDate').val('');
        $('#accidentalToDate').val('');

        $('#accidentalFromDiv').hide();
        $('#accidentalToDiv').hide();
    }
});

$("#VehiclePurchaseType").bind("change", function () {
    var type = $(this).val();
    if (type == '2') {
        $('#loanDiv').show();
    }
    else
        $('#loanDiv').hide();
});

//function GetUnregisteredFMSVehicles() {
//    var VehicleUrl = apiBase.apiurl + 'fmsapi/GetUnregisterdFmsVehicles';
//    $('#BBID').find('option:not(:first)').remove();
//    $.get(VehicleUrl, { custid: $custid }, function (data) {
//        $.each(data, function (key, value) {
//            $("#BBID").append($("<option></option>").val(value.BBID).html(value.VehicleName));
//        });
//    });
//    return $custid;
//}

function GetVehicleTypesList() {
    var VehicleTypeUrl = apiBase.apiurl + 'fmsapi/GetVehicleTypes';
    $('#VehicleTypeList').find('option:not(:first)').remove();
    $.get(VehicleTypeUrl, function (data) {
        $.each(data, function (key, value) {
            $("#VehicleTypeList").append($("<option></option>").val(value.typeId).html(value.vehicleType));
        })
    });
}

function GetDriverNames() {
    var VehicleTypeUrl = apiBase.apiurl + 'fmsapi/GetDriverNames';
    $('#DriverId').find('option:not(:first)').remove();
    $.get(VehicleTypeUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#DriverId").append($("<option></option>").val(value.Value).html(value.Name));
        });
    });
}

function GetAllTyres() {
    var VehicleTypeUrl = apiBase.apiurl + 'fmsapi/GetAllTyres';
    $('#TyreSrNo').find('option:not(:first)').remove();
    $.get(VehicleTypeUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#TyreSrNo").append($("<option></option>").val(value.Value).html(value.Name));
        });
    });
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$("form").on("submit", function (event) {
    //var formn_id = $(this).closest("form").attr('id');

    UploadImageDocuments($(this));
});

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function daydiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}


function saveData(form) {
    debugger;
    var vehicleid = getUrlParameter("vehicleId");
   
    var formn_id = $(form).closest("form").attr('id');

    var disabled = $(form).closest("form").find(':input:disabled').removeAttr('disabled');
    var dataObject = $(form).serializeArray();
    disabled.attr('disabled', 'disabled');


    var IsActive = $('#IsActiveStatus').is(":checked");
    var IsGPSEnabled = $('#IsGPSEnabledStatus').is(":checked");
    dataObject.push({ name: 'CustID', value: $custid },
        { name: 'IsActive', value: IsActive },
    { name: 'IsGPSEnabled', value: IsGPSEnabled }

        );

    if ($("#BBID").val() != '' || $("#VehName").val() != '') {

        switch (formn_id) {
            case "VehDiv1":

                vehicleid = (vehicleid == 0) ? null : vehicleid;
                //var VName = $("#BBID option:selected").val();
                var VName = $("#BBID").val();

                if (vehicleid == null && VName == "") {
                    alert('Please enter Vehicle name');
                }
                else {
                    var DriverName = $("#DriverId option:selected").text();

                    if (DriverName == 'Select Driver Name') {
                        DriverName = null;
                    }
                    var vehiclePurchaseDate = $("#VehiclePurchaseDate").val();

                    var VehicleName = '';
                    if (vehicleid == null) {
                        //var VehicleName = $("#BBID option:selected").text();
                        VehicleName = $("#BBID").val();
                    }
                    else {
                        VehicleName = $("#VehName").val();
                    }

                    var ImagePath = $("#ImagePath").val();
                    var VehicleType = $("#VehicleTypeList option:selected").text();
                    dataObject.push(
                    { name: 'DriverName', value: DriverName },
                    { name: 'VehicleName', value: VehicleName },
                    { name: 'VehicleType', value: VehicleType },
                    { name: 'PurchaseDate', value: vehiclePurchaseDate },
                    { name: 'VehicleImagePath', value: ImagePath });
                 
                    var VehUrl = apiBase.apiurl + 'FmsAPI/AddUpDateVehicleInfo';
                    console.log(dataObject);
                    $.post(VehUrl, $.param(dataObject), function (result) {
                        debugger;
                        if (vehicleid == null && result > 0) {
                          
                            toastr.success("Vehicle details Added Successfully!")
                            $("#VehDiv1").find("input[type=text], textarea,:submit").prop("disabled", true);
                        }
                        else if (vehicleid != null && result > 0) {
                            toastr.success("Record Updated Successfully!")
                            $("#VehDiv1").find("input[type=text], textarea,:submit").prop("disabled", true);
                        }
                        else
                            toastr.error("Failed!!!")
                    });
                }
                break;
            case "VehDiv2":

                var VehicleNo = $("#VehicleNo").val();
               
                dataObject.push(
                    { name: 'VehicleId', value: vehicleid },
                    { name: 'VehicleNo', value: VehicleNo });
                var VehUrl = apiBase.apiurl + 'FmsAPI/AddUpDateVehicleInfo';
                $.post(VehUrl, $.param(dataObject), function (result) {
                    if (vehicleid == null && result > 0) {
                        toastr.success("Vehicle details Added Successfully!")
                        $("#VehDiv2").find("input[type=text], textarea,:submit").prop("disabled", true);

                    }
                    else if (vehicleid != null && result > 0) {
                        toastr.success("Record Updated Successfully!")
                        $("#VehDiv2").find("input[type=text], textarea,:submit").prop("disabled", true);

                    }
                    else
                        toastr.error("Failed!!!")
                });
                break;
            case "VehDiv3":

                // var VehicleId = $("#VehicleId option:selected").text();
                var VehicleNo = $("#VehicleNo").val();
              
                dataObject.push(
                    { name: 'VehicleId', value: vehicleid },
                    { name: 'VehicleNo', value: VehicleNo });
                var VehUrl = apiBase.apiurl + 'FmsAPI/AddUpDateVehicleInfo';
                $.post(VehUrl, $.param(dataObject), function (result) {
                    if (vehicleid == null && result > 0) {
                  
                        toastr.success("Vehicle details Added Successfully!")
                        $("#VehDiv3").find("input[type=text], textarea,:submit").prop("disabled", true);

                    }
                    else if (vehicleid != null && result > 0) {
                        toastr.success("Record Updated Successfully!")
                        $("#VehDiv3").find("input[type=text], textarea,:submit").prop("disabled", true);

                    }
                    else
                        toastr.error("Failed!!!")
                });
                break;
            case "VehDiv4":

                var VehicleNo = $("#VehicleNo").val();
              
                dataObject.push(
                    { name: 'VehicleId', value: vehicleid },
                    { name: 'VehicleNo', value: VehicleNo });
                var VehUrl = apiBase.apiurl + 'FmsAPI/AddUpDateVehicleInfo';
                $.post(VehUrl, $.param(dataObject), function (result) {
                    if (vehicleid == null && result > 0) {
                        toastr.success("Vehicle details Added Successfully!")
                        $("#VehDiv4").find("input[type=text], textarea,:submit").prop("disabled", true);

                    }
                    else if (vehicleid != null && result > 0) {
                        toastr.success("Record Updated Successfully!")
                        $("#VehDiv4").find("input[type=text], textarea,:submit").prop("disabled", true);

                    }
                    else
                        toastr.error("Failed!!!")
                });
                break;
            case "VehDiv5":

                var vendorName = $("#vendorName").val();
                var tyrePurchaseDate = $("#tyrePurchaseDate").val();
                var SerialNo = $("#TyreSrNo").val();
                var Warranty = $("#tyreWarranty").val();
                var UnitPrice = $("#unitPrice").val();
                var Manufacturer = $("#tyreManufacturer").val();
                var TypeTyre = $("#tyreType").val();
                var VehicleId = $("#VehicleId").val();
                dataObject.push(
                            { name: 'Custid', value: $custid },
                            { name: 'VendorName', value: vendorName },
                            { name: 'PurchaseDate', value: tyrePurchaseDate },
                            { name: 'SerialNo', value: SerialNo },
                            { name: 'Warranty', value: Warranty },
                            { name: 'UnitPrice', value: UnitPrice },
                            { name: 'Manufacturer', value: Manufacturer },
                            { name: 'TypeTyre', value: TypeTyre }
                );
                var EmpUrl = apiBase.apiurl + 'FmsAPI/AddUpdateTyreInventoryAndFitting';
                $.post(EmpUrl, $.param(dataObject), function (result) {


                    if (vehicleid == null && result > 0) {
                        toastr.success("Vehicle details Added Successfully!")
                        $("#VehDiv5").find("input[type=text], textarea,:submit").prop("disabled", true);

                    }
                    else if (vehicleid != null && result > 0) {
                        toastr.success("Record Updated Successfully!")
                        $("#VehDiv5").find("input[type=text], textarea,:submit").prop("disabled", true);

                    }
                    else
                        toastr.error("Failed!!!")
                });
                break;
            default:

                break;
        }
    }
    else
    {
        alert("Please enter vehicle name");
    }
}

function UploadImageDocuments(form) {
    var imagesPath = '';
    var imagesFileName = '';
    var files = $("#files").get(0).files;
    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
        data.append(files[i].name, files[i]);
    }
    if (files.length > 0) {
        $.ajax({
            url: "/Fms/UploadMyFiles",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (result) {
                var ImagePathList = "";
                var ImageNames = "";
                var i = 0;
                $.each(result, function (key, value) {

                    var img = "../../" + value.fullPath + ',';//+ "\\" + value.Name + ',';
                    ImagePathList += img;
                    ImageNames += value.Name + ',';

                });
                //already have images list
                var ExisitingImageList = $("#ImagePath").val();
                $("#ImagePath").val(ImagePathList);
                $("#ImageFileName").val(ImageNames);
                return true;
            },
            error: function (er) {
                toastr.error("Unable to upload image!!!")
                console.log(er);
                saveData(form);
            }
        }).done(function () {
            saveData(form);
        });
    }
    else {
        saveData(form);
    }
}

$("#TyreSrNo").bind("change", function () {
    var TyreInvenId = $("#TyreSrNo").val();

    var VehicleUrl = apiBase.apiurl + 'fmsapi/GetTyreInventoryItemsbyID';
    $.get(VehicleUrl, { TyreInvenId: TyreInvenId, Custid: $custid }, function (data) {
        $('#vendorName').attr("value", data.VendorName);
        $('#unitPrice').attr("value", data.UnitPrice);
        $('#tyrePurchaseDate').attr("value", moment(data.PurchaseDate).format('MM/DD/YYYY'));
        $('#tyreWarranty').attr("value", data.Warranty);
        $('#WarrantyType').attr("value", data.WarrantyType);
        $('#tyreManufacturer').attr("value", data.Manufacturer);
        $('#tyreType').attr("value", data.TypeTyre);
    });
});

function DeleteImage(id) {
    
    var vehid = getUrlParameter("vehicleId");
    var fileNameIndex = id.lastIndexOf("/") + 1;
    var imagename = id.substr(fileNameIndex);
    var fpath = id;

    fpath = fpath.replace(/\\/g, '/');

    var fname = fpath.substring(fpath.lastIndexOf('/') + 1, fpath.lastIndexOf('.'));

    console.log(imagename);
    var res = confirm("Do you want to delete this file?");
    if (res) {
        var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveVehicleImage?custid=" + $custid + "&vehid=" + vehid + "&imagename=" + imagename;
        $.post(ApiUrl, function (result) {
            if (result > 0) {
                

                //after deleting success message and also image count-1
                $("#" + fname + "").remove();
                toastr.success("File Deleted successfully!");
                imageCount = imageCount - 1;
            }
            else {
                toastr.error("File Failed to Delete!");
            }
        });
    }
}

function UpdateImageRemove(id) {
    
    id = parseInt(id);
    var imageName = $("#Image" + id + "")[0].title;
    //for removing image from array 
    for (var i = f.length - 1; i >= 0; i--) {
        if (f[i].name === imageName) {
            f.splice(i, 1);
        }
    }


    $("#pip" + id + "").remove();
    imageCount = imageCount - 1;

}