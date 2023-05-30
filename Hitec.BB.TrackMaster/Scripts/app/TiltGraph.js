var canvas;
var dataURL;
var canvas1;
var dataURL1;
var canvas2;
var dataURL2;
var canvas3;
var dataURL3;
var chart;
var chart1;
var chart2;
var chart3;
var scatterChart;
var scatterChart1;
var scatterChart2;
var scatterChart3;
$(document).ready(function () {
    GetAllVehicles();
});



$("#print").click(function () {


    debugger;
    var VehicleSelect = document.getElementById("Vehiclelist");
    var selectedText = VehicleSelect.options[VehicleSelect.selectedIndex].text;


    var name = selectedText;
    var date = $beginDate + " To " + $endDate;
   
    var newCanvas = document.querySelector('#chartContainer');

    //create image from dummy canvas
    var newCanvasImg = newCanvas.toDataURL("image/png", 1.0);

    //creates PDF from img
    var doc = new jsPDF('landscape');
    doc.setFontSize(14);
    doc.text(10, 10, "Site Location:-" + name + ", Date:- " + date);
    doc.setFillColor(135, 124, 45, 0);
    doc.addImage(newCanvasImg, 'PNG', 10, 10, 280, 150);

    doc.save("Tilt-Graph-" + name + "_" + date);
});


$("#BtnSearch").click(function () {
    //$.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important; box-shadow: 7px 7px 5px 0px rgba(192,192,192,0.9) !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: linear-gradient(120deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  style="height:60px;"/><br><marquee direction="up" scrollamount="2">Disclaimer and Fuel Efficiency Tips <br><br>(1) <b>Fuel Value may vary </b> <br><br>(2)<b>The Zic-zac line in fuel graph shows that fuel is jumping when vehicle is moving </b><br><br>(3) <b>Drive at constanct speed to improve Fuel</b> <br><br>(4)<b>Ignore Harsh Driving and overspeeding to improve fuel</b></marquee > </div>' });
    $.blockUI();
    debugger;
    //-----------------------------------------
    var color = ["#ff6384", "#5959e6", "#2babab", "#8c4d15", "#8bc34a", "#607d8b", "#009688"];
    if (scatterChart) {
        scatterChart.destroy();
    }
    var ctx = document.getElementById("chartContainer");


    var pumaid = $("#Vehiclelist").val();
   
    var dataPoints = [];
    var loc = [];
    var date = [];
    $.ajax({
        type: "Get",
        url: baseUrl + 'ReportsApi/GetTiltGraph',
        data: {
            vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
        },
        contentType: 'application/x-www-form-urlencoded',
        dataType: "json",
        success: function (data) {
            debugger;

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                 
                    dataPoints.push({ x: new Date(data[i]["Date"]), y: parseFloat(data[i]["Angle"]) });
                    loc.push((data[i]["location"]));
                    date.push((data[i]["Date"]));

                }

            }
            scatterChart = new Chart(ctx, {
                type: 'line',
                data:
                    {
                        datasets: [{
                            label: "Angle",
                            backgroundColor: "transparent",
                            borderColor: color[1],
                            pointBackgroundColor: color[1],
                            pointBorderColor: color[1],
                            pointHoverBackgroundColor: color[1],
                            pointHoverBorderColor: color[1],
                            data: dataPoints


                        }]

                    },



                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Tilt Monitoring',
                        fontSize: 18
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            beforeFooter: function (tooltipItems, data) {
                                return 'Date: ' + date[tooltipItems[0].index];
                            },
                            footer: function (tooltipItems, data) {
                                return 'Location: ' + loc[tooltipItems[0].index];
                            }
                        }
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            scaleLabel: {
                                display: true,
                                labelString: 'Time',
                                fontSize: 16
                            },

                            time: {
                                displayFormats: {

                                    'day': 'MMM D'

                                },
                                tooltipFormat: "h:mm a"
                            }



                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Angle",
                                fontSize: 16
                            }
                        }]

                    }
                }


            });




            $.unblockUI();


        }

    });




});


function GetAllVehicles() {
    //$.blockUI();
    $.ajax({
        url: baseUrl + 'ReportsApi/GetTiltdevices',
        type: 'GET',
        dataType: 'json', // added data type
        data: { custid: $custid },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            $.each(data, function (key, value) {

                $("#Vehiclelist").append($("<option></option>").val(value.Value).html(value.Text));
            });
        }
    }).done(function () {
        var pumaid = $("#Vehiclelist").val();
        var bbid = getUrlParameter("bbid");
        if (bbid) {
            pumaid = bbid;
            $("#Vehiclelist").val(bbid);
        }
     

        $("#txtdate").text($beginDate + " To " + $endDate);
        var color = ["#ff6384", "#5959e6", "#2babab", "#8c4d15", "#8bc34a", "#607d8b", "#009688"];
        if (scatterChart) {
            scatterChart.destroy();
        }
        var ctx = document.getElementById("chartContainer");

        var dataPoints = [];
        var loc = [];
        var date = [];

        $.ajax({
            type: "Get",
            url: baseUrl + 'ReportsApi/GetTiltGraph',
            data: {
                vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
            },
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (data) {
                debugger;

                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                      
                        dataPoints.push({ x: new Date(data[i]["Date"]), y: parseFloat(data[i]["Angle"]) });
                        loc.push( (data[i]["location"]) );
                        date.push((data[i]["Date"]));

                    }

                }
                scatterChart = new Chart(ctx, {
                    type: 'line',
                    data:
                        {
                            datasets: [{
                                label: "Angle",
                                backgroundColor: "transparent",
                                borderColor: color[1],
                                pointBackgroundColor: color[1],
                                pointBorderColor: color[1],
                                pointHoverBackgroundColor: color[1],
                                pointHoverBorderColor: color[1],
                                data: dataPoints


                            }]

                        },



                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Tilt Monitoring',
                            fontSize: 18
                        },
                        tooltips: {
                            enabled: true,
                            mode: 'single',
                            callbacks: {
                                beforeFooter: function (tooltipItems, data) {
                                    return 'Date: ' + date[tooltipItems[0].index];
                                },
                                footer: function (tooltipItems, data) {
                                    return 'Location: ' + loc[tooltipItems[0].index];
                                }
                            }
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        scales: {
                            xAxes: [{
                                type: 'time',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time',
                                    fontSize: 16
                                },

                                time: {
                                    displayFormats: {

                                        'day': 'MMM D'

                                    },
                                    tooltipFormat: "h:mm a"
                                }



                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: "Angle",
                                    fontSize: 16
                                }
                            }]

                        }
                    }


                });




                $.unblockUI();


            }

        });
    });


}
