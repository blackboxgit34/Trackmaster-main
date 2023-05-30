$(".js-example-basic").select2({})
var imageCount = 1;
var spanId = 0;
$(document).ready(function () {
    $('#HireDate').datepicker();
    $('#AttachmentDiv').hide();
    $('#LicenseExpiryDate').datepicker();
    bindEmployeeTypes();

    bindData();
   
    var removeFlag=false;
    if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function (e) {
            debugger;
            var files = e.target.files,
               filesLength = files.length;
            imageCount = imageCount + filesLength-1 ;
            if (imageCount < 4) {
               
                imageCount = imageCount - filesLength + 1;
                //alert(filesLength)
                if (filesLength < 4) {
                    for (var i = 0; i < filesLength; i++) {
                        imageCount = imageCount + 1;
                    
                      
                        var f = files[i];
                        var fileReader = new FileReader();
                        fileReader.onload = (function (e) {
                            spanId = spanId + 1;
                            alert(spanId);
                            var file = e.target;
                            $("<span class=\"pip\" id='pip" + spanId + "'>" +
                              "<img id=\"Image" + (spanId) + "\" class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
                              "<br/><span  class=\"remove\" onClick='clickMeFun(this.id);' id='" + spanId + "' >Remove</span>" +
                              "</span>").insertAfter("#files");
                          
                            //$(".remove").click(function () {
                            //    alert("test");
                                
                            //    debugger;
                            //    removeFlag = true;
                            //    $(this).parent(".pip").remove();
                            //    var imageId = $(this).parent(".pip")[0].childNodes[0].id;
                              
                            //});


                        });
                        fileReader.readAsDataURL(f);

                    }
                   


                }
                else {
                    alert('You can upload upto 3 images only!');
                    return false;
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
$("#files").on("change", ".remove", function () {
    //$(".remove").click(function () {
        debugger;
        removeFlag = true;
        $(this).parent(".pip").remove();
        var imageId = $(this).parent(".pip")[0].childNodes[0].id;

        var appendId = $(this).attr('data-id');
        filecollection.splice(filecollection.indexOf(filecollection[appendId]), 1);
        $('#' + appendId).remove();
        console.log(filecollection);

   // });
});

function clickMeFun(id)
{
    alert(id);
    id = parseInt(id);
    //removeFlag = true;
    //    $(this).parent(".pip").remove();
    //    var imageId = $(this).parent(".pip")[0].childNodes[0].id;
   // var imageId = $("#pip" + id + "")[0].childNodes[0].id;
    $("#pip" + id + "").remove();
    imageCount = imageCount - 1;
    
}

function GetNoOFFilesAdded() {
    debugger;
    var empid = $("#EmployeeID").val();
    var EmpTypeUrl = apiBase.apiurl + 'FmsAPI/GetNumberOfFilesUploadedEarlier?empid=' + empid;
    $.get(EmpTypeUrl, function (resultz) {
    }).done(function (resultz) {
        debugger;

        if (resultz > 2) {
            saveData();
        }
        else
            UploadImageDocuments();
    });
}

function UploadImageDocuments() {
    var imagesPath = '';
    var imagesFileName = '';
    var files = $("#files").get(0).files;
    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
        data.append(files[i].name, files[i]);
    }
    console.log(data);
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
                    console.log(value.Name + '_' + value.fullPath);
                    var img = "../../" + value.fullPath + ',';//+ "\\" + value.Name + ',';
                    ImagePathList += img;
                    ImageNames += value.Name + ',';

                });
                $("#ImagePath").val(ImagePathList);
                $("#ImageFileName").val(ImageNames);
                return true;
            },
            error: function (er) {
                alert(er);
                return false;
            }
        }).done(function () {
            saveData();
        });
    }
}

