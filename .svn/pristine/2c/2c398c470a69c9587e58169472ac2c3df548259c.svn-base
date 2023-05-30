$(".js-example-basic").select2({})
$(document).ready(function () {
    $('#PurchaseDate').datepicker();
    $('#PurchaseDate').datepicker("option", "maxDate", new Date());
    $('#pDATE').datepicker();
    $('#pDATE').datepicker("option", "maxDate", new Date());

    enableFields();
    
    var VendorUrl = apiBase.apiurl + 'FmsAPI/GetFmsVendors?custid=' + $custid;
    $('#VendorList').find('option:not(:first)').remove();
    $('#vendRList').find('option:not(:first)').remove();
    $.get(VendorUrl, function (data) {
        $.each(data, function (key, value) {
            $("#VendorList").append($("<option></option>").val(value.Value).html(value.Name));
            $("#vendRList").append($("<option></option>").val(value.Value).html(value.Name));
        });
    });

    $('form').on('keydown', '#UnitPrice, #Warranty', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });

    var tyreInvenid = getUrlParameter("inventid");
    if (tyreInvenid != null && tyreInvenid > 0) {
        $('#SerialNo').attr('disabled', 'disabled');
        $("#AddNewInventory").show();
        $("#addInventorymultiple").hide();
        
        $("#statusText").text("Update Tyre Inventory");
        var url = apiBase.apiurl + "FmsApi/GetInventoryByInventId";
        $.get(url, { custid: $custid, invenid: tyreInvenid }, function (data) {
            console.log(data);
            
            var typeTyre = 0;
            $.each(data, function (item, value) {
                if (item == "VendorName") {
                    $("#VendorList option:contains(" + value + ")").attr('selected', 'selected');
                }
                else if (item == "PurchaseDate") {
                    var date = moment(value).format("MM/DD/YYYY");
                    if (date == "Invalid date") {
                        date = "";
                    }
                    else {
                        $("#" + item).val(date);
                    }
                }
                    //else if (item == "TypeTyre") {
                    //    $("#" + item).val(value);
                    //    typeTyre = value;
                    //    if (value == 3) //Retreaded
                    //    {
                    //        $("#SerialNo").hide();
                    //        $("#SerialNoList").show();
                    //    }
                    //    else {
                    //        $("#SerialNoList").hide();
                    //        $("#SerialNo").show();
                    //    }
                    //}
                    //else if(item == "SerialNo"){
                    //    if (typeTyre == 3) //Retreaded
                    //    {
                    //        var serialNoUrl = apiBase.apiurl + 'FmsAPI/GetTyreSerialNosByCustid?custid=' + $custid;
                    //        $('#SerialNoList').find('option:not(:first)').remove();

                    //        $.get(serialNoUrl, function (data) {
                    //            $.each(data, function (key, value) {
                    //                $("#SerialNoList").append($("<option></option>").val(value.Value).html(value.Name));
                    //            });
                    //        }).done(function () {
                    //            $("#SerialNoList option:contains(" + value + ")").attr('selected', 'selected');
                    //        });
                    //    }
                    //    else
                    //    {
                    //        $("#" + item).val(value);
                    //    }
                    //}
                else {
                    $("#" + item).val(value);
                }
            });
        })
    }

    var GrStatusUrl = apiBase.apiurl + 'fmsapi/GetTyreSr';
    $("#SerialNo").focusout(function () {
        var sr = $('#SerialNo').val();
        if (sr.length > 0) {
            $.get(GrStatusUrl, { TyreSr: sr }, function (data) {
                if (data == " Tyre Serial Already Exists") {

                    $('#TyreSrStatus').html($('#SerialNo').val() + data);
                    $('#SerialNo').val('');
                    //$('#SerialNo').focus();
                    $('#TyreSrStatus').css('display', 'block');
                }
                else {
                    data = "This looks good !!";
                    $('#TyreSrStatus').html(data);
                    $('#TyreSrStatus').css('display', 'block');
                }
            });
        }
    });
    
});

function disableFields()
{
    $('#VendorList').attr('disabled', true);
    $("#VendorList").val('');
    $('#UnitPrice').attr('disabled', true);
    $("#UnitPrice").val('');
    $('#PurchaseDate').attr('disabled', true);
    $("#PurchaseDate").val('');

}

function enableFields() {
    $('#VendorList').attr('disabled', false);
    $('#UnitPrice').attr('disabled', false);
    $('#PurchaseDate').attr('disabled', false);
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

$('input[type=radio][name=tyrePurchaseType]').change(function () {
    if (this.value == 'true') {
        enableFields();
    }
    else if (this.value == 'false') {
        disableFields();
    }
});

//Add Employee
$('#AddNewInventory').submit(function () {
    var tyrePurchaseType = $("input[name='tyrePurchaseType']:checked").val();

    if (tyrePurchaseType == 'false') 
    {
        var data = $('#AddNewInventory').serializeArray();
        data.push(
            { name: 'Custid', value: $custid },
              { name: 'tyrePurchaseTyp', value: 'Prefitted with Vehicle Purchased' }
        );
    }
    else//Bought from supplier
    {
        var vendorName = $("#VendorList option:selected").val();
        var unitPrice = $('#UnitPrice').val();
        var PurchaseDate = $('#PurchaseDate').val();

        if (vendorName == '')
        {
            alert('Please select Supplier name!');
            return false;
        }
        else if (unitPrice == '') {
            alert('Please enter unit price!');
            return false;
        }
        else if (PurchaseDate == '') {
            alert('Please enter Purchase Date!');
            return false;
        }
        else
        {
            var data = $('#AddNewInventory').serializeArray();
            data.push({ name: 'Custid', value: $custid },
                  { name: 'VendorName', value: $("#VendorList option:selected").text() },
                  { name: 'SerialNo', value: $('#SerialNo').val() },
              { name: 'tyrePurchaseTyp', value: 'Bought from Supplier' }

            );
        }
    }
    console.log(data);
    var EmpUrl = apiBase.apiurl + 'FmsAPI/AddUpdateTyreInventory';
    $.post(EmpUrl, $.param(data), function (result) {
        
        if (result > 0) {
            toastr.success("Record Entered Successfuly")
            
            window.setTimeout(function () {
                window.location.href = '/Fms/TyreInventory';
            }, 1000);
        }
        else
            toastr.error("Failed!!!")
    });
});

