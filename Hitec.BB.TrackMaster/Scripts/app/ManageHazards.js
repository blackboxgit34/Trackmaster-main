var table;
$(document).ready(function () {


    GethazardInfo(null, null);

    $('#BtnAdd').click(function () {
        $('#upid').val('');
        $('#upname').val('');
        $('#upurlbak').val('');
        $('#myModal').dialog();
        $('#ui-id-1').text("Add new hazard");
    });
});

$(document).on('click', '.top-info-square', function (e) {
    e.preventDefault();
    var vehicleStatus = $(this)[0].id;
    console.log('val: ' + vehicleStatus);
    GethazardInfo(null, vehicleStatus);
});


$("#BtnSearch").click(function () {
    GethazardInfo(null, null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsAPI/GetVehicleInfo";
    DownloadData(url, downloadType, null);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetVehicleInfo";
    DownloadData(url, downloadType, null);
});

function GethazardInfo(downloadType) {

    // clear tables contents
    deleteTable();

    //var vehicleStatus = $("#vehicleStatus").val();

    var url = baseUrl + "ReportsAPI/GetHazards";
    var vehicleId = 0;
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "id",
                    "class": "hidden",
                    "bSortable": false
                },
                {
                    "data": "sno",
                    "bSortable": false
                },
                {
                    "data": "name",
                    "bSortable": false
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        var VehicleName = full['addedon'];
                        return VehicleName.replace("T", " ");
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        if (full['isactive'] == 0)
                           return "<span class='label label-danger'>Inactive</span>";
                        else
                            return "<span class='label label-Success'>Active</span>";
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        return '<audio controls><source src="' + full['url'] + '" type="audio/ogg"><source src="' + full['url'] + '" type="audio/mpeg">Your browser does not support the audio element.</audio>';
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        var str = "<button class='btn btn-default' id='btnupdate' onclick=updatedetails('" + full['id'] + "','" + full['name'] + "','" + full['url'] + "')>update</button> ";
                        if (full['isactive'] == 0)
                            str += "<button class='btn btn-default' id='btnupdate' onclick=changestatus('" + full['id'] + "',true)>Enable</button>";
                        else
                            str += "<button class='btn btn-default' id='btnupdate' onclick=changestatus('" + full['id'] + "',false)>Disable</button>";
                        return str;
                    }
                }
        ]
    });
}

function addhazard(name, url) {
    $.ajax({
        type: "POST",
        url: baseUrl + "ReportsAPI/AddHazards",
        data: { custid: $custid, name: name, url: url },
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {
            UpdateFile
            toastr.success("Hazard added successfully");
            setTimeout(function () { location.reload(); }, 1000);
        },

        error: function (jqXHR, status) {
            toastr.error("Something went wrong.");
        }
    });
}

function updatedetails(id, name, url) {
    $('#upid').val(id);
    $('#upname').val(name);
    $('#upurlbak').val(url);
    $('#myModal').dialog();
    $('#ui-id-1').text("Update hazard details"); 
}

function update() {
    debugger;
    if ($('#upid').val() == '') {
        var data = new FormData();
        var files = $("#upurl").get(0).files;
        if (files.length > 0) {
            data.append("Audio", files[0]);
        }
        $.ajax({
            url: "/Report/UploadFile",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (result) {
                $.ajax({
                    type: "POST",
                    url: baseUrl + "/ReportsAPI/AddHazards",
                    data: { custid: $custid, name: $('#upname').val(), url: result.imgPath }, // get file and post in API
                    contentType: "application/x-www-form-urlencoded",
                    crossDomain: true,
                    dataType: "json",
                    success: function (data, status, jqXHR) {
                        $.ajax({
                            url: "/Report/UpdateFile",
                            type: "GET",
                            contentType: "application/x-www-form-urlencoded",
                            data: {payload: data.result},
                            success: function (result) {
                                toastr.success("Hazard detail updated");
                                setTimeout(function () { location.reload(); }, 1000);
                            },
                            error: function (er) {
                                console.log(er.responseText);
                            }
                        });
                    },
                    error: function (jqXHR, status) {
                        toastr.error("Something went wrong.");
                    }
                });
            },
            error: function (er) {
                console.log(er.responseText);
            }
        });
    }
    else {
        var data = new FormData();
        var files = $("#upurl").get(0).files;
        if (files.length > 0) {
            data.append("Audio", files[0]);
        }
        $.ajax({
            url: "/Report/UploadFile",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (result) {
                debugger;
                var finalurl = 'd';
                //if ($('#upurl').val() == '') finalurl = $('#upurlbak').val();  // get file and post in API
                if (result.imgPath == '') finalurl = $('#upurlbak').val();  // get file and post in API
                else finalurl = result.imgPath;
                $.ajax({
                    type: "POST",
                    url: baseUrl + "ReportsAPI/UpdateHazards",
                    data: { id: $('#upid').val(), name: $('#upname').val(), url: finalurl },
                    contentType: "application/x-www-form-urlencoded",
                    crossDomain: true,
                    dataType: "json",
                    success: function (data, status, jqXHR) {
                        toastr.success("Hazard detail updated");
                        setTimeout(function () { location.reload(); }, 1000);
                    },

                    error: function (jqXHR, status) {
                        toastr.error("Something went wrong.");
                    }
                });
            },
            error: function (er) {
                console.log(er.responseText);
            }
        });
    }
}

function changestatus(id, status) {
    $.ajax({
        type: "POST",
        url: baseUrl + "ReportsAPI/changeHazards",
        data: { id: id, isactive: status },
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {
            toastr.success("Status updated");
            setTimeout(function () { location.reload(); }, 1000);
        },

        error: function (jqXHR, status) {
            toastr.error("Something went wrong.");
        }
    });
}

function doNavigate(url, vehicleId) {
    window.open(url.value, '_blank');
}

function DownloadData(url, downloadType, vehicleStatus) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var vehicleId = 0;
    var reportName = 'VehiclesList';
    //var vehicleStatus = $("#vehicleStatus").val();
    var url1 = url + "?downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

function changeHandler({
  target
}) {
    if (!target.files.length) return;
    const urlObj = URL.createObjectURL(target.files[0]);
    const audio = document.createElement("audio");
    audio.addEventListener("load", () => {
        URL.revokeObjectURL(urlObj);
    });
    document.getElementById("player").appendChild(audio);
    audio.controls = "true";
    audio.src = urlObj;
}

document.getElementById("upurl").addEventListener("change", changeHandler);