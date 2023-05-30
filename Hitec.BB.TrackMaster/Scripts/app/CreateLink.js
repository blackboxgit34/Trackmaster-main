$(".js-example-basic").select2({})

$(document).ready(function () {
  
    bindVehicles();
    //$('form').on('keydown', '#remBefore2', function (e) {
    //    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    //});

    //var i = 1;
    //var url = baseUrl + 'FmsAPI/GetRenewalTypeList';
    //$.get(url, function (data) {
    //    $.each(data, function (key, value) {
    //        $("#outerDiv").append(
    //            '<div class="col-sm-10">'+
    //                '<form id="Div' + i + '" method="post" onsubmit="saveData(this); return false;">' +
    //                    '<div class="form-group col-sm-3">'+
    //                      '<input type="text" value="'+value.Text+'" id="RenewalType" name="RenewalType" class="form-control" disabled>'+
    //                       '<input type="hidden" value="'+value.Value+'" id="RenewalTypeId" name="RenewalTypeId">'+
    //                   ' </div>'+
    //                    '<div class="form-group col-sm-2">'+
    //                       ' <input type="text" id="DueDate' + i + '" name="DueDate" placeholder="mm/dd/yyyy" class="form-control" required>' +
    //                   ' </div>'+
    //                   ' <div class="form-group col-sm-2">'+
    //                     '   <input type="text" id="remBefore2" name="remBefore" placeholder="Days" class="form-control" required>' +
    //                    '</div>'+
    //                    '<div class="form-group col-sm-3">'+
    //                    '    <textarea id="Remarks" name="Remarks" class="form-control" required></textarea>'+
    //                    '</div>'+
    //                    '<div class="col-sm-1 form-group">'+
    //                      '  <input type="submit" value="submit" id="BtnSubmit" class="btn btn-green">'+
    //                    '</div>'+
    //                '</form>'+
    //            '</div>'
    //            );
    //        $("#DueDate" + i).datepicker();

    //        i++;

    //    });
    //}).done(function (data) {
    //    bindVehicles();
    //});
});

function bindVehicles()
{
    var VehicleUrl = apiBase.apiurl + 'AdminAPI/GetVehicleList';
    $.get(VehicleUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {

            $("#vehicleID").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    }).done(function () {
        var vid = $('#vehicleIdFromMain').val();
        if (vid != 0) {
            $("#vehicleID").select2().select2('val', vid);
        }
    });
}

function submitRequest()
{
   
    


    var VehUrl = apiBase.apiurl + 'LiveStatus/sendlink';
    $.ajax({
        type: "GET",
        url: VehUrl,
        dataType: "json",
        contentType: "application/json",
        data: { To: $("#txtTo").val(), CC: $("#txtcc").val(), BCC: $("#txtbcc").val(), message: $("#txtMessage").val(), MobNo: $("#mobno").val() },
        success: function (res) {

            toastr.success("Mail send successfully!");

        }
    });
}


$('#hrefwhtsapp').click(function () {
    var value = $("#txtMessage").val();
    var url = "https://api.whatsapp.com/send?text=" + value;
    $("#hrefwhtsapp").attr("href", url)
    $("#hrefwhtsapp").attr('target', '_blank');
});

function Createdata() {
    $("#txtMessage").val('');
  

    var VehUrl = apiBase.apiurl + 'LiveStatus/createlink';
    $.ajax({
        type: "GET",
        url: VehUrl,
        dataType: "json",
        contentType: "application/json",
        data: { bbid: $("#vehicleID").val() },
        success: function (res) {
            if ($("#latval").val().length > 0 && $("#longival").val().length)
            {
                res = res + '&lat=' + $("#latval").val() + '&longi=' + $("#longival").val()
            }
           
            $("#txtMessage").val(res)
        }
    });
}
