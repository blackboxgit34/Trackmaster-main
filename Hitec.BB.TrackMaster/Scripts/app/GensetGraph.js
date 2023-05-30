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
function createCustomHTMLContent(Datetime, Fuel, rearengine, FR, location) {
   
  


    rearengine = Number(rearengine);
    var hengine = Math.floor(rearengine / 3600);
    var mengine = Math.floor(rearengine % 3600 / 60);
    var sengine = Math.floor(rearengine % 3600 % 60);

    var REWH = hengine + ':' + mengine + ':' + sengine;

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
         '<td><img src="../Trackmaster_files/Fuel/Theft.png" style="width:16px;height:16px"/> Consumption</td>' +
        '<td><b>' + FR + '</b> Liters</td>' + '</tr>' + '<tr>' +
        '<td> Rear Engine Working</td>' +
        '<td><b>' + REWH + '</b> hh:mm</td>' + '</tr>' + '<tr>' +       
        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/> Location</td>' +
        '<td><b>' + location + '</b> </td>' + '</tr>' + '</table>' + '</div>';
}

$("#BtnSearch").click(function () {
    // drawChart();
    $.blockUI({ message: '<img src="../../Content/Trackmaster_files/loader.gif" /> ' });


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
            //data.addColumn('number', 'Front Engine Working');
            data.addColumn('number', 'Rear Engine Working');
            //data.addColumn('number', 'Distance');
            //data.addColumn('number', 'Speed');


            data.addRows(chartsdata.length);
            var fuelreading = 0
            for (var i = 0; i < chartsdata.length; i++) {



                if (parseInt(chartsdata[0].FuelLevel))


                fuelreading = parseInt(chartsdata[0].FuelLevel) - parseInt(chartsdata[i].FuelLevel)

                data.setValue(i, 0, "'Time  " + chartsdata[i].DataDate + "  Location   " + chartsdata[i].Location + " R-EngineWorkingTime(hh:mm:ss)   " + chartsdata[i].rearengine + "'");



                data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].FuelLevel, Math.round(chartsdata[i].rearengine),chartsdata[i].fuelconsumption, chartsdata[i].Location));

           

                    data.setValue(i, 2, chartsdata[i].FuelLevel);
           

                    //data.setValue(i, 3, Math.round(chartsdata[i].engine));
              
                    data.setValue(i, 3, Math.round(chartsdata[i].rearengine));
             
                    //data.setValue(i, 5, chartsdata[i].Distance);
            
                    //data.setValue(i, 6, chartsdata[i].Speed);
              





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
                  // colors: ['#1a237e', 'green', '#1c91c0', '#a52714', '#F7B005'],
                   colors: ['#1a237e', '#1c91c0'],
                   series: {
                       0: { targetAxisIndex: 0, lineWidth: 2 },
                       1: { targetAxisIndex: 1, lineWidth: 2 },
                       2: { lineWidth: 2 },
                       3: { lineWidth: 2 }
                   },
                   vAxes: {

                       0: { title: 'Fuel Level' },
                       1: { title: 'Genset Working Hour' }
                   },
                   hAxis: {
                       title: "TIME", titleTextStyle: {
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
            
            var hide3 = document.getElementById("checkbox4");
          
            hide1.onclick = function () {
                common();
            }
          
            hide3.onclick = function () {

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
                
                 if ($("#checkbox4").prop('checked') == false) {

                     view.hideColumns([3]);
                     arrya.push('#1c91c0');
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
             
                options.colors = ['#1a237e', '#1c91c0'];
                count.forEach(function (element) {             
                removeItem(options.colors, element);
                       
                });
               
               
            }
        
            $.unblockUI();


        }
    });
});

function GetAllVehicles() {
 
    $.blockUI({ message: '<img src="../../Content/Trackmaster_files/loader.gif" /> ' });


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
               // data.addColumn('number', 'Front Engine Working');
                data.addColumn('number', 'Rear Engine Working');
                //data.addColumn('number', 'Distance');
                //data.addColumn('number', 'Speed');

                data.addRows(chartsdata.length);
                var fuelreading = 0;
               
                for (var i = 0; i < chartsdata.length; i++) {




                    fuelreading = parseInt(chartsdata[0].FuelLevel) - parseInt(chartsdata[i].FuelLevel)

                    data.setValue(i, 0, "'Time  " + chartsdata[i].DataDate + "  Location   " + chartsdata[i].Location + "  R-EngineWorkingTime(hh:mm:ss)   " + chartsdata[i].rearengine + " '");



                    data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].FuelLevel, Math.round(chartsdata[i].rearengine), fuelreading, chartsdata[i].Location));
                   

                        data.setValue(i, 2, chartsdata[i].FuelLevel);
                   

                        //data.setValue(i, 3, Math.round(chartsdata[i].engine));
                   

                        data.setValue(i, 3, Math.round(chartsdata[i].rearengine));
                  
                        //data.setValue(i, 5, chartsdata[i].Distance);
                  
                        //data.setValue(i, 6, chartsdata[i].Speed);
                    
                   

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
                // colors: ['#1a237e', 'green', '#1c91c0', '#a52714', '#F7B005'],
                 colors: ['#1a237e', '#1c91c0'],

                 series: {
                     0: { targetAxisIndex: 0, lineWidth: 2 },
                     1: { targetAxisIndex: 1, lineWidth: 2 },
                     2: { lineWidth: 2 },
                     3: { lineWidth: 2 }
                 },
                 vAxes: {

                     0: { title: 'Fuel Level' },
                     1: { title: 'EWH' }
                 },
                 hAxis: {
                     title: "TIME", titleTextStyle: {
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
                var hide1 = document.getElementById("checkbox2");

                var hide3 = document.getElementById("checkbox4");

                hide1.onclick = function () {
                    common();
                }

                hide3.onclick = function () {

                    common();
                }


                function common() {
                    view = new google.visualization.DataView(data);
                    var arrya = [];
                    if ($("#checkbox2").prop('checked') == false) {

                        view.hideColumns([2]);
                        arrya.push('#1a237e');
                    }

                    if ($("#checkbox4").prop('checked') == false) {

                        view.hideColumns([3]);
                        arrya.push('#1c91c0');
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

                    options.colors = ['#1a237e', '#1c91c0'];
                    count.forEach(function (element) {
                        removeItem(options.colors, element);

                    });


                }

                $.unblockUI();

            }
             
        });


    });


}




