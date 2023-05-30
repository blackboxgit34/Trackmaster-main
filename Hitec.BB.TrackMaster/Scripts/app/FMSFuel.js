function format(d) {
    var data = d;
    if (data.countFuel > 0) {
        var a = data.FuelInformation;
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead>            <th> Date Time</th>            <th> Litres</th>            <th>Amount Paid </th>            <th>Price per Liter</th>            <th>Fuel Station</th>      <th> KM Reading</th> <th> Distance</th> <th>Mileage</th>  <th>Payment</th>            <th>Reference</th> <th>Document</th><th>Actions</th></tr></thead>';
        a.forEach(function (element) {
            var img;

            if (element.DocPath != '' && element.DocPath != null) {

                debugger;

                var fpath = element.DocPath;

                fpath = fpath.replace(/\\/g, '/');
                fpath = fpath.substring(0, fpath.length - 1)
                var fname = fpath.substring(fpath.lastIndexOf('/') + 1, fpath.lastIndexOf('.'));
                img = '<a href=' + fpath + ' download>Download</a>';



            }



            else {
                img = 'N/A';
            }
            tableString = tableString +
                '<tr>' +
            '<td>' + moment(element.Date).format("MMM D YYYY hh:mm A") + '</td>' +
            '<td  style="max-width: 20px;">' + element.Liters + '</td>' +
            '<td>' + element.AmountPaid + '</td>' +
            '<td>' + element.PriceperLiter + '</td>' +
            '<td>' + element.FuelStation + '</td>' +
            //'<td>' + element.Distance + '</td>' +
            //'<td>' + element.IOdometer + '</td>' +
             '<td>' + element.FOdometer + '</td>' +
              '<td>' + element.Distance + '</td>' +
               '<td>' + element.mileage + '</td>' +
            '<td>' + element.Payment + '</td>' +
            '<td>' + element.Reference + '</td>' +
  '<td>' + img + '</td>' +
            //'<td>' + '<a href="/Fms/AddFuel?fuelid=' + element.ID + '&vehid=' + element.VehicleId + '" class="editor_edit">Edit</a> / <a href="javascript:DeleteFuel(' + element.ID + ');"  class="editor_remove">Delete</a>' + '</td>'
            '<td>' +
            '<div class="dropdown">' +
            '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
            '<span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li><a target = "_blank" href="/Fms/AddFuel?fuelid=' + element.ID + '&vehid=' + element.VehicleId + '" class="editor_edit">Edit</a></li>' +
            '<li><a href="javascript:DeleteFuel(' + element.ID + ');"  class="editor_remove">Delete</a></li>' +
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

    GetFuelData(null);
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


            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })

});

$("#BtnSearch").click(function () {
    GetFuelData(null);
});


$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsApi/GetVehicleFuelInfo";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsApi/GetVehicleFuelInfo";
    DownloadData(url, downloadType);
});

function GetFuelData(downloadType) {
    // clear tables contents
    deleteTable();
    var url = baseUrl + "FmsApi/GetVehicleFuelInfo";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 5,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10], [5, 10]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "VehicleName",
                    "bSortable": false
                },
                {
                    "orderable": false, "targets": 0,
                    "render": function (data, type, full, meta) {


                        return $beginDate;
                    }
                },
                        {
                            "orderable": false, "targets": 0,
                            "render": function (data, type, full, meta) {


                                return $endDate;
                            }
                        },
                            {
                                "orderable": false, "targets": 0,
                                "render": function (data, type, full, meta) {
                                    debugger;

                                    return full.avgmileage;
                                }
                            },
                                {
                                    "orderable": false, "targets": 0,
                                    "render": function (data, type, full, meta) {


                                        return full.enginehrs;
                                    }
                                },
                                    {
                                        "orderable": false, "targets": 0,
                                        "render": function (data, type, full, meta) {


                                            return full.avgliter;
                                        }
                                    },
                {
                    "data": "DriverName",
                    "bSortable": false
                },
                {
                    "data": "TotalFuel",
                    "bSortable": false
                },
                {
                    "data": "TotalCost",
                    "bSortable": false
                },
                  {
                      "data": "totdistance",
                      "bSortable": false
                  },
                {
                    "data": "countFuel",
                    "bSortable": false
                },
                {
                    "orderable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                {
                    "data": "VehicleId",
                    "class": "hidden"
                }
        ],
        "rowCallback": function (row, data, index) {
            if (data.countFuel == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        },
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalFuelData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#TotalFuelCount').text(data.TotalFuelCount);
                    $('#TotalFuelFilled').text(data.TotalFuelFilled);
                    $('#TotalFuelCost').text(data.TotalFuelCost);
                }
            });
            $('th').removeClass('sorting_asc');
        }
    });
}

function DeleteFuel(fuelentryid) {
    if (confirm("Do you want to delete selected record?")) {
        var url = apiBase.apiurl + 'FmsAPI/RemoveFuelEntry?custid=' + $custid + '&fuelentryid=' + fuelentryid;
        $.post(url, function (result) {
            if (result > 0) {
                toastr.success("Record deleted successfully.")
            }
            else
                toastr.error("Failed!!!")
        });
        GetFuelData(null);
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
    var reportName = 'Fuel_Report_' + $beginDate + '_TO_' + $endDate;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}




