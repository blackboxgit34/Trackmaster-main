var data;
var chart;
var colors;

var dataarray = [];


$(document).ready(function () {
  

   GetAllVehicles();
});

function printDiv() {

    alert($beginDate);

    $("#txtdate").text($beginDate + " To " + $endDate);


    var VehicleSelect = document.getElementById("Vehiclelist");
    var selectedText = VehicleSelect.options[VehicleSelect.selectedIndex].text;

    $("#txtname").text(selectedText);
    
    document.getElementById('hyperlink').style.display = 'none';
    document.getElementById('txtvehicle').style.visibility = 'visible';
    document.getElementById('txtvehicle').style.display = 'block';
    var printContents = document.getElementById('prindiv').innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    document.getElementById('txtvehicle').style.visibility = 'hidden';
    document.getElementById('txtvehicle').style.display = 'none';

    document.getElementById('hyperlink').style.visibility = 'visible';
     location.reload(true);
};


function createCustomHTMLContent(Datetime, Fuel, speed,  Distance, location) {
 
    return '<div style="padding:5px 5px 5px 5px;">' +
        '<h5>Fuel Details </h5>' +
        '<table class="table">' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/time.png" style="width:16px;height:16px"/><h7>DataDate</h7>  </td>' +
        '<td><h5>' + Datetime + '</h5></td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/Filling.jpg" style="width:16px;height:16px"/><h7>Fule</h7> </td>' +
        '<td><h5>' + Fuel + ' Liters</h5></td>' + '</tr>' + '<tr>' +
        
        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/><h7>Speed</h7> </td>' +
        '<td><h5>' + speed + ' KM/Hour</h5></td>' + '</tr>' + '<tr>' +
      
        '<td><img src="../Trackmaster_files/Fuel/distance.png" style="width:16px;height:16px"/><h7>Distance</h7> </td>' +
        '<td><h5>' + Distance + ' KM</h5></td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/><h7>Location</h7> </td>' +
        '<td><h5>' + location + ' </h5></td>' + '</tr>' + '</table>' + '</div>';
}


$("#fueltheftid").click(function () {
    $('#fueltheftid').attr('target', '_blank');
    $('#fueltheftid').attr("href", "../customreport/fueltheftreport?fromdate=" + $beginDate + "&Todate=" + $endDate + "&vehicleid=" + $('#Vehiclelist :selected').text());

  
});

$("#fuelfillinid").click(function () {

    $('#fuelfillinid').attr('target', '_blank');
    $('#fuelfillinid').attr("href", "../customreport/fuelfillingreport?fromdate=" + $beginDate + "&Todate=" + $endDate + "&vehicleid=" + $('#Vehiclelist :selected').text());
});
$("#fuelmileageid").click(function () {

    $('#fuelmileageid').attr('target', '_blank');
    $('#fuelmileageid').attr("href", "../customreport/FuelMilageReport?fromdate=" + $beginDate + "&Todate=" + $endDate + "&vehicleid=" + $('#Vehiclelist :selected').text());
});
//-----------------------------------------------------------------------------------------------

