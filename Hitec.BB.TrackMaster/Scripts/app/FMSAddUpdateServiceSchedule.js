$(document).ready(function () {
    console.log($custid);
    $('#LastPerformed').datepicker();
    $('#NextDueDate').datepicker();
    
    $(".js-example-basic-multiple").select2({
        placeholder: "Please select Service",
        seperator: ",",
    });
    $('form').on('keydown', '#NextDueKM, #NextDueOdometer, #ReminderValue', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });
    var VehicleUrl = apiBase.apiurl + 'fmsapi/GetFmsVehicles';
    console.log(VehicleUrl);
    $.get(VehicleUrl, { custid: $custid }, function (data) {
        $.each(data, function (key, value) {
            $("#VehicleId").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    }).done(function () {
        var vid = $('#vehicleIdFromMain').val();

        if (vid != 0) {          
            $("#VehicleId").select2().select2('val', vid).trigger('change');   
        }
        
        var SSIDMainid = $('#SSIDMain').val();
        if (SSIDMainid == 0) {
            $('#statusdiv').remove();
        }

       
    });
    var ServiceUrl = apiBase.apiurl + 'FmsAPI/BindServiceScheduleItems';
    $.post(ServiceUrl, function (data) {
        $.each(data, function (key, value) {
            $("#ServiceItemID").append($("<option></option>").val(value.ServiceItemID).html(value.ServiceItem));
        });
    }).done(function () {
        var tid = getUrlParameter("ssid");
        if (tid != null && tid > 0) {
            $("#statusText").val("Update Vehicle Service Schedule");
            var url = apiBase.apiurl + "FmsApi/GetServScheduleBySchId";
            $.get(url, { custid: $custid, ssid: tid }, function (data) {
                console.log(data);
                $.each(data, function (item, value) {
                    if (item == "ServiceItemIdList") {
                        var Arr = value.split(",");
                        console.log(Arr);
                        $("#ServiceItemID").select2("val", Arr);
                    }
                    else if (item == "NextDueDate" && value.length > 5) {
                        $('#DateReminder').prop('checked', true).trigger('change');
                        $('#NextDueDate').val(value);
                    }
                    else if (item == "NextDueKM" && value > 0) {
                        $('#KmReminder').prop('checked', true).trigger('change');
                        $('#NextDueKM').val(value).trigger('keyup');
                    }
                    else if (item == "VehicleId")
                        $("#" + item).val(value).trigger('change');
                    else
                        $("#" + item).val(value);
                });
            });
        }
        else {
            $('.checkBox').click(function () {
                if ($(this).is(':checked'))
                    $(this).closest('tr').find('.js-example-basic-multiple').prop("disabled", false);
                else
                    $(this).closest('tr').find('.js-example-basic-multiple').prop("disabled", true);
                var json = $.parseJSON(data);
                var selectedValues = [];
                $.each(json, function (bb) {
                    selectedValues.push(json[bb].Id);
                });
            });
        }
    });





    $('#VehicleId').on('change', function () {
        
        var IsGpsUrl = apiBase.apiurl + 'FmsAPI/GetCheckIsGPS';
        var VehicleId = $(this).children(":selected").val();
        if (VehicleId > 0) {
            $('#DateReminder, #KmReminder').prop('disabled', false)
            if (typeof getUrlParameter("ssid") == "undefined") {
                $('#DateReminder, #KmReminder').prop('checked', false).trigger('change');
            }
            $.get(IsGpsUrl, { VehicleId: VehicleId }, function (data) {
                if (data == "no") {
                    if (typeof getUrlParameter("ssid") == "undefined") {
                        $('#KmReminder').prop('checked', false).trigger('change');
                    }
                    $('#odometer').html('');
                }
                else {
                    if (typeof getUrlParameter("ssid") == "undefined") {
                        $('#KmReminder').prop('checked', true).trigger('change');
                    }
                    OdometerUrl = apiBase.apiurl + 'FmsAPI/GetOdometerReading';
                    $.get(OdometerUrl, { VehicleId: VehicleId }, function (data) {
                        $('#odometer').html("Odometer Reading: " + data);
                        $('#NextDueKM').trigger('keyup');
                    });
                }
            });
        }
    });





    $('#NextDueKM').on('keyup', function () {
        GetOddometer();
    });




    $('#NextDueOdometer').on('keyup', function () {
        if ($('#NextDueOdometer').val() != "") {
            var temp = $('#odometer').html().split(' ');
            var odd = parseFloat(temp[2]);
            var newodd = parseFloat($('#NextDueOdometer').val());
            if (newodd > odd) {
                var final = parseFloat($('#NextDueOdometer').val()) - odd;
                final = final.toFixed(2);
                $('#NextDueKM').val(final);
            }
            else {
                $('#NextDueKM').val('');
            }
        }
        else {
            $('#NextDueKM').val('');
        }
    });



    $('#KmReminder').change(function () {
        if ($('#KmReminder').is(':checked')) {
            $("#NextDueKM, #NextDueOdometer ,#beforeOdometer").prop('required', true).prop('disabled', false);
            $("#DateReminder").prop("disabled", true);
            document.getElementById("main").style.display = "block"
        }
        else {
            $("#NextDueKM, #NextDueOdometer ,#beforeOdometer").val('').prop('required', false).prop('disabled', true);
            $("#DateReminder").prop("disabled", false);

            document.getElementById("main").style.display = "none"
        }
    });



    $('#DateReminder').change(function () {
        if ($('#DateReminder').is(':checked')) {
            $("#NextDueDate, #ReminderValue").prop('required', true).prop('disabled', false);
            $("#KmReminder").prop("disabled", true);
        }
        else {
            $("#NextDueDate, #ReminderValue").val('').prop('required', false).prop('disabled', true);
            $("#KmReminder").prop("disabled", false);
        }
    });




    //    dynamic text box ******
    var iCnt = 0;
    // CREATE A "DIV" ELEMENT AND DESIGN IT USING jQuery ".css()" CLASS.
    var container = $(document.createElement('div')).css({
        padding: '5px', margin: '20px', width: '170px', border: '1px dashed',
        borderTopColor: '#999', borderBottomColor: '#999',
        borderLeftColor: '#999', borderRightColor: '#999'
    });

    $('#btAdd').click(function () {
      
       
        if (iCnt <= 4) {

            iCnt = iCnt + 1;

            // ADD TEXTBOX.
            $(container).append('<input  onblur="javascript:checkl(this.name, this.value);" onchange="javascript:checkl(this.name, this.value);" name="user' + iCnt + '"  type=text class="input" id=tb' + iCnt + ' ' +
                'value="' + iCnt + '" />');

            // SHOW SUBMIT BUTTON IF ATLEAST "1" ELEMENT HAS BEEN CREATED.
            if (iCnt == 1) {
                var divSubmit = $(document.createElement('div'));
                //$(divSubmit).append('<input type=button class="bt"' +
                //    'onclick="GetTextValue()"' +
                //        'id=btSubmit value=Submit />');
            }

            // ADD BOTH THE DIV ELEMENTS TO THE "main" CONTAINER.
            $('#main').after(container, divSubmit);

            if ($('#tb' + iCnt + '').val() == "1") {
                var txtval = $("#NextDueOdometer").val();
                $('#tb' + iCnt + '').val(parseInt(txtval) + parseInt($("#NextDueKM").val()));
               
            }
            else {
                debugger;

                var tbval = iCnt - 1;
                var txtval = $('#tb' + tbval + '').val();
                $('#tb' + iCnt + '').val(parseInt(txtval) + parseInt($("#NextDueKM").val()));
            }
           
        }
            // AFTER REACHING THE SPECIFIED LIMIT, DISABLE THE "ADD" BUTTON.
            // (20 IS THE LIMIT WE HAVE SET)
        else {
            $(container).append('<label>Reached the limit</label>');
            $('#btAdd').attr('class', 'bt-disable');
            $('#btAdd').attr('disabled', 'disabled');
        }


      
    });

    function checkl(name, value) {
        alert("check");
        var errors = new Array();
        var x;
        var msg = "There were some problems...\
";

        if (value === "") {
            errors['blank'] = "Field must not be blank";
        }

        for (x in errors) {
            msg += "\
"+ errors[x];
        }

        if (!(x == undefined)) {
            alert(msg);
            document.getElementById(name).style.backgroundColor = "#72A4D2"; //works, changed input background successfully
            document.getElementById(name).focus(); // does NOT work, no focus
            // document.getElementById('password').focus(); // successfully refocuses on hard coded 'password' input
        } else {
            document.getElementById(name).style.backgroundColor = "";
        }
    }



    // REMOVE ONE ELEMENT PER CLICK.
    $('#btRemove').click(function () {
        if (iCnt != 0) { $('#tb' + iCnt).remove(); iCnt = iCnt - 1; }

        if (iCnt == 0) {
            $(container)
                .empty()
                .remove();

            $('#btSubmit').remove();
            $('#btAdd')
                .removeAttr('disabled')
                .attr('class', 'bt');
        }
    });

    // REMOVE ALL THE ELEMENTS IN THE CONTAINER.
    $('#btRemoveAll').click(function () {
        $(container)
            .empty()
            .remove();

        $('#btSubmit').remove();
        iCnt = 0;

        $('#btAdd')
            .removeAttr('disabled')
            .attr('class', 'bt');
    });
    //************************

});




// PICK THE VALUES FROM EACH TEXTBOX WHEN "SUBMIT" BUTTON IS CLICKED.
var divValue, values = '';

function GetTextValue() {
    $(divValue)
        .empty()
        .remove();

    values = '';

    $('.input').each(function () {
        divValue = $(document.createElement('div')).css({
            padding: '5px', width: '200px'
        });
        values += this.value + '<br />'
    });

    $(divValue).append('<p><b>Your selected values</b></p>' + values);
    $('body').append(divValue);
}

///*************************************************************

function GetOddometer() {
    
    if ($('#NextDueKM').val() != "") {
        var temp = $('#odometer').html().split(' ');
        var odd = parseFloat(temp[2]);
        var final = odd + parseFloat($('#NextDueKM').val());
        final = final.toFixed(2);
        $('#NextDueOdometer').val(final);
    }
    else {
        $('#NextDueOdometer').val('');
    }
}





function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};




