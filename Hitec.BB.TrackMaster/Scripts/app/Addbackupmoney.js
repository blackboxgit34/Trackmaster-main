$(document).ready(function() {
    appendVehicleDDL();
    var name;
    var mobile;
    $('.T1').html("NA");
    $('.T2').html("NA");
    $('.T3').html("NA");
    $(".js-example-basic-single").select2();
    var baseurl = apiBase.apiurl;
    var url = baseurl + 'SmsControlAPI/GetCustomerSmsDetail';
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: url,
        data: { custid: $custid },
        success: function (data) {
            if (data[0].consumedSms) {
                $('#totalVehicles').html(data[0].consumedSms);
            }
            else {
                $('#totalVehicles').html("NA");
            }
            if (data[0].remainingsms) {
                $('#inUse').html(data[0].remainingsms);
            }
            else {
                $('#inUse').html("NA");
            }
        },
        error: function (error) {
            toastr.error("something went wrong!");
        }
    });
    $('#closeModal').click(function () {
        $('#PayOnline').fadeOut("fast");
    });
});

$.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this;
}

function runMyFunction(custid, amount, billno) {
    debugger;
    billno = billno + Math.floor(Date.now());
    $('#PayOnline').show().center();
    $('#frame').attr("src", "https://trackmaster.in/AspxPages/dataFrom.htm?custid=" + custid + "&amount=" + amount + "&billno=" + billno + "");
}
function appendVehicleDDL() {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',

        url: apiBase.apiurl + "AdminAPI/GetVehicles",

        data: { custId: $custid },
        success: function (result) {

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