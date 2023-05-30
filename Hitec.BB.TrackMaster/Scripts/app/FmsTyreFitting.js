﻿var table;
function format(d) {
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    GetTyreFitting(null);
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
        if (confirm('Do you want to delete this data?')) {
            var fittingid = table.row($(this).parents('tr')).data().FitId;
            var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveTyreFitting?custid=" + $custid + "&fittingid=" + fittingid;
            $.post(ApiUrl, function (result) {
                if (result > 0) {
                    toastr.success("Record Deleted successfully!");
                    window.setTimeout(function () {
                        window.location.href = '/Fms/TyreFitting';
                    }, 1000);
                }
                else {
                    toastr.error("Record Failed to Delete!");
                }
            });
        }
        else { return false; }
    });

});


$("#BtnSearch").click(function () {
    GetTyreFitting(null);
});


$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "fmsapi/GetTyreFittingList";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "fmsapi/GetTyreFittingList";
    DownloadData(url, downloadType);
});


function GetTyreFitting(downloadType) {
    deleteTable();
    var $BBID = '';
    var $fittingid = '';
    //var $empname = $('#empname').val();
    //var $empadd = $('#empadd').val();
    //var $empEmail = $('#empEmail').val();
    var url = apiBase.apiurl + "fmsapi/GetTyreFittingList";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid }, { "name": "fittingid", "value": $fittingid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },
        "columns": [
               {
                   "data": "SrNo",
                   "bSortable": false
               },
               {
                   //"data": "VechileName",
                   //"bSortable": false

                   "data": null,
                   "bSortable": false,
                   "render": function (data, type, full) {
                       if (full['VechileName'].indexOf('<del>') >= 0)
                           return '<span style="text-decoration: line-through;" href="#">' + full['VechileName'] + '</span>';
                       else
                           return full['VechileName'];
                   }
               },
               {
                   "data": "FitDate",
                   "bSortable": false,
                   "render": function (data) {
                       if (data != null && data != "") {
                           return moment(data).format("MMM D YYYY");
                       }
                       else
                           return data;
                   }
               },
               {
                   "data": "SerialNo",
                   "bSortable": false
               },
               {
                   "data": "Manufacturer",
                   "bSortable": false
               },
               {
                   "data": "VendorName",
                   "bSortable": false
               },
               {
                   "data": "TyrePosition",
                   "bSortable": false
               },
               {
                   "data": "TypeTyre",
                   "bSortable": false
               },
               {
                   "data": "TyreFittingType",
                   "bSortable": false
               },
               {
                   "data": "odometerReading",
                   "bSortable": false
               },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full, meta) {
                        //return '<a href=/fms/AddTyreFitting?tfit=' + full.FitId + '>Edit</a>/ <a href="#" class="editor_remove">Delete</a>';
                        var selectTag =
                            '<div class="dropdown">' +
                              '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                              '<span class="caret"></span></button>' +
                                  '<ul class="dropdown-menu">' +
                                      '<li><a target = "_blank" href=/fms/AddTyreFitting?tfit=' + full.FitId + '>Edit</a></li>' +
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
                    $('#TotalTyresFitted').text(data.TotalTyresFitted);
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
    var reportName = 'Tyre_Fitting_Report';
    var $fittingid = '';
    var url1 = url + "?fittingid=" + $fittingid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