$("#BtnSearch").click(function () {
   
   
    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important; box-shadow: 7px 7px 5px 0px rgba(192,192,192,0.9) !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: linear-gradient(120deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  style="height:60px;"/><br><marquee direction="up" scrollamount="2"> <img src="../../Trackmaster_files/Fuel/Fuel.png" style="height:24px;" /><b>Decalaration</b><br><br>(1) <b>Fuel Graphical Report is more accurate than tabular report.<br>So always verify fuel filling and theft report through Graphical Report.<br><br>(2)Tank Fuel Level may vary with tyre pressure ,load in the vehicle and vehicle standing position.Also vary with atmospheric temprature changes.</b><br> <br><br></marquee > </div>' });
  
    
    var url = baseUrl + 'CustomAPI/HistoryFuelData';
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: url,
        data: { vehicleId: $('#Vehiclelist').val() },
        success: function (data) {

            
            //$('.HTotal').html(data[2].Data1);
            $('.HCurrent').html(data[0].Data1);
            //$('.HRemaining').html(data[1].Data1);
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

  
    var urlcurrent = baseUrl + 'CustomAPI/TataCurrentFuelData';
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: urlcurrent,
        data: { vehicleId: $('#Vehiclelist').val() },
        success: function (data) {
           
            //$('.CTotal').html(data[2].Data1);
            $('.CCurrent').html(data[0].Data1);
            //$('.CRemaining').html(data[1].Data1);
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
        url: baseUrl + 'CustomAPI/tataFuelDataGraph',
        data: {
            vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (chartsdata) {
            
            

            data = new google.visualization.DataTable();
            data.addColumn('string', 'Datadate');
            data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
            data.addColumn('number', 'Fuellevel');           
            data.addColumn('number', 'Distance');
            data.addColumn('number', 'speed');

            data.addRows(chartsdata.length);
            for (var i = 0; i < chartsdata.length; i++) {
                
                data.setValue(i, 0, "  Time:-" + chartsdata[i].DataDate + "  Location:-" + chartsdata[i].Location + "  Speed:-" + chartsdata[i].Speed + "  Distance:-" + chartsdata[i].Distance + "   Fuel:-" + chartsdata[i].FuelLevel + " ");
                data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].FuelLevel, chartsdata[i].Speed, chartsdata[i].Distance, chartsdata[i].Location));

              
                    data.setValue(i, 2, chartsdata[i].FuelLevel);                 
                    data.setValue(i, 3, chartsdata[i].Distance);                
                    data.setValue(i, 4, chartsdata[i].Speed);

            }




            chart = new google.visualization.LineChart(document.getElementById('chartdiv'));


            var option=  {
                width: 1205,
                height: 400,
               
                position: "top",
                fontsize: "14px",
                tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
                // legend: { position: 'none' },
                focusTarget: 'category',
                bar: { groupWidth: '90%' },
                animation: {
                    duration: 1200,
                    easing: 'out',
                    startup: true
                },
                colors: ['#0d47a1', '#ffbb33', '#CC0000'],
                series: {
                    0: { targetAxisIndex: 0, lineWidth: 2 },
                    1: { targetAxisIndex: 1, lineWidth: 2 },
                    2: { lineWidth: 2 },
                    3: { lineWidth: 2 }
                },
                //vAxes: {

                //    0: { title: 'FuelLevel' },
                //    1: { title: 'Speed' }
                //},
                hAxis: {
                    title: "Fuel Details", titleTextStyle: {
                        color: "green", fontSize: 24,

                    }, textPosition: "none"
                },
                vAxis: {
                    title: 'Fuel Level(Liters)', titleTextStyle: {
                        color: '#1a237e',
                        fontSize: 24,

                    }
                },
            }


            chart.draw(data, option);
            var hide1 = document.getElementById("checkbox2");
         
            var hide4 = document.getElementById("checkbox5");
            var hide5 = document.getElementById("checkbox6");
            hide1.onclick = function () {
                common();
            }           
            hide4.onclick = function () {

                common();
            }
            hide5.onclick = function () {

                common();
            }

            function common() {
               
                view = new google.visualization.DataView(data);
                var arrya = [];
                if ($("#checkbox2").prop('checked') == false) {

                    view.hideColumns([2]);
                    arrya.push('#0d47a1');
                }
               
                if ($("#checkbox5").prop('checked') == false) {
                    view.hideColumns([3]);
                    arrya.push('#ffbb33');
                   
                }
                if ($("#checkbox6").prop('checked') == false) {
                    view.hideColumns([4]);
                    arrya.push('#CC0000');
                   
                }

                commonoption(arrya);
                chart.draw(view, option);
            }
            function removeItem(array, item) {
                for (var i in array) {
                    if (array[i] == item) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
            function commonoption(count) {
                option.colors = ['#0d47a1', '#ffbb33', '#CC0000'];
                count.forEach(function (element) {
                    removeItem(option.colors, element);
                });
            }
            $.unblockUI();


        }
    });


   
});

function GetAllVehicles() {
   


    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important; box-shadow: 7px 7px 5px 0px rgba(192,192,192,0.9) !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: linear-gradient(120deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  style="height:60px;"/><br><marquee direction="up" scrollamount="2"> <img src="../../Trackmaster_files/Fuel/Fuel.png" style="height:24px;" /><b>Decalaration</b><br><br>(1) <b>Fuel Graphical Report is more accurate than tabular report.<br>So always verify fuel filling and theft report through Graphical Report.<br><br>(2)Tank Fuel Level may vary with tyre pressure ,load in the vehicle and vehicle standing position.Also vary with atmospheric temprature changes.</b><br> <br><br></marquee > </div>' });

  //  $.blockUI({ message: '<div >   <img src="../../Content/Trackmaster_files/loading3.gif" /> </div>' });

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
       
        $.ajax({
            type: "Get",
            url: baseUrl + 'CustomAPI/tataFuelDataGraph',
            data: {
                vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chartsdata) {
                data = new google.visualization.DataTable();
                data.addColumn('string', 'Datadate');
                data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
                data.addColumn('number', 'Fuellevel');              
                data.addColumn('number', 'Distance');
                data.addColumn('number', 'speed');

                data.addRows(chartsdata.length);
                for (var i = 0; i < chartsdata.length; i++) {
                    data.setValue(i, 0, "  Time:-" + chartsdata[i].DataDate + "  Location:-" + chartsdata[i].Location + "  Speed:-" + chartsdata[i].Speed + "  Distance:-" + chartsdata[i].Distance + "   Fuel:-" + chartsdata[i].FuelLevel + " ");
                    data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].FuelLevel, chartsdata[i].Speed, chartsdata[i].Distance, chartsdata[i].Location));
                    data.setValue(i, 2, chartsdata[i].FuelLevel);
                 
                    data.setValue(i, 3, chartsdata[i].Distance);
                    data.setValue(i, 4, chartsdata[i].Speed);
                }
                chart = new google.visualization.LineChart(document.getElementById('chartdiv'));



                var option=        {
                    width: 1205,
                    height: 400,
                    position: "top",
                  
                    fontsize: "14px",
                    tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
                    // legend: { position: 'none' },
                    focusTarget: 'category',
                    bar: { groupWidth: '90%' },
                    animation: {
                        duration: 1200,
                        easing: 'out',
                        startup: true
                    },
                    colors: ['#0d47a1', '#ffbb33', '#CC0000'],
                    series: {
                        0: { targetAxisIndex: 0, lineWidth: 2 },
                        1: { targetAxisIndex: 1, lineWidth: 2 },
                        2: { lineWidth: 2 },
                        3: { lineWidth: 2 }
                    },
                    //vAxes: {

                    //    0: { title: 'FuelLevel' },
                    //    1: { title: 'Speed' }
                    //},
                    hAxis: {
                        title: "Fuel Details", titleTextStyle: {
                            color: "green", fontSize: 24,

                        }, textPosition: "none"
                    }, vAxis: {
                        title: 'Fuel Level(Liters)', titleTextStyle: {
                            color: '#1a237e',
                            fontSize: 24,

                        }
                    },
                };
                chart.draw(data, option
          );
                $.unblockUI();

            }
        });


       // cylindricalchart();

        ////-------------------------Get History Fuel Data On Change-------------------------------------
        var url = baseUrl + 'CustomAPI/TataHistoryFuelData';
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
                                "theme": "fint", "caption": "", "lowerLimit": "0", "upperLimit": "100", "lowerLimitDisplay": "Empty", "upperLimitDisplay": data[2].Data1,

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
                $.unblockUI();
            }
             
        });

        ////-------------------------Get Current Fuel Data On Change--------------------------------------------
        var urlcurrent = baseUrl + 'CustomAPI/TataCurrentFuelData';
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
                                "theme": "fint", "caption": "", "lowerLimit": "0", "upperLimit": "100", "lowerLimitDisplay": "Empty", "upperLimitDisplay": data[2].Data1,

                                "showValue": "1",
                                "chartBottomMargin": "25",
                                "cylFillColor": "#00FF00"
                            },
                            "value": aHistory
                        },
                        "events": {
                            "rendered": function (evtObj, argObj) {
                                var fuelVolume = aHistory;
                                var flag = true;
                                var consVolume;
                                evtObj.sender.chartInterval = setInterval(function () {
                                    //(fuelVolume < 10) ? (fuelVolume = 80) : "";
                                    if (flag) {
                                        consVolume = fuelVolume - 3;
                                        flag = false;
                                    }
                                    else {
                                        consVolume = fuelVolume + 3;
                                        flag = true;
                                    }
                                    evtObj.sender.feedData("&value=" + consVolume);
                                    fuelVolume = consVolume;
                                }, 100);
                            },
                           
                        }

                    }
            );
                    fusioncharts.render();
                });
               // $.unblockUI();
            },
            error: function (error) {
                toastr.error("something went wrong!");
                $.unblockUI();
            }
        });

    });

   
}








