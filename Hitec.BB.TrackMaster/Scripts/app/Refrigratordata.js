var data;
var chart;
var chartTitle = "Temperature Graph";
$(document).ready(function () {


    GetAllVehicles();



});


function printDiv() {
    //var VehicleSelect = document.getElementById("Vehiclelist");
    //var selectedText = VehicleSelect.options[VehicleSelect.selectedIndex].text;

    //$("#txtname").text(selectedText);
    //document.getElementById('txtvehicle').style.visibility = 'visible';
    //document.getElementById('txtvehicle').style.display = 'block';
    //var printContents = document.getElementById('chartdiv').innerHTML;
    //var originalContents = document.body.innerHTML;
    //document.body.innerHTML = printContents;
    //window.print();
    //document.body.innerHTML = originalContents;
    //document.getElementById('txtvehicle').style.visibility = 'hidden';
    //document.getElementById('txtvehicle').style.display = 'none';

    //// location.reload(true);

};
$("#BtnSearch").click(function () {

    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;    background: linear-gradient(120deg, #fdfdfd00 30%, #fdfdfd00 70%)!important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  />Loading...<br>(</div>' });

    var refid = $("#Vehiclelist").val();


    $.ajax({
        type: "Get",
        url: baseUrl + 'ReportsApi/GetRefTempDetailReport',

        data: {

            bbid: refid, beginDate: $beginDate, endDate: $endDate, CustId: $custid, offset: 0, offset: 0.0, downloadType: null, reportName: null, timeInterval: 0, sSortDir_0: 'asc', iSortCol_0: 0, sSearch: null, iDisplayStart: 0, iDisplayLength: 20000, sEcho: 1

        },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: "json",
        success: function (chartsdata) {
            createChartData(chartsdata);

            //data = new google.visualization.DataTable();
            //data.addColumn('string', 'DateTime');
            //data.addColumn('number', 'Temperature');
            ////data.addColumn('number', 'Speed');

            //data.addRows(chartsdata.aaData.length);
            //for (var i = 0; i < chartsdata.aaData.length; i++) {

            //    data.setValue((chartsdata.aaData.length - 1) - i, 0, "  Time: " + chartsdata.aaData[i].DateTime + "  Location: " + chartsdata.aaData[i].Location + "  Speed: " + chartsdata.aaData[i].Speed + "  Temp: " + chartsdata.aaData[i].Temperature + " ");
            //    data.setValue((chartsdata.aaData.length - 1) - i, 1, chartsdata.aaData[i].Temperature);
            //    //data.setValue((chartsdata.aaData.length - 1) - i, 2, chartsdata.aaData[i].Speed);
            //    //data.setValue(i, 3, chartsdata[i].Distance);

            //}
            //chart = new google.visualization.LineChart(document.getElementById('chartdiv'));
            //chart.draw(data,
            //  {
            //      width: 1205,
            //      height: 500,
            //      position: "top",
            //      fontsize: "14px",
            //      animation: {
            //          duration: 1500,
            //          easing: 'linear',
            //          startup: true
            //      },
            //      //colors: ['green', 'blue', 'red'],
            //      tooltip: { isHtml: true },    // CSS styling affects only HTML tooltips.
            //      series: {
            //          0: { targetAxisIndex: 0 },
            //          1: { targetAxisIndex: 1 }
            //      },
            //      vAxes: {

            //          0: { title: 'Temperature' },
            //          //1: { title: 'Speed' }
            //      },
            //      bar: { groupWidth: '90%' },
            //      hAxis: { title: "Temprature Analysis", titleTextStyle: { color: "green" }, textPosition: "none" }, vAxis: { title: 'Temprature in(Degree)', titleTextStyle: { color: "red" } },
            //  });




            $.unblockUI();
        }
    });


    $.ajax({
        type: "Get",
        url: baseUrl + 'ReportsApi/GetRefTempReport',
        data: {

            bbid: refid, beginDate: $beginDate, endDate: $endDate, CustId: $custid, CommandName: 'A', downloadType: null, reportName: null, sSortDir_0: 'asc', iSortCol_0: 0, sSearch: null, iDisplayStart: 0, iDisplayLength: 2000, sEcho: 1

        },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: "json",
        success: function (Gaugedata) {


            var data = google.visualization.arrayToDataTable([
              ['Label', 'Value'],
              ['Highest-Temp', parseFloat(Gaugedata.aaData[0].HighestTemperature)],
              ['Current-Temp', parseFloat(Gaugedata.aaData[0].CurrentTemperature)],
              ['Lowest-Temp', parseFloat(Gaugedata.aaData[0].LowestTemperature)]
            ]);

            var options = {
                width: 400, height: 120,
                redFrom: 90, redTo: 100,
                yellowFrom: 75, yellowTo: 90,
                minorTicks: 5
            };

            var chart = new google.visualization.Gauge(document.getElementById('Gauge_div'));

            chart.draw(data, options);

            //setInterval(function () {
            //    data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
            //    chart.draw(data, options);
            //}, 13000);
            //setInterval(function () {
            //    data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
            //    chart.draw(data, options);
            //}, 5000);
            //setInterval(function () {
            //    data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
            //    chart.draw(data, options);
            //}, 26000);




            //-------Gauge---------------


            //----

        }
    });
});


function GetAllVehicles() {

    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;    background: linear-gradient(120deg, #fdfdfd00 30%, #fdfdfd00 70%)!important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  />Loading...<br>(</div>' });

    var url = baseUrl + 'AdminAPI/GetVehicleList';
    param = { custId: $custid };
    $.get(url, param, function (data) {

        $.each(data, function (key, value) {

            $("#Vehiclelist").append($("<option></option>").val(value.BBID).html(value.VehicleName));
        });
    }).done(function () {
        var refid = $("#Vehiclelist").val();




        $("#txtdate").text($beginDate + " To " + $endDate);

        $.ajax({
            type: "Get",
            url: baseUrl + 'ReportsApi/GetRefTempDetailReport',
            data: {

                bbid: refid, beginDate: $beginDate, endDate: $endDate, CustId: $custid, offset: 0, offset: 0.0, downloadType: null, reportName: null, timeInterval: 0, sSortDir_0: 'asc', iSortCol_0: 0, sSearch: null, iDisplayStart: 0, iDisplayLength: 20000, sEcho: 1

            },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: "json",
            success: function (chartsdata) {
                createChartData(chartsdata);
                //data = new google.visualization.DataTable();
                //data.addColumn('string', 'DateTime');
                //data.addColumn('number', 'Temperature');
                //data.addColumn('number', 'Speed');

                //data.addRows(chartsdata.aaData.length);
                //for (var i = 0; i < chartsdata.aaData.length; i++) {

                //    data.setValue((chartsdata.aaData.length - 1) - i, 0, "  Time: " + chartsdata.aaData[i].DateTime + "  Location: " + chartsdata.aaData[i].Location + "  Speed: " + chartsdata.aaData[i].Speed + "  Temp: " + chartsdata.aaData[i].Temperature + " ");
                //    data.setValue((chartsdata.aaData.length - 1) - i, 1, chartsdata.aaData[i].Temperature);
                //    data.setValue((chartsdata.aaData.length - 1) - i, 2, chartsdata.aaData[i].Speed);
                //    //data.setValue(i, 3, chartsdata[i].Distance);

                //}
                //chart = new google.visualization.LineChart(document.getElementById('chartdiv'));
                //chart.draw(data,
                //  {
                //      width: 1205,
                //      height: 500,
                //      position: "top",
                //      fontsize: "14px",
                //      //colors: ['green', 'blue', 'red'],
                //      tooltip: { isHtml: true },
                //      animation: {
                //          duration: 1500,
                //          easing: 'linear',
                //          startup: true
                //      },
                //      // CSS styling affects only HTML tooltips.
                //      series: {
                //          0: { targetAxisIndex: 0 },
                //          1: { targetAxisIndex: 1 }
                //      },
                //      vAxes: {

                //          0: { title: 'Temperature' },
                //          1: { title: 'Speed' }
                //      },
                //      bar: { groupWidth: '90%' },
                //      hAxis: { title: "Time ", titleTextStyle: { color: "green" }, textPosition: "none" }, vAxis: { title: 'Temprature(Celsius)', titleTextStyle: { color: "blue" } },
                //  });


                $.unblockUI();


            }
        });

        $.ajax({
            type: "Get",
            url: baseUrl + 'ReportsApi/GetRefTempReport',
            data: {

                bbid: refid, beginDate: $beginDate, endDate: $endDate, CustId: $custid, CommandName: 'A', downloadType: null, reportName: null, sSortDir_0: 'asc', iSortCol_0: 0, sSearch: null, iDisplayStart: 0, iDisplayLength: 2000, sEcho: 1

            },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: "json",
            success: function (Gaugedata) {


                var data = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],

                  ['Current-Temp', parseFloat(Gaugedata.aaData[0].CurrentTemperature)],
                  ['Lowest-Temp', parseFloat(Gaugedata.aaData[0].LowestTemperature)],
                   ['Highest-Temp', parseFloat(Gaugedata.aaData[0].HighestTemperature)]
                ]);

                var options = {
                    width: 400, height: 120,
                    redFrom: 90, redTo: 100,
                    yellowFrom: 75, yellowTo: 90,
                    minorTicks: 5
                };

                var chart = new google.visualization.Gauge(document.getElementById('Gauge_div'));

                chart.draw(data, options);

                //setInterval(function () {
                //    data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
                //    chart.draw(data, options);
                //}, 13000);
                //setInterval(function () {
                //    data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
                //    chart.draw(data, options);
                //}, 5000);
                //setInterval(function () {
                //    data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
                //    chart.draw(data, options);
                //}, 26000);




                //-------Gauge---------------


                //----
                $.unblockUI();
            }
        });

    });


}


