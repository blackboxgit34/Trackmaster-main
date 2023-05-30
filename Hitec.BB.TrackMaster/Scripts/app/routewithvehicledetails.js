var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};

$(document).ready(function () {
    tableName = $('#routelist').val();
    GetTripSummaryReport(tableName, null);
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
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
        }

        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");

    })

    $("body").on("click", "button.Show", function () {

        $(this).closest('tr').next().find('.divshow').toggle();

    });


    $('#dt_basic_Master').on('blur', 'input[type="textbox"]', function () {

        debugger;
        var datanew = table.row($(this).parents('tr')).data();
        var type = $(this).attr('id');
        var refid=type.split('_')[1]
         type = type.split('_')[0];
         var triprefnos = $('#TripNumber_' + refid).val()
         if (type == "TripNumber" && datanew.TripNumber.length > 1 && datanew.TripNumber.trim() != "0")
        {
            tableName = $('#routelist').val();

         //   GetTripSummaryReport(tableName, null);
            swal(datanew.VehicleNumber, type + " Can not be updated as  Trip-Number is already assigned.", "error");
            
        }
        else {
            if (type != "TripNumber") {
                var triprefno = $('#TripNumber_' + refid).val();


                if (triprefno.trim().length > 1 && triprefno.trim() != "0") {


                    $.ajax({

                        url: baseUrl + "CustomAPI/VehicleInputsdetails",
                        type: "GET",
                        data: { bbid: datanew.bbid, type: type, val: $(this).val(), tripno: triprefno, startdate: datanew.TripStartDate, enddate: datanew.TripEndDate },


                        //contentType: 'application/json',

                        success: function (data) {

                            var distamce = datanew.KMTravel
                            var id = data[0].id;
                          //  $('#Weight_' + id).val(data[0].Weightinkg);
                          
                            var Odometerreading=   data[0].Odometerreading;
                            var odometerreadingdate = data[0].odometerreadingdate;
                            var Weightinkg = data[0].Weightinkg;
                            var WeightIn = data[0].WeightIn

                            var totalweight = parseInt(Weightinkg) + parseInt(WeightIn);

                            var Tollchargesperkm = data[0].Tollchargesperkm;
                            var Driversalaryperkm = data[0].Driversalaryperkm;

                            $('#TollChargesperkm_' + id).val(parseInt(Tollchargesperkm) / distamce);
                            

                            Driversalaryperkm = Driversalaryperkm / 240;

                            Driversalaryperkm = Driversalaryperkm * parseInt(datanew.Hour);

                           

                            $('#DriverSalaryperkmNew_' + id).val(Driversalaryperkm/distamce);
                            var Fuelchargesperltr = data[0].Fuelchargesperltr;


                            $('#TotalFuelexpensePerKm_' + id).val( parseInt(datanew.FuelUsed)/distamce * Fuelchargesperltr);


                            $('#TotalFuelexpense_' + id).val(parseInt(datanew.FuelUsed) * Fuelchargesperltr)

                            var tyrecostperkm = data[0].tyrecostperkm;
                            var InscCostperkm = data[0].InscCostperkm;
                            var Taxesperkm = data[0].Taxesperkm;
                            var servicemaintancecostperkm = data[0].servicemaintancecostperkm;

                           
                            var MiscCostperkm = data[0].MiscCostperkm;

                            $('#MiscCostPerKm_' + id).val(parseInt(MiscCostperkm) / distamce);
                            

                            $('#TotalCostKm_' + id).val((parseFloat(Tollchargesperkm) / distamce)
                                + parseFloat(Driversalaryperkm) / distamce
                                + parseFloat(parseInt(datanew.FuelUsed) / distamce * Fuelchargesperltr)
                                + parseFloat(tyrecostperkm)
                                + parseFloat(InscCostperkm)
                                + parseFloat(Taxesperkm)
                                + parseFloat(servicemaintancecostperkm)
                                + parseFloat((parseInt(MiscCostperkm) / distamce)));
                           
                            $('#totalcost_' + id).val((parseFloat(Tollchargesperkm) )
                                + parseFloat(Driversalaryperkm)
                                + parseFloat(parseInt(datanew.FuelUsed)  * Fuelchargesperltr)
                                + parseFloat(tyrecostperkm)*distamce
                                + parseFloat(InscCostperkm) * distamce
                                + parseFloat(Taxesperkm) * distamce
                                + parseFloat(servicemaintancecostperkm) * distamce
                                + parseFloat((parseInt(MiscCostperkm))));
                            


                            var totalcost = (parseFloat(Tollchargesperkm))
                                + parseFloat(Driversalaryperkm)
                                + parseFloat(parseInt(datanew.FuelUsed) * Fuelchargesperltr)
                                + parseFloat(tyrecostperkm) * distamce
                                + parseFloat(InscCostperkm) * distamce
                                + parseFloat(Taxesperkm) * distamce
                                + parseFloat(servicemaintancecostperkm) * distamce
                                + parseFloat((parseInt(MiscCostperkm)));


                            $('#TotalCostPerKg_' + id).val(totalcost / totalweight);
                            
                            var Underoverweight = data[0].Underoverweight;
                            var vehcapacity = data[0].vehcapacity;
                            var TripNo = data[0].TripNo;
                            var tripstartdate = data[0].tripstartdate;

                            var tripenddatedate = data[0].tripenddatedate;
                            var IdealCostPerKg = data[0].IdealCostPerKg;


                            var WeightIn = data[0].WeightIn;

                            if (data == -1) {
                                tableName = $('#routelist').val();

                            //    GetTripSummaryReport(tableName, null);

                            }
                        }

                    });
                    //  swal(data.VehicleNumber, type + " updated  successfully ", "success");

                    toastr.success(type + " updated  successfully.");
                }
                else {
                    //   swal(data.VehicleNumber, type + " not updated,Kindly set Trip-Number Before  ", "error");
                    toastr.warning(type + " not updated,Kindly set Trip-Number Before.");
                }

            }

            else {


                $.ajax({

                    url: baseUrl + "CustomAPI/VehicleInputsdetails",
                    type: "GET",
                    data: { bbid: datanew.bbid, type: type, val: $(this).val(), tripno: $(this).val(), startdate: datanew.TripStartDate, enddate: datanew.TripEndDate },


                    //contentType: 'application/json',

                    success: function (data) {

                     //   if (data == -1) {
                            tableName = $('#routelist').val();

                           // GetTripSummaryReport(tableName, null);

                       // }
                    }

                });
                //  swal(data.VehicleNumber, type + " updated  successfully ", "success");
                toastr.success(type + " updated  successfully.");
            }

        }

       




    });

});


