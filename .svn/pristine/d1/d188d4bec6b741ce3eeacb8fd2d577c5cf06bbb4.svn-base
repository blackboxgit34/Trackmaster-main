$(document).ready(function () {
    
    $('#dtOfPurchase').datepicker();
    $('#dtOfPurchase').datepicker("option", "maxDate", new Date());

    var VendorUrl = apiBase.apiurl + 'FmsAPI/GetFmsVendors?custid=' + $custid;
    $('#VendorId').find('option:not(:first)').remove();

    $('form').on('keydown', '#unitPrice, #quantity, #creditLimit, #discount', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });

    $.get(VendorUrl, function (data) {
        $.each(data, function (key, value) {
            $("#VendorId").append($("<option></option>").val(value.Value).html(value.Name));
        });
    }).done(function () {
        
        getDetails();
    });

    $('#AddUpdateInventoryForm').submit(function () {
        
        var data = $('#AddUpdateInventoryForm').serializeArray();
        var vendorName = $("#VendorId option:selected").text();

        var paymentDueDate = $("#paymentDueDate").val();
        var paymentDueAfterDiscount = $("#paymentDueAmount").val();

        var PartId = getUrlParameter("PartId");

        if (PartId < 1) PartId = 0;

        data.push(
              { name: 'Custid', value: $custid },
              { name: 'PartId', value: PartId },
              { name: 'VendorName', value: vendorName },
              { name: 'AfterDiscount', value: paymentDueAfterDiscount },
              { name: 'PaymentDueDate', value: paymentDueDate }
        );
        console.log(data);
        //if (confirm('Do you want to submit the form?')) {
            var url = apiBase.apiurl + 'FmsAPI/AddUpdatePartsInfo';
            $.post(url, $.param(data), function (result) {
                if (result > 0) {
                    toastr.success("Part added to inventory successfully");
                    window.location.href = '/Fms/manageparts';
                    window.setTimeout(function () {
                    }, 1000);
                    return false;
                }
                else
                    toastr.error("Failed!!!");
            });
        //}
        //else {
        //    return false;
        //}
    });
});

function GetPaymentDueDate() {
    
    var creditLimit = $("#creditLimit").val();
    var dtOfPurchase = new Date($("#dtOfPurchase").val());

    if (creditLimit == "")
        creditLimit = 0;
    //var myDate = new Date((document.getElementById('<%=txtDurationTo.ClientID%>')).value);
    dtOfPurchase.setDate(dtOfPurchase.getDate() + parseInt(creditLimit));

    var PaymentDueDate = moment(dtOfPurchase).format("MM/DD/YYYY");

    if (PaymentDueDate != "Invalid date")
        $("#paymentDueDate").val(PaymentDueDate);

};

function GetPaymentDueAmount() {
    
    var unitPrice = $("#unitPrice").val();
    var quantity = $("#quantity").val();
    var discount = $("#discount").val();

    if (unitPrice == "")
        unitPrice = 0;

    if (quantity == "")
        quantity = 0;

    if (discount == "") {
        var PaymentDueAmount = unitPrice * quantity;
        $("#paymentDueAmount").val(PaymentDueAmount);
    }
    else {
        var PaymentDueAmount = (unitPrice * quantity) - (unitPrice * quantity * discount / 100);
        $("#paymentDueAmount").val(PaymentDueAmount);
    }
};

function getDetails() {
    var PartId = getUrlParameter("PartId");

    if (PartId != null) {
        var PartUrl = apiBase.apiurl + 'fmsapi/GetPartDetails';
        $.get(PartUrl, { PartId: PartId, Custid: $custid }, function (data) {
            console.log(data);
            var dd = data.PaymentDueDate.split('T');
            var d = data.DateOfPurchase.split('T');
            d = d[0].split('-');
            var due = dd[0].split('-');
            $(document).prop('title', 'Edit part information');
            $('#VendorId').val(data.VendorName).trigger("change");
            $('#warrantyBy').val(data.PartWarrantyBy).trigger("change");
            $('#invoiceNo').val(data.InvoiceNo);
            $('#partName').val(data.PartName);
            $('#partNumber').val(data.PartNumber);
            $('#partWarranty').val(data.PartWarranty);
            $('#unitPrice').val(data.UnitPrice);
            $('#quantity').val(data.Quantity);
            $('#creditLimit').val(data.CreditLimit);
            $('#paymentDueDate').val(due[1] + '/' + due[2] + '/' + due[0]);
            $('#discount').val(data.Discount);
            $('#paymentDueAmount').val(data.AfterDiscount);
            $('#manufacturer').val(data.Manufacturer);
            $('#remarks').val(data.Remarks);
            $('#dtOfPurchase').datepicker("setDate", new Date(d[0], d[1] - 1, d[2]));
            if (data.PaymentStatus) {
                $('#PaymentStatus').val('true').trigger('change');
            }
            else {
                $('#PaymentStatus').val('false').trigger('change');
            }
        });
    }
}