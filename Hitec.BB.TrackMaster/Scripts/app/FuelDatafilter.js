var data;
var chart;
var colors;

var dataarray = [];
var size;

var hide1;
var hide4;
var hide5;

var st;
var ed;
var data1;
var dash;
var chart1;
var control;
var OGcolors;
var OGflag = false;

$(document).ready(function () {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(GetAllVehicles);

    google.load('visualization', '1', { packages: ['controls', 'charteditor'] });

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
            var ur = baseUrl + 'CustomAPI/GetTankSize';
            $.ajax({
                dataType: "json",
                type: "GET",
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                url: ur,
                data: { vehicleId: $('#Vehiclelist').val() },
                success: function (res) {
                    size = res;

                },
                complete: function () {
                    debugger;
                    $.ajax({
                        type: "Get",
                        url: baseUrl + 'CustomAPI/FuelDataGraph',
                        data: {
                            vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
                        },
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: "json",
                        success: function (chartsdata) {


                            google.setOnLoadCallback(drawChart);

                            hide1 = document.getElementById("checkbox2");
                            hide4 = document.getElementById("checkbox5");
                            hide5 = document.getElementById("checkbox6");

                            hide1.onclick = function () {
                                common1();
                            }
                            hide4.onclick = function () {
                                common1();
                            }
                            hide5.onclick = function () {
                                common1();
                            }

                            function common1() {
                                debugger
                                var view1 = new google.visualization.DataView(data1);

                                var arrya = [];
                                var options = control.getOptions();
                                var filterColumnIndex = [0, 1];
                                if ($("#checkbox2").prop('checked') == false) {
                                    view1.hideColumns([2]);                                  
                                    options.filterColumnIndex = [0,1,3,4];                                 
                                    arrya.push('#0d47a1');
                                   
                                }
                                 if ($("#checkbox5").prop('checked') == false) {
                                     view1.hideColumns([3]);
                                     options.filterColumnIndex = [0,1,2,4];
                                    arrya.push('#ffbb33');
                                }
                                 if ($("#checkbox6").prop('checked') == false) {
                                     view1.hideColumns([4]);
                                     options.filterColumnIndex = [0,1,2,3];
                                    arrya.push('#CC0000');
                                }



                                //commonoption1(arrya);

                                //chart1.setView(view1);                                                             
                                //chart1.setOption('colors', lineColors);
                                //chart1.draw();

                                //control.setView(view1); 
                                //control.setOption('ui.chartOptions.colors', lineColors);
                                //control.setOptions(options);                                
                                //control.draw();


                                commonoption1(arrya);

                                //chart1.setView(view1);
                                chart1.setOption('colors', lineColors);


                                //control.setView(view1);
                                control.setOption('ui.chartOptions.colors', lineColors);
                                control.setOptions(options);
                                dash.bind([control], [chart1]);
                                dash.draw(view1);
                            }

                            $.unblockUI();

                        }
                    });


                    // cylindricalchart();

                    ////-------------------------Get History Fuel Data On Change-------------------------------------
                    //var url = baseUrl + 'CustomAPI/HistoryFuelData';
                    //drawcylinder(url);
                    ////-------------------------Get Current Fuel Data On Change-------------------------------------
                    var urlcurrent = baseUrl + 'CustomAPI/CurrentFuelData';
                    drawcylinder(urlcurrent);
                },
                error: function (error) {
                    toastr.error("something went wrong!");
                    $.unblockUI();
                }
            });
        });
    }
});

