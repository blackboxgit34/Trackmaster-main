var table;
var $custid;
function format(d) {
    console.log(d)
    var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>AssignedStartDateTime</th>        <th>AssignedEndDateTime</th>        <th>ActualStartDateTime</th>  <th>ActualEndDateTime</th><th>TimeDelayBegin</th><th>TimeDelayEnd</th><th>DistanceDelay</th> </tr></thead>';
    tableString = tableString +
        '<tr>' +
    '<td>' + d.AssignedStartDateTime + '</td>' +
    '<td>' + d.AssignedEndDateTime + '</td>' +
    '<td>' + d.ActualStartDateTime + '</td>' +
    '<td>' + d.ActualEndDateTime + '</td>' +
    '<td>' + d.TimeDelayBegin + '</td>' +
    '<td>' + d.TimeDelayEnd + '</td>' +
    '<td>' + d.DistanceDelay + '</td>' +
    '</tr>'
    tableString = tableString + '</table>';
    return tableString;
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    console.log($beginDate);
    console.log($endDate);
    console.log($custid);
    var VehicleUrl = apiBase.apiurl + 'FmsAPI/GetFmsVehicles';
    $('#vehicleList').find('option:not(:first)').remove();
    $.get(VehicleUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#vehicleList").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    });

    
    var EmpUrl = apiBase.apiurl + 'FmsAPI/GetFmsEmployeeList';
    $('#DriverList').find('option:not(:first)').remove();
    $.get(EmpUrl, { custid: $custid, employeeType: 17 }, function (data) {
        $.each(data, function (key, value) {
            $("#DriverList").append($("<option></option>").val(value.EmployeeID).html(value.EmpName));
        });
    });

    $('#technicianList').find('option:not(:first)').remove();
    $.get(EmpUrl, { custid: $custid, employeeType: 3 }, function (data) {
        $.each(data, function (key, value) {
            $("#technicianList").append($("<option></option>").val(value.EmployeeID).html(value.EmpName));
        });
    });
    GetTripInfo();

    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })


});

$('#searchform').on('change', '#vehicleList', function () {
    var vehicleid = $(this).val();
    bindmasterTrip(vehicleid);
});

function bindmasterTrip(vehid) {
    
    var mastertripUrl = apiBase.apiurl + 'FmsAPI/GetMasterTripList';
    $('#masterTripList').find('option:not(:first)').remove();
    $.get(mastertripUrl, { custid: $custid, vehicleId: vehid }, function (data) {
        $.each(data, function (key, value) {
            $("#masterTripList").append($("<option></option>").val(value.TripId).html(value.TripName));
        });
    });
}
$("#BtnSearch").click(function () {
    GetTripInfo();
});

function GetTripInfo() {
    
    deleteTable();
    var $mastertripid = $("#masterTripList").val();

    var $technicianid = $("#technicianList").val();
    var $driverid = $("#DriverList").val();
    var $vehid = $("#vehicleList").val();
    var url = apiBase.apiurl + "FmsApi/GetFMSTripList";
    
    console.log('Calling URL: ' + url + ' to get Report data.');
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid }, { "name": "MasterTripId", "value": $mastertripid }, { "name": "technicianId", "value": $technicianid }, { "name": "DriverId", "value": $driverid }, { "name": "VehicleId", "value": $vehid }, { "name": "StartDateTime", "value": $beginDate }, { "name": "EndDateTime", "value": $endDate });
        },
        "columns": [

                { "data": "SrNo" },
                { "data": "Bbid" },
                { "data": "VehicleName" },
                { "data": "TripName" },
                { "data": "Distance" },
                { "data": "ActualDistance" },
                { "data": "DriverName" },
                { "data": "TechnicianName" },
                { "data": "StartLoc" },
                { "data": "EndLoc" },
                {
                    "className": 'details-control',
                    "data": null,
                    defaultContent: ''
                },
                {
                    "data": null,
                    "render": function (data, type, full, meta) {
                        
                        return '<a href=/fms/AddTrip?tid=' + full.TripId + '>Edit</a>/ <a href="#" class="editor_remove">Delete</a>';
                    }

                },
        ],
        "rowCallback": function (row, data, index) {
            var target = $(row).find(".details-control");
            var index = (target).index();
            //$(row).find('td:eq(' + index + ')').removeClass('details-control')
        }
    });

    $('#dt_basic_Master tbody').on('click', 'a.editor_remove', function () {
        var data = table.row($(this).parents('tr')).data().TripId;
        var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveTrip?tripId=" + data;
        $.post(ApiUrl, function (result) {
            if (result > 0) {
                toastr.success("Record Deleted successfully!");
            }
            else {
                toastr.error("Record Failed to Delete!");
            }
        });
    });
}