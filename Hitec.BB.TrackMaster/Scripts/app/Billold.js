﻿$(document).ready(function () {
    $.blockUI({ message: '<img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>' });
    GetBillInfo();

    $(document).keydown(function (event) {
        if (event.keyCode == 123) {
            return false;
        }
        else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
            return false;  //Prevent from ctrl+shift+i
        }
    });
    $(document).on("contextmenu", function (e) {
        e.preventDefault();
    });

    $("#Print").click(function () {
        window.print();
    });
});

function GetBillInfo() {
    var BillPeriodID = getUrlParameter('billperiodid');
    var BillNo = getUrlParameter('BillNo');
    var FromDate = getUrlParameter('FromDate');
    var billDetails = {
        CustID: $custid, BillPeriodID: BillPeriodID, BillNo: BillNo, FromDate: FromDate
    }
 
    var url = baseUrl + "InvoiceAPI/GetBillSummaryOld";
    $.ajax({
        url: url,
        type: 'GET',
        data: billDetails,
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            
            processdata(data);
            $('#paid').css('visibility', 'visible');
            $('#alertss').css('display', 'block');
            $('#Print').css('display', 'block');
            GetVehicleDetails();
            $.unblockUI();
        }
    });
}


var getUrlParameter = function getUrlParameter(sParam) {
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


function processdata(data) {
    $("#PreviousBalance").text(parseFloat(data.PreviousBalance).toFixed(2));
    $("#PreviousBal").text(parseFloat(data.PreviousBalance).toFixed(2));
    // $("#PreviousBal").text(data.PreviousBalance);
    $("#Adjustments").text(parseFloat(data.Adjustments).toFixed(2));
    $("#CurrentCharges").text(parseFloat(data.Totalbalnce).toFixed(2));
    $("#CurrentCharge").text(parseFloat(data.CurrentCharges).toFixed(2));
    $("#PayableAmnt").text(parseFloat(data.PayableAmnt).toFixed(2));
    $("#PayafterCharges").text(parseFloat(data.Totalbalnce).toFixed(2));
    $("#smsCharges").text(parseFloat(data.smsCharges).toFixed(2));
    $("#voicecharges").text(parseFloat(data.voicecharges).toFixed(2));
    $("#Servicecharges").text(parseFloat(data.Servicecharges).toFixed(2));
    $("#DiscountPerc").text(parseFloat(data.Discounts).toFixed(2));
    $("#ServiceTax").text(parseFloat(data.ServiceTax).toFixed(2));
    $("#Bharat").text(parseFloat(data.SwachBhartTax).toFixed(2));
    $("#Kalyan").text(parseFloat(data.KrishikalyanTax).toFixed(2));
    $("#Address").text(data.Address);
    $("#Totalbalance").text(parseFloat(data.Totalbalnce).toFixed(2));
    $("#Totalbal").text(parseFloat(data.Totalbalnce).toFixed(2));
    $("#MainCharges").text(parseFloat(data.MainCharges).toFixed(2));
    $("#AccountNo").text(data.AccountNo);
    $("#billno").text(data.billno);
    $("#billperiod").text(data.billperiod);
    $("#BillDate").text(data.BillDate);
    $("#DueDate").text(data.DueDate);
    $("#DueDat").text(data.DueDate);
    $("#MonthlySubscription").text(parseFloat(data.MonthlySubscription).toFixed(2));
    $("#ContactPerson").text(data.ContactPerson);
    $("#ContactPerson").text(data.ContactPerson);
    $("#BillName").text(data.BillName);
    $("#City").text(data.City);
    $("#State").text(data.State);
    $("#PostalCode").text(data.PostalCode);
    $("#mobile").text(data.mobile);
    $("#PayAfterDate").text(data.PayAfterDate);
    $('#reactivationcharges').text(parseFloat(data.reactivationcharges).toFixed(2));
    $("#GstIn").text(data.GstIn);
}

function GetVehicleDetails() {
    
    var url = baseUrl + "InvoiceAPI/GetBillDetailsOld";
    var BillPeriodID = getUrlParameter('billperiodid');
    var FromDate = getUrlParameter('FromDate');
   
    var table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "searching": false,
        "bPaginate": false,
        "sAjaxSource": url,
        "fnServerParams": function (param) {
            param.push({ "name": "CustID", "value": $custid }, { "name": "BillPeriodID", "value": BillPeriodID }, { "name": "FromDate", "value": FromDate });
        },
        "columns": [
                {
                    "data": "ROW_NO",
                    "bSortable": false
                },
                {
                    "data": "vehname",
                    "bSortable": false
                },
                {
                    "data": "ActualAmount",
                    "bSortable": false
                },
                {
                    "data": "smscharges",
                    "bSortable": false
                },
                {
                    "data": "PreviousBalance",
                    "bSortable": false
                },
                {
                    "data": "voicecharges",
                    "bSortable": false
                },
                {
                    "data": "servicecharges",
                    "bSortable": false
                },
                {
                    "data": "BillPeriod",
                    "bSortable": false
                }
        ]
    });
}