function bindEmployeeTypes() {
    var EmpTypeUrl = apiBase.apiurl + 'FmsAPI/GetFmsEmployeeType';
    $('#EmployeeTypeId').find('option:not(:first)').remove();
    $.get(EmpTypeUrl, function (data) {
        $.each(data, function (key, value) {
            $("#EmployeeTypeId").append($("<option></option>").val(value.Value).html(value.Name));
        });
    }).done(function (data) {
        bindStatesList();
    });
}

function bindStatesList() {
    var StateUrl = apiBase.apiurl + 'FmsAPI/GetFmsStates';
    $('#StateId').find('option:not(:first)').remove();
    $('#PermanentStateId').find('option:not(:first)').remove();

    $.get(StateUrl, function (data) {
        $.each(data, function (key, value) {
            $("#StateId").append($("<option></option>").val(value.Value).html(value.Name));
            $("#PermanentStateId").append($("<option></option>").val(value.Value).html(value.Name));
        });
    }).done(function (data) {
        window.setTimeout(function () {
        }, 1000);
        bindCitiesList();
    });
}

function bindCitiesList() {
    var $stateid = $("#StateId").val();
    var $Permanentstateid = $("#PermanentStateId").val();

    if ($stateid.length > 0) {
        bindcities($stateid);
    }

    if ($Permanentstateid.length > 0) {
        bindpermanentcities($Permanentstateid);
    }
}

