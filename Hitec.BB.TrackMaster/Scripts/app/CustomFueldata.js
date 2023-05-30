$(document).ready(function () {


    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(GetAllVehicles);

    var lineColors = ['#428bca', 'green', '#1c91c0', '#a52714', '#EC36B5'];
    function GetAllVehicles() {

        $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important; box-shadow: 7px 7px 5px 0px rgba(192,192,192,0.9) !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: linear-gradient(120deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;font-size:  14px !important;font-weight: normal !important; "> <h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3></div>' });

        var url = baseUrl + 'CommonApi/GetFuelVehicles';
        param = { custid: $custid };
        $.get(url, param, function (data) {
            $.each(data, function (key, value) {
                $("#Vehiclelist").append($("<option></option>").val(value.Value).html(value.Text));
            });
        }).done(function () {
            var bbid = $("#Vehiclelist").val();

            $.ajax({
                type: "Get",
                url: baseUrl + 'CustomAPI/EngineFuelDataGraph',
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

                    data.addColumn('number', 'EWH');
                    data.addColumn('number', 'Distance');
                    data.addColumn('number', 'speed');
                    data.addColumn('number', 'REWH');

                    data.addRows(chartsdata.length);
                    var fuelreading = 0
                    for (var i = 0; i < chartsdata.length; i++) {




                        fuelreading = parseInt(chartsdata[0].FuelLevel) - parseInt(chartsdata[i].FuelLevel)

                        data.setValue(i, 0, "'Time  " + chartsdata[i].DataDate + "  Location   " + chartsdata[i].Location + "   EngineWorkingTime(hh:mm:ss)  " + chartsdata[i].engine + " Distance   " + chartsdata[i].Distance + " Speed  " + chartsdata[i].Speed + "'");



                        data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].FuelLevel, chartsdata[i].Speed, Math.round(chartsdata[i].engine), Math.round(chartsdata[i].RearEngine), chartsdata[i].Distance, fuelreading, chartsdata[i].Location));
                        data.setValue(i, 2, chartsdata[i].FuelLevel);

                        data.setValue(i, 3, Math.round(chartsdata[i].engine));
                        data.setValue(i, 4, chartsdata[i].Distance);
                        data.setValue(i, 5, chartsdata[i].Speed);
                        data.setValue(i, 6, chartsdata[i].RearEngine);



                    }

                    dash = new google.visualization.Dashboard(document.getElementById('dashboard_div'));

                    chart = new google.visualization.ChartWrapper({
                        chartType: 'ComboChart',
                        containerId: 'chart_div',

                        options: {
                            legend: {
                                position: 'bottom',
                                alignment: 'center',
                                textStyle: {
                                    fontSize: 12
                                }
                            },
                            explorer: {
                                actions: ['dragToZoom', 'rightClickToReset'],
                                axis: 'horizontal',
                                keepInBounds: true
                            },
                            tooltip: {
                                isHtml: true,
                            },
                            focusTarget: 'category',
                            bar: { groupWidth: '90%' },
                            colors: lineColors,
                            series: {
                                0: { targetAxisIndex: 0, lineWidth: 2 },
                                1: { targetAxisIndex: 1, lineWidth: 2 },
                                2: { lineWidth: 3 },
                                3: { lineWidth: 3 }
                            },
                            vAxes: {
                                0: {
                                    title: 'FuelLevel',
                                    viewWindowMode: 'explicit',
                                    viewWindow: {
                                        max: size,
                                        min: 0
                                    }
                                },
                                1: { title: 'Distance' }
                            },
                            hAxis: {
                                title: "Fuel Details",
                                titleTextStyle: {
                                    color: "green",
                                    fontSize: 24,
                                },
                                textPosition: "none"
                            },
                            vAxis: {
                                title: 'Fuel Level(Liters)',
                                titleTextStyle: {
                                    color: '#1a237e',
                                    fontSize: 24,
                                }
                            }
                        }
                    });



                    control = new google.visualization.ControlWrapper({
                        controlType: 'ChartRangeFilter',
                        containerId: 'control_div',

                        options: {
                            filterColumnIndex: [0, 1, 2, 3, 4],
                            ui: {
                                chartOptions: {
                                    height: 220,
                                    chartArea: {
                                        width: '75%'
                                    },
                                    legend: {
                                        position: 'bottom',
                                        alignment: 'center',
                                        textStyle: {
                                            fontSize: 12
                                        }
                                    },
                                    explorer: {
                                        actions: ['dragToZoom', 'rightClickToReset'],
                                        axis: 'horizontal',
                                        keepInBounds: true
                                    },
                                    tooltip: {
                                        isHtml: true,
                                    },
                                    focusTarget: 'category',
                                    bar: { groupWidth: '90%' },
                                    colors: lineColors,
                                    series: {
                                        0: { targetAxisIndex: 0, lineWidth: 2 },
                                        1: { targetAxisIndex: 1, lineWidth: 2 },
                                        2: { lineWidth: 3 },
                                        3: { lineWidth: 3 }
                                    },
                                    vAxes: {
                                        0: {
                                            title: 'FuelLevel',
                                            viewWindowMode: 'explicit',
                                            viewWindow: {
                                                max: size,
                                                min: 0
                                            }
                                        },
                                        1: { title: 'EWH' }
                                    },
                                    hAxis: {
                                        title: "Fuel Details",
                                        titleTextStyle: {
                                            color: "green",
                                            fontSize: 24,
                                        },
                                        textPosition: "none"
                                    },
                                    vAxis: {
                                        title: 'Fuel Level(Liters)',
                                        titleTextStyle: {
                                            color: '#1a237e',
                                            fontSize: 24,
                                        }
                                    }
                                }
                            }
                        },

                        state: {
                            range: {
                                start: new Date($beginDate)
                            }
                        }
                    });


                    dash.bind([control], [chart]);

                    dash.draw(data);

                    google.visualization.events.addListener(control, 'statechange', function () {
                        var state = control.getState();
                        st = state.range.start;
                        ed = state.range.end;
                    });



                    //var chart = new google.visualization.LineChart(document.getElementById('chartdiv'));


                    //var option = {
                    //    width: 1205,
                    //    height: 400,
                    //    position: "top",
                    //    fontsize: "14px",
                    //    tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
                    //    // legend: { position: 'none' },
                    //    focusTarget: 'category',
                    //    bar: { groupWidth: '90%' },
                    //    colors: ['#428bca', 'green', '#1c91c0', '#a52714', '#EC36B5'],
                    //    series: {


                    //        0: { targetAxisIndex: 0, lineWidth: 2 },
                    //        1: { targetAxisIndex: 1, lineWidth: 2 },
                    //        2: { lineWidth: 3 },
                    //        3: { lineWidth: 3 }
                    //    },
                    //    vAxes: {

                    //        0: { title: 'FuelLevel' },
                    //        1: { title: 'EWH' }
                    //    },
                    //    hAxis: {
                    //        title: "Fuel Details", titleTextStyle: {
                    //            color: "green", fontSize: 24,

                    //        }, textPosition: "none"
                    //    }, vAxis: {
                    //        title: 'Fuel Level(Liters)', titleTextStyle: {
                    //            color: '#1a237e',
                    //            fontSize: 24,

                    //        }
                    //    }

                    //};
                    //chart.draw(data, option);



                    var hide1 = document.getElementById("checkbox2");
                    var hide2 = document.getElementById("checkbox3");
                    var hide4 = document.getElementById("checkbox5");
                    var hide5 = document.getElementById("checkbox6");
                    var hide6 = document.getElementById("checkbox7");
                    hide1.onclick = function () {


                        common();
                    }
                    hide2.onclick = function () {
                        common();
                    }
                    hide4.onclick = function () {

                        common();
                    }
                    hide5.onclick = function () {

                        common();
                    }
                    hide6.onclick = function () {

                        common();
                    }
                    function common() {

                        view = new google.visualization.DataView(data);
                        var arrya = [];
                        if ($("#checkbox2").prop('checked') == false) {

                            view.hideColumns([2]);
                            options.filterColumnIndex = [0, 1, 3, 4,5,6];     
                            arrya.push('#428bca');
                        }

                        if ($("#checkbox3").prop('checked') == false) {

                            view.hideColumns([3]);
                            options.filterColumnIndex = [0, 1, 2, 4, 5, 6]; 
                            arrya.push('green');
                        }

                        if ($("#checkbox5").prop('checked') == false) {
                            view.hideColumns([4]);
                            options.filterColumnIndex = [0, 1, 2, 3, 5, 6]; 
                            arrya.push('#1c91c0');

                        }
                        if ($("#checkbox6").prop('checked') == false) {
                            view.hideColumns([5]);
                            options.filterColumnIndex = [0, 1, 2, 3, 4, 6]; 
                            arrya.push('#a52714');

                        }
                        if ($("#checkbox7").prop('checked') == false) {
                            view.hideColumns([6]);
                            options.filterColumnIndex = [0, 1, 2, 3, 4, 5];    
                            arrya.push('#EC36B5');

                        }

                    

                        commonoption(arrya);

                        chart.setOption('colors', lineColors);


                        control.setOption('ui.chartOptions.colors', lineColors);
                        control.setOptions(options);
                        dash.bind([control], [chart]);
                        dash.draw(view);
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
                        lineColors = ['#428bca', 'green', '#1c91c0', '#a52714', '#EC36B5'];
                        count.forEach(function (element) {
                            removeItem(lineColors, element);
                        });
                    }
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
                    $.unblockUI();
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

                            }

                        }
                );
                        fusioncharts.render();
                    });
                    $.unblockUI();
                },
                error: function (error) {
                    toastr.error("something went wrong!");
                    $.unblockUI();
                }
            });

        });


    }

    //drawChart();

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
function createCustomHTMLContent(Datetime, Fuel, speed, engine, RearEngine, Distance, FR, location) {
    var realmin = engine % 60
    var hours = Math.floor(engine / 60)

    var EWH = hours + ':' + realmin;
    var realmin1 = RearEngine % 60
    var hours1 = Math.floor(RearEngine / 60)

    var REWH = hours1 + ':' + realmin1;

    if (Fuel < 0) {
        -(Fuel);
    }

    return '<div style="padding:5px 5px 5px 5px;">' +
        '<h5>Fuel & EWH </h5>' +
        '<table class="table">' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/time.png" style="width:16px;height:16px"/> DataDate </td>' +
        '<td><b>' + Datetime + '</b></td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/Filling.jpg" style="width:16px;height:16px"/> Fuel</td>' +
        '<td><b>' + Fuel + '</b> Liters</td>' + '</tr>' + '<tr>' +
        // '<td><img src="../Trackmaster_files/Fuel/Theft.png" style="width:16px;height:16px"/> Consumption</td>' +
        //'<td><b>' + FR + '</b> Liters</td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/> Speed</td>' +
        '<td><b>' + speed + '</b> KM/Hour</td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/engine.png" style="width:16px;height:16px"/> EWH</td>' +
        '<td><b>' + EWH + '</b> hh:mm</td>' + '</tr>' + '<tr>' +
            '<td><img src="../Trackmaster_files/Fuel/engine.png" style="width:16px;height:16px"/> REWH</td>' +
        '<td><b>' + REWH + '</b> hh:mm</td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/distance.png" style="width:16px;height:16px"/> Distance</td>' +
        '<td><b>' + Distance + '</b> KM</td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/> Location</td>' +
        '<td><b>' + location + '</b> </td>' + '</tr>' + '</table>' + '</div>';
}

