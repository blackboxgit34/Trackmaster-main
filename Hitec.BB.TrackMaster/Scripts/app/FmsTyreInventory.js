﻿var table;
function format(d) {
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    GetTyreInventory(null);
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
        if (confirm('Do you want to delete this tyre from inventory?')) {
            var tyreinventid = table.row($(this).parents('tr')).data().TyreInvenId;
            console.log(tyreinventid);
            var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveTyreInventory?custid=" + $custid + "&inventoryid=" + tyreinventid;
            $.post(ApiUrl, function (result) {
                if (result > 0) {
                    toastr.success("Tyre Deleted successfully!");
                    window.setTimeout(function () {
                        window.location.href = '/Fms/TyreInventory';
                    }, 1000);
                }
                else
                    toastr.error("Record Failed to Delete!");
            });
        }
        else {
            return false;
        }
    });
});


$("#BtnSearch").click(function () {
    GetTyreInventory(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "fmsapi/GetTyreInventoryList";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "fmsapi/GetTyreInventoryList";
    DownloadData(url, downloadType);
});

function GetTyreInventory(downloadType) {
    deleteTable();
    var $BBID = '';
    var $empname = '';
    var url = apiBase.apiurl + "fmsapi/GetTyreInventoryList";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        language: {
            searchPlaceholder: "Search Tyre No.",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid }, { "name": "inventoryid", "value": $empname }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },
        "columns": [
               {
                   "data": "SrNo",
                   "bSortable": false
               },
               {
                   "data": "VendorName",
                   "bSortable": false
               },
               {
                   "data": "SerialNo",
                   "bSortable": false
               },
               {
                   "data": "TypeTyre",
                   "bSortable": false
               },
               {
                   "data": "PurchaseDate",
                   "bSortable": false,
                   "render": function (data) {
                       if (data != null && data != "") {
                           return moment(data).format("MMM D YYYY");
                       }
                       else
                           return data;
                   }
               },

               { "data": "Manufacturer" },
               { "data": "IsFit" },
               
                {
                   "orderable": false,
                   "targets": 0,
                   "orderable": false,
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full, meta) {
                       var TyreInvenId = 'TyreInvenId=' + full.TyreInvenId;
                       if (full.IsFit) {
                           var selectTag =
                           '<div class="dropdown">' +
                             '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                             '<span class="caret"></span></button>' +
                             '<ul class="dropdown-menu">' +
                               '<li><a href="/fms/AddTyreInventory?inventid=' + full.TyreInvenId + '"  target = "_blank"class="editor_edit">Edit</a></li>' +
                               '<li><a href="#"  class="editor_remove">Delete</a></li>' +
                               '<li><a href="' + url2 + '?' + TyreInvenId + '" target = "_blank">Dispose this tyre</a></li>' +
                             '</ul>' +
                           '</div>';
                       }
                       else {
                           var selectTag =
                         '<div class="dropdown">' +
                           '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                           '<span class="caret"></span></button>' +
                           '<ul class="dropdown-menu">' +
                             '<li><a href="/fms/AddTyreInventory?inventid=' + full.TyreInvenId + '"  target = "_blank"class="editor_edit">Edit</a></li>' +
                             '<li><a href="#"  class="editor_remove">Delete</a></li>' +
                             '<li><a href="' + url1 + '?' + TyreInvenId + '" target = "_blank">Fit this tyre in a vehicle</a></li>' +
                           '</ul>' +
                         '</div>';
                       }
                       return selectTag;
                   }
                    }
        ],
        "rowCallback": function (row, data, index) {
            var target = $(row).find(".details-control");
            var index = (target).index();
            //$(row).find('td:eq(' + index + ')').removeClass('details-control')
        },
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalTyreData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#TotalTyreCount').text(data.TotalTyreCount);
                    $('#TotalTyreCost').text(data.TotalTyreCost);
                    $('#TotalTyresFitted').text(data.TotalTyresFitted);
                    $('#TotalTyresDisposed').text(data.TotalTyresDisposed);
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
    var reportName = 'TyreInventoryList';
    var $empname = '';
    var url1 = url + "?inventoryid=" + $empname + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}