function createChartData(chartData) {
    chartTitle = "Temperature graph for " + $("#Vehiclelist :selected").text() + " (" + $beginDate + " - " + $endDate + ")";
    var data = chartData.aaData;
    var temppoints = []; var speedpoints = []; var interval;
    interval = 60;
    for (var i = data.length - 1; i > 0; i--) {
        var key = data[i];
        var tempobj = { x: new Date(Date.parse(key.DateTime)), y: key.Temperature };
        var speedobj = { x: new Date(Date.parse(key.DateTime)), y: key.Speed };
        temppoints.push(tempobj); speedpoints.push(speedobj);
    }
    var chart = new CanvasJS.Chart("chartdiv",
    {
        toolTip: {
            shared: true
        },
        zoomEnabled: true,
        legend: {
            fontFamily: "verdana",
            verticalAlign: "bottom"
        },
        axisX: {
            title: "time",
            intervalType: "minute",
            labelAutoFit: true,
        },
        axisY: {
            title: "Temperature"
        },
        title: {
            text: chartTitle,
            fontSize: 20
        },
        data: [
            {
                name: "Temperature",
                type: "line",
                dataPoints: temppoints,
                xValueType: "dateTime",
                showInLegend: true,
                xValueFormatString: "DD/MM/YYYY HH:mm TT",
            },
            {
                name: "Speed",
                type: "line",
                dataPoints: speedpoints,
                xValueType: "dateTime",
                showInLegend: true
            }
        ]
    });

    chart.render();
    document.getElementById("printChart").addEventListener("click", function () {
        chart.print();
    });
}
