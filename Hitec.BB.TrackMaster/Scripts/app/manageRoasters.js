var table;
var createrouteid;
var createvehlist = [];
$(document).ready(function () {
    debugger;
    GetRoutes(null, null);

    //$('.btncreate').on('click', 'td.details-control', function () {
    //    alert('d');
    //});

    $('#dt_basic_Master tbody').on('click', 'td.details-control', function (e) {
        debugger;
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        //if (e.target.className != ' details-control') showCreate(row.data());
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {

            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }

        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })
});

//function test() {
//    console.log($(this));
//    var tr = $(this).closest('tr');
//    var row = table.row(tr);
//    showCreate(row.data());
//}

$('#dt_basic_Master').on('draw.dt', function () {
    $(".select2").select2({
        placeholder: "Select an Option",
    });
});

$(document).on('click', '.top-info-square', function (e) {
    e.preventDefault();
    var vehicleStatus = $(this)[0].id;
    console.log('val: ' + vehicleStatus);
    GetRoutes(null, vehicleStatus);
});


$("#BtnSearch").click(function () {
    GetRoutes(null, null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "ReportsAPI/GetGenericRoutes";
    DownloadData(url, downloadType, null);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "ReportsAPI/GetGenericRoutes";
    DownloadData(url, downloadType, null);
});

function addRoute() {
    window.open("/map/ManageRoute?custid=" + $custid, "_blank");
}

function GetRoutes(downloadType) {

    // clear tables contents
    deleteTable();

    //var vehicleStatus = $("#vehicleStatus").val();

    var url = baseUrl + "ReportsAPI/GetRoaster";
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
                "data": "sno",
                "bSortable": false
            },
            {
                "data": "vehname",
                "bSortable": false
            },
            {
                "data": null,
                "bSortable": false,
                "render": function (data, type, full) {
                    return '<button class="btncreate btn btn-default" onclick="showAccessPopup(\'' + full['vehname'] + '\',\'' + full['bbid'] + '\')">Create access</button>';
                }
            },
            {
                "orderable": false,
                "targets": 0,
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''//<button class="btncreate btn btn-default">Create access</button>'
            },
            {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.a1 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            },
            {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.a2 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.b1 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.b2 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.c1 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.c2 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.d1 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.d2 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.e1 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.e2 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.f1 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.f2 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.g1 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            }, {
                "data": null, "bSortable": false, "render": function (data, type, full) {
                    var output = [];
                    full.routes.forEach(function (key, value) {
                        if (data.g2 == key.id) output.push('<option selected value="' + key.id + '">' + key.name + '</option>');
                        else output.push('<option value="' + key.id + '">' + key.name + '</option>');
                    });
                    return "<select style='width:100px'><option value='0'>Select Route</option>" + output.join("") + "</select>";
                }
            },
            {
                "data": null,
                "bSortable": false,
                "render": function (data, type, full) {
                    return '<button class="btncreate btn btn-default updateRoaster" id=' + full['bbid'] + '>Update roaster</button>';
                }
            }
        ],
        "rowCallback": function (row, data, index) {
            if (data.driverList.length == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control');
            }
        }
    });
}

$(document).on("click", "button.updateRoaster", function () {
    let tr = $(this).closest('tr');
    let bbid = $(this)[0].id; let vehname = tr.find('td:eq(1)').text();
    let a1 = tr.find('td:eq(4) option:selected').val(); let a2 = tr.find('td:eq(5) option:selected').val();
    let b1 = tr.find('td:eq(6) option:selected').val(); let b2 = tr.find('td:eq(7) option:selected').val();
    let c1 = tr.find('td:eq(8) option:selected').val(); let c2 = tr.find('td:eq(9) option:selected').val();
    let d1 = tr.find('td:eq(10) option:selected').val(); let d2 = tr.find('td:eq(11) option:selected').val();
    let e1 = tr.find('td:eq(12) option:selected').val(); let e2 = tr.find('td:eq(13) option:selected').val();
    let f1 = tr.find('td:eq(14) option:selected').val(); let f2 = tr.find('td:eq(15) option:selected').val();
    let g1 = tr.find('td:eq(16) option:selected').val(); let g2 = tr.find('td:eq(17) option:selected').val();
    var obj = {
        bbid: bbid, vehname: vehname, custid: $custid, a1: a1, a2: a2, b1: b1, b2: b2, c1: c1, c2: c2,
        d1: d1, d2: d2, e1: e1, e2: e2, f1: f1, f2: f2, g1: g1, g2: g2
    };
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        url: apiBase.apiurl + "ReportsAPI/updateRoaster",
        data: obj,
        success: function (result) {
            toastr.success("Roaster updated successfully");
            setTimeout(function () { location.reload(); }, 1000);
        },
        error: function (result) {
            console.log(result);
            alert('error');
        }
    });
});

