var table;
$(document).ready(function () {

   


    GetVehiclesInfo(null, null);


    //$('menuddl').on('change', function (e) {
    //    console.log($(this));
    //});

    //$('menuddlT005').change(function () {
    //    alert();
    //    // set the window's location property to the value of the option the user has selected
    //    window.location = $(this).val();
    //});


    $('#dt_basic_Master tbody').on('click', '.btn-submit', function (e)
    {

       
        debugger;
        var vehName = String($(this).closest('tr').find('.vehName').val());
        var vehicleid = String($(this).closest('tr').find('.vehid').val());

        var bbid = this.id;
        var driver = String($(this).closest('tr').find('#driverList_' + bbid).val());
        var Conducctor = String($(this).closest('tr').find('#ConductorList_' + bbid).val());
        var ETM = String($(this).closest('tr').find('#ETMList_' + bbid).val());

        var custid = $custid;

        alertify.confirm(" Do you want to proceed?", function (e) {
            if (e) {
                ajaxResp(vehicleid, bbid, status, custid, driver, Conducctor, ETM)
                return true;
            } else {
                alertify.error("You've clicked Cancel");
                return false;
            }
        });

        console.log('suggested-in-comment', 'click');
    });



  

    var ajaxResp = function (vehicleid, bbid, status, custid, driver, Conducctor, ETM) {
       

        var url = apiBase.apiurl + 'FmsAPI/GetUpdateConductorName';
        $.get(url, { DriverId:driver,Conducctorid: Conducctor, bbid: bbid, custid: custid, VehicleId: vehicleid, EtmNumber: ETM,begindate:$beginDate,enddate:$endDate}, function (result) {
            if (result > 0) {
                if (result == 1)
                {
                    toastr.success("Data  updated successfully")
                }

                
            }
            else
                toastr.success("Data updated successfully.")
        });

      
        //var url = apiBase.apiurl + 'FmsAPI/GetUpdateDriverName';
        //$.get(url, { DriverId: driver, bbid: bbid, custid: custid, VehicleId: vehicleid, begindate: $beginDate, enddate: $endDate }, function (result) {
        //    if (result > 0) {
        //        if (result == 1) {
        //            toastr.success("Driver name updated successfully")
        //        }

               
        //    }
        //    else
        //        toastr.success("Driver name updated successfully")
        //});
    };

    $('.js-example-basic-single').select2();


  
});

//$(document).on('click', '.top-info-square', function (e) {
//    e.preventDefault();
//    var vehicleStatus = $(this)[0].id;
//    console.log('val: ' + vehicleStatus);
//    GetVehiclesInfo(null, vehicleStatus);



   
//});