function drawcylinder(url) {


    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: url,
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
}
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
function createCustomHTMLContent(Datetime, Fuel, speed, Distance, location) {

    return '<div style="padding:5px 5px 5px 5px;">' +
        '<h5>Fuel Details </h5>' +
        '<table class="table">' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/time.png" style="width:16px;height:16px"/><h7>DataDate</h7>  </td>' +
        '<td><h5>' + Datetime + '</h5></td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/Filling.jpg" style="width:16px;height:16px"/><h7>Fuel</h7> </td>' +
        '<td><h5>' + Fuel + ' Liters</h5></td>' + '</tr>' + '<tr>' +

        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/><h7>Speed</h7> </td>' +
        '<td><h5>' + speed + ' KM/Hour</h5></td>' + '</tr>' + '<tr>' +

        '<td><img src="../Trackmaster_files/Fuel/distance.png" style="width:16px;height:16px"/><h7>Distance</h7> </td>' +
        '<td><h5>' + Distance + ' KM</h5></td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/><h7>Location</h7> </td>' +
        '<td><h5>' + location + ' </h5></td>' + '</tr>' + '</table>' + '</div>';
}
$("#fueltheftid").click(function () {
    debugger
    //Declare a new date object
    var stRange = new Date();
    var edRange = new Date();

    stRange = moment(st).format('MMM D YYYY h:mm:ss a');
    edRange = moment(ed).format('MMM D YYYY h:mm:ss a');

    $('#fueltheftid').attr('target', '_blank');
    $('#fueltheftid').attr("href", "../customreport/fueltheftreport?fromdate=" + stRange + "&Todate=" + edRange + "&vehicleid=" + $('#Vehiclelist :selected').text());
});
$("#fuelfillinid").click(function () {
    debugger
    var stRange = new Date();
    var edRange = new Date();

    stRange = moment(st).format('MMM D YYYY h:mm:ss a');
    edRange = moment(ed).format('MMM D YYYY h:mm:ss a');

    $('#fuelfillinid').attr('target', '_blank');
    $('#fuelfillinid').attr("href", "../customreport/fuelfillingreport?fromdate=" + stRange + "&Todate=" + edRange + "&vehicleid=" + $('#Vehiclelist :selected').text());
});
$("#fuelmileageid").click(function () {
    debugger
    var stRange = new Date();
    var edRange = new Date();

    stRange = moment(st).format('MMM D YYYY h:mm:ss a');
    edRange = moment(ed).format('MMM D YYYY h:mm:ss a');

    $('#fuelmileageid').attr('target', '_blank');
    $('#fuelmileageid').attr("href", "../customreport/FuelMilageReport?fromdate=" + stRange + "&Todate=" + edRange + "&vehicleid=" + $('#Vehiclelist :selected').text());
});
//-----------------------------------------------------------------------------------------------

$("#BtnSearch").click(function () {

    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important; box-shadow: 7px 7px 5px 0px rgba(192,192,192,0.9) !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: linear-gradient(120deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  style="height:60px;"/><br><marquee direction="up" scrollamount="2"> <img src="../../Trackmaster_files/Fuel/Fuel.png" style="height:24px;" /><b>Decalaration</b><br><br>(1) <b>Fuel Graphical Report is more accurate than tabular report.<br>So always verify fuel filling and theft report through Graphical Report.<br><br>(2)Tank Fuel Level may vary with tyre pressure ,load in the vehicle and vehicle standing position.Also vary with atmospheric temprature changes.</b><br> <br><br></marquee > </div>' });

    //var url = baseUrl + 'CustomAPI/HistoryFuelData';
    //drawcylinder(url);

    var urlcurrent = baseUrl + 'CustomAPI/CurrentFuelData';
    drawcylinder(urlcurrent);
    // Zoom Chart
    google.setOnLoadCallback(drawChart);

    //-----------------------------------------
    var ur1 = baseUrl + 'CustomAPI/GetTankSize';
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: ur1,
        data: { vehicleId: $('#Vehiclelist').val() },
        success: function (data) {
            size = data;

        },
        complete: function () {
            var pumaid = $("#Vehiclelist").val();
            console.log(pumaid);
            $.ajax({
                type: "Get",
                url: baseUrl + 'CustomAPI/FuelDataGraph',
                data: {
                    vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (chartsdata) {

                    var hide1 = document.getElementById("checkbox2");
                    var hide4 = document.getElementById("checkbox5");
                    var hide5 = document.getElementById("checkbox6");

                    hide1.onclick = function () {
                        common1();
                    }
                    hide4.onclick = function () {
                        common1();
                    }
                    hide5.onclick = function () {
                        common1();
                    }

                    //function common1() {
                    //    debugger
                    //    var view1 = new google.visualization.DataView(data1);

                    //    var arrya = [];
                    //    if ($("#checkbox2").prop('checked') == false) {
                    //        view1.hideColumns([2]);
                    //        arrya.push('#0d47a1');
                    //    }

                    //    if ($("#checkbox5").prop('checked') == false) {
                    //        view1.hideColumns([3]);
                    //        arrya.push('#ffbb33');
                    //    }
                    //    if ($("#checkbox6").prop('checked') == false) {
                    //        view1.hideColumns([4]);
                    //        arrya.push('#CC0000');
                    //    }

                    //    commonoption1(arrya);
                       
                    //    dash.bind([control], [chart1]);
                    //    dash.draw(view1);

                    //}
                    function common1() {
                        debugger
                        var view1 = new google.visualization.DataView(data1);

                        var arrya = [];
                        var options = control.getOptions();
                        var filterColumnIndex = [0, 1];
                        if ($("#checkbox2").prop('checked') == false) {
                            view1.hideColumns([2]);
                            //options.filterColumnIndex = [0, 1, 3, 4];
                            arrya.push('#0d47a1');

                        }
                        if ($("#checkbox5").prop('checked') == false) {
                            view1.hideColumns([3]);
                            //options.filterColumnIndex = [0, 1, 2, 4];
                            arrya.push('#ffbb33');
                        }
                        if ($("#checkbox6").prop('checked') == false) {
                            view1.hideColumns([4]);
                         /*   options.filterColumnIndex = [0, 1, 2, 3];*/
                            arrya.push('#CC0000');
                        }

                        commonoption1(arrya);

                        //chart1.setView(view1);
                        chart1.setOption('colors', lineColors);
                     

                        //control.setView(view1);
                        control.setOption('ui.chartOptions.colors', lineColors);
                        control.setOptions(options);
                        dash.bind([control], [chart1]);
                        dash.draw(view1);

                    }
                    $.unblockUI();

                }
            });



        },
        error: function (error) {
            toastr.error("something went wrong!");
            $.unblockUI();
        }
    });

});