$('#servSchedule').submit(function () {

    debugger;
  
    var VehicleName = $("#VehicleId option:selected").text();
    var ServiceItemIds = '';
    $('#ServiceItemID').val().forEach(function (val, index) {
        ServiceItemIds += val + ',';
    })
    if (ServiceItemIds != '')
        ServiceItemIds = ServiceItemIds.substring(0, ServiceItemIds.length - 1);

    var data = $('#servSchedule').serializeArray();


    $(divValue)
        .empty()
        .remove();

    values = '';

    $('.input').each(function () {
        divValue = $(document.createElement('div')).css({
            padding: '5px', width: '200px'
        });
        values += this.value + ','
    });

    //$(divValue).append('<p><b>Your selected values</b></p>' + values);
    $('body').append(divValue);
    data.push({ name: 'ServiceScheduleID', value: $('#SSIDMain').val() }, { name: 'ServiceItemID', value: '' },
        { name: 'VehicleName', value: VehicleName },
        { name: 'RepeatUnit', value: 'Days' },
        { name: 'ReminderUnit', value: 'Days' },
        { name: 'Attachments', value: '' },
        { name: 'ServiceItemIdList', value: ServiceItemIds },
        { name: 'Servicestatus', value: $("#servicestatus").val() },
        { name: 'MultipleKM', value: values }

        );


    var ServiceUrl = apiBase.apiurl + 'FmsAPI/AddUpdateServiceSchedule';
    $.post(ServiceUrl, $.param(data), function (result) {
        if (result > 0) {
            toastr.success("Record Entered Successfuly");
            window.setTimeout(function () {
                window.location.href = '/Fms/ServiceReminders';
            }, 1000);
        }
        else
            toastr.error("Failed!!!")
    });
});