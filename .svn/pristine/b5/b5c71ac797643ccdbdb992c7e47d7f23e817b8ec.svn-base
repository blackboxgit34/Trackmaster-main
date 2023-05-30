$(".js-example-basic").select2({})
var VendorId = $('#VendorID').val();

$(document).ready(function () {

    var StateUrl = apiBase.apiurl + 'FmsAPI/GetFmsStates';

    $('form').on('keydown', '#PostalCode, #PhoneNo, #LandlineNo, #CreditCyleAmount', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });

    $.get(StateUrl, function (data) {
        $('#StateId').find('option:not(:first)').remove();
        $.each(data, function (key, value) {
            $("#StateId").append($("<option></option>").val(value.Value).html(value.Name));
        });
    }).done(function () { bindData(); });


    var $stateid = $("#StateId").val();
    if ($stateid == '' || $stateid == null)
        $stateid = 0;
    bindcities($stateid);



    document.getElementById('CustId').value = $custid;

});

function bindcities(stateid) {
    var CityUrl = apiBase.apiurl + 'FmsAPI/GetFmsCity';
    $('#CityId').find('option:not(:first)').remove();
    $.get(CityUrl, { stateid: stateid }, function (data) {
        $.each(data, function (key, value) {
            $("#CityId").append($("<option></option>").val(value.Value).html(value.Name));
        });
    });
}

$('#VendorForm').submit(function () {
    

    var State = $("#StateId option:selected").text();
    var City = $("#CityId option:selected").text();

    var vendorName = $("#VendorName").val();
    var vendorType = $("#VendorType").val();

    var Address = $("#Address").val();
    var PostalCode = $("#PostalCode").val();

    var PhoneNo = $("#PhoneNo").val();
    var LandlineNo = $("#LandlineNo").val();
    var Email = $("#Email").val();

    var CreditCyleLimit = $("#CreditCyleLimit").val();
    var CreditCyleAmount = $("#CreditCyleAmount").val();

    var Remarks = $("#Remarks").val();


    var url = apiBase.apiurl + 'FmsAPI/AddUpdateVendor';
    var data = $('#VendorForm').serializeArray();
    console.log(data);
    //var files = $("#file").get(0).files;
    data.push(
        { name: 'state', value: State },
        { name: 'city', value: City }
    );

    $.post(url, $.param(data), function (result) {
        if (result > 0) {
            toastr.success("Record Entered Successfuly")
            window.setTimeout(function () {
                window.location.href = '/Fms/ManageVendor';
            }, 1000);

        }
        else
            toastr.error("Failed!!!")
    });
});

$('#VendorForm').on('change', '#StateId', function () {
    var stateid = $(this).val();
    bindcities(stateid);
});

function bindData() {
    if (VendorId > 0) {
        var VendorUrl = apiBase.apiurl + 'FmsAPI/GetVendorByVendorId';
        $.get(VendorUrl, { VendorId: VendorId }, function (data) {

            $.each(data, function (item, value) {
                if (item == "State") {
                    $("#StateId option:contains(" + value + ")").attr('selected', 'selected');
                    var stateId = $("#StateId option:selected").val();
                    if (stateId == '' || stateId == null)
                        stateId = 0;
                    bindcities(stateId);
                }
                else if (item == "City") {
                    window.setTimeout(function () {
                        $("#CityId option:contains(" + value + ")").attr('selected', 'selected');
                    }, 1000);
                }
                else if (item == "AttachmentPath") {
                    if (value.length > 0) {
                        var arr = value.split(',');
                        $.each(arr, function () {
                            if (this.length > 0) {
                                $('#file').append('<img src="' + this + '" style="height:50px;width:50px;" /><br/>');
                            }
                        });
                    }
                }
                else {
                    $("#" + item).val(value);
                }
            });
        });
    }
}