var lineColors = ['#0d47a1', '#ffbb33', '#CC0000'];
function drawChart() {

    var pumaid = $("#Vehiclelist").val();

    debugger
    $.ajax({
        type: "Get",
        url: baseUrl + 'CustomAPI/FuelDataGraph',
        data: {
            vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (chartsdata) {

            data1 = new google.visualization.DataTable();
            data1.addColumn('datetime', 'Datadate');
            data1.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
            data1.addColumn('number', 'Fuellevel');
            data1.addColumn('number', 'Distance');
            data1.addColumn('number', 'speed');

            for (var i = 0; i < chartsdata.length; i++) {
                var tooltip = createCustomHTMLContent(chartsdata[i].DataDate, parseInt(chartsdata[i].FuelLevel), parseInt(chartsdata[i].Speed), parseInt(chartsdata[i].Distance), chartsdata[i].Location);
                data1.addRow([new Date(chartsdata[i].DataDate), tooltip, parseInt(chartsdata[i].FuelLevel), parseInt(chartsdata[i].Distance), parseInt(chartsdata[i].Speed)]);
            }

            dash = new google.visualization.Dashboard(document.getElementById('dashboard_div'));

            chart1 = new google.visualization.ChartWrapper({
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
                        2: { lineWidth: 2 },
                        3: { lineWidth: 2 }
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
                    filterColumnIndex: [0,1,2,3,4],
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
                                2: { lineWidth: 2 },
                                3: { lineWidth: 2 }
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
                    }
                },

                state: {
                    range: {
                        start: new Date($beginDate)
                    }
                }
            });


            dash.bind([control], [chart1]);

            dash.draw(data1);

            google.visualization.events.addListener(control, 'statechange', function () {
                debugger
                var state = control.getState();
                // Get the selected date and time range from the control
                st = state.range.start;
                ed = state.range.end;
            });

        }
    });
}
function commonoption1(count) {
   
  
    lineColors =  ['#0d47a1', '#ffbb33', '#CC0000']
 
    count.forEach(function (element) {
        removeItem1(lineColors, element);
        
    });



}

function removeItem1(array, item) {
    debugger
    for (var i in array) {
        if (array[i] == item) {
            lineColors.splice(i, 1);
            break;
        }
    }
}

function getOptionsColor() {
    return chart1.getOption('colors');
}

function getOptionsControlColor() {
    return control.getOption('colors');
}

function getChartOptions() {
    return chart1.getOptions('options');
}










