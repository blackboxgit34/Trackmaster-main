var table;
$(document).ready(function () {
    GetBillingInfo();
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
    
    //$('#PayOnline').show().center();
    var width = ($(document).width() * 0.6) < 600 ? 600 : $(document).width() * 0.6;
    var left = $(document).width() * 0.2;
    //window.open("http://trackmaster.in/AspxPages/dataFrom.htm?custid=" + custid + "&amount=" + amount + "&billno=" + billno + "", "myWindow", "width=" + width + ",height=500,top=100,left=" + left);
    //window.open("http://trackmaster.in/AspxPages/dataFrom.htm?custid=" + custid + "&amount=" + amount + "&billno=" + billno + "", 'window name', '_blank','top=100,left=-400');
    //$('#frame').attr("src", "http://trackmaster.in/AspxPages/dataFrom.htm?custid=" + custid + "&amount=" + amount + "&billno=" + billno + "");
    window.open("http://192.168.0.173:44/AspxPages/dataFrom.htm?custid=" + custid + "&amount=" + amount + "&billno=" + billno + "", "myWindow", "width=" + width + ",height=500,top=100,left=" + left);
}

function GetBillingInfo() {
    var url = baseUrl + "InvoiceAPI/GetAccountSummaryOld";
    var vehicleId = 0;
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "searching": false,
        "bPaginate": false,
        "sAjaxSource": url,
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid });
        },
        "columns": [
                {
                    "data": "billno",
                    "bSortable": false
                },
                {
                    "data": "billperiod",
                    "bSortable": false
                },
                {
                    "data": "BoxCount",
                    "bSortable": false
                },
                {
                    "data": "actualamount",
                    "bSortable": false
                },
                {
                    "data": "PreviousBalance",
                    "bSortable": false
                },
                {
                    "data": "NetPayableAmnt",
                    "bSortable": false
                },
                {
                    "data": "Balance",
                    "bSortable": false
                },

                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {

                        var aTag = '<a href="billold?billperiodid=' + data.billperiodid + '&BillNo=' + data.billno + '&FromDate=' + data.FromDate + '">View Bill</a>';

                        return aTag;
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        var aTag = '<button class="btn btn-primary btn-mini" onclick="runMyFunction(' + $custid + ',' + data.Balance + ',\'' + data.billno + '\')">Pay Now</button>';
                        return aTag;
                    }
                }

        ]
    });
}