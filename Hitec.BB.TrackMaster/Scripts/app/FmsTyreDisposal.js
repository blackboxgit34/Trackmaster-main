function format(d) {
    var data = d;
    if (data.countTyresDisposed > 0) {
        var a = data.TyreDisposalData;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Disposal Date</th><th>Reason</th></th><th>Total Run</th><th>Actions</th></tr></thead>';
        a.forEach(function (element) {
            //console.log(element.Location);
            tableString = tableString +
                '<tr>' +
            '<td>' + moment(element.DateOnDispose).format("MMM D YYYY") + '</td>' +            
            '<td>' + element.TypeTyre + '</td>' +
            '<td>' + element.TotalRun + '</td>' +
            //'<td>' + '<a href="/Fms/AddTyreDisposal?tinventid=' + element.TyreInvenId + '" class="editor_edit">Edit</a></td>'
            '<td>' +
            '<div class="dropdown">' +
            '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
            '<span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li><a target = "_blank" href="/Fms/AddTyreDisposal?tinventid=' + element.TyreInvenId + '" class="editor_edit">Edit</a></li>' +
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
    var start = moment().startOf('month').startOf('day');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMM D YYYY, h:mm:ss a') + ' - ' + end.format('MMM D YYYY, h:mm:ss a'));
        $beginDate = start.format('MMM D YYYY h:mm:ss a');
        $endDate = end.format('MMM D YYYY h:mm:ss a');
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        opens: "right",
        timePicker: true,
        ranges: {
            'Today': [moment().subtract(0, 'days').startOf('day'), moment()],
            'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
            'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment()],
            //'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment()],
            'This Month': [moment().startOf('month').startOf('day'), moment()],
            'Last Month': [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month')]
        },
    }, cb);

    cb(start, end);

    GetTyreDisposal(null);
    // Add event listener for opening and closing details
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

            console.log(row.data());
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })

});

$("#BtnSearch").click(function () {
    GetTyreDisposal(null);
});


$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsAPI/GetTyreDisposal";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetTyreDisposal";
    DownloadData(url, downloadType);
});

function GetTyreDisposal(downloadType) {
    // clear tables contents
    deleteTable();

    var url = baseUrl + "FMSapi/GetTyreDisposal";
    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img id='loaderGif' src='../Content/Trackmaster_files/loader.gif'/>"
        //},
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    //"data": "VehicleName",
                    //"bSortable": false
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        if (full['VehicleName'].indexOf('<del>') >= 0)
                            return '<span style="text-decoration: line-through;" href="#">' + full['VehicleName'] + '</span>';
                        else
                            return full['VehicleName'];
                    }
                },
                {
                    "data": "DriverName",
                    "bSortable": false
                },
                {
                    "data": "countTyresDisposed",
                    "bSortable": false
                },
                {
                    "orderable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '',
                    "bSortable": false
                },
                {
                    "data": "VehicleId",
                    "class": "hidden"
                }
        ],
        "rowCallback": function (row, data, index) {
            if (data.countTyresDisposed == 0) {

                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        },
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalTyreDisposalData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#TotalDisposedCount').text(data.TotalDisposedCount);
                    $('#TotalTyresResold').text(data.TotalTyresResold);
                    $('#TotalTyresCondemned').text(data.TotalTyresCondemned);
                    //$('#TotalTyresReused').text(data.TotalTyresReused);
                }
            });
            $('th').removeClass('sorting_asc');
        }
    });
}



function DeleteTyreDisposal(TyreId) {
    if (confirm("Do you want to delete selected record?")) {
        var url = apiBase.apiurl + 'FmsAPI/RemoveDisposedTyre?custid=' + $custid + '&tyreid=' + TyreId;
        $.post(url, function (result) {
            if (result > 0) {
                toastr.success("Record deleted successfully.")
                GetTyreDisposal();
            }
            else
                toastr.error("Failed!!!")
        });
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
    var reportName = 'Tyre_Disposal_Report_' + $beginDate + '_TO_' + $endDate;
    var $bbid = '';
    var renewalId = 0;
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custid=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}