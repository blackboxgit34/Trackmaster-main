
$(document).ready(function () {
    $('#DueDate').datepicker();
    
    bindRenewaltypes();
});



function bindRenewaltypes() {
    var url = baseUrl + 'FmsAPI/GetRenewalTypeList';
    $.get(url, function (data) {
        $.each(data, function (key, value) {
            $("#RenewalTypeId").append($("<option></option>").val(value.Value).html(value.Text));
        });
    }).done(function (data) {
        bindVehicles();
    });
}

function bindVehicles()
{
    var VehicleUrl = apiBase.apiurl + 'FmsAPI/GetFmsVehicles';
    $.get(VehicleUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#vehicleID").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    }).done(function (data) {
        bindData();
    });
}

function bindData()
{
    var renewID = getUrlParameter("renewalID");
    if (renewID > 0) {
        var RenewUrl = apiBase.apiurl + 'FmsAPI/GetRenewalReminderByRenewalId';
        $.get(RenewUrl, { rrid: renewID }, function (data) {
            $.each(data, function (item, value) {
                if (item == "RenewalTypeId") {
                    $("#" + item).select2().select2('val', value);
                }
                else if (item == "vehicleID") {
                    $("#" + item).select2().select2('val', value);
                }
                else if (item == "DueDate") {
                    var duedate = moment(value).format("MM/DD/YYYY");
                    $("#" + item).val(duedate);

                }
                else
                    $("#" + item).val(value);
            });
        });
    }
}

$('#RenewalForm').submit(function () {
    
    var RenewalTypeId = $("#RenewalTypeId:selected").text();

    var data = $('#RenewalForm').serializeArray();

    data.push(
        { name: 'RenewalTypeId', value: RenewalTypeId }
        );
    var url = apiBase.apiurl + 'FmsAPI/AddUpdateRenewalReminder';
    $.post(url, $.param(data), function (result) {
        if (result > 0) {
            if (result == 1) {
                toastr.success("Reminder updated successfully")
            }
            else
            {
                toastr.success("Reminder created successfully")
            }
            window.setTimeout(function () {
                window.location.href = '/Fms/RenewalReminder';
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