function updateveh(id) {
    var list = $('#ddlVehicleList' + id).val();
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        url: apiBase.apiurl + "ReportsAPI/AssignVehicleToRoute",
        data: { routeid: id, bbidlist: list, custid: $custid },
        success: function (result) {
            toastr.success("Vehicles assigned successfully");
            setTimeout(function () { location.reload(); }, 1000);
        }
    });
}

function appendVehicleDDL() {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "AdminAPI/GetVehicles",
        data: { custId: $custid },
        success: function (result) {
            debugger;
            var data = result;
            if (data.length > 0) {
                $('#ddlVehicleList').append($('<option></option>').val(0).html("All Vehicle's"));
                $.each(data, function (j, item) {
                    $('#ddlVehicleList').append($('<option></option>').val(item.Value).html(item.Text));
                });
            }
        }
    });
}

function showPoints(id) {
    window.open("/map/ViewRoute?custid=" + $custid + "&id=" + id, "_blank");
}

function updatedetails(id) {
    window.open("/map/ManageRoute?custid=" + $custid + "&id=" + id, "_blank");
}

function changestatus(id, status) {
    $.ajax({
        type: "POST",
        url: baseUrl + "ReportsAPI/updateRoutestatus",
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


function format(d) {

    var data = d;

    if (data.driverList.length > 0) {
        var a = data.driverList;
        var tableString = '<table id="subTbl' + data.bbid + '" cellpadding="5" class="table table-hover test" cellspacing="0" style="width:93vw;outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Vehicle Name</th><th>Type</th><th>Name</th><th>Mobile</th><th>Status</th><th>Valid Till</th><th>Action</th></tr></thead>';
        a.forEach(function (element) {

            tableString = tableString +
                '<tr>' +
            '<td>' + element.vehname + '</td>' +
            '<td>' + element.type + '</td>' +
            '<td>' + element.name + '</td>' +
            '<td>' + element.mobile + '</td>' +
            '<td>' + element.status + '</td>' +
            '<td>' + element.validity.replace('T', ' ') + '</td>' +
            '<td><button class="btn btn-default" onclick="removeaccess(' + element.id + ')">Remove Access</button><button class="btn btn-default" style="margin-left:20px" onclick="removedriver(' + element.id + ')">Delete</button></td>' +
            '</tr>'

        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

function showCreate(obj) {
    debugger;
    createrouteid = obj.id;
    createvehlist = obj.allveh.filter(e=>e.selected == true);
    console.log(createvehlist);
    $('#bbid').find('option').remove().end().append('<option value="">Choose vehicle</option>').val('');
    $.each(createvehlist, function (j, item) {
        $('#bbid').append($('<option></option>').val(item.bbid).html(item.vehname));
    });
    $("#myModal").modal();
}


function showAccessPopup(txt, bbid) {
    $('#bbid').text(bbid);
    $('#vehname').text("Create Access for " + txt);
    $('#myModal').css("z-index","999999").css("height","450px").css("background-color","transparent").css("border","0").css("-webkit-box-shadow","none").css("box-shadow","none");
    $("#myModal").modal();
}

function createaccess() {
    var date = new Date();
    var days = $('#valid :selected').val();
    if (days == 0) date.setDate(date.getDate() + parseInt(500));
    else date.setDate(date.getDate() + parseInt(1) + parseInt(days));
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        url: apiBase.apiurl + "ReportsAPI/createAccess",
        data: { type: $('#type :selected').val(), name: $('#name').val(), mobile: $('#mobile').val(), validity: date.toDateString(), custid: $custid, bbid: $('#bbid').text(), routeid: 0 },
        success: function (result) {
            toastr.success("Access created successfully");
            setTimeout(function () { location.reload(); }, 1000);
        }
    });
}

function removeaccess(id) {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "ReportsAPI/getremoveAccess",
        data: { id: id },
        success: function (result) {
            toastr.success("Access removed successfully");
        }
    });
}

function removedriver(id) {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "ReportsAPI/getremoveDriver",
        data: { id: id },
        success: function (result) {
            toastr.success("Record removed successfully");
        }
    });
}