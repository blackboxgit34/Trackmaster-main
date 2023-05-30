var data;
var chart;
$(document).ready(function () {


    GetAllVehicles();



});



$("#BtnSearch").click(function () {
    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important; box-shadow: 7px 7px 5px 0px rgba(192,192,192,0.9) !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: linear-gradient(120deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  style="height:60px;"/><br><marquee direction="up" scrollamount="2">Disclaimer and Fuel Efficiency Tips <br><br>(1) <b>Fuel Value may vary </b> <br><br>(2)<b>The Zic-zac line in fuel graph shows that fuel is jumping when vehicle is moving </b><br><br>(3) <b>Drive at constanct speed to improve Fuel</b> <br><br>(4)<b>Ignore Harsh Driving and overspeeding to improve fuel</b></marquee > </div>' });


    ////-------------------------Get History Fuel Data On Change-------------------------------------
    
    var url = baseUrl + 'CustomAPI/HistoryFuelData';
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: url,
        data: { vehicleId: $('#Vehiclelist').val() },
        success: function (data) {

            
            $('.HTotal').html(data[2].Data1);
            $('.HCurrent').html(data[0].Data1);
            $('.HRemaining').html(data[1].Data1);
            $('.HDate').html(data[3].Data1);
            
            var aHistory = parseInt(data[0].Data1);
            FusionCharts.ready(function () {
                var fusioncharts = new FusionCharts({
                    type: 'cylinder',
                    dataFormat: 'json',
                    id: 'fuelMeter-1',
                    renderAt: 'chart-container1',
                    width: '250',
                    height: '350',
                    dataSource: {
                        "chart": {
                            "theme": "fint", "caption": "History Fuel Level", "lowerLimit": "0", "upperLimit": "100", "lowerLimitDisplay": "Empty", "upperLimitDisplay": data[2].Data1,

                            "showValue": "1",
                            "chartBottomMargin": "25",
                            "cylFillColor": "#00FF00"
                        },
                        "value": aHistory
                    }
                }
        );
                fusioncharts.render();
            });

        },
        error: function (error) {
            $.unblockUI();
            toastr.error("something went wrong!");
        }
    });

    ////-------------------------Get Current Fuel Data On Change-----------------
    var urlcurrent = baseUrl + 'CustomAPI/CurrentFuelData';
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: urlcurrent,
        data: { vehicleId: $('#Vehiclelist').val() },
        success: function (data) {
            
            $('.CTotal').html(data[2].Data1);
            $('.CCurrent').html(data[0].Data1);
            $('.CRemaining').html(data[1].Data1);
            $('.CDate').html(data[3].Data1);
            
            var aHistory = parseInt(data[0].Data1);
            FusionCharts.ready(function () {
                var fusioncharts = new FusionCharts({
                    type: 'cylinder',
                    dataFormat: 'json',
                    id: 'fuelMeter-1',
                    renderAt: 'chart-container',
                    width: '250',
                    height: '350',
                    dataSource: {
                        "chart": {
                            "theme": "fint", "caption": "Current Fuel Level", "lowerLimit": "0", "upperLimit": "100", "lowerLimitDisplay": "Empty", "upperLimitDisplay": data[2].Data1,

                            "showValue": "1",
                            "chartBottomMargin": "25",
                            "cylFillColor": "#00FF00"
                        },
                        "value": aHistory
                    }
                }
        );
                fusioncharts.render();
            });
        },
        error: function (error) {
            toastr.error("something went wrong!");
        }
    });
    //-----------------------------------------
    
    var pumaid = $("#Vehiclelist").val();
    console.log(pumaid);
    $.ajax({
        type: "Get",
        url: baseUrl + 'CustomAPI/FuelDataGraph',
        data: {
            vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (chartsdata) {
            
            

            data = new google.visualization.DataTable();
            data.addColumn('string', 'Datadate');
            data.addColumn('number', 'Fuellevel');
            data.addColumn('number', 'speed');
            data.addColumn('number', 'Distance');

            data.addRows(chartsdata.length);
            for (var i = 0; i < chartsdata.length; i++) {
                
                data.setValue(i, 0, "  Time:-" + chartsdata[i].DataDate + "  Location:-" + chartsdata[i].Location + "  Speed:-" + chartsdata[i].Speed + "  Distance:-" + chartsdata[i].Distance + "   Fuel:-" + chartsdata[i].FuelLevel + " ");
                if ($("#checkbox2").prop('checked') == true) {

                    data.setValue(i, 1, chartsdata[i].FuelLevel);
                }
                if ($("#checkbox6").prop('checked') == true) {
                    data.setValue(i, 2, chartsdata[i].Speed);
                }
                if ($("#checkbox5").prop('checked') == true) {
                    data.setValue(i, 3, chartsdata[i].Distance);
                }


            }




            chart = new google.visualization.LineChart(document.getElementById('chartdiv'));




            chart.draw(data,
              {
                  width: 1205,
                  height: 400,
                  position: "top",
                  fontsize: "14px",
                  tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
             //     legend: { position: 'none' },
                  bar: { groupWidth: '80%' },
                  //series: {
                  //    0: { targetAxisIndex: 0 },
                  //    1: { targetAxisIndex: 1 }
                  //},
                  //vAxes: {

                  //    0: { title: 'FuelLevel' },
                  //    1: { title: 'Speed' }
                  //},
                  hAxis: { title: "Fuel Details", titleTextStyle: { color: "green" }, textPosition: "none" }, vAxis: { title: 'Fuel Level(Liters)', titleTextStyle: { color: "red" } },
              });
            $.unblockUI();


        }
    });
});


