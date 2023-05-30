function bindData()
{
    $(".js-example-basic-multiple").select2({
        
    });
    var url = apiBase.apiurl + "Alert/getalertdetailreport";

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
                     "data": "alertid",
                     "sClass": "hiddenVehicleId"
                 },
                {
                    "data": "AuxIP",
                    "sClass": "hiddenauxType"
                },
                 {
                     "render": function (data, type, full, meta) {
                         
                         return '<input type="email" id="textemail"  class="js-example-basic-multiple"   name="email"  value="' + full.email + '"  />';
                         
                        
                     }
                 },
               {
                   "render": function (data, type, full, meta) {
                       if (full.acon == "1") {
                           return '<span  data-toggle="tooltip" ><input type="checkbox" value="6" class="Acon" name="Acon"  checked/></span>';
                       }
                       else {
                           return '<span  data-toggle="tooltip" ><input type="checkbox"  value="6" class="Acon" name="Acon"    /></span>';
                       }
                   }
               },
               {
                   "render": function (data, type, full, meta) {
                       if (full.frontdoor == "1") {
                           return '<span  data-toggle="tooltip" ><input type="checkbox" value="6" class="frontdoor" name="frontdoor"  checked/></span>';
                       }
                       else {
                           return '<span  data-toggle="tooltip" ><input type="checkbox"  value="6" class="frontdoor" name="frontdoor"    /></span>';
                       }
                   }
               },
                {
                    "render": function (data, type, full, meta) {
                        if (full.backdoor == "1") {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" value="5" class="seconddoor" name="seconddoor"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" ><input type="checkbox" value="5" class="seconddoor"  name="seconddoor"    /></span>';
                        }
                    }
                },
                {
                    "render": function (data, type, full, meta) {
                        if (full.templaert == "1") {
                            return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="tempalert" name="tempalert"  checked/></span>';
                        }
                        else {
                            return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="tempalert" name="tempalert"    /></span>';
                        }
                    }
                },
                  {
                      "render": function (data, type, full, meta) {
                          if (full.poialert == "1") {
                              return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="poialert" name="poialert"  checked/></span>';
                          }
                          else {
                              return '<span  data-toggle="tooltip" title="SMS Price will  charge"><input type="checkbox" value="4" class="poialert" name="poialert"    /></span>';
                          }
                      }
                  }

               , {

                   "data": null,
                   "render": function (data, type, full, meta) {

                       return '<span><button class="btn btn-green btn-small" type="button"  id="' + full.alertid + '" onClick="PopUpModal(this.id);">Delete</button></span>';
                   }
               },
               

              
             
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


    window.PopUpModal = function (id) {
        


        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "Alert/getupdatealertrecords",
            data: { alertid: id,},
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
        
    $('#dt_basic_Master tbody').on('click', 'input[type="checkbox"]', function (e) {
        debugger;
        var auxIP = String($(this).closest('tr').find('.hiddenauxType').text());
        var bbid = String($(this).closest('tr').find('.hiddenBBID').text());
        var alertid = String($(this).closest('tr').find('.hiddenVehicleId').text());

        var eventType = this.value;
        var alertType = 2;//for notification
        var statusFlag = $(this).prop("checked");
           
        //for lid check email
        var email = String($(this).closest('tr').find('.email').val());
       
        var Acon = String($(this).closest('tr').find('.Acon')[0].checked);
        var frontdoor = String($(this).closest('tr').find('.frontdoor')[0].checked);
        var seconddoor = String($(this).closest('tr').find('.seconddoor')[0].checked);
        var tempalert = String($(this).closest('tr').find('.tempalert')[0].checked);
        var poialert = String($(this).closest('tr').find('.poialert')[0].checked);

        
       

        alertify.confirm("You need to logged into mobile app to receive notifications. Do you want to proceed?", function (ex) {
            if (ex) {
                ajaxRespOnChkboxEvt(null, bbid, email, Acon, frontdoor, seconddoor, tempalert, alertid, poialert)
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
var ajaxRespOnChkboxEvt = function (custid, bbid, email, Acon, frontdoor, seconddoor, tempalert, alertid, poialert) {
    debugger;
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "Alert/setcombinationalert",
        data: { custid: custid, bbid: bbid, email: email, Acon: Acon, frontdoor: frontdoor, seconddoor: seconddoor, tempalert: tempalert, alertid: alertid, poi: poialert },
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








