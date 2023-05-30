﻿$(".js-example-basic").select2();
var imageCount = 1;
var spanId = 0;
var f = [];
$(document).ready(function () {
    $('#ServiceDate').datepicker();
    $('#repairDate').datepicker();
    $('#ServiceDate').datepicker("option", "maxDate", new Date());
    $('#repairDate').datepicker("option", "maxDate", new Date());
    $('#DocumentPath').hide();
    $('#DocumentPathService').hide();

    var vehicleid = getUrlParameter('vehicleid');
    var serviceid = getUrlParameter('serviceid');
    if (serviceid > 0) {
        
        $('.nav-tabs a[href="#tab2"]').tab('show');
        $('#IsScheduled').attr('checked', 'true').trigger('change');
    }

    $('form').on('keydown', '#repairActualExpenses, #ActualExpenses', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });

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

    bindVehicle();
});

function bindVehicle() {
    var VehicleUrl = apiBase.apiurl + 'FmsAPI/GetFmsVehicles';
    $.get(VehicleUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#VehicleId").append($("<option></option>").val(value.BBID).html(value.VehicleName));
            $("#ServiceVehicleId").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    }).done(function (data) {
        var vid = $('#vehicleIdFromMain').val();
        if (vid != 0) {
            $("#VehicleId").select2().select2('val', vid).trigger('change');
            $("#ServiceVehicleId").select2().select2('val', vid);
            bindServiceReminders(vid);
        }
        bindServiceItems();
    });
}

function bindServiceItems() {
    var ServiceUrl = apiBase.apiurl + 'FmsAPI/BindServiceScheduleItems';
    $.post(ServiceUrl, function (data) {
        $.each(data, function (key, value) {
            $("#repairServiceItemID").append($("<option></option>").val(value.ServiceItemID).html(value.ServiceItem));
            $("#ServiceItemID").append($("<option></option>").val(value.ServiceItemID).html(value.ServiceItem));
        });
        
        $('#ServiceItemID').multiSelect({
            selectableHeader: "<input type='text' id='SearchSelectableService' class='search-input' autocomplete='off' placeholder='Search'>",
            selectionHeader: "<p style='padding-bottom:10px'>Selected Services:</p>",
            afterInit: function (ms) {
                $('#SearchSelectableService').on('keyup', function () {
                    var filter = $(this).val().toLowerCase();
                    var str;
                    $("#ServiceMulti .ms-selectable > ul.ms-list li").each(function (index, element) {
                        str = $(this).find('span').text().toLowerCase();
                        if (str.indexOf(filter) >= 0) {
                            $(this).css('display', '');
                        }
                        else {
                            $(this).css('display', 'none');
                        }
                    });
                });

                
            }
        });

        $('#repairServiceItemID').multiSelect({
            selectableHeader: "<input type='text' id='SearchSelectableRepair' class='search-input' autocomplete='off' placeholder='Search'>",
            selectionHeader: "<p style='padding-bottom:10px'>Selected Services:</p>",
            afterInit: function (ms) {
                $('#SearchSelectableRepair').on('keyup', function () {
                    var filter = $(this).val().toLowerCase();
                    var str;
                    $("#repairMulti .ms-selectable > ul.ms-list li").each(function (index, element) {
                        str = $(this).find('span').text().toLowerCase();
                        if (str.indexOf(filter) >= 0) {
                            $(this).css('display', '');
                        }
                        else {
                            $(this).css('display', 'none');
                        }
                    });
                });


            }
        });
    });
}

$('#serviceForm').on('change', '#ServiceVehicleId', function () {
    
    var VehicleId = $(this).val();
    console.log(VehicleId);
    bindServiceReminders(VehicleId);
});

function bindServiceReminders(VehicleId) {
    var serviceUrl = apiBase.apiurl + 'FmsAPI/GetServiceScheduleReminder';
    $('#scheduledServiceReminder').find('option:not(:first)').remove();
    $.get(serviceUrl, { custId: $custid, VehicleId: VehicleId }, function (data) {
        $.each(data, function (key, value) {
            $("#scheduledServiceReminder").append($("<option></option>").val(value.Value).html(value.Name));
        });
        if (getUrlParameter('serviceid') > 0) {
            $("#scheduledServiceReminder").val(getUrlParameter('serviceid'));
        }
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

$('input[type=radio][name=scheduledService]').change(function () {
    if (this.value == 'true') {
        $("#scheduledReminderDiv").removeClass('hidden');
    }
    else if (this.value == 'false') {
        $("#scheduledReminderDiv").addClass('hidden');
        $("#scheduledServiceReminder").val('');
    }
});

$('input[type=radio][name=partReplacedService]').change(function () {
    if (this.value == 'true') {
        $("#partReplacedServiceDiv").removeClass('hidden');
    }
    else if (this.value == 'false') {
        $("#partReplacedServiceDiv").addClass('hidden');
        
    }
});

$('input[type=radio][name=partReplacedServiceInventory]').change(function () {
    if (this.value == 'true') {
        $('#dialogReduceInventory').dialog('open');
    }
    else if (this.value == 'false') {
        $('#dialogAddInventory').dialog('open');
    }
});

$('input[type=radio][name=partReplacedRepair]').change(function () {
    if (this.value == 'true') {
        $("#partReplacedRepairDiv").removeClass('hidden');
    }
    else if (this.value == 'false') {
        $("#partReplacedRepairDiv").addClass('hidden');

    }
});

$('input[type=radio][name=partReplacedRepairInventory]').change(function () {
    if (this.value == 'true') {
        $('#dialogReduceInventory').dialog('open');
    }
    else if (this.value == 'false') {
        $('#dialogAddInventory').dialog('open');
    }
});

$(function () {
    $('#dialogReduceInventory').dialog({
        autoOpen: false,
        width: 800,
        height: 450,
        resizable: false,
        title: 'Reduce Parts Inventory',
        modal: true,
        open: function (event, ui) {
            $(this).load(urlReduceInventory);
        },
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });

    $('#dialogAddInventory').dialog({
        autoOpen: false,
        width: 800,
        height: 650,
        resizable: false,
        title: 'Add to Parts Inventory',
        modal: true,
        open: function (event, ui) {
            $(this).load(urlAddInventory);
        },
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
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

$('#serviceForm').on("submit", function (event) {
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
    if (confirm('Do you want to submit the form?')) {
        var vehicleid = $("#ServiceVehicleId option:selected").val();
        if (vehicleid != "") {
            var data = $('#serviceForm').serializeArray();
            var vehiclename = $("#ServiceVehicleId option:selected").text();  //$("#VehicleId").val();
            var ServiceItemIds = '';
            $('#ServiceItemID').val().forEach(function (val, index) {
                ServiceItemIds += val + ',';
            })
            if (ServiceItemIds != '')
                ServiceItemIds = ServiceItemIds.substring(0, ServiceItemIds.length - 1);
            var res = $("input[name='Accidental']:checked").val();
            var serviceCategory = 'Service';
            var ImagePath = $("#ImagePath").val();
            data.push(
                { name: 'VehicleId', value: vehicleid },
                { name: 'DocPath', value: ImagePath },
                { name: 'custid', value: $custid },
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



