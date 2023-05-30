var table;

function format(d) {
    var data = d;

    if (data.reminderCount > 0) {
        var a = data.reminderData;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Due Date</th><th>Renewal Type</th><th>Status</th><th>Remarks</th><th>Actions</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
                '<tr>' +
            '<td>' + moment(element.DueDate).format("MMM D YYYY")  + '</td>' +
            '<td>' + element.RenewalType + '</td>' +
            '<td>' + element.status + '</td>' +
            '<td>' + element.Remarks + '</td>' +
            //'<td>' + '<a href="/Fms/AddUpdateRenewalReminder?renewalID=' + element.renewalID + '" class="editor_edit">Edit</a> / <a href="javascript:DeleteReminder(' + element.renewalID + ');"  class="editor_remove">Delete</a>' + '</td>' +
            '<td>' +
            '<div class="dropdown">' +
            '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
            '<span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li><a target = "_blank" href="/Fms/AddUpdateRenewalReminder?renewalID=' + element.renewalID + '" class="editor_edit">Edit</a></li>' +
            '<li><a target = "_blank" href="javascript:DeleteReminder(' + element.renewalID + ');"  class="editor_remove">Delete</a></li>' +
            '</ul>' +
            '</div>'
            + '</td>' +
            '</tr>'
        });
        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    console.log($custid);
    console.log(apiBase.apiurl);

    var start = moment().subtract(1, 'years').startOf('day');
    var end = moment().add(1, 'years').startOf('day');;

    $('#reportrange span').html(start.format('MMM D YYYY, h:mm:ss a') + ' - ' + end.format('MMM D YYYY, h:mm:ss a'));
    $beginDate = start.format('MMM D YYYY h:mm:ss a');
    $endDate = end.format('MMM D YYYY h:mm:ss a');
    GetRenewalReminders(null);

    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        //for getting bbid from datatable
        bbid = tr[0].lastChild.innerHTML;
        var row = table.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })
});

$("#BtnSearch").click(function () {
    GetRenewalReminders(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsAPI/GetRenewalReminders";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetRenewalReminders";
    DownloadData(url, downloadType);
});


function GetRenewalReminders(downloadType) {
    
    // clear tables contents
    deleteTable();    
    
    var url = apiBase.apiurl + 'FmsAPI/GetRenewalTypeList';
    $('#RenewalTypeList').find('option:not(:first)').remove();
    $.get(url, function (data) {
        $.each(data, function (key, value) {
            $("#RenewalTypeList").append($("<option></option>").val(value.Value).html(value.Text));
        });
    });

    var renewalId = $("#RenewalTypeList").val();
    var url = baseUrl + "FmsAPI/GetRenewalReminders";

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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "renewalId", "value": renewalId }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "vehicleName",
                    "bSortable": false
                },
                {
                    "data": "reminderCount",
                    "bSortable": false
                },
                {
                    "orderable": false,
                    "bSortable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }
        ],
        "rowCallback": function (row, data, index) {
            if (data.reminderCount == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        },
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalRemindersData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#reminders').text(data.TotalReminders);
                    $('#overdueReminders').text(data.overdueReminders);
                    $('#dueSoonReminders').text(data.dueSoonReminders);
                    $('#okReminders').text(data.okReminders);
                }
            });
            $('th').removeClass('sorting_asc');
        }
    });
}

function DeleteReminder(rrid)
{
    if (confirm("Do you want to delete selected reminder?")) {
        var url = apiBase.apiurl + 'FmsAPI/GetRemoveRenewalReminder?renewalID=' + rrid;

        $.get(url, function (result) {
            if (result > 0) {
                
                toastr.success("Record deleted successfully")
            }
            else
                toastr.error("Failed!!!")
        }).done(function (data) {
            GetRenewalReminders(null );
        });

    }
    else
        return false;
}

function DownloadData(url, downloadType) {
    debugger;
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'Document_Renewal_Report_' + $beginDate + '_TO_' + $endDate;
    var $bbid = '';
    var renewalId = 0;
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&renewalId=" + renewalId + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custid=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}