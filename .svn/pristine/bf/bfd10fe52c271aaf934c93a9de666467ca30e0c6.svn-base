var table;
$(document).ready(function () {
    console.log($custid);
    GetVendors(null);
});

$("#BtnSearch").click(function () {
    GetVendors(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsAPI/GetVendors";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetVendors";
    DownloadData(url, downloadType);
});

function GetVendors(downloadType) {

    // clear tables contents
    deleteTable();

    var url = apiBase.apiurl + 'FmsAPI/GetVendors';

    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        language: {
            searchPlaceholder: "Search Vendor Name",
            sSearch: ""
        },
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "VendorName",
                    "bSortable": false
                },
                {
                    "data": "VendorType",
                    "bSortable": false
                },
                //{
                //    "data": "PaymentDueDate",
                //    "render": function (data) {
                //        if (data != null && data != "") {
                //            return moment(data).format("MMM D YYYY, hh:mm:ss a");
                //        }
                //        else
                //            return data;
                //    }
                //},
                {
                    "data": "Address",
                    "bSortable": false
                },
                {
                    "data": "PhoneNo",
                    "bSortable": false
                },
                {
                    "data": "Email",
                    "bSortable": false
                },
                //{ "data": "CreditCyleLimit" },
                {
                    "data": "CreditCyleAmount",
                    "bSortable": false
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full, meta) {
                        //return '<a href="/Fms/AddUpdateVendor?VendorID=' + full.VendorID + '" class="editor_edit">Edit</a> / <a href="javascript:DeleteVendor(' + full.VendorID + ');"  class="editor_remove">Delete</a>'
                        var selectTag =
                                   '<div class="dropdown">' +
                                     '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                                     '<span class="caret"></span></button>' +
                                     '<ul class="dropdown-menu">' +
                                       '<li><a target = "_blank" href="/Fms/AddUpdateVendor?VendorID=' + full.VendorID + '" class="editor_edit">Edit</a></li>' +
                                       '<li><a href="javascript:DeleteVendor(' + full.VendorID + ');"  class="editor_remove">Delete</a></li>' +
                                     '</ul>' +
                                   '</div>';
                        return selectTag;
                    }
                }
        ],
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalVendorsData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#Vendors').text(data.TotalVendors);
                }
            });
            $('th').removeClass('sorting_asc');
        }
    });
}

function DeleteVendor(VendorID) {
    if (confirm("Do you want to delete selected supplier?")) {
        var url = apiBase.apiurl + 'FmsAPI/GetRemoveVendor?VendorID=' + VendorID;

        $.get(url, function (result) {
            if (result > 0) {

                toastr.success("Supplier deleted successfully!");
                window.setTimeout(function () {
                    window.location.href = '/Fms/ManageVendor';
                }, 1000);
            }
            else
                toastr.error("Delete Failed!")
        });

        GetVendors(null);
    }
    else
        return false;



}

function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'SuppliersList';
    var $bbid = '';
    var url1 = url + "?downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

