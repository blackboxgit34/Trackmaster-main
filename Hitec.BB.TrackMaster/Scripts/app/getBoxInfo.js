﻿$(document).ready(function () {
    GetVehInfo();
    $('#dtGetVehInfo tbody').on('click', '.btn-submit', function (e) {

        debugger
        var vehName = String($(this).closest('tr').find('.vehName').val());
        var driverName = String($(this).closest('tr').find('.driverName').val());
        var driverMobileNumber = String($(this).closest('tr').find('.driverMobNum').val());
        var vehOrder = String($(this).closest('tr').find('.vehOrder').val());
        var mobNumForAlert = String($(this).closest('tr').find('.mobNumForAlert').val());
        var driverLicenseNo = String($(this).closest('tr').find('.driverLicenseNo').val());

        var bbid = this.id;
        var status = String($(this).closest('tr').find('#statusList_' + bbid).val());
        var Type = String($(this).closest('tr').find('#TypeList_' + bbid).val());
        var Transport = $(this).closest('tr').find('#TransportList_' + bbid + ' option:selected').text();
        var group = $(this).closest('tr').find('#GroupList_' + bbid + ' option:selected').text();
       
        var odctype = $(this).closest('tr').find('#odcList_' + bbid + ' option:selected').text();

        var custid = $custid;

        alertify.confirm(" Do you want to proceed?", function (e) {
            if (e) {
                ajaxResp(vehName, driverName, driverMobileNumber, vehOrder, mobNumForAlert, bbid, status, custid, driverLicenseNo, Type, Transport, group, odctype)
                return true;
            } else {
                alertify.error("You've clicked Cancel");
                return false;
            }
        });

        console.log('suggested-in-comment', 'click');
    });

    $('#dtGetVehInfo tbody').on('click', '.btn-update', function (e) {



        var data = table.row($(this).parents('tr')).data();

       

        var bbid = this.id;

        alertify.confirm(" Do you want to proceed?", function (e) {
            if (e) {
                $.ajax({
                    dataType: "json",
                    type: "GET",
                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                    url: apiBase.apiurl + "AdminAPI/otacommand",
                    data: { bbid: bbid, latestversion: data.latestversion },
                    success: function (data) {
                        toastr.success('successfully Done!');
                    },
                    error: function (error) {
                        toastr.warning('Something went wrong!');

                    }
                });
                return true;
            } else {
                alertify.error("You've clicked Cancel");
                return false;
            }
        });

        console.log('suggested-in-comment', 'click');
    });

    $('#dtGetVehInfo tbody').on('click', '.btn-view', function (e) {



        var bbid = this.id;
            //$.ajax()
        $.get("../../User/_getBoxDetail", function (data) {
                $('#modalInnerContain').html(data);
                $('#modalOuterDiv').modal('show');

                    $.ajax({
                        url: apiBase.apiurl + '/UserAPI/GetBoxDetail?bbid=' + bbid,
                        type: "get",
                        async: false,
                        success: function (data) {
                            $("#lblSerialNumber").text(data.SerialNo);
                            $("#lblAliasNumber").text(data.aliasno);
                            $("#lblSimNumber").text(data.simno);

                            $("#lblVehicleName").text(data.VehicleName);
                            $("#lblVehicleRegistrationNubmer").text(data.VehicleRegNo);
                            $("#lblLocation").text(data.Location);
                            $("#lblLastDate").text(data.LastDate);
                            $("#lblMobileNumberForAlerts").text(data.MobileNo);
                            $("#lblInstallationDate").text(data.InstallationDate);
                            $("#lblBoxType").text(data.box);
                            $("#lblActivationStatus").text(data.activate);
                            $("#lblDriverName").text(data.DriverName);
                            $("#lblSpeed").text(data.Speed);
                            $("#lblOverStopMinutes").text(data.OverstopMin);
                            $("#lblOverSpeed").text(data.Overspeed);
                            $("#lblCurrentIgnitionStatus").text(data.currignitionStatus);
                            $("#lblLocationSMS").text(data.smsVehInfo);
                            $("#lblOnDemandLocationSMS").text(data.smsVehInfo);
                            $("#lblMainsDisconnectionSMS").text(data.smsMainsDisconnect);
                            $("#lblGeofencing").text(data.fenced);
                            $("#lblTwoWayVoiceCommunication").text(data.voiceStatus);
                            $("#lblImmobilization").text(data.imobactive);

                            $("#lblGPSAntennaConnectionStatus").text(data.gpsAntConStatus);
                            $("#lblBoxBatteryLevel").text(data.BoxBatteryLevel);
                            $("#lblGSMSignal").text(data.GSmSignal);
                            $("#lblVehicleBatteryVoltage").text(data.VehicleBattery);
                            $("#lblLatitude").text(data.Latitude);
                            $("#lblLongitude").text(data.Longitude);

                            $("#heading").text(data.VehicleName);

                            
                            },
                        error: function () {
                            connectionError();
                        }
                    });
                




            });
   



        //var vehName = String($(this).closest('tr').find('.vehName').val());
        //var driverName = String($(this).closest('tr').find('.driverName').val());
        //var driverMobileNumber = String($(this).closest('tr').find('.driverMobNum').val());
        //var vehOrder = String($(this).closest('tr').find('.vehOrder').val());
        //var mobNumForAlert = String($(this).closest('tr').find('.mobNumForAlert').val());
        //var driverLicenseNo = String($(this).closest('tr').find('.driverLicenseNo').val());

        //var bbid = this.id;
        //var status = String($(this).closest('tr').find('#statusList_' + bbid).val());
        //var custid = $custid;

        //alertify.confirm(" Do you want to proceed?", function (e) {
        //    if (e) {
        //        ajaxResp(vehName, driverName, driverMobileNumber, vehOrder, mobNumForAlert, bbid, status, custid, driverLicenseNo)
        //        return true;
        //    } else {
        //        alertify.error("You've clicked Cancel");
        //        return false;
        //    }
        //});

        console.log('suggested-in-comment', 'click');
    });

    //common for both  sms and notification
    var ajaxResp = function (vehName, driverName, driverMobileNumber, vehOrder, mobNumForAlert, bbid, status, custid, driverLicenseNo, Type, Transport, group, odctype) {
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "AdminAPI/UpdateBoxInfo",
            data: { vehName: vehName, driverName: driverName, driverMobileNumber: driverMobileNumber, vehOrder: vehOrder, mobNumForAlert: mobNumForAlert, bbid: bbid, status: status, custid: custid, driverLicenseNo: driverLicenseNo, Type: Type, Transport: Transport, group: group, odctype: odctype },
            success: function (data) {
                toastr.success('successfully Done!');
            },
            error: function (error) {
                toastr.warning('Something went wrong!');

            }
        });
    };

});
    function GetVehInfo() {
        // clear tables contents
        deleteTable();

        var url = apiBase.apiurl + "AdminAPI/GetBoxInfo";

        table = $('#dtGetVehInfo').DataTable({
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
                param.push({ "name": "custId", "value": $custid });
            },

            "columns": [


                    {

                        "data": null,
                        "width": "15%",
                        "orderable": false, "targets": 0,
                        "render": function (data, type, full, meta) {
                            return '<input type="text" value="' + full.VehicleName + '" class="form-control vehName" />  <b>' + full.BBID + '</b>';
                        }
                    },
                     //{
                     //    "data": "BBID",
                     //    "class": "bbid",
                     //    "orderable": false, "targets": 0
                     //},

                     {

                         "data": null,
                         "width": "15%",
                         "orderable": false, "targets": 0,
                         "render": function (data, type, full, meta) {
                             setTimeout(
                             function () {
                                 var list = full.listodc;
                                 if (list.length > 0) {

                                     $("#odcList_" + full.BBID + " option").remove();
                                     $('#odcList_' + full.BBID).append('<option selected="selected" disabled="disabled" >Choose Status</option>');

                                     $.each(list, function (j, item) {

                                         if (item.Name.trim() == full.odcname.trim()) {
                                             $('#odcList_' + full.BBID).append('<option selected="selected"  value="' + item.Id + '"  >' + item.Name + '</option>');
                                         }
                                         else {
                                             $('#odcList_' + full.BBID).append('<option  value="' + item.Id + '"  >' + item.Name + ' </option>');
                                         }


                                     });
                                 }



                             }, 1);

                             return '<span>   <select  class="form-control" id="odcList_' + full.BBID + '"></select></span>';
                         }
                     },
                         {

                             "data": null,
                             "width": "11%",
                             "orderable": false, "targets": 0,
                             "render": function (data, type, full, meta) {
                                 setTimeout(
                                 function () {
                                     var list = full.VehicleTypeList;
                                     if (list.length > 0) {

                                         $("#TypeList_" + full.BBID + " option").remove();
                                         $('#TypeList_' + full.BBID).append('<option selected="selected" disabled="disabled" >Choose Status</option>');

                                         $.each(list, function (j, item) {
                                             
                                             if (item.Id == full.TypeId) {
                                               var  Vn = item.icon.replace("~/", "/");
                                               $('#TypeList_' + full.BBID).append('<option selected="selected"  value="' + item.Id + '"  >' + item.Name + '</option>');
                                             }
                                             else {
                                                 var Fn = item.icon.replace("~/", "/");
                                                 $('#TypeList_' + full.BBID).append('<option  value="' + item.Id + '"  >' + item.Name + ' </option>');
                                             }
                                           

                                         });
                                     }
                                 }, 1);

                                 return '<span>   <select class="form-control" id="TypeList_' + full.BBID + '"></select></span>';
                             }
                         },

                              {

                                  "data": null,
                                  "width": "14%",
                                  "orderable": false, "targets": 0,
                                  "render": function (data, type, full, meta) {
                                      setTimeout(
                                      function () {
                                          
                                          var list = full.transportlist;
                                          if (list.length > 0) {

                                              $("#TransportList_" + full.BBID + " option").remove();
                                              $('#TransportList_' + full.BBID).append('<option selected="selected" disabled="disabled" >Choose Transport Name</option>');

                                              $.each(list, function (j, item) {
                                                  
                                                  if (item.Name.trim() == full.TransportName.trim()) {
                                                  
                                                      $('#TransportList_' + full.BBID).append('<option selected="selected"  value="' + item.Id + '"  >' + item.Name + '</option>');
                                                  }
                                                  else {
                                                   
                                                      $('#TransportList_' + full.BBID).append('<option  value="' + item.Id + '"  >' + item.Name + ' </option>');
                                                  }


                                              });
                                          }
                                      }, 1);

                                      return '<span>   <select class="form-control" id="TransportList_' + full.BBID + '"></select></span>';
                                  }
                              },
                               {

                                   "data": null,
                                   "width": "11%",
                                   "orderable": false, "targets": 0,
                                   "render": function (data, type, full, meta) {
                                       setTimeout(
                                       function () {
                                           var list = full.grouplist;
                                           if (list.length > 0) {

                                               $("#GroupList_" + full.BBID + " option").remove();
                                               $('#GroupList_' + full.BBID).append('<option selected="selected"  disabled="disabled">Choose Group</option>');

                                               $.each(list, function (j, item) {

                                                   if (item.Name.trim() == full.GroupName.trim()) {
                                                    
                                                       $('#GroupList_' + full.BBID).append('<option selected="selected"  value="' + item.Id + '"  >' + item.Name + '</option>');
                                                   }
                                                   else {
                                                      
                                                       $('#GroupList_' + full.BBID).append('<option  value="' + item.Id + '"  >' + item.Name + ' </option>');
                                                   }


                                               });
                                           }
                                       }, 1);

                                       return '<span>   <select class="form-control" id="GroupList_' + full.BBID + '"></select></span>';
                                   }
                               },

                      //{
                      //    "data": "VehicleRegNo",
                      //    "class": "VehicleRegNo",
                      //    "orderable": false, "targets": 0
                      //},
                      //   {

                      //       "data": null,
                      //       "orderable": false, "targets": 0,
                      //       "render": function (data, type, full, meta) {
                      //           return '<span> <input type="text" value=' + full.DriverName + ' class="form-control driverName" /></span>';
                      //       }
                      //   },
                      //    {

                      //        "data": null,
                      //        "orderable": false, "targets": 0,
                      //        "render": function (data, type, full, meta) {
                      //            return '<span><input type="text" value=' + full.DriverMobnumber + ' class="form-control driverMobNum" /></span>';
                      //        }
                      //    },
                    
                         //   {

                         //       "data": null,
                         //       "orderable": false, "targets": 0,
                         //       "render": function (data, type, full, meta) {
                         //           return '<span><input type="text" value=' + full.DriverLicenseNO + ' class="form-control driverLicenseNo" /></span>';
                         //       }
                         //   },

                      
                          {

                              "data": null,
                              "orderable": false, "targets": 0,
                              "width": "2%",
                              "render": function (data, type, full, meta) {
                                  return '<span> <input type="text" value=' + full.VehOrder + ' class="form-control vehOrder" /></span>';
                              }
                          },
                             {

                                 "data": null,
                                 "width": "10%",
                                 "orderable": false, "targets": 0,
                                 "render": function (data, type, full, meta) {
                                     return '<span> <input type="text" value=' + full.MobNumForAlert + ' class="form-control mobNumForAlert" /></span>';
                                 }
                             },
                        {
                            "data": "InstallationDate",
                            "width": "10%",
                            "render": function (data) {
                                if (data != null && data != "") {
                                    return moment(data).format("MMM D YYYY");
                                }
                                else
                                    return data;
                            }
                        },
                       {

                           "data": null,
                           "width": "10%",
                           "orderable": false, "targets": 0,
                           "render": function (data, type, full, meta) {
                          setTimeout(
                          function () {
                              var list = full.VehicleStatusList;
                              if (list.length > 0) {

                                  $("#statusList_" + full.BBID + " option").remove();

                                  $('#statusList_' + full.BBID).append($('<option selected="selected" disabled="disabled">Choose Status</option>'));

                                  $.each(list, function (j, item) {
                                      if (item.Value == full.VehicleStatus) {
                                          $('#statusList_' + full.BBID).append($('<option selected="selected"></option>').val(item.Value).html(item.Text));
                                      }
                                      else {
                                          $('#statusList_' + full.BBID).append($('<option></option>').val(item.Value).html(item.Text));
                                      }
                                      //   $('#' + i).append($(selected).val(item.TimingId).html(item.Timing));

                                  });
                              }
                          },1);
                          
                               return '<span>   <select class="form-control" id="statusList_'+full.BBID+'"></select></span>';
                           }
                       },
                       //{
                       //    "data": "currentstring",
                       //    "class": "currentstring",
                       //    "orderable": false, "targets": 0
                       //},
                       //{
                       //    "data": "latestversion",
                       //    "class": "latestversion",
                       //    "orderable": false, "targets": 0
                       //},

                       {

                           "data": null,
                           "orderable": false, "targets": 0,
                           "render": function (data, type, full, meta) {
                               return '<b> ' + full.currentstring + '</b><br> <b> ' + full.latestversion + '</b> ';
                           }
                       },
                      {
                          "data": null,
                          "orderable": false, "targets": 0,
                          "render": function (data, type, full, meta) {

                              if (full.enable == "1")
                              {
                                  return '<span><button class="btn btn-green btn-submit btn-small" type="button"  id="' + full.BBID + '">Submit</button>' +
                                                                     '<button class="btn btn-green btn-small btn-view" type="button"  id="' + full.BBID + '">View Detail</button>' +
                                                                  '<button class="btn btn-green btn-small btn-update" type="button"  id="' + full.BBID + '">Update Version</button></span>';
                              }
                              else
                              {

                                  return '<span><button class="btn btn-green btn-submit btn-small" type="button"  id="' + full.BBID + '">Submit</button>' +
                                                                    '<button class="btn btn-green btn-small btn-view" type="button"  id="' + full.BBID + '">View Detail</button></span>';

                              }
                            
                          }
                      },
            ],
            "rowCallback": function (row, data, index) {
                if (data.objRefTemperature == 0) {
                    var target = $(row).find(".details-control");
                    var index = (target).index();
                    $(row).find('td:eq(' + index + ')').removeClass('details-control')
                }
            }


        });


        table.on('draw', function () {

            $("button").attr('disabled', 'disabled');

            if (F == 1) {
                $("button").removeAttr('disabled');
            }
        });

        


          };