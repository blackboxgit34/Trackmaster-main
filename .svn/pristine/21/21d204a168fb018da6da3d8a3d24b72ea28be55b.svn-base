$(".js-example-basic").select2({})
$(document).ready(function () {
    $("#tyrelist").show();
    $('#FitDate').datepicker();
    $("#VehicleId").prop("disabled", false);
    $('form').on('keydown', '#odometerReading', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });
    var VehUrl = apiBase.apiurl + 'FmsAPI/GetFmsVehicles?custid=' + $custid;
    $.get(VehUrl, function (data) {
        $('#DisposeVehicle').find('option:not(:first)').remove();
        $('#VehicleId').find('option:not(:first)').remove();
        $.each(data, function (key, value) {
            $("#DisposeVehicle").append($("<option></option>").val(value.BBID).html(value.VehicleName));
            $("#VehicleId").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    }).done(function () {
        bindData();
    });
});

function bindData() {
    var tfitid = getUrlParameter("tinventid");
    if (tfitid != null && tfitid > 0) {

        $("#statusText").text("Update Tyre Disposal");
        $("#VehicleId").prop("disabled", true);
        $("#tyrelist").hide();
        var url = apiBase.apiurl + "FmsApi/GetInventoryByInventIdDisposal";
        var dispose = 1;
        $.get(url, { custid: $custid, invenid: tfitid, disposal: dispose }, function (data) {
            $("#Warranty").val(data.Warranty + data.WarrantyType);
            var VehId = data.VehicleId;
            console.log(data);
            $.each(data, function (item, value) {
                if (item == "Warranty" || item == "WarrantyType") { }
                if (item == "SerialNo") {
                    $("#" + item).val(value);
                    var TDurl = apiBase.apiurl + "FmsApi/GetTyreDisposalByTyreSerialNo";
                    $.get(TDurl, { custid: $custid, serialno: value, vehicleid: VehId }, function (Resultdata) {
                        console.log(Resultdata)
                        $.each(Resultdata, function (itemz, valuez) {
                            switch (itemz) {
                                case "TyreId":
                                    $("#TyreId").val(valuez);
                                    break;
                                case "TotalRun":
                                    $("#odometerReading").val(valuez);
                                    break;
                                case "TypeTyre":
                                    $("#Reason option:contains(" + valuez + ")").attr('selected', 'selected');
                                    $("#Reason").trigger("change");
                                    break;
                                case "ResoldPrize":
                                    $("#ResoldPrize").val(valuez);
                                    break;
                            }
                        });
                    });
                }

                else if (item == "TypeTyre") {
                    switch (value) {
                        case "1":
                            value = "New";
                            break
                        case "2":
                            value = "Old";
                            break
                        case "3":
                            value = "Retreaded";
                            break
                        default:
                            value = "NA";
                            break
                    }
                    $("#Tyre_TypeTyre").val(value);
                }
                else if (item == "PurchaseDate") {
                    var dt = moment(value).format("MM/DD/YYYY");
                    $("#" + item).val(dt);
                }
                else
                    $("#" + item).val(value);
            });
        });
    }
    else {
        var TyreInvenId = getUrlParameter("TyreInvenId");
        if (TyreInvenId != null && TyreInvenId > 0) {

            var url = apiBase.apiurl + "FmsApi/GetVehicleFittedByInventId";
            $.get(url, { custid: $custid, invenid: TyreInvenId }, function (data) {
                console.log(data);
                $("#VehicleId").val(data);
                $("#VehicleId").trigger("change");
            });
        }
    }
}

//get parameters from url
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

//Add TyreDisposel
$('#AddNewTyreDisposel').submit(function () {

    var vehno = $("#VehicleId").val();
    var totalrun = $("#odometerReading").val();
    var DisposeVehicleId = $("#DisposeVehicle option:selected").val();
    var SerialNo = $("#SerialNo").val();
    var disposeType = $("#Reason").val();
    var fitInvehicle = "None";
    if (disposeType == 3) {
        fitInvehicle = DisposeVehicleId;
    }

    if (disposeType == 2) {
        $("#ResoldPrize").val('0');
    }
    var data = $('#AddNewTyreDisposel').serializeArray();
    data.push({ name: 'Custid', value: $custid },
              { name: 'VechicleNo', value: vehno },
              { name: 'FitInVechicleNo', value: fitInvehicle },
              { name: 'SerialNo', value: SerialNo },
              { name: 'TotalRun', value: totalrun }

    );
    console.log(data);

    var TFUrl = apiBase.apiurl + 'FmsAPI/TyreDisposelAddUpdate';
    $.post(TFUrl, $.param(data), function (result) {
        if (result > 0) {
            toastr.success("Record Entered Successfuly")
            window.setTimeout(function () {
                window.location.href = '/Fms/TyreDisposal';
            }, 1000);

        }
        else
            toastr.error("Failed!!!")
    });
});


$('#Reason').on("change", function () {

    var vehid = $(this).val();
    if (vehid)
        if (vehid == 3)
            $('#assignvehicle').show();
        else if (vehid == 1)
            $('#resoldAmt').show();
        else {
            $('#assignvehicle').hide();
            $('#resoldAmt').hide();
        }

});

//Chaenge vehicle to get tyre info
$('#VehicleId').on("change", function () {
    var vehid = $('#VehicleId').val();
    if (vehid)
        if (vehid > 0) {
            var isfit = 0;
            var tUrl = apiBase.apiurl + 'FmsAPI/GetFMSTyreListByVehicleId?custid=' + $custid + '&vehicleid=' + vehid + '&fit=' + isfit;
            $.get(tUrl, function (data) {
                $('#InventryId').find('option:not(:first)').remove();
                $.each(data, function (key, value) {
                    $("#InventryId").append($("<option></option>").val(value.Value).html(value.Name));
                });
            }).done(function () {
                var TyreInvenId = getUrlParameter("TyreInvenId");
                if (TyreInvenId != "") {
                    $("#InventryId").val(TyreInvenId).trigger("change");
                    //$("#InventryId").select2().select2('val', TyreInvenId);
                }
            });
        }
});

// Tyre change event 
$('#InventryId').on("change", function () {

    var tfitid = $(this).val();
    if (tfitid)
        if (tfitid > 0) {
            var url = apiBase.apiurl + "FmsApi/GetInventoryByInventIdDisposal";
            var dispose = 0;
            $.get(url, { custid: $custid, invenid: tfitid, disposal: dispose }, function (data) {

                //var url = apiBase.apiurl + "FmsApi/GetTyreFittingByFittingId";
                //$.get(url, { custid: $custid, fittingid: tfitid }, function (data) {
                console.log(data);

                $("#Warranty").val(data.Warranty + data.WarrantyType);
                $.each(data, function (item, value) {
                    if (item == "Warranty" || item == "WarrantyType" || item == "VehicleId") { }
                    if (item == "SerialNo")
                        $("#" + item).val(value);
                    else if (item == "TypeTyre") {
                        switch (value) {
                            case "1":
                                value = "New";
                                break
                            case "2":
                                value = "Old";
                                break
                            default:
                                value = "NA";
                                break
                        }
                        $("#Tyre_TypeTyre").val(value);
                    }
                    if (item == "PurchaseDate") {
                        var dt = moment(value).format("MM/DD/YYYY");
                        $("#" + item).val(dt);
                    }
                    else
                        $("#" + item).val(value);
                });
            });
        }
});