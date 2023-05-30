$(".js-example-basic").select2({})
$(document).ready(function () {
    $('#StartDateTime').datepicker();
    $('#EndDateTime').datepicker();

    var VehicleUrl = apiBase.apiurl + 'fmsapi/GetFmsVehicles';
    $('#VehicleId').find('option:not(:first)').remove();
    $.get(VehicleUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#VehicleId").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    });
    var StarEndLocUrl = apiBase.apiurl + 'FmsAPI/GetStarEndLocation';
    $('#StartLatLong').find('option:not(:first)').remove();
    $('#EndLatLong').find('option:not(:first)').remove();
    $.get(StarEndLocUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#StartLatLong").append($("<option></option>").val(value.StartLatLong).html(value.StartLoc));
            $("#EndLatLong").append($("<option></option>").val(value.StartLatLong).html(value.StartLoc));
        });
    });
    var EmpUrl = apiBase.apiurl + 'FmsAPI/GetFmsEmployeeList';
    $('#DriverEmpId').find('option:not(:first)').remove();
    $.get(EmpUrl, { custid: $custid, employeeType: 17 }, function (data) {
        $.each(data, function (key, value) {
            $("#DriverEmpId").append($("<option></option>").val(value.EmployeeID).html(value.EmpName));
        });
    });

    $('#TechnicianEmpId').find('option:not(:first)').remove();
    $.get(EmpUrl, { custid: $custid, employeeType: 3 }, function (data) {
        $.each(data, function (key, value) {
            $("#TechnicianEmpId").append($("<option></option>").val(value.EmployeeID).html(value.EmpName));
        });
    });
    var masterTripUrl = apiBase.apiurl + 'fmsapi/GetMasterTripList';
    $.get(masterTripUrl, { custid: $custid, vehicleId: '' }, function (data) {
        $.each(data, function (key, value) {
            $("#MasterTripId").append($("<option></option>").val(value.TripId).html(value.TripName));
        });
    });

    var tid = getUrlParameter("tid");
    if (tid != null && tid > 0) {
        var url = apiBase.apiurl + "FmsApi/GetTripByTripId";
        $.get(url, { custid: $custid, tripid: tid }, function (data) {
            $("#statusText").text("Update Trip");
            $.each(data, function (item, value) {
                
                if (item == "AssignedStartDateTime")
                    $("#StartDateTime").val(value);

                if (item == "AssignedEndDateTime")
                    $("#EndDateTime").val(value);
               
                $("#" + item).val(value);
            });
        });
    }
});

$('#AddNewTrip').submit(function () {
    // var VehicleName = $("#VehicleId option:selected").text();
    var vehicleid = $("#VehicleId option:selected").val();
    var tripname = $("#MasterTripId option:selected").text();
    var startLocation = $("#StartLatLong option:selected").text();
    var endLocation = $("#EndLatLong option:selected").text();
    var DriverName = $("#DriverEmpId option:selected").text();
    var techninicianName = $("#TechnicianEmpId option:selected").text();

    var data = $('#AddNewTrip').serializeArray();
    data.push({ name: 'Bbid', value: vehicleid },
        { name: 'TripName', value: tripname },
        { name: 'CustId', value: $custid },
        { name: 'StartLoc', value: startLocation },
        { name: 'EndLoc', value: endLocation },
    { name: 'DriverName', value: DriverName },
    { name: 'TechnicianName', value: techninicianName });

    var TUrl = apiBase.apiurl + 'FmsAPI/AddUpdateTrip';
    $.post(TUrl, $.param(data), function (result) {
        if (result > 0) {

            toastr.success("Record Entered Successfuly")
            window.setTimeout(function () {
                window.location.href = '/Fms/TripInfo';
            }, 1000);

        }
        else
            toastr.error("Failed!!!")
    });
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