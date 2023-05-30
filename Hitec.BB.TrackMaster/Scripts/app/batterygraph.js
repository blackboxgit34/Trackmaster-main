var data;
var chart;
var colors;

var dataarray = [];


$(document).ready(function () {


   
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(GetAllVehicles);
    function GetAllVehicles() {


        $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;    background: linear-gradient(120deg, #fdfdfd00 30%, #fdfdfd00 70%)!important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  />Loading...<br></div>' });



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
                url: baseUrl + 'CustomAPI/batteryGraph',
                data: {
                    vehicleId: pumaid, beginDate: $beginDate, endDate: $endDate
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                success: function (chartsdata) {
                    data = new google.visualization.DataTable();
                    data.addColumn('string', 'Datadate');
                    data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
                    data.addColumn('number', 'Battery');


                    data.addRows(chartsdata.length);
                    for (var i = 0; i < chartsdata.length; i++) {
                        data.setValue(i, 0, "  Time:-" + chartsdata[i].DataDate + "  Location:-" + chartsdata[i].Location + "    Fuel:-" + chartsdata[i].FuelLevel + " ");
                        data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].FuelLevel, chartsdata[i].Location));
                        data.setValue(i, 2, chartsdata[i].FuelLevel);


                    }
                    chart = new google.visualization.LineChart(document.getElementById('chartdiv'));



                    var option = {
                        width: 1205,
                        height: 400,
                        position: "top",

                        fontsize: "14px",
                        tooltip: { isHtml: true },
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

                        hAxis: {
                            title: "Battery Details", titleTextStyle: {
                                color: "green", fontSize: 24,

                            }, textPosition: "none"
                        }, vAxis: {
                            title: 'Battery Level(%)', titleTextStyle: {
                                color: '#1a237e',
                                fontSize: 24,

                            }
                        },
                    };
                    chart.draw(data, option);
                    $.unblockUI();

                }
            });





        });


    }
 
    //google.setOnLoadCallback(GetAllVehicles);
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


function createCustomHTMLContent(Datetime, Fuel, location) {

    return '<div style="padding:5px 5px 5px 5px;">' +
        '<h5>Battery Details </h5>' +
        '<table class="table">' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/time.png" style="width:16px;height:16px"/><h7>DataDate</h7>  </td>' +
        '<td><h5>' + Datetime + '</h5></td>' + '</tr>' + '<tr>' +
        '<td><img src="../Trackmaster_files/Fuel/Filling.jpg" style="width:16px;height:16px"/><h7>Battery Voltage</h7> </td>' +
        '<td><h5>' + Fuel + ' %</h5></td>' + '</tr>' + '<tr>' +

      
        '<td><img src="../Trackmaster_files/Fuel/speed.png" style="width:16px;height:16px"/><h7>Location</h7> </td>' +
        '<td><h5>' + location + ' </h5></td>' + '</tr>' + '</table>' + '</div>';
}



$("#BtnSearch").click(function () {

    
    $.blockUI({ message: '<div style=" width: 450px !important; border: none !important; border-radius: 21px !important;background: rgba(192,192,192,0.9);position: absolute !important;background: -moz-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -webkit-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important; background: -o-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;background: -ms-linear-gradient(30deg, rgba(192,192,192,0.9) 30%, rgba(192,192,192,0.9) 70%) !important;    background: linear-gradient(120deg, #fdfdfd00 30%, #fdfdfd00 70%)!important;font-size:  14px !important;font-weight: normal !important; ">   <img src="../../Content/Trackmaster_files/loader.gif"  />Loading...<br></div>' });

  


 
     

        var boxid = $("#Vehiclelist").val();
      

        $.ajax({
            type: "Get",
            url: baseUrl + 'CustomAPI/batteryGraph',
            data: {
                vehicleId: boxid, beginDate: $beginDate, endDate: $endDate
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            success: function (chartsdata) {
                data = new google.visualization.DataTable();
                data.addColumn('string', 'Datadate');
                data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
                data.addColumn('number', 'Battery');


                data.addRows(chartsdata.length);
                for (var i = 0; i < chartsdata.length; i++) {
                    data.setValue(i, 0, "  Time:-" + chartsdata[i].DataDate + "  Location:-" + chartsdata[i].Location + "    Fuel:-" + chartsdata[i].FuelLevel + " ");
                    data.setValue(i, 1, createCustomHTMLContent(chartsdata[i].DataDate, chartsdata[i].FuelLevel, chartsdata[i].Location));
                    data.setValue(i, 2, chartsdata[i].FuelLevel);


                }
                chart = new google.visualization.LineChart(document.getElementById('chartdiv'));



                var option = {
                    width: 1205,
                    height: 400,
                    position: "top",

                    fontsize: "14px",
                    tooltip: { isHtml: true },
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

                    hAxis: {
                        title: "Battery Details", titleTextStyle: {
                            color: "green", fontSize: 24,

                        }, textPosition: "none"
                    }, vAxis: {
                        title: 'Battery Level(%)', titleTextStyle: {
                            color: '#1a237e',
                            fontSize: 24,

                        }
                    },
                };
                chart.draw(data, option);
                $.unblockUI();

            }
        });
    

 
   

});