function GetAllVehicles() {
    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important; box-shadow: 7px 7px 5px 0px rgba(192,192,192,0.9) !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: linear-gradient(120deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  style="height:60px;"/>Loading...<br><marquee direction="up" scrollamount="2">Disclaimer and Fuel Efficiency Tips <br><br>(1) <b>Fuel Value may vary </b> <br><br>(2)<b>The Zic-zac line in fuel graph shows that fuel is jumping when vehicle is moving </b><br><br>(3) <b>Drive at constanct speed to improve Fuel</b> <br><br>(4)<b>Ignore Harsh Driving and overspeeding to improve fuel</b></marquee > </div>' });
    var url = baseUrl + 'CommonApi/GetFuelVehicles';
    param = { custid: $custid };
    $.get(url, param, function (data) {
        
        $.each(data, function (key, value) {
            
            $("#Vehiclelist").append($("<option></option>").val(value.Value).html(value.Text));
        });
    }).done(function () {
        var pumaid = $("#Vehiclelist").val();
        var bbid = getUrlParameter("bbid");
        if (bbid) {
            pumaid = bbid;
            $("#Vehiclelist").val(bbid);
        }
        console.log(pumaid);
        $.ajax({
            type: "Get",
            url: baseUrl + 'CustomAPI/FuelDataGraph',
            data: {
                vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chartsdata) {
                data = new google.visualization.DataTable();
                data.addColumn('string', 'Datadate');
                data.addColumn('number', 'Fuellevel');
                data.addColumn('number', 'speed');
                data.addColumn('number', 'Distance');

                data.addRows(chartsdata.length);
                for (var i = 0; i < chartsdata.length; i++) {
                    data.setValue(i, 0, "  Time:-" + chartsdata[i].DataDate + "  Location:-" + chartsdata[i].Location + "  Speed:-" + chartsdata[i].Speed + "  Distance:-" + chartsdata[i].Distance + "   Fuel:-" + chartsdata[i].FuelLevel + " ");
                    data.setValue(i, 1, chartsdata[i].FuelLevel);
                    data.setValue(i, 2, chartsdata[i].Speed);
                    data.setValue(i, 3, chartsdata[i].Distance);

                }
                chart = new google.visualization.LineChart(document.getElementById('chartdiv'));
                chart.draw(data,
                  {
                      width: 1205,
                      height: 400,
                      position: "top",
                      fontsize: "14px",
                      //colors: ['green', 'blue', 'red'],
                      tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
                      // legend: { position: 'none' },
                      bar: { groupWidth: '90%' },

                      //series: {
                      //    0: { targetAxisIndex: 0 },
                      //    1: { targetAxisIndex: 1 }
                      //},
                      //vAxes: {

                      //    0: { title: 'FuelLevel' },
                      //    1: { title: 'Speed' }
                      //},
                      hAxis: { title: "Fuel Details", titleTextStyle: { color: "green" }, textPosition: "none" }, vAxis: { title: 'Fuel Level(Liters)', titleTextStyle: { color: "red" } },
                  });

            }
        });

      

    });


}





