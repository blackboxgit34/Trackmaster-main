$(document).ready(function () {

    drawChart();



});


function drawChart() {
    debugger;


        $.ajax({
            type: "Get",
            url: baseUrl + 'CustomAPI/VehicleStatus',
            data: {
                custid: $custid
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chartsdata) {


             
        
           
                debugger;

                var data = google.visualization.arrayToDataTable([
           ['Status', 'Count'],
           ['Total', parseInt(chartsdata[0].Total)],
           ['Moving', parseInt(chartsdata[0].Moving)],
           ['Parked', parseInt(chartsdata[0].Parked)],
           ['Highspeed', parseInt(chartsdata[0].Highspeed)],
           ['IgnitionOn', parseInt(chartsdata[0].IgnitionOn)],
           ['Unreachable', parseInt(chartsdata[0].Unreachable)]
                ]);


                var table = new google.visualization.Table(document.getElementById('table1'));
                table.draw(data, {
                    showRowNumber: true,
                    width: '100%',
                    height: '100%'
                });



                debugger;
                var options = {
                    title: 'Pie Chart',
                    is3D: true,
                };

                var chart = new google.visualization.PieChart(document.getElementById('chartdiv'));
                chart.draw(data, options);




            

            }
        });


        $.ajax({
            type: "Get",
            url: baseUrl + 'CustomAPI/VehicleStatus',
            data: {
                custid: $custid
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chartsdata) {





                debugger;

                var data = google.visualization.arrayToDataTable([
           ['Status', 'Count Of Vehicles'],
           ['Total', parseInt(chartsdata[0].Total)],
           ['Moving', parseInt(chartsdata[0].Moving)],
           ['Parked', parseInt(chartsdata[0].Parked)],
           ['Highspeed', parseInt(chartsdata[0].Highspeed)],
           ['IgnitionOn', parseInt(chartsdata[0].IgnitionOn)],
           ['Unreachable', parseInt(chartsdata[0].Unreachable)]
                ]);


                var table = new google.visualization.Table(document.getElementById('table2'));
                table.draw(data, {
                    showRowNumber: true,
                    width: '100%',
                    height: '100%'
                });



                debugger;
                var options = {
                    title: 'Distance Graph',
                    is3D: true,
                };

                var chart = new google.visualization.BarChart(document.getElementById('chartdiv1'));
                chart.draw(data, options);






            }
        });
       
    
        $.ajax({
            type: "Get",
            url: baseUrl + 'CustomAPI/VehicleStatus',
            data: {
                custid: $custid
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chartsdata) {





                debugger;

                var data = google.visualization.arrayToDataTable([
           ['Status', 'Count Of Vehicles'],
           ['Total', parseInt(chartsdata[0].Total)],
           ['Moving', parseInt(chartsdata[0].Moving)],
           ['Parked', parseInt(chartsdata[0].Parked)],
           ['Highspeed', parseInt(chartsdata[0].Highspeed)],
           ['IgnitionOn', parseInt(chartsdata[0].IgnitionOn)],
           ['Unreachable', parseInt(chartsdata[0].Unreachable)]
                ]);


                var table = new google.visualization.Table(document.getElementById('table4'));
                table.draw(data, {
                    showRowNumber: true,
                    width: '100%',
                    height: '100%'
                });



                debugger;
                var options = {
                 
                    position: "top",
                    fontsize: "14px",

                    series: {
                        0: { targetAxisIndex: 0 },
                        1: { targetAxisIndex: 1 }
                    },
                    vAxes: {

                        0: { title: 'FuelLevel' },
                        1: { title: 'Speed' }
                    },
                    hAxis: { title: "Fuel Details", titleTextStyle: { color: "green" }, textPosition: "none" }, vAxis: { title: 'Fuel Level(Liters)', titleTextStyle: { color: "red" } },
                
                };

                var chart = new google.visualization.LineChart(document.getElementById('chartdiv3'));
                chart.draw(data, options);






            }
        });





}


