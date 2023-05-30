$(".js-example-basic").select2();
var imageCount = 1;
var spanId = 0;
var f = [];
$(document).ready(function () {
    
    $('#DocumentPath').hide();
    $('#DocumentPathService').hide();

  

  
    $(".js-example-basic-multiple").select2({
        seperator: ",",
    })

    if (window.File && window.FileList && window.FileReader)
    {
        $("#Repairfiles").on("change", function (e) {
            var files = e.target.files,
            filesLength = files.length;
            imageCount = imageCount + filesLength - 1;
            var file_size = $('#Repairfiles')[0].files[0].size;
            if (imageCount < 2) {
                //extension check
                var ext = $('#Repairfiles').val().split('.').pop().toLowerCase();
                //if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                //    alert('Invalid File Type! Please upload an image file only.');
                //}
         //   else
                if (file_size > 100000) {
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
                                  "</span>").insertAfter("#Repairfiles");
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

    } else {
        alert("Your browser doesn't support to File API")
    }

});





$('#serviceForm').on('change', '#ServiceVehicleId', function () {
    
    var VehicleId = $(this).val();
    console.log(VehicleId);
    bindServiceReminders(VehicleId);
});





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

$("#fileAttachmentsPathService").bind("click change", function () {
    var data = new FormData();
    var files = $("#fileAttachmentsPathService").get(0).files;
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
            $("#DocPathService").val(result.imgPath);
            $("#fileNameService").text(result.imgName);
            $("#fileNameService").val(result.imgName);
            $("#DocumentPathService").val(result.imgPath);
            $("#DocumentPathService").attr("href", result.imgPath);
        },
        error: function (er) {
            alert(er);
        }
    });
});


$('#repairForm').submit(function () {
    UploadRepairImageDocuments($(this));

});
function UploadRepairImageDocuments() {
    var imagesPath = '';
    var imagesFileName = '';
    var files = $("#Repairfiles").get(0).files;
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
                var ExisitingImageList = $("#ImageRepairPath").val();
                $("#ImageRepairPath").val(ImagePathList);
                $("#ImageRepairFileName").val(ImageNames);
                return true;
            },
            error: function (er) {
                toastr.error("Unable to upload image!!!")
                console.log(er);
                saveData(form);
            }
        }).done(function () {
            saveRepairData();
        });
    }
    else {
        saveRepairData();
    }
}

function saveRepairData()
{
    if (confirm('Do you want to submit the form?')) {
        var vehicleid = $("#VehicleId option:selected").val();
        if (vehicleid != "") {
            var data = $('#repairForm').serializeArray();
            var vehiclename = $("#VehicleId option:selected").text();
            var ServiceItemIds = '';
            $('#repairServiceItemID').val().forEach(function (val, index) {
                ServiceItemIds += val + ',';
            })
            if (ServiceItemIds != '')
                ServiceItemIds = ServiceItemIds.substring(0, ServiceItemIds.length - 1);
            var res = $("input[name='Accidental']:checked").val();
            
            var serviceCategory = 'Repair';
            var ImagePath = $("#ImageRepairPath").val();
            data.push(
                { name: 'custid', value: $custid },
                { name: 'DocPath', value: ImagePath },
                { name: 'Accidental', value: res },
                { name: 'VehicleName', value: vehiclename },
                { name: 'ServiceLogID', value: 0 },
                { name: 'serviceCategory', value: serviceCategory },
                { name: 'TopXServicesPerformedIds', value: ServiceItemIds }
                );
            console.log(data);
            var url = apiBase.apiurl + 'FmsAPI/ServiceLogAddUpdate';
            $.post(url, $.param(data), function (result) {
                if (result > 0) {
                    if (result == 1) {
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
        else {
            alert('Please select a vehicle');
            $("#VehicleId").addClass('input-validation-error');
        }
    }
    else {
        return false;
    }
}
function UpdateRepairImageRemove(id) {
    
    id = parseInt(id);
    var imageName = $("#RepairImage" + id + "")[0].title;
    //for removing image from array 
    for (var i = f.length - 1; i >= 0; i--) {
        if (f[i].name === imageName) {
            f.splice(i, 1);
        }
    }


    $("#Repairpip" + id + "").remove();
    imageCount = imageCount - 1;

}


function saveData()
{
    if (confirm('Do you want to submit the form?')) {
        var vehicleid = $("#ServiceVehicleId option:selected").val();
        if (vehicleid != "") {
           
            var ImagePath = $("#ImagePath").val();
      
            var url = apiBase.apiurl + 'FmsAPI/ServiceLogAddUpdate';
            $.post(url, $.param(data), function (result) {
                if (result > 0) {
                    if (result == 1) {
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
        else {
            alert('Please select a vehicle');
            $("#VehicleId").addClass('input-validation-error');
        }
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



