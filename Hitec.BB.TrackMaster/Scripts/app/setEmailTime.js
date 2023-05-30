﻿$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $.blockUI({ message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>' });

    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "EmailReports/GetEmailReports",
        data: { custId: $custid },
        success: function (result) {
            
            $.unblockUI();
            var data = result.ListEmailService;
            $('#txtEmailTo').val(result.EmailTo);
            $('#txtEmailBcc').val(result.EmailBcc);

            for (var i = 0; i < data.length; i++) {
                var checkbox;
                var disable;
                var IsCustom;

                if (data[i].IsCustom) {
                    IsCustom = '<span class="badge badge-default pull-right"> custom service</span>';

                }
                if (data[i].Flag) {
                    disable = " ";
                    checkbox = "<input type='checkbox' id='ignitionOn' class='checkBox' checked />";
                }
                else {
                    disable = "disabled";
                    checkbox = "<input type='checkbox' id='ignitionOn' class='checkBox'  />";
                }
                if (IsCustom) {
                    $('#tblEmailReport').append('<tr><td style="width:30%"> <input type="hidden " class="serviceID hidden" value="' + data[i].ServiceID + '" />' + IsCustom + '  <label>' + data[i].ServiceName + '</label><small>' + data[i].ServiceDescription + '<small></td><td>' + checkbox + '</td><td style="width:40%;"> <select class="js-example-basic-multiple" id="' + i + '"  ' + disable + ' multiple="multiple"> </select></td><td><input type="button"  class="btn btn-green btn-small btnSubmit" ' + disable + ' value="Save" /></td></tr>')


                }
                else {
                    $('#tblEmailReport').append('<tr><td style="width:30%"> <input type="hidden " class="serviceID hidden" value="' + data[i].ServiceID + '" />  <label>' + data[i].ServiceName + '</label><small>' + data[i].ServiceDescription + '<small></td><td>' + checkbox + '</td><td style="width:40%;"> <select class="js-example-basic-multiple" id="' + i + '"  ' + disable + ' multiple="multiple"> </select></td><td><input type="button"  class="btn btn-green btn-small btnSubmit" ' + disable + ' value="Save" /></td></tr>')
                }

                //for appending options into timing 
                var list = data[i].ListScheduleTime;
                if (list.length > 0) {
                    $.each(list, function (j, item) {
                        var selected = '<option></option>';;
                        if (item.IsActive) {
                            selected = '<option selected="selected" ></option>';
                        }

                        $('#' + i).append($(selected).val(item.TimingId).html(item.Timing));
                    });
                }
                else {
                    $('#' + i).append($(selected).val(item.TimingId).html(item.Timing));
                }

                $(":checkbox").attr('disabled', 'disabled');
                $(":button").attr('disabled', 'disabled');
                //end of appending options into timing
            }

            //simple lis to select2
            $(".js-example-basic-multiple").select2({
                placeholder: "Please select timings.",
            });
            //end of simple list to select2

            //Checkbox Event
            $('.checkBox').click(function () {


                if ($(this).is(':checked')) {
                    $(this).closest('tr').find('.js-example-basic-multiple').prop("disabled", false);
                    $(this).closest('tr').find('.js-example-basic-multiple').select2("open");
                    $(this).closest('tr').find('.btnSubmit').prop("disabled", false);

                }
                else {

                    var $exampleMulti = $(this).closest('tr').find('.js-example-basic-multiple');
                    $exampleMulti.val(null).trigger("change");
                    $(this).closest('tr').find('.js-example-basic-multiple').prop("disabled", true);
                    $(this).closest('tr').find('.btnSubmit').prop("disabled", true);

                    var serviceID = $(this).closest('tr').find('.serviceID').val();
                    var timing = null;
                    var custId = $custid;

                    ajaxResponse(timing, serviceID, custId, null, null);
                    // $(".js-example-basic-multiple").prop("disabled", true);
                }
            });
            //End of checkbox event

            $('.btnSubmit').click(function () {

                var timings = $(this).closest('tr').find('.js-example-basic-multiple').select2("val");
                var serviceID = $(this).closest('tr').find('.serviceID').val();
                var timing = timings.toString();
                var custId = $custid;
                var emailTo = txtEmailTo.value;
                var bccTo = txtEmailBcc.value;
                ajaxResponse(timing, serviceID, custId, emailTo, bccTo);
            });

        }
    });
    var ajaxResponse = function (timing, serviceID, custId, emailTo, bccTo) {
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "EmailReports/SetEmailReports",
            data: { custId: $custid, serviceID: serviceID, timing: timing, emailTo: emailTo, bccTo: bccTo },
            success: function (data) {
                toastr.success('successfully Done!');
            }
        });
    };
});