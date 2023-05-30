function bindData()
{
    
    var url = apiBase.apiurl + "Alert/GetSMSNotificationDetails";

    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "custId", "value": $custid }, { "name": "alertType", "value": 2 });

        },
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        //"initComplete": function(settings, json) {
        //    //$('.timePicker').timepicker().on('show.timepicker', function (e) {      
        //    //});

        //    $('.hiddenBBID').addClass("hidden");
        //    $('.hiddenauxType').addClass("hidden");

        //},
        "fnDrawCallback": function () {
            $('.hiddenBBID').addClass("hidden");
            $('.hiddenVehicleId').addClass("hidden");
            $('.hiddenauxType').addClass("hidden");
        },
        "columns": [
                {
                    "width": "2%",
                    "data": "Sno"
                },
                { "data": "VehName" },
                 
                {
                    "data": "bbid",
                    "sClass": "hiddenBBID"
                },
                 {
                     "data": "deviceId",
                     "sClass": "hiddenVehicleId"
                 },
                {
                    "data": "AuxIP",
                    "sClass": "hiddenauxType"
                },
                { "data": "OverStoppageMin" },

                { "data": "OverSpeeLimit" },


                {
                    "render": function (data, type, full, meta) {
                        if (full.IgnitionOnIsActive) {
                            return '<span  data-toggle="tooltip" > <input type="checkbox" id="chk"  value="1" class="IgnitionSMSActive" name="IgnitionSMSActive"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" > <input type="checkbox" id="chk" value="1" class="IgnitionSMSActive" name="IgnitionSMSActive"    /></span>';
                        }
                    }
                },
                 //{
                 //    "render": function (data, type, full, meta) {
                 //        if (full.smsVehInfo) {
                 //            return '<input type="checkbox" class="smsVehInfo" name="smsVehInfo"  checked/>';
                 //        }
                 //        else {
                 //            return '<input type="checkbox" class="smsVehInfo" name="smsVehInfo"    />';
                 //        }
                 //    }
                 //},
                 {
                     "render": function (data, type, full, meta) {
                         if (full.BatteryIsActive) {
                             return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" class="MainBatteryStatus"  value="7" name="MainBatteryStatus"  checked/></span>';
                         }
                         else {
                             return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="7" class="MainBatteryStatus" name="MainBatteryStatus"    /></span>';
                         }
                     }
                 },
                 {
                     "render": function (data, type, full, meta) {
                         if (full.OverSpeedIsActive) {
                             return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="2"  class="overspeedAlert" name="overspeedAlert"  checked/></span>';
                         }
                         else {
                             return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="2" class="overspeedAlert" name="overspeedAlert"    /></span>';
                         }
                     }
                 },
                 {
                     "render": function (data, type, full, meta) {
                         if (full.OverStoppageIsActive) {
                             return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="3"  class="overstoppageAlert" name="overstoppageAlert"  checked/></span>';
                         }
                         else {
                             return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="3" class="overstoppageAlert" name="overstoppageAlert"    /></span>';
                         }
                     }
                 },

                {
                    "render": function (data, type, full, meta) {
                        if (full.FuelLidIsActive) {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="6" class="FuelLid" name="FuelLid"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="6" class="FuelLid" name="FuelLid"    /></span>';
                        }
                    }
                },
                {
                    "render": function (data, type, full, meta) {
                        if (full.MilkLidIsActive) {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="5" class="MilkLid" name="MilkLid"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" id="chk" value="5" class="MilkLid"  name="MilkLid"    /></span>';
                        }
                    }
                },
                {
                    "render": function (data, type, full, meta) {
                        if (full.GeofenceIsActive) {
                           return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="Geofence" name="Geofence"  checked/></span>';
                       }
                       else {
                           return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="Geofence" name="Geofence"    /></span>';
                        }
                    }
                },
                {
                    "render": function (data, type, full, meta) {
                        if (full.GeofenceIsActive) {
                            return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="Geofence" name="Geofence"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="Geofence" name="Geofence"    /></span>';
                        }
                    }
                }
        ],

    });


    table.on('draw', function () {
     
        $(":checkbox").attr('disabled', 'disabled');
        if (F == 1) {
            $(":checkbox").removeAttr('disabled');
        }

      
       
    });
}
$(document).ready(function () {
    bindData();
   // $('#timepicker1').timepicker();
    //for updating  sms/Notification 
    $('#dt_basic_Master').on('draw.dt', function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('#dt_basic_Master tbody').on('click', 'input[type="checkbox"]', function (e) {
        
        var auxIP = String($(this).closest('tr').find('.hiddenauxType').text());
        var bbid = String($(this).closest('tr').find('.hiddenBBID').text());
        var vehicleId = String($(this).closest('tr').find('.hiddenVehicleId').text());

        var eventType = this.value;
        var alertType = 2;//for notification
        var statusFlag = $(this).prop("checked");
           
        //for lid check
        var milkLid = String($(this).closest('tr').find('.MilkLid')[0].checked);
        var FuelLid = String($(this).closest('tr').find('.FuelLid')[0].checked);

        //if ((milkLid == "true" || FuelLid =="true") && auxIP =="N/A") { bhanu
        //    toastr.warning('This feature is not enabled. Please contact our service department.!');
        //    return false;
        //}

        alertify.confirm("You need to logged into mobile app to receive notifications. Do you want to proceed?", function (ex) {
            if (ex) {
                ajaxRespOnChkboxEvt(bbid, eventType, alertType, auxIP, statusFlag, $custid, vehicleId)
                return true;
            } else {
                if (jQuery(e.target).is(":checked")) {
                    e.target.checked = false;
                } else {
                    e.target.checked = true;
                }
                alertify.error("You've clicked Cancel");
                return false;
            }
        });

        console.log('suggested-in-comment', 'click');
    });


});



//common for both  sms and notification
var ajaxRespOnChkboxEvt = function (bbid, eventType, alertType, auxIP, statusFlag, $custid, vehicleId) {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "Alert/SetSMSNotificationDetails",
        data: { bbid: bbid, custid: $custid, eventType: eventType, alertType: alertType, auxIP: auxIP, statusFlag: statusFlag, VehicleId: vehicleId },
        success: function (data) {
            if (data == "success") {
                toastr.success('successfully Done!');
            }
            else {
                toastr.warning(data);
            }
            bindData();
        },
        error: function (error) {
            toastr.warning(error);

        }
    });
};