$("#BtnSearch").click(function () {

    tableName = $('#routelist').val();
    GetTripSummaryReport(tableName, null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "CustomAPI/MicroturnerMISreport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "CustomAPI/MicroturnerMISreport";
    DownloadData(url, downloadType);
});



function format(d) {
    debugger;
    var counter=0

    if (d.RouteInfo != null) {

       var  tableString = '<table id="subTbl" class="table table-bordered" style="width:23%;" >' +
                                           '<thead ><tr"><th>POI Name</th><th>In Time</th><th>Out Time</th><th>Duration(HH:mm:ss)</th></tr></thead>';

        d.RouteInfo.forEach(function (Innerelement) {


            tableString = tableString + '<tr>' +
          '<td>' + Innerelement.POIName + '</td>' +
          '<td>' + Innerelement.InTime + '</td>' +
          '<td>' + Innerelement.OutTime + '</td>' +
          '<td>' + Innerelement.Duration + '</td>' +
          '</tr>'

            counter = counter + 1;
        });
        tableString = tableString + '</table>'

        if (counter == 0) {
            return 'NO POI Crossed';
        }
        return tableString
    }
    


   


  
}

function GetTripSummaryReport(tableName, downloadType) {

    deleteTable();
    var $BBID = '';
    var url = apiBase.apiurl + "CustomAPI/MicroturnerMISreport";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
       "paging":false,
        //"scrollY": "800px",
        "scrollX": true,
        destroy: true,
        retrieve: true,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "sAjaxSource": url,
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' }, { "name": "routeId", "value": tableName }, { "name": "status", "value": $('#statusid').val() });
        },

        "columns": [

     { "date": "bbid", "visible": false, "orderable": false },
     { "date": "Hour", "visible": false, "orderable": false },

       { "date": "Hour", "visible": false, "orderable": false },
      { "date": "TripNumber", "visible": false, "orderable": false },

     
     {
         "className": 'details-control',
         "orderable": false,
         "data": null,
         "defaultContent": ''
     },
      {
          "render": function (data, type, full, meta) {
              return '<input class="form-control"  id="TripNumber_' + full.Tripid + '"  name="TripNumber" type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:120px" value="' + full.TripNumber + ' "/>';

          }
      },
      {
          "render": function (data, type, full, meta) {
              return '<input class="form-control" id="VehCapcity_' + full.Tripid + '"  type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.VehCapcity + ' "/>';

          }
      },
     { "data": "VehicleNumber" },
      { "data": "routename" },
     
     { "data": "DriverName" },
     { "data": "Tripstartlocation" },
     { "data": "Tripendlocation" },
     { "data": "ExpectedTime" },
       {

     
           "render": function (data, type, full, meta) {

               return moment(full.TripStartDate).format("MMM D YYYY, hh:mm:ss a");

           }
       },
     {


         "render": function (data, type, full, meta) {

             return moment(full.TripEndDate).format("MMM D YYYY, hh:mm:ss a");

         }
     },
     //{ "data": "TripStartDate" },
     //{ "data": "TripEndDate" },
     { "data": "Tripduration" },
     { "data": "DeviationTime" },
     {

     
         "render": function (data, type, full, meta) {

             return '<a href="/map/replay?tableNameLvStatus=' + full.bbid + '&vehicleNameLvStatus=' + full.VehicleNumber + '&tripstartdate=' + full.TripStartDate + '&tripenddate=' + full.TripEndDate + '" target="_blank">' + full.KMTravel + '</a>';

    }
     },
     //{ "data": "KMTravelOdometer" },

      {
          "render": function (data, type, full, meta) {
              return '<input class="form-control " id="Weight_' + full.Tripid + '" type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.Weight + ' "/>';

          }
      },
      {
          "render": function (data, type, full, meta) {
              return '<input class="form-control " id="WeightIn_' + full.Tripid + '" type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.WeightIn + ' "/>';

          }
      },
        { "data": "UnderOverWeight" },


     { "data": "VehicleAvg" },
     { "data": "VehicleAvgodometer" },

     {
         "render": function (data, type, full, meta) {
             return '<input class="form-control" id="TollCharges_' + full.Tripid + '" type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.TollCharges + ' "/>';

         }
     },
     {
         "render": function (data, type, full, meta) {
             return '<input class="form-control"  id="DriverSalary_' + full.Tripid + '" type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.DriverSalary + ' "/>';

         }
     },

     { "data": "FuelUsed" },
     {
         "render": function (data, type, full, meta) {
             return '<input class="form-control" id="FuelRatePerLtr_' + full.Tripid + '"  type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.FuelRatePerLtr + ' "/>';

         }
     },


      {
          "render": function (data, type, full, meta) {
              return '<input class="form-control" id="TotalFuelexpense_' + full.Tripid + '"  type="text" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.TotalFuelexpense + ' " disable/>';

          }
      },

  


       {
           "render": function (data, type, full, meta) {
               return '<input class="form-control" id="MiscCostPerTrip_' + full.Tripid + '"  type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.MiscCostPerTrip + ' "/>';

           }
       },

         {
             "render": function (data, type, full, meta) {
                 return '<input class="form-control" id="TollChargesperkm_' + full.Tripid + '"  type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.TollChargesperkm + ' "/>';

             }
         },
       
       {
           "render": function (data, type, full, meta) {
               return '<input class="form-control" id="TotalFuelexpensePerKm_' + full.Tripid + '"  type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.TotalFuelexpensePerKm + ' "/>';

           }
       },
     //{ "data": "TotalFuelexpensePerKm" },
      {
          "render": function (data, type, full, meta) {
              return '<input class="form-control" id="TyreCostPerKm_' + full.Tripid + '"  type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.TyreCostPerKm + ' "/>';

          }
      },
       {
           "render": function (data, type, full, meta) {
               return '<input class="form-control" id="InsuCostkm_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.InsuCostkm + ' "/>';

           }
       },
        {
            "render": function (data, type, full, meta) {
                return '<input class="form-control" id="Taxeskm_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.Taxeskm + ' "/>';

            }
        },
        {
            "render": function (data, type, full, meta) {
                return '<input class="form-control" id="ServiceMaintCostPerkm_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.ServiceMaintCostPerkm + ' "/>';

            }
        },
         

          {
              "render": function (data, type, full, meta) {


                  return '<input class="form-control" id="MiscCostPerKm_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.MiscCostPerKm + ' "/>';



              }
          },
          {
              "render": function (data, type, full, meta) {
                  return '<input class="form-control" id="totalcost_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.totalcost + ' "/>';

              }
          },

          {
              "render": function (data, type, full, meta) {


                  return '<input class="form-control" id="TotalCostKm_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.TotalCostKm + ' "/>';



              }
          },
    //{ "data": "TotalCostKm" },


 //  { "data": "TotalCostkmOdometer" },
     //{ "data": "TotalCostPerKg" },DriverSalaryperkmNew
      {
          "render": function (data, type, full, meta) {


              return '<input class="form-control" id="DriverSalaryperkmNew_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.DriverSalaryperkmNew + ' "/>';



          }
      },
        {
            "render": function (data, type, full, meta) {


                return '<input class="form-control" id="TotalCostPerKg_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.TotalCostPerKg + ' "/>';



            }
        },

        {
            "render": function (data, type, full, meta) {
                return '<input class="form-control" id="IdealCostPerKg_' + full.Tripid + '"   type="textbox" style="color:#21891d;font-size:15px;font-weight:bold;width:80px" value="' + full.IdealCostPerKg + ' "/>';

            }
        },


     { "data": "Status" },
        ],
       
    });


}

function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
  
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'Trip_costing_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var tableName = $('#routelist').val();
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&routeId=" + tableName + "&status=" + $('#statusid').val() + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}