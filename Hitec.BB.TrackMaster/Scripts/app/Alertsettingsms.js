var table;
var poilist;
var timelist;
var inputval;



function getpoilist() {
   

   
    $.ajax({
        url: apiBase.apiurl + 'CommonApi/GetPOI?custid=' + $custid,
        type: "get",
        async: false,
        success: function (data) {
            poilist = data;
       

        },
        error: function () {
            connectionError();
        }
    });
}


function gettimelist() {



    $.ajax({
        url: apiBase.apiurl + 'CommonApi/GetTimelist',
        type: "get",
        async: false,
        success: function (data) {
            timelist = data;


        },
        error: function () {
            connectionError();
        }
    });
}

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
 
};

$(document).ready(function () {
    gettimelist();
    getpoilist();
    GetPoidetails();

  $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
      debugger;
      var tr = $(this).closest('tr');
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
          $(".childclass").select2({
              placeholder: "Select an Option",
              dropdownCssClass: 'bigdrop'
          });
      }
  });


  $('#dt_basic_Master').on('click', 'input[type="button"]', function () {

      debugger;
    

      //var mobileno = $(this).closest('tr').find('.mobile').val();
      var data = table.row($(this).parents('tr')).data();
      
    
      var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));


      var weekdayscheck = [];
      var stringweekday = "";
       table.row($(this).closest('tr').find('.alert').each(function () {
         

           var Val = (this.checked ? $(this).val() : "");
           var name = (this.checked ? $(this).attr('name') : "");
           var data = {};
           var status = Val;
           var dayname = name;
         
           if (status == "on")
           {
               data.status = 1;
               stringweekday += "1" + ',';
           }
           else
           {
               data.status = 0;
               stringweekday += "0" + ',';
           }
         
           data.dayname = dayname;
       

           weekdayscheck.push(data);
         
      }));

      var Shift1Start = $(this).closest('tr').find('.start1 option:selected').val();
      var Shift1end = $(this).closest('tr').find('.end1 option:selected').val();
      var Shift2Start = $(this).closest('tr').find('.start2 option:selected').val();
      var Shift2end = $(this).closest('tr').find('.end2 option:selected').val();

      var postData = { values: weekdayscheck };

      var shift1 = Shift1Start + ',' + Shift1end;

      var shift2 = Shift2Start + ',' + Shift2end;

      var PL = bbidArray.selector.rows;
      if (PL == null) {
          PL = "";
      }
      if ($(this).attr('id') == "btnedit") {

          debugger;
          alertify.confirm("Before submit make sure you have added all the  records in the required Fields . Do you want to proceed?", function (ex) {
              if (ex) {
                  $.ajax({
                      dataType: "json",
                      type: "GET",
                      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                      url: apiBase.apiurl + "AdminAPI/Savealertsettings",
                      data: { bbidList: PL.toString(), routeId: data.RouteId, custId: $custid, mobile: null, shiftone: shift1, shifttwo: shift2, listtime: stringweekday },
                      //
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
                      url: apiBase.apiurl + 'AdminAPI/DeleteRoute?Id=' + data.RouteId,
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

      else if ($(this).attr('id') == "btnadvancesetting") {

          var data = table.row($(this).parents('tr')).data();
          var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

          var PL = bbidArray.selector.rows;



          $("#RouteDialog").dialog({
              autoOpen: true,
              position: { my: "center", at: "200", of: window },
              width: 900,
              height: 550,
              resizable: true,
              title: 'Advanced Timings Of Route',
              modal: true,
              open: function () {

                  var url = "../fms/GetAdvancedRouteDetails?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                  $(this).load(url);
                  $(".ui-dialog-titlebar-close").hide();
              },
              buttons: {
                  Close: function () {

                      $(this).dialog("close");
                  }
              }
          });


      }
      
      else if ($(this).attr('id') == "btntiming") {

          var data = table.row($(this).parents('tr')).data();
          var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));


        
          var PL = bbidArray.selector.rows;



          $("#RoueTimingDialog").dialog({
              autoOpen: true,
              position: { my: "center", at: "200", of: window },
              width: 900,
              height: 550,
              resizable: true,
              title: 'Schedule Timings Of Route',
              modal: true,
              open: function () {

                  var url = "../fms/GetRoutetimePartialView?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                  $(this).load(url);
                  $(".ui-dialog-titlebar-close").hide();
              },
              buttons: {
                  Close: function () {

                      $(this).dialog("close");
                  }
              }
          });

      }
      
      else if ($(this).attr('id') == "btnDriver") {

          var data = table.row($(this).parents('tr')).data();
          var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

          var PL = bbidArray.selector.rows;




          $("#DriverDialog").dialog({
              autoOpen: true,
              position: { my: "center", at: "200", of: window },
              width: 900,
              height: 550,
              resizable: true,
              title: 'Assign Driver',
              modal: true,
              open: function () {



                  var url = "../fms/GetDriverPartialView?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                  $(this).load(url);
                  $(".ui-dialog-titlebar-close").hide();
              },
              buttons: {
                  Close: function () {

                      $(this).dialog("close");
                  }
              }
          });

      }
      else if ($(this).attr('id') == "btnConductor") {

          var data = table.row($(this).parents('tr')).data();
          var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

          var PL = bbidArray.selector.rows;




          $("#ConductorDialog").dialog({
              autoOpen: true,
              position: { my: "center", at: "200", of: window },
              width: 900,
              height: 550,
              resizable: true,
              title: 'Assign Conductor and ETM with Vehicle',
              modal: true,
              open: function () {



                  var url = "../fms/GetConductorPartialView?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                  $(this).load(url);
                  $(".ui-dialog-titlebar-close").hide();
              },
              buttons: {
                  Close: function () {

                      $(this).dialog("close");
                  }
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
    

  

  $("#tbChild tbody").on("click", 'input[type="button"]', function (e) {
      debugger;

     
      var $row = $(this).closest("tr");

      if (this.checked) {
          $row.addClass("active");
      } else {
          $row.removeClass("active");
      }

      // Prevent click event from propagating to parent
      e.stopPropagation();
  });
});



$('.btnDelete').click(function () {
    alert("check");
});
function Deletepoi(id) {
 
    if (confirm("Do you really want to delete this poi?")) {

        $.ajax({

            url: apiBase.apiurl + "Commonapi/deletepoi",
            type: "GET",
            data: { id: id },


            //contentType: 'application/json',

            success: function (data) {
             
                if (data == "1") {
                    GetPoidetails();

                }
            }

        });
    }
    return false;

}


function GetPoidetails() {

  
    deleteTable();
  
    var url = apiBase.apiurl + "AdminAPI/Getalertsettinsmsgpage";
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
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid },{ "name": "type", "value": "1" });
        },

        "columns": [
             
                   { "data": "StartDate", "orderable": false },
                   { "data": "RouteName", "orderable": false },
                   { "date": "RouteId", "visible": false, "orderable": false },
                   {
                
                "render": function (data, type, full, meta) {
                  
                   
                  
                
                    var list = full.ListVehicles;
                    var selectnew = $("<select class='js-example-basic-multiple'  multiple='multiple'></select>");
                    if (list.length > 0) {
                        $.each(list, function (j, item) {
                          
                            if (item.Selected) {

                                selectnew.append($('<option selected="selected" ></option>').val(item.Value).html(item.Text));
                            }

                            else {
                                selectnew.append($('<option></option>').val(item.Value).html(item.Text));
                            }
                        });
                    }
                 
                
                    return selectnew.prop("outerHTML");

                    }
             
                   },
                     {
                        
                         //"render": function (data, type, full, meta) {
                            

                         //    return '<textarea class="mobile" type="text" name="mobile" style="margin: 0px 68px 0px 0px; width: 349px; height: 136px;">' + full.mobile + '</textarea>';

                         //}



                           "targets": -1,
                          "data": null,
                          "defaultContent": "<a href='/common/ScheduleInterface'> <ul>Manage Mobile No on POI</ul></a>  "
                     },

                       {

                           "render": function (data, type, full, meta) {


                               return '<textarea class="mobile" type="text" name="mobile" style="margin: 0px 68px 0px 0px; width: 349px; height: 136px;">' + full.MoreLocations + '</textarea>';

                           }



                         
                       },
                     
                   {
                      
                       "render": function (data, type, full, meta) {
                           debugger;

                           if (full.ShiftOne == null)
                           {
                               full.ShiftOne = "1,1";

                           }
                           if (full.Shifttwo == null) {
                               full.Shifttwo = "1,1";

                           }
                         
                           var fields = full.ShiftOne.split(',');

                           var start1 = fields[0];
                           var end1 = fields[1];

                           var fields1 = full.Shifttwo.split(',');

                           var start2 = fields1[0];
                           var end2 = fields1[1];

                           var selectalerttime = $("<select class='start1' name='trange1_start1'></select>");
                           if (timelist.length > 0) {
                               $.each(timelist, function (j, item) {
                                   debugger;
                                   if (item.id == parseInt(start1)) {

                                       selectalerttime.append($('<option selected="selected" ></option>').val(item.id).html(item.time));
                                   }

                                   else {
                                       selectalerttime.append($('<option></option>').val(item.id).html(item.time));
                                   }
                               });
                           }

                           var start2time = $("<select class='start2' name='trange2_start1'></select>");
                           if (timelist.length > 0) {
                               $.each(timelist, function (j, item) {
                                   debugger;
                                   if (item.id == parseInt(start2)) {

                                       start2time.append($('<option selected="selected" ></option>').val(item.id).html(item.time));
                                   }

                                   else {
                                       start2time.append($('<option></option>').val(item.id).html(item.time));
                                   }
                               });
                           }

                           var endtime = $("<select class='end1' name='trange1_end1'></select>");
                           if (timelist.length > 0) {
                               $.each(timelist, function (j, item) {
                                   debugger;
                                   if (item.id == parseInt(end1)) {

                                       endtime.append($('<option selected="selected" ></option>').val(item.id).html(item.time));
                                   }

                                   else {
                                       endtime.append($('<option></option>').val(item.id).html(item.time));
                                   }
                               });
                           }
                           var end2time = $("<select class='end2' name='trange2_end1'></select>");
                           if (timelist.length > 0) {
                               $.each(timelist, function (j, item) {
                                   debugger;
                                   if (item.id == parseInt(end2)) {

                                       end2time.append($('<option selected="selected" ></option>').val(item.id).html(item.time));
                                   }

                                   else {
                                       end2time.append($('<option></option>').val(item.id).html(item.time));
                                   }
                               });
                           }

                           var mon = "unchecked"; var tues = "unchecked"; var wed = "unchecked"; var thru = "unchecked"; var fri = "unchecked"; var sat = "unchecked"; var Sun = "unchecked";

                           if (full.alertdays !=null)
                           {
                               var daysalert = full.alertdays.split(',');

                               var alertday = daysalert[0];

                               if (parseInt(alertday) == 1) {
                                   mon = "checked";
                               }

                               var alertday = daysalert[1];

                               if (parseInt(alertday) == 1) {
                                   tues = "checked";
                               }
                               var alertday = daysalert[2];

                               if (parseInt(alertday) == 1) {
                                   wed = "checked";
                               }
                               var alertday = daysalert[3];

                               if (parseInt(alertday) == 1) {
                                   thru = "checked";
                               }
                               var alertday = daysalert[4];

                               if (parseInt(alertday) == 1) {
                                   fri = "checked";
                               }
                               var alertday = daysalert[5];

                               if (parseInt(alertday) == 1) {
                                   sat = "checked";
                               }
                               var alertday = daysalert[6];

                               if (parseInt(alertday) == 1) {
                                   Sun = "checked";
                               }
                           }
                 

                           var weekdayscheckbox = '<input type="checkbox" name="mon" class="alert" ' + mon + '> Mon <input type="checkbox" name="tue"  class="alert" ' + tues + '> Tue <input type="checkbox" name="wed" class="alert" ' + wed + '> Wed </br><input type="checkbox" name="thu"  class="alert" ' + thru+ '> Thu <input type="checkbox" name="fri"  class="alert" ' + fri + '> Fri <input type="checkbox" name="sat"  class="alert" ' + sat + '> Sat <input type="checkbox" name="sun"  class="alert" ' + Sun + '> Sun ';
                     

                           return ' <small> Choose your alert days</small><br> ' + weekdayscheckbox + '  ' +
                                    
                                      '<br><br><div class="thumbnail"><div class="form-group">Shift 1 <br>&nbsp;<span>Start </span> ' + selectalerttime.prop("outerHTML") + '<br>' +
                                 ' End ' + endtime.prop("outerHTML") + '' +
                               '</div></div>	 <div class="thumbnail"><div class="form-group">Shift 2 <br>&nbsp;<span> Start </span> ' + start2time.prop("outerHTML") + '' +
                             ' End ' + end2time.prop("outerHTML") + '' +
                              '</div></div>';
                       }

                   },
                   // {


                   //     "targets": -1,
                   //     "data": null,
                   //     "defaultContent": "<input type='button' id='btnDriver' class='button button1' value='Assign Driver'>"
                   // },
                   //  {


                   //      "targets": -1,
                   //      "data": null,
                   //      "defaultContent": "<input type='button' id='btnConductor' class='button button1' value='Assign Conductor'>"
                   //  },
                   //{
                       

                   //     "targets": -1,
                   //     "data": null,
                   //     "defaultContent": "<input type='button' id='btntiming' class='button button1' value='Departure Setting'>"
                   //},
                   // {
                   //     "targets": -1,
                   //     "data": null,
                   //     "defaultContent": "<input type='button' id='btnadvancesetting' class='button button3' value='Assign Bus'>"
                   // },
                  {
                          "targets": -1,
                          "data": null,
                          "defaultContent": "<input type='button' id='btnedit' class='button button1' value='Save'> <input type='button' id='btndelete' class='button button2' value='Delete'>"
                  },
                      //{
                      //    "className": 'details-control',
                      //    "orderable": false,
                      //    "data": null,
                      //    "defaultContent": ''
                      //},

                  
               
        ]


    });



    
}