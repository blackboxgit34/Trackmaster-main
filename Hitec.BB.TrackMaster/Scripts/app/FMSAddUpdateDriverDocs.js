var $empId = $("#FMSEmpID").select2({})
var DriverId = $('#DriverId').val();
var imageCount = 1;
var spanId = 0;
var f = [];
$(document).ready(function () {
    $('#DLExpiry').datepicker();
    $('#BadgeExpiry').datepicker();
    $('#PoliceVerificationExpiry').datepicker();
    GetDriverNames();
    $('form').on('keydown', '#DriverMobNo', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });

    var removeFlag = false;
    if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function (e) {

            files = e.target.files,
              filesLength = files.length;
            imageCount = imageCount + filesLength - 1;
            if (imageCount < 4) {
                //extension check
                var ext = $('#files').val().split('.').pop().toLowerCase();
                if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                    alert('Invalid File Type! Please upload an image file only.');
                }
                    //extension check
                else {
                    imageCount = imageCount - filesLength + 1;
                    //alert(filesLength)
                    if (filesLength < 4) {
                        for (var i = 0; i < filesLength; i++) {
                            var file_size = $('#files')[0].files[i].size;
                            if (file_size > 100000) {
                                alert($('#files')[0].files[i].name + ": File size greater than 100kb is not allowed");
                            }
                            else {
                                imageCount = imageCount + 1;

                                f.push(files[i]);
                                var fileReader = new FileReader();
                                fileReader.onload = (function (e) {

                                    spanId = spanId + 1;
                                    var file = e.target;
                                    $("<span class=\"pip\" id='pip" + spanId + "'>" +
                                      "<img id=\"Image" + (spanId) + "\" class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + files[i - 1].name + "\"/>" +
                                      "<br/><span  class=\"remove\" onClick='UpdateImageRemove(this.id);' id='" + spanId + "' >Remove</span>" +
                                      "</span>").insertAfter("#files");
                                });
                                fileReader.readAsDataURL(files[i]);
                            }
                        }
                    }
                    else {
                        alert('You can upload upto 3 images only!');
                        return false;
                    }
                }
            }
            else {

                imageCount = imageCount - filesLength + 1;
                alert('You can upload upto 3 images only!');
                return false;
            }

        });
    } else {
        alert("Your browser doesn't support to File API")
    }
});

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

$("#files").on("change", ".remove", function () {
    //$(".remove").click(function () {

    removeFlag = true;
    $(this).parent(".pip").remove();
    var imageId = $(this).parent(".pip")[0].childNodes[0].id;

    var appendId = $(this).attr('data-id');
    filecollection.splice(filecollection.indexOf(filecollection[appendId]), 1);
    $('#' + appendId).remove();
    console.log(filecollection);

    // });
});

function UploadImageDocuments() {
    var imagesPath = '';
    var imagesFileName = '';
    //var files = $("#files").get(0).files;
    var files = f;
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
                console.log(er);
                return false;
            }
        }).done(function () {
            saveData();
        });
    }
    else {
        saveData();
    }
}

$('#AddUpdateDriverDocs').submit(function () {
    UploadImageDocuments();
    
});

function saveData()
{
    var url = apiBase.apiurl + 'FmsAPI/AddUpdateDriverDocs';
    var data = $('#AddUpdateDriverDocs').serializeArray();
    var driverName = $('#FMSEmpID option:selected').text();

    data.push(
        { name: 'custid', value: $custid },
        { name: 'DriverName', value: driverName }
        );
    console.log(data);

    $.post(url, $.param(data), function (result) {
        if (result > 0) {
            toastr.success("Record Entered Successfuly")
            window.setTimeout(function () {
                window.location.href = '/Fms/ManageDriverDocs';
            }, 1000);

        }
        else
            toastr.error("Failed!!!")
    });
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

    var driverId = getUrlParameter("driverId");
    var fileNameIndex = id.lastIndexOf("/") + 1;
    var imagename = id.substr(fileNameIndex);
    var fpath = id;

    fpath = fpath.replace(/\\/g, '/');

    var fname = fpath.substring(fpath.lastIndexOf('/') + 1, fpath.lastIndexOf('.'));

    console.log(imagename);
    var res = confirm("Do you want to delete this file?");
    if (res) {
        var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveDriverAttachment?custid=" + $custid + "&driverId=" + driverId + "&imagename=" + imagename;
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

function bindData() {
    if (DriverId > 0) {
        var Url = apiBase.apiurl + 'FmsAPI/GetDriverDocsByDriverId';
        $.get(Url, { DriverId: DriverId }, function (data) {

            $.each(data, function (item, value) {
                if (item == "DLExpiry" || item == "BadgeExpiry" || item == "PoliceVerificationExpiry") {
                    var dt = moment(value).format("MM/DD/YYYY");
                    $("#" + item).val(dt);

                }
                else if (item == "FMSEmpID") {
                    $empId.val(value).trigger("change");
                }
                else if (item == "ImagePath") {

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

function GetDriverNames() {
    var VehicleTypeUrl = apiBase.apiurl + 'fmsapi/GetDriverNamesDriverDocs';
    $('#FMSEmpID').find('option:not(:first)').remove();
    $.get(VehicleTypeUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#FMSEmpID").append($("<option></option>").val(value.Value).html(value.Name));
        });
    }).done(function (data) {
        bindData();
    });
}

