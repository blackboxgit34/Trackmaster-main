var getlist = [];
var markers = [];
$(document).ready(function () {

    $(".select2").select2({
        placeholder: "select an Option.",
    });



    GetPoidetails();




    $('#dt_basic_Master').on('click', 'input[type="button"]', function () {

        debugger;


        var mobileno = $(this).closest('tr').find('.mobile').val();
        var data = table.row($(this).parents('tr')).data();


        var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));


  


        if ($(this).attr('id') == "btnedit") {


            alertify.confirm("Before submit make sure you have added all the  records in the required Fields . Do you want to proceed?", function (ex) {
                if (ex) {
                    $.ajax({
                        dataType: "json",
                        type: "GET",
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                        url: apiBase.apiurl + "AdminAPI/UpdateManagePOIforeach",
                        data: { poiIds: data.poiid, mobile: mobileno.toString(), custId: $custid },
                        success: function (data) {

                            toastr.success('successfully Done!');
                        }
                    });
                    return true;
                } else {

                    alertify.error("You've clicked Cancel");
                    return false;
                }
            });

        }
        else if ($(this).attr('id') == "btndelete") {


            alertify.confirm("Are you sure you want  to Delete route ,it will effects route timing and data on other screen. Do you want to proceed?", function (ex) {
                if (ex) {
                    $.ajax({
                        url: apiBase.apiurl + 'AdminAPI/DeleteRoute?Id=' + data.poiid,
                        type: "get",
                        success: function (data) {
                            toastr.warning("Route is Deleted successfully.");
                            location.reload(true);
                        },
                        error: function () {
                            toastr.warning("something went wrong!");
                        }
                    });
                    return true;
                } else {

                    alertify.error("You've clicked Cancel");
                    return false;
                }
            });

        }








    });






    $('#dt_basic_Master').on('draw.dt', function () {
        $("button").attr('disabled', 'disabled');
        //This will get called when data table data gets redrawn to the      table.
        $(".js-example-basic-multiple").select2({
            placeholder: "Select an Option",
        });
    });


    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',

        url: apiBase.apiurl + "AdminAPI/GetVehicles",

        data: { custId: $custid },
        success: function (result) {

            var data = result;

            if (data.length > 0) {
                $('#ddlVehicleList').append($('<option></option>').val(0).html("All Vehicle's"));
                $.each(data, function (j, item) {
                    $('#ddlVehicleList').append($('<option></option>').val(item.Value).html(item.Text));
                });
            }


        }
    });

    $.ajax({
        url: apiBase.apiurl + 'CommonApi/GetPOI?custid=' + $custid,
        type: "get",
        async: false,
        success: function (data) {

            getlist = data;

        },
        error: function () {
            connectionError();
        }
    });



    //  dynamic text box ******
    var iCnt = 0;
    // CREATE A "DIV" ELEMENT AND DESIGN IT USING jQuery ".css()" CLASS.
    var container = $(document.createElement('div')).css({
        padding: '5px', margin: '20px', width: '430px', border: '0px dashed',
        borderTopColor: '#999', borderBottomColor: '#999',
        borderLeftColor: '#999', borderRightColor: '#999'
    });


    $('#btAdd').click(function () {



        if (iCnt == 0) {
            container.attr('id', 'myid');

            //    $(container).append('<div class="row" style="width:1500px;"> <div class="col-md-4" >Mobile No </div><div class="col-md-2">From Time </div><div class="col-md-2">To Time </div> <div class="col-md-4">POI list ' +

            //'</div>  </div>');

            $(container).append('<div class="row" style="width:1500px;"> <div class="col-md-4" >Mobile No </div><div class="col-md-4">POI list ' +

     '</div>  </div>');

            //'</div> <div class="col-md-1" style="margin-left: -57px;">Dist(Km) </div><div class="col-md-1">ETA(Min)</div>  </div>');

        }
        if (iCnt <= 10) {

            iCnt = iCnt + 1;


            // ADD TEXTBOX.
            //$(container).append('<input  onblur="javascript:checkl(this.name, this.value);" onchange="javascript:checkl(this.name, this.value);" name="user' + iCnt + '"  type=text class="input" id=tb' + iCnt + ' ' +
            //'value="' + iCnt + '" />');



            //          $(container).append('<div class="row" style="width:1500px;"><div class="col-md-4" > <input  onblur="javascript:checkl(this.name, this.value);" onchange="javascript:checkl(this.name, this.value);" name="mob' + iCnt + '"  type=text  id=mobs' + iCnt + ' class="mobs"  /></div>  <div class="col-md-2"><input  onblur="javascript:checkl(this.name, this.value);" onchange="javascript:checkl(this.name, this.value);" name="user' + iCnt + '"  type=text class="timecls" id=tbs' + iCnt + ' value="' + iCnt + '" placeholder="Time  in minutes"/> </div>  <div class="col-md-2"><input  onblur="javascript:checkl(this.name, this.value);" onchange="javascript:checkl(this.name, this.value);" name="usert' + iCnt + '"  type=text class="timecls" id=tbst' + iCnt + ' value="' + iCnt + '" placeholder="Time  in minutes"/> </div> <div class="col-md-4"> <select id=tb' + iCnt + ' onchange="javascript:checkl(this.name, this.value);" >' +

            //'</select></div>  </div>');
            $(container).append('<div class="row" style="width:1500px;"><div class="col-md-4" > <input  onblur="javascript:checkl(this.name, this.value);" onchange="javascript:checkl(this.name, this.value);" name="mob' + iCnt + '"  type=text  id=mobs' + iCnt + ' class="mobs"  /></div>    <div class="col-md-4"> <select id=tb' + iCnt + ' onchange="javascript:checkl(this.name, this.value);" >' +

    '</select></div>  </div>');

            //'</select></div> <div class="col-md-1"><span class="dist"  name="user' + iCnt + '"   id=sps' + iCnt + ' /> </div><div class="col-md-1"><span class="eta"  name="eta' + iCnt + '"   id=eta' + iCnt + ' /></div> </div>');

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




                $('#tb' + iCnt + '').append($('<option></option>').val(0).html("All POI's"));
                $.each(getlist, function (i, item) {

                    $('#tb' + iCnt + '').append($('<option></option>').val(item.id).html(item.details));
                });

                // $('#tb' + iCnt + '').val(parseInt(txtval) + parseInt($("#NextDueKM").val()));

            }
            else {

                var tbval = iCnt - 1;
                var txtval = $('#tb' + tbval + '').val();
                //  $('#tb' + iCnt + '').val(parseInt(txtval) + parseInt($("#NextDueKM").val()));


                $('#tb' + iCnt + '').append($('<option></option>').val(0).html("All POI's"));
                $.each(getlist, function (i, item) {

                    $('#tb' + iCnt + '').append($('<option></option>').val(item.id).html(item.details));
                });
            }

        }
            // AFTER REACHING THE SPECIFIED LIMIT, DISABLE THE "ADD" BUTTON.
            // (20 IS THE LIMIT WE HAVE SET)
        else {
            $(container).append('<label>Reached the limit</label>');
            $('#btAdd').attr('class', 'bt-disable');
            $('#btAdd').attr('disabled', 'disabled');
        }


        $("select").change(function (e) {

            debugger;
            //var values = '';

            //$('.timecls').each(function () {
            //    divValue = $(document.createElement('div')).css({
            //        padding: '5px', width: '200px'
            //    });
            //    values += this.value + ','
            //});


            var mobs = '';

            $('.mobs').each(function () {
                divValue = $(document.createElement('div')).css({
                    padding: '5px', width: '200px'
                });
                mobs += this.value + ','
            });
            var poilist = '';
            var POIid = '';
            $('#myid select > option:selected').each(function () {
                poilist += $(this).val() + ','


                POIid = $(this).val();
            });


            var getlatlong = apiBase.apiurl + 'CommonApi/Getlatitudelongitude?poi=' + POIid.toString();
            $.post(getlatlong, function (result) {



                markers.push({
                    "Id": iCnt,
                    "title": 'ABC',
                    "lat": result.lat.toString(),
                    "lng": result.longi.toString(),
                    "description": result.Details.toString()
                })


                mapload();
            });



            var requestUrl = apiBase.apiurl + 'CommonApi/GetETAandETD?bbid=' + $("#ddlVehicleList").val().toString() + '&poi=' + poilist.toString() + '&time=' + values;
            $.post(requestUrl, function (result) {

                debugger;
                $('#sps' + iCnt + '').html(result.distance);
                $('#mobs' + iCnt + '').val(result.MobileNo);
            });

        });


    });

    function checkl(name, value) {
        debugger;
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
        debugger;
        if (iCnt != 0) {
            $('#tb' + iCnt).remove();

            //$('#tbs' + iCnt).remove();
            //$('#tbst' + iCnt).remove();
            $('#sps' + iCnt).remove();
            //$('#eta' + iCnt).remove();
            $('#mobs' + iCnt).remove();





            var dynamic = iCnt - 1;

            if (dynamic < 0) {
                dynamic = 0;
            }
            //Remove first occurence
            var index = markers.indexOf(dynamic);

            markers.splice(index, 1);

            iCnt = iCnt - 1;
        }

        if (iCnt == 0) {
            $(container)
                .empty()
                .remove();

            $('#btSubmit').remove();
            $('#btAdd')
                .removeAttr('disabled')
                .attr('class', 'bt');
            markers = [];
        }
        mapload();
    });

    // REMOVE ALL THE ELEMENTS IN THE CONTAINER.
    $('#btRemoveAll').click(function () {
        $(container)
            .empty()
            .remove();

        $('#btSubmit').remove();
        iCnt = 0;
        markers = null;
        $('#btAdd').removeAttr('disabled').attr('class', 'bt');
    });
    //************************
    mapload();
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
function GetPoidetails() {


    deleteTable();

    var url = apiBase.apiurl + "Commonapi/GetassignedRouteDetails";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid }, { "name": "poiid", "value": "" });
        },

        "columns": [
              { "data": "poiid", "visible": false, "orderable": false },
               { "data": "poiname", "orderable": false },
                { "data": "lat", "orderable": false },
                { "data": "longi", "orderable": false },

                   {

                       "render": function (data, type, full, meta) {
                           debugger;

                           return '<textarea class="mobile" type="text" name="mobile" style="margin: 0px 68px 0px 0px; width: 349px; height: 106px;">' + full.mobileno + '</textarea>';
                       }
                   },


                  { "data": "CreatedOn", "orderable": false },
                  {
                      "targets": -1,
                      "data": null,
                      "defaultContent": "<input type='button' id='btnedit' class='button button1' value='Save'> <input type='button' id='btndelete' class='button button2' value='Delete'>"
                  },




        ]


    });

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

