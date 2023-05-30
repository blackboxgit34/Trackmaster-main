var table;
function format(d) {
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    GetFmsCustomer(null);
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }

        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");

    })

    $('#dt_basic_Master tbody').on('click', 'a.editor_remove', function () {
        if (confirm('Do you want to delete this customer?')) {
            var custId = table.row($(this).parents('tr')).data().CustomerID;
            var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveCustomer?customerid=" + custId;
            $.post(ApiUrl, function (result) {
                if (result > 0) {
                    toastr.success("Customer Deleted successfully!");
                    window.setTimeout(function () {
                        window.location.href = '/Fms/ManageCustomer';
                    }, 1000);
                }
                else {
                    toastr.error("Delete Failed!");
                }
            });
        }
        else { return false; }
    });

});


$("#BtnSearch").click(function () {
    GetFmsCustomer(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "fmsapi/GetCustomerList";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "fmsapi/GetCustomerList";
    DownloadData(url, downloadType);
});

function GetFmsCustomer(downloadType) {
    deleteTable();
    var $BBID = '';
    var $empname = $('#empname').val();
    var $empadd = $('#empadd').val();
    var $empEmail = $('#empEmail').val();
    var url = apiBase.apiurl + "fmsapi/GetCustomerList";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        language: {
            searchPlaceholder: "Search Customer Name",
            sSearch: ""
        },
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid }, { "name": "CustName", "value": $empname }, { "name": "Address", "value": $empadd }, { "name": "Email", "value": $empEmail }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
               {
                   "data": "SrNo",
                   "orderable": false, "targets": 0,
               },
               {
                   "data": "CustomerName",
                   "bSortable": false
               },
               {
                   "data": "BusinessType",
                   "bSortable": false
               },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        return full['Address'] + ', ' + full['State'] + ', ' + full['City'] + ', ' + full['PostalCode'];
                    }
                },
                 {
                     "data": null,
                     "bSortable": false,
                     "render": function (data, type, full) {
                         return full['PhoneNo'] + ', ' + full['LandlineNo'];
                     }
                 },
                {
                    "data": "Email",
                    "bSortable": false
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        return full['ContactPersonNo1'] + ', ' + full['ContactPersonNo2'];
                    }
                },
                {
                    "data": "CreditCyleAmount",
                    "bSortable": false
                },
                {
                    "data": "Remarks",
                    "bSortable": false
                },
                //{
                //    "data": null,
                //    "render": function (data, type, full, meta) {
                //        console.log(full);
                //        
                //        return '<a href=' + full.AttachmentPath + ' download >Document</a>';
                //    }
                //},
                 {
                     "data": null,
                     "bSortable": false,
                     "render": function (data, type, full, meta) {
                         
                         //return '<a href=/fms/AddCustomer?cid=' + full.CustomerID + '>Edit</a>/ <a href="#" class="editor_remove">Delete</a>';
                         var selectTag =
                                   '<div class="dropdown">' +
                                     '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                                     '<span class="caret"></span></button>' +
                                     '<ul class="dropdown-menu">' +
                                       '<li><a target = "_blank" href=/fms/AddCustomer?cid=' + full.CustomerID + '>Edit</a></li>' +
                                       '<li><a href="#" class="editor_remove">Delete</a></li>' +
                                     '</ul>' +
                                   '</div>';
                         return selectTag;
                     }
                 },
        ],
        "rowCallback": function (row, data, index) {
            var target = $(row).find(".details-control");
            var index = (target).index();
            //$(row).find('td:eq(' + index + ')').removeClass('details-control')
        },
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalCustData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#customers').text(data.TotalCust);
                }
            });

            var url = apiBase.apiurl + "fmsapi/GetTotalAmountDue";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $('#AmountDue').text(data.AmountDue);
                }
            });
            $('th').removeClass('sorting_asc');
        }
    });
}


function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'CustomersList';
    var $empname = '';
    var $empadd = '';
    var $empEmail = '';
    var url1 = url + "?CustName=" + $empname + "&Address=" + $empadd + "&Email=" + $empEmail + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}
