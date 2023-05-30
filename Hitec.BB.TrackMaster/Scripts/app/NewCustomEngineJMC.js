
$(document).ready(function () {

    GetAllVehicles();

});
function printDiv() {
    
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
function createCustomHTMLContent(Datetime, Distance, Speed, Fuel, rearengine, engine, FR, location, fewh, rewh) {
   



    engine = Number(engine);
    var hengine = Math.floor(engine / 3600);
    var mengine = Math.floor(engine % 3600 / 60);
    var sengine = Math.floor(engine % 3600 % 60);


    var FEWH = hengine + ':' + mengine + ':' + sengine;



    fewh = Number(fewh);
    var hfewh = Math.floor(fewh / 3600);
    var mfewh = Math.floor(fewh % 3600 / 60);
    var sfewh = Math.floor(fewh % 3600 % 60);

    var cFEWH = hfewh + ':' + mfewh + ':' + sfewh;


    rearengine = Number(rearengine);
    var hrearengine = Math.floor(rearengine / 3600);
    var mrearengine = Math.floor(rearengine % 3600 / 60);
    var srearengine = Math.floor(rearengine % 3600 % 60);



    var REWH = hrearengine + ':' + mrearengine + ':' + srearengine;
    
   

    rewh = Number(rewh);
    var hrewh = Math.floor(rewh / 3600);
    var mrewh = Math.floor(rewh % 3600 / 60);
    var srewh = Math.floor(rewh % 3600 % 60);

    var cREWH = hrewh + ':' + mrewh + ':' + srewh;


    //var realmin = engine % 60
    //var hours = Math.floor(engine / 60)


    //var crealmin = fewh % 60
    //var chours = Math.floor(fewh / 60)


    //var realmin2 = rearengine % 60
    //var hours2 = Math.floor(rearengine / 60)

    //var crealmin2 = rewh % 60
    //var chours2 = Math.floor(rewh / 60)
   

    //var FEWH = hours + ':' + realmin;
    //var cFEWH = chours + ':' + crealmin;

    //var REWH = hours2 + ':' + realmin2;
    //var cREWH = chours2 + ':' + crealmin2;
  

    if (Fuel < 0) {
        -(Fuel);
    }

    return '<div style="padding:20px 5px 5px 5px;">' +
        '<h5>Fuel, F-WWH & R-EWH </h5>' +
        '<table class="table">' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/time.png" style="width:16px;height:16px"/> DataDate </td>' +
        '<td><b>' + Datetime + '</b></td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/Filling.jpg" style="width:16px;height:16px"/> Fuel</td>' +
        '<td><b>' + Fuel + '</b> Liters</td>' + '</tr>' + '<tr>' +
        // '<td><img src="../Trackmaster_files/Fuel/Theft.png" style="width:16px;height:16px"/> Consumption</td>' +
        //'<td><b>' + FR + '</b> Liters</td>' + '</tr>' + '<tr>' +
        '<td> Thresher Engine Working</td>' +
        '<td><b>' + REWH + '</b> hh:mm:ss</td>' + '</tr>' + '<tr>' +
        '<td> cumulative Rear Engine Working</td>' +
        '<td><b>' + cREWH + '</b> hh:mm:ss</td>' + '</tr>' + '<tr>' +
        '<td>  Engine Working</td>' +
        '<td><b>' + FEWH + '</b> hh:mm:ss</td>' + '</tr>' + '<tr>' +
         '<td> Cumulative  Engine Working</td>' +
        '<td><b>' + cFEWH + '</b> hh:mm:ss</td>' + '</tr>' + '<tr>' +
    
       '<td> Distance</td>' +
        '<td><b>' + Distance + '</b> KM</td>' + '</tr>' + '<tr>' +
        '<td> Speed</td>' +
        '<td><b>' + Speed + '</b> KM/hr</td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/> Location</td>' +
        '<td><b>' + location + '</b> </td>' + '</tr>' + '</table>' + '</div>';
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
$("#BtnSearch").click(function () {
    // drawChart();
    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;    background: linear-gradient(120deg, #fdfdfd00 30%, #fdfdfd00 70%)!important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  />Loading...<br>(</div>' });


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


    var bbid = $("#Vehiclelist").val();


    $.ajax({
        type: "Get",
        url: baseUrl + 'ReportsAPI/getEnginecustom',
        data: {
            vehicleId: bbid, beginDate: $beginDate, endDate: $endDate
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (chartsdata) {
           
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Datadate');
            data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
            data.addColumn('number', 'Fuellevel');
            data.addColumn('number', 'Engine Working');
            data.addColumn('number', 'Thresher Engine Working');
            data.addColumn('number', 'Distance');
            data.addColumn('number', 'Speed');


            data.addRows(chartsdata.length);
            var fuelreading = 0
            for (var i = 0; i < chartsdata.length; i++) {

                debugger;

                if (parseInt(chartsdata[0].FuelLevel))


                fuelreading = parseInt(chartsdata[0].FuelLevel) - parseInt(chartsdata[i].FuelLevel)

                data.setValue(i, 0, "'Time  " + chartsdata[i].DataDate + "  Location   " + chartsdata[i].Location + "F-EngineWorkingTime(hh:mm:ss)  " + chartsdata[i].engine + " R-EngineWorkingTime(hh:mm:ss)   " + chartsdata[i].rearengine + " Distance   " + chartsdata[i].Distance + " Speed   " + chartsdata[i].Speed + "'");
               


                data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].Distance, chartsdata[i].Speed, chartsdata[i].FuelLevel, Math.round(chartsdata[i].rearengine), Math.round(chartsdata[i].engine), chartsdata[i].fuelconsumption, chartsdata[i].Location, Math.round(chartsdata[i].Frontenginecumulative), Math.round(chartsdata[i].Rearenginecumulative)));

           

                    data.setValue(i, 2, chartsdata[i].FuelLevel);
           

                    data.setValue(i, 3, Math.round( parseInt( chartsdata[i].engine)/60));
              
                    data.setValue(i, 4, Math.round(parseInt(chartsdata[i].rearengine)/60));
             
                    data.setValue(i, 5, chartsdata[i].Distance);
            
                    data.setValue(i, 6, chartsdata[i].Speed);
              





            }
            var chart = new google.visualization.LineChart(document.getElementById('chartdiv'));

            var options = 
               {
                   width: 1205,
                   height: 400,
                   position: "top",
                   fontsize: "14px",
                   tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
                   // legend: { position: 'none' },
                   focusTarget: 'category',
                   bar: { groupWidth: '90%' },
                   colors: ['#1a237e', 'green', '#1c91c0', '#a52714', '#F7B005'],
                   series: {
                       0: { targetAxisIndex: 0, lineWidth: 2 },
                       1: { targetAxisIndex: 1, lineWidth: 2 },
                       2: { lineWidth: 2 },
                       3: { lineWidth: 2 }
                   },
                   vAxes: {

                       0: { title: 'FuelLevel' },
                       1: { title: 'EWH' }
                   },
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


            chart.draw(data,options);


            var hide1 = document.getElementById("checkbox2");
            var hide2 = document.getElementById("checkbox3");
            var hide3 = document.getElementById("checkbox4");
            var hide4 = document.getElementById("checkbox5");
            var hide5 = document.getElementById("checkbox6");
            hide1.onclick = function () {
                common();
            }
            hide2.onclick = function () {
                common();
            }
            hide3.onclick = function () {

                common();
            }
            hide4.onclick = function () {

                common();
            }
            hide5.onclick = function () {

                common();
            }

            function common()
            {
                view = new google.visualization.DataView(data);
                var arrya = [];
                 if ($("#checkbox2").prop('checked') == false) {

                     view.hideColumns([2]);
                     arrya.push('#1a237e');
                  }
                 if ($("#checkbox3").prop('checked') == false) {

                     view.hideColumns([3]);
                     arrya.push('green');
                  }
                 if ($("#checkbox4").prop('checked') == false) {

                     view.hideColumns([4]);
                     arrya.push('#1c91c0');
                  }
                 if ($("#checkbox5").prop('checked') == false) {
                     view.hideColumns([5]);
                     arrya.push('#a52714');
                 }
                 if ($("#checkbox6").prop('checked') == false) {
                     view.hideColumns([6]);
                     arrya.push('#F7B005');
                 }

                commonoption(arrya);
                 chart.draw(view, options);
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
             
                options.colors = ['#1a237e', 'green', '#1c91c0', '#a52714', '#F7B005'];
                count.forEach(function (element) {             
                removeItem(options.colors, element);
                       
                });
               
               
            }
        
            $.unblockUI();


        }
    });
});

function GetAllVehicles() {
 
    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;    background: linear-gradient(120deg, #fdfdfd00 30%, #fdfdfd00 70%)!important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  />Loading...<br>(</div>' });


    var url = baseUrl + 'CommonApi/GetFuelVehicles';
    param = { custid: $custid };
    $.get(url, param, function (data) {
        $.each(data, function (key, value) {
            $("#Vehiclelist").append($("<option></option>").val(value.Value).html(value.Text));
        });
    }).done(function () {
        var bbid = $("#Vehiclelist").val();
        debugger;
        $.ajax({
            type: "Get",
            url: baseUrl + 'ReportsAPI/getEnginecustom',
            data: {
                vehicleId: bbid, beginDate: $beginDate, endDate: $endDate
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (chartsdata) {
             
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Datadate');
                data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
                data.addColumn('number', 'Fuellevel');
                data.addColumn('number', ' Engine Working');
                data.addColumn('number', 'Thresher Engine Working');
                data.addColumn('number', 'Distance');
                data.addColumn('number', 'Speed');
                data.addRows(chartsdata.length);


             
                var fuelreading = 0;
               
                for (var i = 0; i < chartsdata.length; i++) {




                    fuelreading = parseInt(chartsdata[0].FuelLevel) - parseInt(chartsdata[i].FuelLevel)

                    data.setValue(i, 0, "'Time  " + chartsdata[i].DataDate + "  Location   " + chartsdata[i].Location + "   F-EngineWorkingTime(hh:mm:ss)  " + chartsdata[i].engine + " R-EngineWorkingTime(hh:mm:ss)   " + chartsdata[i].rearengine + " Distance   " + chartsdata[i].Distance + " Speed   " + chartsdata[i].Speed + "'");

                
                    data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].Distance, chartsdata[i].Speed, chartsdata[i].FuelLevel, Math.round(chartsdata[i].rearengine), Math.round(chartsdata[i].engine), chartsdata[i].fuelconsumption, chartsdata[i].Location, Math.round(chartsdata[i].Frontenginecumulative), Math.round(chartsdata[i].Rearenginecumulative)));

                        

                        data.setValue(i, 2, chartsdata[i].FuelLevel);
                   

                        data.setValue(i, 3, Math.round(parseInt(chartsdata[i].engine) / 60));

                        data.setValue(i, 4, Math.round(parseInt(chartsdata[i].rearengine) / 60));
                  
                        data.setValue(i, 5, chartsdata[i].Distance);
                  
                        data.setValue(i, 6, chartsdata[i].Speed);
                    
                   

                }
                var chart = new google.visualization.LineChart(document.getElementById('chartdiv'));



                var options =
             {
                 width: 1205,
                 height: 400,
                 position: "top",
                 fontsize: "14px",
                 tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
                 // legend: { position: 'none' },
                 focusTarget: 'category',
                 bar: { groupWidth: '90%' },
                 colors: ['#1a237e', 'green', '#1c91c0', '#a52714', '#F7B005'],
                 series: {
                     0: { targetAxisIndex: 0, lineWidth: 2 },
                     1: { targetAxisIndex: 1, lineWidth: 2 },
                     2: { lineWidth: 2 },
                     3: { lineWidth: 2 }
                 },
                 vAxes: {

                     0: { title: 'FuelLevel' },
                     1: { title: 'EWH' }
                 },
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
                chart.draw(data, options );
              
                $.unblockUI();

            }
             
        });

        ////-------------------------Get History Fuel Data On Change-------------------------------------

      
        
        var url = baseUrl + 'CustomAPI/HistoryFuelData';
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
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
                toastr.error("something went wrong!");
               
            }
        });

        ////-------------------------Get Current Fuel Data On Change--------------------------------------------
        var urlcurrent = baseUrl + 'CustomAPI/CurrentFuelData';
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
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
                            //Using real time update event to update the annotation
                            //showing available volume of Diesel
                            //"realTimeUpdateComplete": function (evt, arg) {
                            //    var annotations = evt.sender.annotations,
                            //        dataVal = evt.sender.getData(),
                            //        colorVal = (dataVal >= 70) ? "#6caa03" : ((dataVal <= 35) ? "#e44b02" : "#f8bd1b");
                            //    //Updating value
                            //    annotations && annotations.update('rangeText', {
                            //        "text": dataVal + " ltrs"
                            //    });
                            //    //Changing background color as per value
                            //    annotations && annotations.update('rangeBg', {
                            //        "fillcolor": colorVal
                            //    });

                            //}
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

    });


}