$("#btnsumbit").click(function () {
    debugger;
    var requestUrl = apiBase.apiurl + 'CommonApi/savepoidetails?lat=' + $("#lat").val().toString() + '&longi=' + $("#longi").val().toString() + '&POI=' + $("#POIName").val().toString() + '&custid=' + $custid + '&mobile=' + $("#POIMob").val().toString();
    $.post(requestUrl, function (result) {
        if (result > 0) {
            $.ajax({
                url: apiBase.apiurl + 'CommonApi/GetPOI?custid=' + $custid,
                type: "get",
                async: false,
                success: function (data) {

                    getlist = data;

                },
                error: function () {
                    connectionError();
                }
            });

            toastr.success("Record Entered Successfuly");


        }
        else
            toastr.error("Failed!!!")
    });
})


$('#ddpoi').submit(function () {
    debugger;

    var mobs = '';
    $('.mobs').each(function () {
        divValue = $(document.createElement('div')).css({
            padding: '5px', width: '200px'
        });
        mobs += this.value + '-'
    });
    //var values = '';

    //$('.timecls').each(function () {
    //     divValue = $(document.createElement('div')).css({
    //         padding: '5px', width: '200px'
    //     });
    //     values += this.value + ','
    // });

    // var distance = '';

    // $('.dist').each(function () {
    //     divValue = $(document.createElement('div')).css({
    //         padding: '5px', width: '200px'
    //     });
    //     distance += this.innerHTML + ','
    // });

    // var eta = '';

    // $('.eta').each(function () {
    //     divValue = $(document.createElement('div')).css({
    //         padding: '5px', width: '200px'
    //     });
    //     eta += this.innerHTML + ','
    // });

    var ddvalues = '';

    $('#myid select > option:selected').each(function () {

        ddvalues += $(this).val() + ','




    });

    var requestUrl = apiBase.apiurl + 'CommonApi/AddRouteScheduledetails?bbid=' + $("#ddlVehicleList").val().toString() + '&poi=' + ddvalues.toString() + '&mobile=' + mobs + '&routename=' + $("#routename").val() + '&custid=' + $custid;

    //var requestUrl = apiBase.apiurl + 'CommonApi/AddRouteScheduledetails?bbid=' + $("#ddlVehicleList").val().toString() + '&poi=' + ddvalues.toString() + '&time=' + values + '&mobile=' + mobs + '&distance=' + distance + '&eta=' + eta + '&routename=' + $("#routename").val();
    $.post(requestUrl, function (result) {
        if (result > 0) {
            toastr.success("Record Entered Successfuly");
            GetPoidetails();
            $(container)
          .empty()
          .remove();

            $('#btSubmit').remove();
            iCnt = 0;

            $('#btAdd')
                .removeAttr('disabled')
                .attr('class', 'bt');
        }
        else
            toastr.error("Failed!!!")
    });
});


function mapload() {
    var mapOptions = {
        center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
    var infoWindow = new google.maps.InfoWindow();
    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();
    for (i = 0; i < markers.length; i++) {
        var data = markers[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        lat_lng.push(myLatlng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title
        });
        latlngbounds.extend(marker.position);


        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(data.description);
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);

    //***********ROUTING****************//

    //Initialize the Path Array
    var path = new google.maps.MVCArray();

    //Initialize the Direction Service
    var service = new google.maps.DirectionsService();

    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

    //Loop and Draw Path Route between the Points on Map
    for (var i = 0; i < lat_lng.length; i++) {
        if ((i + 1) < lat_lng.length) {
            var src = lat_lng[i];
            var des = lat_lng[i + 1];
            //  path.push(src);
            //   poly.setPath(path);

            service.route({
                origin: src,
                destination: des,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (result, status) {

                if (status == google.maps.DirectionsStatus.OK) {
                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                        path.push(result.routes[0].overview_path[i]);
                        poly.setPath(path);
                    }
                }
            });
        }
    }
}

