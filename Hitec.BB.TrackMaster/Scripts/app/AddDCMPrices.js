$(document).ready(function () {

    debugger;
    GetPriceList(null);

});


$('#PriceSubmit').click(function () {
    // var custid = $('#txtcustId').val();
    var custid = $custid;
    var AcPrice = $('#txtAcPrice').val();
    var NonAcPrice = $("#txtNonAcPrice").val();
    var NightDuty = $("#txtNgtDtyPrice").val();


    
        var obj = [];
        var Main = {
            Custid: custid,
            Ac: AcPrice,
            NonAc:NonAcPrice,
            NgtDuty: NightDuty
        }
        var data1 = JSON.stringify(Main);
        var data = JSON.parse(data1);
        console.log(data);
        var urlGet = apiBase.apiurl + "TaxiAPI/AddACMPRice"
        debugger
        $.ajax({
            url: urlGet,
            data: data,
            type: 'GET',
            success: function (data) {

                if (data = 1) {
                    toastr.success("Price Added Successfully!")
                    window.location.reload();
                }
                else {
                    toastr.error("Error")
                }
            },
            error: function (data) {
                alert('Please try again:' + data.responseText);
            }
        });
    
});


function GetPriceList(downloadType) {
    debugger;
    var url = baseUrl + "TaxiAPI/GetPriceList";
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {

           // $("#Textcustid").text(data.custid);
            $("#TextAc").text(data.ACPrice);
            $("#TextNonAc").text(data.NonACPrice);
            $("#TextNightDuty").text(data.NightDuty);
            if (data.status == true) {
                $("#Active").show();
                $("#InActive").hide();

            } else {

                $("#InActive").show();
                $("#Active").hide();
            }
        },
        error: function (data) {
            alert('Please try again:' + data.responseText);
        }
    });
    

}

$("#Active").click(function () {
    $.ajax({
        type: "GET",
        data: { custid: $custid, status: false },
        url: baseUrl + "AddOnAPI/UpdateBanner",
        success: function (data) {


            if (data) {
                toastr.success("Active successfully.");
                window.location.reload();
            }
            else {
                toastr.warning("Inactive successfully.");
                window.location.reload();
            }

        }


    });

})


$("#InActive").click(function () {
    $.ajax({
        type: "GET",
        data: { custid: $custid, status: true },
        url: baseUrl + "AddOnAPI/UpdateBanner",
        success: function (data) {

            if (data) {
                toastr.success("Active successfully.");
                window.location.reload();
            }
            else {
                toastr.warning("Inactive successfully.");
                window.location.reload();
            }

        }


    });

})