$("#BtnSearch").click(function () {
    GetVehiclesInfo(null, null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsAPI/GetVehicleInfo";
    DownloadData(url, downloadType, null);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetVehicleInfo";
    DownloadData(url, downloadType, null);
});

function GetVehiclesInfo(downloadType, vehicleStatus) {

    // clear tables contents
    deleteTable();

    //var vehicleStatus = $("#vehicleStatus").val();

    var url = baseUrl + "FmsAPI/GetVehicleInfo";
    var vehicleId = 0;
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
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "vehicleId", "value": vehicleId }, { "name": "vehicleStatus", "value": vehicleStatus }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "BBID",
                    "class": "hidden",
                    "bSortable": false
                },
                {
                    "data": null,
                    "class": "hidden",
                    "render": function (data, type, full, meta) {
                        return '<span> <input type="text" value="' + full.VehicleId + '" class="form-control vehid" /></span>';
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        var VehicleImagePath = full['VehicleImagePath'];
                        var VehicleImagePath = VehicleImagePath.split(',')[0];
                        VehicleImagePath = VehicleImagePath.replace("~/", "/");
                        var imgTag = '<img src="' + VehicleImagePath + '" height=40px width=40px/>';
                        return imgTag;
                    }
                },
                {
                    "data": "startdate",
                    "bSortable": false
                },
                {

                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full, meta) {

                        return '<div class="daterange" class="pull-right" style="background:#fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%"> <i class="fa fa-calendar"></i>  &nbsp;<span></span><b class="caret"></b>  </div>';


                        
                    }

                },
                {


                        "data": null,
                         "orderable": false, "targets": 0,
                         "render": function (data, type, full, meta) {
                             return '<span> <input type="text" value="' + full.VehicleName + '" class="form-control vehName" /></span>';
                         }
                     

                   
                },
                 //{
                 //    "data": "driverName",
                 //    "bSortable": false

                 //},
                 {
                     

                             "data": null,
                         "width": "15%",
                         "orderable": false, "targets": 0,
                         "render": function (data, type, full, meta) {
                             setTimeout(
                             function () {
                                 debugger;
                                 var list = full.ListDriver;
                                 if (list.length > 0) {
                                     debugger;
                                     $('#driverList_' + full.BBID).append('<option  selected="selected" disabled="disabled" >Choose Driver</option>');

                                     $.each(list, function (j, item) {
                                             
                                         if (item.ID == full.Driverid) {
                                            
                                             $('#driverList_' + full.BBID).append('<option selected="selected"  value="' + item.ID + '"  >' + item.Name + '</option>');
                                         }
                                         else {
                                           
                                             $('#driverList_' + full.BBID).append('<option  value="' + item.ID + '"  >' + item.Name + ' </option>');
                                         }
                                           

                                     });

                                 }
                             }, 1);

                             return '<span>   <select class="form-control js-example-basic-single" id="driverList_' + full.BBID + '"></select></span>';
                         }
                     

                 },
                  {


                      "data": null,
                      "width": "15%",
                      "orderable": false, "targets": 0,
                      "render": function (data, type, full, meta) {
                          setTimeout(
                          function () {
                              var list = full.ListConductor;
                              if (list.length > 0) {
                                  $('#ConductorList_' + full.BBID).append('<option  selected="selected" disabled="disabled" >Choose Conductor</option>');

                                  $.each(list, function (j, item) {

                                      if (item.ID == full.conductorid) {
                                         
                                          $('#ConductorList_' + full.BBID).append('<option selected="selected"  value="' + item.ID + '"  >' + item.Name + '</option>');
                                      }
                                      else {
                                          
                                          $('#ConductorList_' + full.BBID).append('<option  value="' + item.ID + '"  >' + item.Name + ' </option>');
                                      }


                                  });
                                
                              }
                          }, 1);

                          return '<span>   <select class="form-control js-example-basic-single" id="ConductorList_' + full.BBID + '"></select></span>';
                      }


                  },
                   {


                       "data": null,
                       "width": "15%",
                       "orderable": false, "targets": 0,
                       "render": function (data, type, full, meta) {
                           setTimeout(
                           function () {
                               var list = full.ListETM;
                               if (list.length > 0) {
                                   $('#ETMList_' + full.BBID).append('<option class="js-example-basic-multiple" selected="selected" disabled="disabled" >Choose ETM</option>');

                                   $.each(list, function (j, item) {

                                       if (item.Id == full.ETMno) {
                                          
                                           $('#ETMList_' + full.BBID).append('<option selected="selected"  value="' + item.Id + '"  >' + item.ETM + '</option>');
                                       }
                                       else {
                                         
                                           $('#ETMList_' + full.BBID).append('<option  value="' + item.Id + '"  >' + item.ETM + ' </option>');
                                       }


                                   });

                                  
                               }
                           }, 1);

                           return '<span>   <select class="form-control js-example-basic-single" id="ETMList_' + full.BBID + '"></select></span>';
                       }


                   },
                //{
                //    "data": null,
                //    "bSortable": false,
                //    "render": function (data, type, full) {
                //        var VehicleName = full['VehicleName'];
                //        VehicleName = VehicleName.replace(/ /g, "&nbsp;");

                //        return "<a href='javascript:' onclick=showDriverChangeDialog('" + full['BBID'] + "','" + full.VehicleId + "','" + VehicleName + "');>Assign</a>";
                //    }
                //},

                 {

                     "data": null,
                     "orderable": false, "targets": 0,
                     "render": function (data, type, full, meta) {
                         return '<span><button class="btn btn-green btn-submit btn-small" type="button"  id="' + full.BBID + '">Submit</button></span>';
              
                     }
                 },
                //{
                //    "data": null,
                //    "bSortable": false,
                //    "render": function (data, type, full) {

                //        return "<a href='/fms/AddEmployee?empid=" + full['EmployeeId'] + "' target='blank' >Edit</a>";
                //    }
                //},

        ]
    });

    table.on('draw', function () {

        $("button").attr('disabled', 'disabled');

        if (F == 1) {
            $("button").removeAttr('disabled');
        }

        $(".js-example-basic-single").select2({
            placeholder: "Select an Option",
        });

        var start = moment().subtract(0, 'days').startOf('day');
        var end = moment();

        function cb(start, end) {
            $('.daterange span').html(start.format('MMM D YYYY, h:mm:ss a') + ' - ' + end.format('MMM D YYYY, h:mm:ss a'));
            $beginDate = start.format('MMM D YYYY h:mm:ss a');
            $endDate = end.format('MMM D YYYY h:mm:ss a');
        }

        $('.daterange').daterangepicker({
            startDate: moment().subtract(0, 'days').startOf('day'),
            endDate: end,
            opens: "right",
            timePicker: true,
            ranges: {
                'Today': [moment().subtract(0, 'days').startOf('day'), moment()],
                'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment()]
                //'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment()],
                //'This Month': [moment().startOf('month').startOf('day'), moment()],
                //'Last Month': [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month')]
            },
        }, cb);

        cb(start, end);
    });

}

//function doNavigate(url, vehicleId) {
//    window.open(url.value, '_blank');
//}

function DownloadData(url, downloadType, vehicleStatus) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = '';
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var vehicleId = 0;
    var reportName = 'VehiclesList';
    //var vehicleStatus = $("#vehicleStatus").val();
    var url1 = url + "?downloadType=" + downloadType + "&vehicleId=" + vehicleId + "&vehicleStatus=" + vehicleStatus + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}