$("#BtnSearch").click(function () {
    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important; box-shadow: 7px 7px 5px 0px rgba(192,192,192,0.9) !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: linear-gradient(120deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;font-size:  14px !important;font-weight: normal !important; "> <h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3></div>' });


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
            $.unblockUI();
            toastr.error("something went wrong!");
        }
    });

    ////-------------------------Get Current Fuel Data On Change-----------------
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
        url: baseUrl + 'CustomAPI/EngineFuelDataGraph',
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
            data.addColumn('number', 'EWH');
            data.addColumn('number', 'Distance');
            data.addColumn('number', 'speed');
            data.addColumn('number', 'REWH');
            data.addRows(chartsdata.length);
            var fuelreading = 0
            for (var i = 0; i < chartsdata.length; i++) {




                fuelreading = parseInt(chartsdata[0].FuelLevel) - parseInt(chartsdata[i].FuelLevel)

                data.setValue(i, 0, "'Time  " + chartsdata[i].DataDate + "  Location   " + chartsdata[i].Location + "   EngineWorkingTime(hh:mm:ss)  " + chartsdata[i].engine + " Distance   " + chartsdata[i].Distance + " Speed  " + chartsdata[i].Speed + "'");



                data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].FuelLevel, chartsdata[i].Speed, Math.round(chartsdata[i].engine), Math.round(chartsdata[i].RearEngine), chartsdata[i].Distance, fuelreading, chartsdata[i].Location));
                data.setValue(i, 2, chartsdata[i].FuelLevel);

                data.setValue(i, 3, Math.round(chartsdata[i].engine));
                data.setValue(i, 4, chartsdata[i].Distance);
                data.setValue(i, 5, chartsdata[i].Speed);
                data.setValue(i, 6, chartsdata[i].RearEngine);




            }
            var chart = new google.visualization.LineChart(document.getElementById('chartdiv'));






            var option = {
                width: 1205,
                height: 400,
                position: "top",
                fontsize: "14px",
                tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
                // legend: { position: 'none' },
                focusTarget: 'category',
                bar: { groupWidth: '90%' },
                colors: ['#428bca', 'green', '#1c91c0', '#a52714', '#EC36B5'],
                series: {


                    0: { targetAxisIndex: 0, lineWidth: 2 },
                    1: { targetAxisIndex: 1, lineWidth: 2 },
                    2: { lineWidth: 3 },
                    3: { lineWidth: 3 }
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
                }

            };
            chart.draw(data, option);
            var hide1 = document.getElementById("checkbox2");
            var hide2 = document.getElementById("checkbox3");
            var hide4 = document.getElementById("checkbox5");
            var hide5 = document.getElementById("checkbox6");
            var hide6 = document.getElementById("checkbox7");
            hide1.onclick = function () {
                common();
            }
            hide2.onclick = function () {
                common();
            }
            hide4.onclick = function () {

                common();
            }
            hide5.onclick = function () {

                common();
            }
            hide6.onclick = function () {

                common();
            }
            function common() {

                view = new google.visualization.DataView(data);
                var arrya = [];
                var options = control.getOptions();
                if ($("#checkbox2").prop('checked') == false) {

                    view.hideColumns([2]);
                    options.filterColumnIndex = [0, 1, 3, 4];     
                    arrya.push('#428bca');
                }

                if ($("#checkbox3").prop('checked') == false) {

                    view.hideColumns([3]);
                    options.filterColumnIndex = [0, 1, 3, 4];     
                    arrya.push('green');
                }

                if ($("#checkbox5").prop('checked') == false) {
                    view.hideColumns([4]);
                    options.filterColumnIndex = [0, 1, 3, 4];     
                    arrya.push('#1c91c0');

                }
                if ($("#checkbox6").prop('checked') == false) {
                    view.hideColumns([5]);
                    options.filterColumnIndex = [0, 1, 3, 4];     
                    arrya.push('#a52714');

                }
                if ($("#checkbox7").prop('checked') == false) {
                    view.hideColumns([6]);
                    options.filterColumnIndex = [0, 1, 3, 4];     
                    arrya.push('#EC36B5');

                }
                commonoption(arrya);
                chart.draw(view, option);
            }
            function removeItem(array, item) {
                for (var i in array) {
                    if (array[i] == item) {
                        lineColors.splice(i, 1);
                        break;
                    }
                }
            }
            function commonoption(count) {
                lineColors = ['#428bca', 'green', '#1c91c0', '#a52714', '#EC36B5'];
                count.forEach(function (element) {
                    removeItem(lineColors, element);
                });
            }
            $.unblockUI();


        }
    });
});