function bindData() {
    var empid = getUrlParameter("empid");
    if (empid != null && empid > 0) {
        $("#statusText").text("Update Employee");
        var url = apiBase.apiurl + "FmsApi/GetEmployeeByEmpId";
        $.get(url, { custid: $custid, empid: empid }, function (data) {
            console.log(data);

            $("#StateId option:contains(" + data.State + ")").attr('selected', 'selected');
            $("#PermanentStateId option:contains(" + data.PermanentState + ")").attr('selected', 'selected');
            var stateId = $("#StateId option:selected").val();
            var Permanentstateid = $("#PermanentStateId").val();
            if (stateId.length > 0) {
                bindcities(stateId);
            }
            if (Permanentstateid.length > 0) {
                bindpermanentcities(Permanentstateid);
            }
            $.each(data, function (item, value) {

                if (item == "IdProof") {
                    var arr = value.split('/');
                    $("#IdProofType").val(arr[0]);
                    $("#IdProofNo").val(arr[1]);
                }
                else if (item == "City") {
                    window.setTimeout(function () {
                        $("#CityId option:contains(" + value + ")").attr('selected', 'selected');
                    }, 1000);
                }
                else if (item == "PermanentCity") {
                    window.setTimeout(function () {
                        $("#PermanentCityId option:contains(" + value + ")").attr('selected', 'selected');
                    }, 1000);
                }
                if (item == "HireDate") {
                    //var HireDate = moment(value).format("MM/DD/YYYY");
                    $("#" + item).val(value);

                }
                else if (item == "ImagePath") {
                    debugger;
                    if (value.length > 0) {
                        var arr = value.split(',');
                        $.each(arr, function () {
                            if (this.length > 0) {
                                $("<span class=\"pip\">" +
                          "<img id=\"Image" + (this.length--) + "\" class=\"imageThumb\" src=\"" + this + "\" title=\"" + this + "\"/>" +
                          "<br/><span class=\"remove\">Remove</span>" +
                          "</span>").insertAfter("#files");
                                $("span.remove").click(function () {
                                     debugger;
                                    var removeFlag = false;
                                    var elmnt = $(this);
                                    var elmt = $(this).parent(".pip")[0].childNodes[0];
                                    console.log(elmt);
                                    var imagename = elmt.src.split('/').pop();
                                    console.log(imagename);
                                    var res = confirm("Do you want to delete this file?");
                                    if (res) {
                                        var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveEmployeeAttachment?custid=" + $custid + "&empid=" + empid + "&imagename=" + imagename;
                                        $.post(ApiUrl, function (result) {
                                            debugger;
                                            if (result > 0) {
                                                elmnt.parent(".pip").remove();
                                                toastr.success("File Deleted successfully!");
                                            }
                                            else {
                                                toastr.error("File Failed to Delete!");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
                if (item == "AttachmentName") {
                    if (value.length > 0) {

                        console.log("AttachmentName" + value);
                        var arr = value.split('_');
                        $("#AttachmentName").text(arr[1]);
                        $("#AttachmentDiv").show();
                    }
                    else {
                        $("#AttachmentDiv").hide();
                    }
                }
                if (item == "AttachmentPath") {
                    console.log("AttachmentPath" + value);
                    $("#" + item).val(value);
                    $("#Attachment_Path").attr("href", value);
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

$('#AddNewEmployee').on('change', '#StateId', function () {
    var stateid = $(this).val();
    bindcities(stateid);
});

$('#AddNewEmployee').on('change', '#PermanentStateId', function () {
    var stateid = $(this).val();
    bindpermanentcities(stateid);
});

//Bind Cities wrt States
function bindcities(stateid) {
    var CityUrl = apiBase.apiurl + 'FmsAPI/GetFmsCity?stateid=' + stateid;
    $('#CityId').find('option:not(:first)').remove();
    $.get(CityUrl, function (data) {
        $.each(data, function (key, value) {
            $("#CityId").append($("<option></option>").val(value.Value).html(value.Name));
        });
    });

}

function bindpermanentcities(stateid) {
    var CityUrl = apiBase.apiurl + 'FmsAPI/GetFmsCity?stateid=' + stateid;
    $('#PermanentCityId').find('option:not(:first)').remove();
    $.get(CityUrl, function (data) {
        $.each(data, function (key, value) {
            $("#PermanentCityId").append($("<option></option>").val(value.Value).html(value.Name));
        });
    });
}

//Driver Details
$('#EmployeeTypeId').on('change', function () {
    var empType = $(this).find(":selected").val();
    if (empType == 17) {
        $('#driverdetails').show();
    }
    else
        $('#driverdetails').hide();
});

//Add Employee
$('#AddNewEmployee').submit(function () {

    GetNoOFFilesAdded();
    // UploadImageDocuments();
});

function saveData() {
    debugger;
    var State = $("#StateId option:selected").text();
    var City = $("#CityId option:selected").text();

    var PermanentState = $("#PermanentStateId option:selected").text();
    var PermanentCity = $("#PermanentCityId option:selected").text();

    var prooftype = $("#IdProofType option:selected").text();
    var IdProofNo = $("#IdProofNo").val();
    var IdProof = prooftype + '/' + IdProofNo;

    var IdProofNo = $("#IdProofNo").val();

    var data = $('#AddNewEmployee').serializeArray();
    data.push({ name: 'Custid', value: $custid },
            { name: 'IdProof', value: IdProof },
            { name: 'State', value: State },
            { name: 'City', value: City },
            { name: 'PermanentState', value: PermanentState },
            { name: 'PermanentCity', value: PermanentCity }
    );

    console.log(data);

    var EmpUrl = apiBase.apiurl + 'FmsAPI/AddUpdateEmployee';
    $.post(EmpUrl, $.param(data), function (result) {
        if (result > 0) {

            toastr.success("Record Entered Successfuly")
            window.setTimeout(function () {
                window.location.href = '/Fms/ManageEmployee';
            }, 1000);

        }
        else
            toastr.error("Failed!!!")
    });
}

$("#fileAttachmentsPath").bind("click change", function () {
    var data = new FormData();
    var files = $("#fileAttachmentsPath").get(0).files;
    if (files.length > 0) {
        data.append("MyImages", files[0]);
    }
    $.ajax({
        url: "/Fms/UploadFile",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (result) {

            $("#AttachmentsFileName").val(result.imgName);
            $("#AttachmentName").val(result.imgName);
            $("#AttachmentPath").val(result.imgPath);
            $("#Attachment_Path").attr("href", result.imgPath);
        },
        error: function (er) {
            alert(er);
        }
    });
});
