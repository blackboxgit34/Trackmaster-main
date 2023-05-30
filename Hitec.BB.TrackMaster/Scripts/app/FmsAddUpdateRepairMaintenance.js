$(".js-example-basic").select2({})
var imageCount = 1;
var spanId = 0;
var f = [];
$(document).ready(function () {
    $('#ServiceDate').datepicker();
    $('#DocumentPath').hide();


    $(".js-example-basic-multiple").select2({
        placeholder: "Please select Service Performed",
        seperator: ",",
    })

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
                    imageCount = imageCount - filesLength + 1;
                    //alert(filesLength)
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

    bindVehicle();
});


function bindVehicle() {
    var VehicleUrl = apiBase.apiurl + 'FmsAPI/GetFmsVehicles';
    $.get(VehicleUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#VehicleId").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    }).done(function (data) {
        bindServiceItems();
    });
}

function bindServiceItems() {
    var ServiceUrl = apiBase.apiurl + 'FmsAPI/BindServiceScheduleItems';
    $.post(ServiceUrl, function (data) {
        $.each(data, function (key, value) {
            $("#ServiceItemID").append($("<option></option>").val(value.ServiceItemID).html(value.ServiceItem));
        });
    }).done(function (data) {
        bindData();
    });
}

function bindData() {
    var slid = getUrlParameter("servicelogid");
    if (slid != null && slid > 0) {
        $("#statusText").text("Update Repair & Maintenance");
        var url = apiBase.apiurl + "FmsApi/GetRepairMaintRecordByServLogId";
        $.get(url, { custid: $custid, servicelogid: slid }, function (data) {
            console.log(data);
            
            $.each(data, function (item, value) {
                if (item == "TopXServicesPerformedIds") {
                    var Arr = value.split(',');
                    $("#ServiceItemID").select2("val", Arr);
                }
                else if (item == "ServiceDate") {
                    var servicedt = moment(value).format("MM/DD/YYYY");
                    $("#ServiceDate").val(servicedt);
                }
                else if (item == "DocPath") {
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
                }
                else {
                    $("#" + item).val(value);
                }
            });

        });
    }
    else {
        $('.checkBox').click(function () {
            if ($(this).is(':checked'))
                $(this).closest('tr').find('.js-example-basic-multiple').prop("disabled", false);
            else
                $(this).closest('tr').find('.js-example-basic-multiple').prop("disabled", true);
            var json = $.parseJSON(data);
            var selectedValues = [];
            $.each(json, function (bb) {
                selectedValues.push(json[bb].Id);
            });
        });
    }
}

//Cities changes when state name changes
$('#repairForm').on('change', '#VehicleId', function () {
    
    var VehicleId = $(this).val();
    console.log(VehicleId);
    //bindServiceReminders(VehicleId);
});

//function bindServiceReminders(VehicleId) {
//    var serviceUrl = apiBase.apiurl + 'FmsAPI/GetServiceScheduleReminder';
//    $('#scheduledServiceReminder').find('option:not(:first)').remove();
//    $.get(serviceUrl, { custId: $custid, VehicleId: VehicleId }, function (data) {
//        $.each(data, function (key, value) {
//            $("#scheduledServiceReminder").append($("<option></option>").val(value.Value).html(value.Name));
//        });
//    });
//}


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


$('#repairForm').submit(function () {
    UploadImageDocuments($(this));
});

function UploadImageDocuments() {
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
            saveData();
        });
    }
    else {
        saveData();
    }
}

function saveData()
{
    var slid = getUrlParameter("servicelogid");
    var sid = (!slid && slid > 0) ? 0 : slid;
    var data = $('#repairForm').serializeArray();
    var vehiclename = $("#VehicleId option:selected").text();  //$("#VehicleId").val();
    var ServiceItemIds = '';
    $('#ServiceItemID').val().forEach(function (val, index) {
        ServiceItemIds += val + ',';
    })
    if (ServiceItemIds != '')
        ServiceItemIds = ServiceItemIds.substring(0, ServiceItemIds.length - 1);
    var res = $("input[name='Accidental']:checked").val();
    var serviceCategory = $("#serviceCategory").val();
    var ImagePath = $("#ImagePath").val();
    data.push(
        { name: 'CustID', value: $custid },
         { name: 'DocPath', value: ImagePath },
        { name: 'Accidental', value: res },
        { name: 'VehicleName', value: vehiclename },
        { name: 'ServiceLogID', value: sid },
        { name: 'serviceCategory', value: serviceCategory },
        { name: 'TopXServicesPerformedIds', value: ServiceItemIds }
        );
    console.log(data);
    var url = apiBase.apiurl + 'FmsAPI/ServiceLogAddUpdate';
    $.post(url, $.param(data), function (result) {
        if (result > 0) {
            if (sid != 0) {
                toastr.success("Service Log updated successfully")
            }
            else {
                toastr.success("Service Log created successfully")
            }
            window.setTimeout(function () {
                window.location.href = '/Fms/ManageRepairMaintenance';
            }, 1000);
        }
        else
            toastr.error("Failed!!!")
    });
}


//Add file and bind file name and path
$("#fileAttachmentsPath").bind("click change", function () {
    var data = new FormData();
    var files = $("#fileAttachmentsPath").get(0).files;
    if (files.length > 0) {
        data.append("MyImages", files[0]);
        data.append("path", 'test');
    }
    $.ajax({
        url: "/Fms/UploadFile",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (result) {
            console.log(result);
            
            $("#DocPath").val(result.imgPath);
            $("#fileName").text(result.imgName);
            $("#fileName").val(result.imgName);
            $("#DocumentPath").val(result.imgPath);
            $("#DocumentPath").attr("href", result.imgPath);

        },
        error: function (er) {
            console.log(er.statusText);
            // alert(er);
        }
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

    var ServiceLogID = getUrlParameter("servicelogid");
    if (res) {
        var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveImageServiceLog?custid=" + $custid + "&imagename=" + imagename + "&ServiceLogID=" + ServiceLogID;
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