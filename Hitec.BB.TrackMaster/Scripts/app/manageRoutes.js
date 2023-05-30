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
        if (e.target.className != ' details-control') showCreate(row.data());
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

function addRoute(){
    window.open("/map/ManageRoute?custid=" + $custid, "_blank");
}

function GetRoutes(downloadType) {

    // clear tables contents
    deleteTable();

    //var vehicleStatus = $("#vehicleStatus").val();

    var url = baseUrl + "ReportsAPI/GetGenericRoutes";
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
        columnDefs: [
            { width: '15%', targets: 6 }
        ],
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
                    return "<span style='cursor:pointer' onclick='showPoints("+full.id+")'>View POIs (" + full.pointcount + ")</span>";
                }
            },
            //{
            //    "data": null,
            //    "bSortable": false,
            //    "render": function (data, type, full) {
            //        //return "<span>View (" + full.vehcount + ")</span>";
            //        var str = '<select class="form-control select2" id="ddlVehicleList' + full.id + '" multiple >';
            //        $.each(data.allveh, function (j, item) {
            //            if (item.selected == true) {
            //                str += "<option selected value='" + item.bbid + "'>" + item.vehname + "</option>";
            //            }
            //            else {
            //                str += "<option value='" + item.bbid + "'>" + item.vehname + "</option>";
            //            }
            //        });
            //        str += '</select>';
            //        return str;
            //    }
            //},
            //{
            //    "orderable": false,
            //    "targets": 0,
            //    "className": 'details-control',
            //    "orderable": false,
            //    "data": null,
            //    "defaultContent": '<button class="btncreate btn btn-default">Create access</button>'
            //},
            {
                "data": null,
                "bSortable": false,
                "render": function (data, type, full) {
                    var str = "<button class='btn btn-default' id='btnupdate' onclick=updatedetails(" + full['id'] + ")>Modify Route</button> ";
                    //str += "<button class='btn btn-default' id='btnvehupdate' onclick=updateveh('" + full['id'] + "')>Update Vehicles</button>";
                    if (full['isactive'] == 0)
                        str += "<button class='btn btn-default' id='btnupdate' onclick=changestatus('" + full['id'] + "',true)>Enable</button>";
                    else
                        str += "<button class='btn btn-default' id='btnupdate' onclick=changestatus('" + full['id'] + "',false)>Disable</button>";
                    return str;
                }
            }
        ],
        "rowCallback": function (row, data, index) {

            //if (data.driverList.length == 0) {
            //    var target = $(row).find(".details-control");
            //    var index = (target).index();
            //    $(row).find('td:eq(' + index + ')').removeClass('details-control');
            //}
        }
    });
}

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
        var tableString = '<table id="subTbl' + data.bbid + '" cellpadding="5" class="table table-hover test" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Vehicle Name</th><th>Type</th><th>Name</th><th>Mobile</th><th>Status</th><th>Valid Till</th><th>Action</th></tr></thead>';
        a.forEach(function (element) {

            tableString = tableString +
                '<tr>' +
            '<td>' + element.vehname + '</td>' +
            '<td>' + element.type + '</td>' +
            '<td>' + element.name + '</td>' +
            '<td>' + element.mobile + '</td>' +
            '<td>' + element.status + '</td>' +
            '<td>' + element.validity.replace('T',' ') + '</td>' +
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
        data: { type: $('#type :selected').val(), name: $('#name').val(), mobile: $('#mobile').val(), validity: date.toDateString(), custid: $custid, bbid: $('#bbid :selected').val(), routeid: createrouteid },
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