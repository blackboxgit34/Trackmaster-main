var table;
function format(d) {
    var data = d;

    if (data.serviceReminderCount > 0) {
        debugger;
        var a = data.serviceReminderData;

        if ($('#FilterKM').val() == "") {
            var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead> <tr>' +
            '<th>Created Date</th><th>Service Items</th> <th>Reminder Alert</th><th>Next Due Date</th><th>Current Odometer</th><th>Next Due Km</th><th>Diff KM</th><th>Remarks</th><th colspan="2">Actions</th></tr></thead>';
        }
        a.forEach(function (element) {
            
            tableString = tableString +
                '<tr>' +

                
            '<td>' + element.CreatedDate + '</td>' +

            '<td>' + element.ServiceItemNameList + '</td>' +
            '<td>' + element.ScheduleAlert + '</td>' +
            '<td>' + moment(element.NextDueDate).format("MMM D YYYY") + '</td>' +
            '<td>' + element.CurrentOdometer + '</td>' +

            '<td>' + element.NextDueKM + '</td>' +
              '<td>' + (parseInt(element.NextDueKM) - parseInt(element.CurrentOdometer)) + '</td>' +
            '<td>' + element.Remarks + '</td>' +

            //'<td>' + '<a href="/Fms/AddRepairMaintenance?vehicleid=' + element.VehicleId + '&serviceid=' + element.ServiceScheduleID + '" class="editor_edit">Add Service</a> /<a href="/Fms/AddServiceSchedule?ssid=' + element.ServiceScheduleID + '" class="editor_edit">Edit</a> / <a href="javascript:DeleteReminder(' + element.ServiceScheduleID + ');"  class="editor_remove">Delete</a>' + '</td>' +
            '<td>' + '<div class="dropdown">' +
                        '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                        '<span class="caret"></span></button>' +
                        '<ul class="dropdown-menu">' +
                        '<li><a target = "_blank" href="/Fms/AddRepairMaintenance?vehicleid=' + element.VehicleId + '&serviceid=' + element.ServiceScheduleID + '" class="editor_edit">Add Service</a></li>' +
                        '<li><a target = "_blank" href="/Fms/AddServiceSchedule?ssid=' + element.ServiceScheduleID + '" class="editor_edit">Edit</a></li>' +
                        '<li><a href="javascript:DeleteReminder(' + element.ServiceScheduleID + ');"  class="editor_remove">Delete</a></li>' +
                        '</ul>' +
                        '</div>'
            + '</td>' 


         
            
          


            if (element.SubserviceReminderData!=null) {

                tableString = tableString + '<td><button type="button" class="btn btn-info btn-sm Show" >Sub-Details</button></td><tr><td colspan="12"><div class="divshow" style="display:none">' +
                                         '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead> <tr>' +
            '<th>Created Date</th><th>Service Items</th> <th>Reminder Alert</th><th>Next Due Date</th><th>Current Odometer</th><th>Next Due Km</th><th>Diff KM</th><th>Remarks</th><th colspan="2">Actions</th></tr></thead>';
                element.SubserviceReminderData.forEach(function (Innerelement) {
             
                    if (Innerelement.CreatedDate != null)
                    {

                        tableString = tableString + '<tr>' +
             '<td>' + Innerelement.CreatedDate + '</td>' +

              '<td>' + Innerelement.ServiceItemNameList + '</td>' +
              '<td>' + Innerelement.ScheduleAlert + '</td>' +
              '<td>' + moment(Innerelement.NextDueDate).format("MMM D YYYY") + '</td>' +
              '<td>' + Innerelement.CurrentOdometer + '</td>' +

              '<td>' + Innerelement.NextDueKM + '</td>' +
                '<td>' + (parseInt(Innerelement.NextDueKM) - parseInt(Innerelement.CurrentOdometer)) + '</td>' +
              '<td>' + Innerelement.Remarks + '</td>' +

              //'<td>' + '<a href="/Fms/AddRepairMaintenance?vehicleid=' + element.VehicleId + '&serviceid=' + element.ServiceScheduleID + '" class="editor_edit">Add Service</a> /<a href="/Fms/AddServiceSchedule?ssid=' + element.ServiceScheduleID + '" class="editor_edit">Edit</a> / <a href="javascript:DeleteReminder(' + element.ServiceScheduleID + ');"  class="editor_remove">Delete</a>' + '</td>' +
              '<td>' + '<div class="dropdown">' +
                          '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                          '<span class="caret"></span></button>' +
                          '<ul class="dropdown-menu">' +
                          '<li><a target = "_blank" href="/Fms/AddRepairMaintenance?vehicleid=' + Innerelement.VehicleId + '&serviceid=' + Innerelement.ServiceScheduleID + '" class="editor_edit">Add Service</a></li>' +
                          '<li><a target = "_blank" href="/Fms/AddServiceSchedule?ssid=' + Innerelement.ServiceScheduleID + '" class="editor_edit">Edit</a></li>' +
                          '<li><a href="javascript:DeleteReminder(' + Innerelement.ServiceScheduleID + ');"  class="editor_remove">Delete</a></li>' +
                          '</ul>' +
                          '</div>'
              + '</td>' +
             '</tr>'



                    }
               
                  

               
               

                });
                tableString = tableString + '</table></div></td></tr>'
            }

           
         
            
         
            
        });

        




        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    
    var ServiceUrl = apiBase.apiurl + 'FmsAPI/BindServiceScheduleItems';
    $('#servItems').find('option:not(:first)').remove();
    $.post(ServiceUrl, function (data) {
        $.each(data, function (key, value) {
            $("#servItems").append($("<option></option>").val(value.ServiceItemID).html(value.ServiceItem));
        });
    });


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
    GetVehServScheduleReport(null);

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


    $("body").on("click", "button.Show", function () {

        $(this).closest('tr').next().find('.divshow').toggle();

    });

});
$("#BtnSearch").click(function () {
    GetVehServScheduleReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsApi/GetVehicleServiceSchedule";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsApi/GetVehicleServiceSchedule";
    DownloadData(url, downloadType);
});

