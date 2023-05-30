﻿$(".js-example-basic").select2({})
var imageCount = 1;
var spanId = 0;
var f = [];
function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if ((charCode != 45 || $(element).val().indexOf('-') != -1) && (charCode != 46 || $(element).val().indexOf('.') != -1) && (charCode < 48 || charCode > 57)) {
        return false;

    }


    return true;
}

$(document).ready(function () {
    $('#HR').keypress(function (event) {
        return isNumber(event, this)
    });
    $('#Date').daterangepicker({
        timePicker: true,
        singleDatePicker: true,
        locale: {
            format: 'MM/DD/YYYY h:mm A'
        },
        maxDate : new Date()
    });
    var VehicleUrl = apiBase.apiurl + 'FmsAPI/GetFmsVehicles';
    $.get(VehicleUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#VehicleId").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    }).done(function () {
        var vid = $('#vehicleIdFromMain').val();
        if (vid != 0) {
            $("#VehicleId").select2().select2('val', vid);
        }
    }).done(function () {
        bindData();
    });

    $('form').on('keydown', '#Liters, #AmountPaid', function (e) {
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
                    alert("File size greater than 100Kb is not allowed");
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
    }
    else {
        alert("Your browser doesn't support to File API")
    }


});

function bindData() {
    var slid = getUrlParameter("fuelid");
    var vehid = getUrlParameter("vehid");
    if (slid && vehid) {
        $("#statusText").text("Update Fuel");
        var url = apiBase.apiurl + "FmsApi/GetFuelByFuelId";
        $.get(url, { custid: $custid, fuelid: slid, vehid: vehid }, function (data) {
            console.log(data);
            $.each(data, function (item, value) {
                if (item == "Payment") {

                    $('[name=Payment][value="' + value + '"]').prop('checked', true);
                    // $("#" + item).val(value).prop('checked', true);
                    // $('#Payment [value=' + value + ']').prop('checked', true);
                    //$('#Payment [value=' + value + ']').attr("checked", "checked");
                }
                else if (item == "Date") {
                    var dt = moment(value).format("MM/DD/YYYY hh:mm A");
                    $("#" + item).val(dt);
                }
                else if (item == "VehicleId") {
                    $("#VehicleId").select2().select2('val', value);
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
                else
                    $("#" + item).val(value);
            });

        });
    }
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
            $("#DocPath").val(result.imgPath);
            $("#fileName").text(result.imgName);
            $("#fileName").val(result.imgName);
            $("#DocumentPath").val(result.imgPath);
            $("#DocumentPath").attr("href", result.imgPath);
        },
        error: function (er) {
            alert(er);
        }
    });
});

$('#fuelForm').submit(function () {
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

function saveData() {
    if (confirm('Do you want to submit the form?')) {
        var slid = getUrlParameter("fuelid");
        var sid = (!slid && slid > 0) ? 0 : slid;
        var data = $('#fuelForm').serializeArray();
        var ImagePath = $("#ImagePath").val();
        data.push(
            { name: 'CustID', value: $custid },
            { name: 'DocPath', value: ImagePath },
            { name: 'ID', value: sid }
            );
        console.log(data);
        var url = apiBase.apiurl + 'FmsAPI/AddUpdateFuelInfo';
        $.post(url, $.param(data), function (result) {
            if (result > 0) {
                if (result == 1) {
                    toastr.success("Fuel created successfully.")
                }
                else {
                    toastr.success("Fuel updated successfully.")
                }
                window.setTimeout(function () {
                    window.location.href = '/Fms/ManageFuel';
                }, 1000);
            }
            else
                toastr.error("Failed!!!")
        });
    }
    else {
        return false;
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

function DeleteImage(id) {

    var fuelid = getUrlParameter("fuelid");
    var fileNameIndex = id.lastIndexOf("/") + 1;
    var imagename = id.substr(fileNameIndex);
    var fpath = id;

    fpath = fpath.replace(/\\/g, '/');

    var fname = fpath.substring(fpath.lastIndexOf('/') + 1, fpath.lastIndexOf('.'));

    console.log(imagename);
    var res = confirm("Do you want to delete this file?");
    if (res) {
        var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveFuelAttachment?custid=" + $custid + "&fuelid=" + fuelid + "&imagename=" + imagename;
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


