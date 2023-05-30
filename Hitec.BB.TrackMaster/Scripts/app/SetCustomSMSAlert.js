
$(document).ready(function () {
    
    var url = apiBase.apiurl + "Alert/GetSMSNotificationDetails";
    table = $('#dt_basic_Master1').DataTable({
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
            param.push({ "name": "custId", "value": $custid},{"name":"alertType", "value":1});
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
                  { "data": "phnno" },

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
                {
                    "render": function (data, type, full, meta) {
                        if (full.FuelLidIsActive) {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" value="6" class="Acon" name="Acon"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" ><input type="checkbox"  value="6" class="Acon" name="Acon"    /></span>';
                        }
                    }
                },
               {
                   "render": function (data, type, full, meta) {
                       if (full.FuelLidIsActive) {
                           return '<span  data-toggle="tooltip" ><input type="checkbox" value="6" class="frontdoor" name="frontdoor"  checked/></span>';
                       }
                       else {
                           return '<span  data-toggle="tooltip" ><input type="checkbox"  value="6" class="frontdoor" name="frontdoor"    /></span>';
                       }
                   }
               },
                {
                    "render": function (data, type, full, meta) {
                        if (full.MilkLidIsActive) {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" value="5" class="seconddoor" name="seconddoor"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" value="5" class="seconddoor"  name="seconddoor"    /></span>';
                        }
                    }
                },
                {
                    "render": function (data, type, full, meta) {
                        if (full.GeofenceIsActive) {
                            return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="tempalert" name="tempalert"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="tempalert" name="tempalert"    /></span>';
                        }
                    }
                }
        
                 
               
            
        ],

    });
    
 //   $('#timepicker1').timepicker();
    //for updating  sms/Notification 
    $('#dt_basic_Master1').on('draw.dt', function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
  
    $('#dt_basic_Master1 tbody').on('click', 'input[type="checkbox"]', function (e) {
      
            var auxIP = String($(this).closest('tr').find('.hiddenauxType').text());
            var bbid = String($(this).closest('tr').find('.hiddenBBID').text());
            var vehicleId = String($(this).closest('tr').find('.hiddenVehicleId').text());
            var eventType = this.value;
            var alertType = 1;//for notification
            var statusFlag = $(this).prop("checked");

            //for lid check
            var milkLid = String($(this).closest('tr').find('.MilkLid')[0].checked);
            var FuelLid = String($(this).closest('tr').find('.FuelLid')[0].checked);

            //if ((milkLid == "true" || FuelLid == "true") && auxIP == "N/A") { bhanu
            //    toastr.warning('This feature is not enabled. Please contact our service department.!');
            //    return false;
            //}
            if (!$(this).is(":checked")) {
                ajaxRespOnChkboxEvt(bbid, eventType, alertType, auxIP, statusFlag, $custid, vehicleId)
                return true;
            }
            else {

            alertify.confirm("SMS will deliver to registered mobile number. <a href='/admin/getboxinfo'>Change mobile Number</a>. Do you want to proceed?", function (ex) {
                if (ex) {
                    ajaxRespOnChkboxEvt(bbid, eventType, alertType, auxIP, statusFlag, $custid, vehicleId)
                    return true;
                } else {
                    e.target.checked = false;
                    alertify.error("You've clicked Cancel");
                    return false;
                }
            });
        }
            console.log('suggested-in-comment', 'click');
    });



    table.on('draw', function () {

        $(":checkbox").attr('disabled', 'disabled');
        if (F == 1) {
            $(":checkbox").removeAttr('disabled');
        }


    });
    
});