function GetVehServScheduleReport(downloadType) {
    deleteTable();
    console.log($beginDate);
    console.log($endDate);
    console.log($custid);
    var $serviceid = $("#servItems").val();
    var $scheduleid = 0;
    var $KmFilter = $('#FilterKM').val();
    var url = apiBase.apiurl + "FmsApi/GetVehicleServiceSchedule";

    console.log('Calling URL: ' + url + ' to get Report data.');
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
            param.push({ "name": "vehicleid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "serviceid", "value": $serviceid }, { "name": "scheduleid", "value": $scheduleid }, { "name": "KMFilter", "value": $KmFilter }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                        {
                            "data": "vehicleName",
                            "bSortable": false
                        },
                        {
                            "data": "serviceReminderCount",
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
            if (data.serviceReminderCount == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        },
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalServiceRemindersData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#serviceReminders').text(data.TotalServiceReminders);
                    $('#overdueReminders').text(data.overdueReminders);
                    //$('#dueSoonReminders').text(data.dueSoonReminders);
                    $('#okReminders').text(data.okReminders);
                }
            });
            $('th').removeClass('sorting_asc');
        }
    });

    $('#dt_basic_Master tbody').on('click', 'a.editor_remove', function () {

    });
}


function DownloadData(url, downloadType) {
    debugger;
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'ServiceSchedulesList';
    var $serviceid = 0;
    var $scheduleid = 0;
    var $vehicleid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&vehicleid=" + $vehicleid + "&serviceid=" + $serviceid + "&scheduleid=" + $scheduleid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;


    window.location = url1;
}

function DeleteReminder(sid) {
    if (confirm("Do you want to delete selected service reminder?")) {
        var url = apiBase.apiurl + 'FmsAPI/RemoveServiceSchedule?ServiceScheduleID=' + sid;

        $.post(url, function (result) {
            if (result > 0) {

                toastr.success("Record deleted successfully")
            }
            else
                toastr.error("Failed!!!")
        }).done(function (data) {
            GetVehServScheduleReport(null);
        });

    }
    else
        return false;



}