
    $(document).ready(function () {
           
        geocoder = new google.maps.Geocoder();
        var lat = GET('lat');
        var lng = GET('longi');
        if (lat == "") {
            lat = '30.724149';
            lng = '76.76';
        }
        var myLatlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
        var myOptions = {
            zoom: 14,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        var pinImage = new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/009900/");
        marker = new google.maps.Marker({
            position: myLatlng,
            icon: pinImage,
            map: map,
            title: "Add location",
            draggable: true

        });
        //for clearing when user search by place
        markersCodeAddress.push(marker);

        // info window
        infowindow = new google.maps.InfoWindow({
            content: html
        });
        google.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
        });


        //------------------------------
        $(".select2").select2({
            placeholder: "select an Options.",

        });


        ajaxForPopUp();
        appendVehicleDDL();
        var baseurl1 = apiBase.apiurl;
        // var baseurl1 = '@System.Configuration.ConfigurationManager.AppSettings["apibaseurl"]';
        //method for appending poi list
        function ajaxForPopUp() {
            var baseurl = apiBase.apiurl;

            $.ajax({
                url: baseurl + 'CommonApi/GetPOI?custid=' + $custid,
                type: "get",
                async: false,
                success: function (data) {
                    var result = data;
                    if (result.length > 0) {
                        $('#ddlStartLocationPOI').append($('<option disabled selected></option>').val("").html("Select Uers"));
                        $('#ddlEndLocationPOI').append($('<option disabled selected></option>').val("").html("Select Uers"));

                        $.each(result, function (j, item) {
                            $('#ddlStartLocationPOI').append($('<option></option>').val(item.id).html(item.details));
                            $('#ddlEndLocationPOI').append($('<option></option>').val(item.id).html(item.details));
                            $('#ddlMoreLocationsPOI').append($('<option></option>').val(item.id).html(item.details));

                        });
                    }

                },
                error: function () {
                    connectionError();
                }
            });
        }
        function appendVehicleDDL() {
            $.ajax({
                dataType: "json",
                type: "GET",
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                url: apiBase.apiurl + "AdminAPI/GetVehicles",

                data: { custId: $custid },
                success: function (result) {

                    var data = result;

                    if (data.length > 0) {
                        $('#ddlVehicleList').append($('<option></option>').val(0).html("All Vehicle's"));
                        $.each(data, function (j, item) {
                            $('#ddlVehicleList').append($('<option></option>').val(item.Value).html(item.Text));

                        });
                    }

                }
            });
        }
        $(":checkbox").attr('disabled', 'disabled');
        $(":button").attr('disabled', 'disabled');
    });
var map;
var html = "<table cellpadding='5' cellspacing='5' style='width:450px;'>" +
         "<tr><td>Name POI:</td> <td><input type='text' class='text' style='width:250px;' id='name'/> </td> </tr>" +
         "<tr><td></td><td><input type='button' value='Save' onclick='saveData()'/></td></tr><tr><td><span id='message'></span></td></tr>";
var marker;
var infowindow;
var geocoder;

// save data
function saveData() {
    var message = "";

    var lat = GET('lat');
    var lng = GET('longi');
    var name = decodeURIComponent(document.getElementById("name").value);
    if (name == '') {

        alert('Please enter location');
        return false;
    }
    else {
        var latlng = marker.getPosition();
        lat = latlng.lat();
        lng = latlng.lng();
        var MyUrl = apiBase.apiurl + "CommonApi/AddPOIntrest";
        $.ajax({

            url: MyUrl,
            type: "GET",
            data: { custid: $custid, lat: lat, longi: lng, location: name },


            //contentType: 'application/json',

            success: function (data) {


                if (data == "Location Exists") {
                    message = "Location Already Exist!";
                    $("#message").html("Location Already Exist!");
                    $("#message").css("color", "red");
                }
                else {
                    if (data == false) {
                        message = "Your POI limit is over. If you want to add new POIs than please contact Our Market Executives.";
                        $("#message").html("Your POI limit is over. If you want to add new POIs than please contact Our Market Executives.");
                        $("#message").css("color", "red");
                    }
                    else {
                    }
                    message = "Location Saved Succesfully!";
                    $("#message").html("Location Saved Succesfully!");
                    $("#message").css("color", "green");
                    $("#name").val("");
                }
                alert(message);
                location.reload();
            }
        });
    }


}

// download URL

// do nothing
function doNothing() { }

$("#btnaddroute").click(function () {
    window.location.href = "@Url.Action('ManageRoute', 'settings')";
});



    var endLocationLat;
var endLocationLong;

google.maps.event.addDomListener(window, 'load', initialize1);
function initialize1() {
    var input = document.getElementById('addressPlace');
    var options = {
        componentRestrictions: { country: 'IN' }
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', function () {

        var place = autocomplete.getPlace();
        // place variable will have all the information you are looking for.
        console.log(place.geometry['location'].lat());
        endLocationLat = place.geometry['location'].lat();
        endLocationLong = place.geometry['location'].lng();

        console.log(place.geometry['location'].lng());
        codeAddress();
    });
}


var markersCodeAddress = [];

function codeAddress() {

    var address = document.getElementById('addressPlace').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            $('#LatLng').val(results[0].geometry.location);
            var pinImage = new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/009900/");
            clearLocations();
            marker = new google.maps.Marker({
                // map: map,
                position: results[0].geometry.location,
                icon: pinImage,
                map: map,
                title: "Add location",
                draggable: true
            });
            markersCodeAddress.push(marker);

            // info window
            infowindow = new google.maps.InfoWindow({
                content: html
            });
            google.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
            });
            google.maps.event.addDomListener(window, 'load', initialize);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });



}

function clearLocations() {
    for (var i = 0; i < markersCodeAddress.length; i++) {
        markersCodeAddress[i].setMap(null);
    }
    markersCodeAddress.length = 0;
}

    //<![CDATA[
    var map = null;
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var j = 0;

function initialize() {
          
    directionsDisplay = new google.maps.DirectionsRenderer(
        {
            draggable: true

        });
    var mapOptions = {
        litemode: true,
        zoom: 14, //zoom level highest is 21 if m not wrong,
        mapTypeId: google.maps.MapTypeId.ROADMAP, //view type of the google map, ie either satellite, or road maps
        center: new google.maps.LatLng(30.850033, 76.6500523), //the longitute and latitude of the place which you want to put center in the map
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), // defining div id to get the map
mapOptions);


    directionsDisplay.setMap(map);

    directionsDisplay.addListener('directions_changed', function () {
        //  computeTotalDistance(directionsDisplay.getDirections());
    });

}


google.maps.event.addDomListener(window, "load", initialize);
j = 1;

    var startLoc; var endLoc; var morePoints = [];

      
var poiIdtesting = 0;
var poilegth = 0;
$("#ddlStartLocationPOI").change(function () {
           
    var poiId = $('option:selected', this).val();
    startLoc = commonForStartEndPOI(poiId);
    // AjaxGetVehicleNearestToPoint();
    morePointsFun(poiId);

});



$("#ddlEndLocationPOI").change(function () {



    $("#hidedivnew").css('display', 'block');


    var poiIdone = $("#ddlStartLocationPOI").val();

    var poiId = $('option:selected', this).val();

    poiId = poiIdone + ',' + poiId;
    endLoc = commonForStartEndPOI(poiId);
    if (!startLoc) {
        toastr.warning("Please select start location poi");
        return false;
    }
    //getDirections();
    morePointsFun(poiId);
});

$("#ddlMoreLocationsPOI").change(function () {
            
    var poiId = 0;
    if (poiIdtesting.length > 0) {

        var pois = $("#ddlMoreLocationsPOI").val();


        if (pois.length > poiIdtesting.length)
        {
            var myarray = pois.toString().split(',')

            for (var x = 0; x < myarray.length; x++) {
                var text = myarray[x];
                var n = poiIdtesting.includes(text);

                if (n== false)
                {
                    poiIdtesting = poiIdtesting + ',' + text;
                }
            }
        }
        else
        {
            var myarray = poiIdtesting.toString().split(',')

            for (var x = 0; x < myarray.length; x++) {
                var text = myarray[x];
                var n = pois.includes(text);

                if (n == false) {
                    poiIdtesting = poiIdtesting.toString().replace(text, '');
                }
            }

        }
        poiId = poiIdtesting;
    }
    else
    {
        poiId = $("#ddlMoreLocationsPOI").val();
    }
         
    poiIdtesting = $("#ddlMoreLocationsPOI").val();


    var poiend = $("#ddlEndLocationPOI").val();
    var poistard = $("#ddlStartLocationPOI").val();

    poiId = poistard + ',' + poiId + ',' + poiend;
       
    var poiIdsList = poiId.toString();

    morePointsFun(poiIdsList);
    if (!startLoc || !endLoc) {
        toastr.warning("Please select start and end location poi");
        return false;
    }
    // getDirections();
});



function commonForStartEndPOI(poiId) {
    var location;
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "MapAPI/GetPoiLatLongForAddTrip",
        data: { poiId: poiId },
        async: false,
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                location = data[0].lat + ',' + data[0].lng;

            }

        },
        error: function () {
            alert('Please try again');
        }
    })
    return location;
}

function morePointsFun(poiIds) {
            
    var service = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map_canvas'));
    var stations = [];

    //var poiarrya = [];
    //poiarrya.push(poiIds.replace(/['"]+/g, ''));

    //for (i = 0; i < poiarrya.length; i++) {
    //    var text = poiarrya[i];
    //}

        
    var myarray = poiIds.split(',');

    for (var x = 0; x < myarray.length; x++) {
        var text = myarray[x];

        var location;
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "MapAPI/GetPoiLatLongForAddTrip",
            data: { poiId: text },
            async: false,
            success: function (data) {

                for (i = 0; i < data.length; i++) {
                    location = data[i].lat + ',' + data[i].lng;
                    stations.push({
                        lat: parseFloat(data[i].lat),
                        lng: parseFloat(data[i].lng),
                        name: data[i].Name

                    });
                }

            }
        })
    }




    // list of points
    // var stations = [

    //     {lat: 30.7162500905273, lng: 76.7438116073608, name: "94493"},

    //    {lat: 30.3396797180176, lng: 76.4023818969727, name: "116467"},
           
            
    //{lat: 30.6545829772949, lng: 76.8206405639648, name: "116814"}

    //{ lat: 48.9812840, lng: 21.2171920, name: 'station 1' },
    //{ lat: 48.9832841, lng: 21.2176398, name: 'station 2' },
    //{ lat: 48.9856443, lng: 21.2209088, name: 'station 3' },
    //{ lat: 48.9861461, lng: 21.2261563, name: 'station 4' },
    //{ lat: 48.9874682, lng: 21.2294855, name: 'station 5' },
    //{ lat: 48.9909244, lng: 21.2295512, name: 'station 6' },
    //{ lat: 48.9928871, lng: 21.2292352, name: 'station 7' },
    //{ lat: 48.9921334, lng: 21.2246742, name: 'station 8' },
    //{ lat: 48.9943196, lng: 21.2234792, name: 'station 9' },
    //{ lat: 48.9966345, lng: 21.2221262, name: 'station 10' },
    //{ lat: 48.9981191, lng: 21.2271386, name: 'station 11' },
    //{ lat: 49.0009168, lng: 21.2359527, name: 'station 12' },
    //{ lat: 49.0017950, lng: 21.2392890, name: 'station 13' },
    //{ lat: 48.9991912, lng: 21.2398272, name: 'station 14' },
    //{ lat: 48.9959850, lng: 21.2418410, name: 'station 15' },
    //{ lat: 48.9931772, lng: 21.2453901, name: 'station 16' },
    //{ lat: 48.9963512, lng: 21.2525850, name: 'station 17' },
    //{ lat: 48.9985134, lng: 21.2508423, name: 'station 18' },
    //{ lat: 49.0085000, lng: 21.2508000, name: 'station 19' },
    //{ lat: 49.0093000, lng: 21.2528000, name: 'station 20' },
    //{ lat: 49.0103000, lng: 21.2560000, name: 'station 21' },
    //{ lat: 49.0112000, lng: 21.2590000, name: 'station 22' },
    //{ lat: 49.0124000, lng: 21.2620000, name: 'station 23' },
    //{ lat: 49.0135000, lng: 21.2650000, name: 'station 24' },
    //{ lat: 49.0149000, lng: 21.2680000, name: 'station 25' },
    //{ lat: 49.0171000, lng: 21.2710000, name: 'station 26' },
    //{ lat: 49.0198000, lng: 21.2740000, name: 'station 27' },
    //{ lat: 49.0305000, lng: 21.3000000, name: 'station 28' }

    // ];

    // Zoom and center map automatically by stations (each station will be in visible map area)
    var lngs = stations.map(function (station) { return station.lng; });
    var lats = stations.map(function (station) { return station.lat; });
    map.fitBounds({
        west: Math.min.apply(null, lngs),
        east: Math.max.apply(null, lngs),
        north: Math.min.apply(null, lats),
        south: Math.max.apply(null, lats),
    });

    // Show stations on the map as markers
    for (var i = 0; i < stations.length; i++) {
        if (!stations[i].name)
            continue;
        if (i == 0) {
            new google.maps.Marker({
                position: stations[i],
                map: map,
                title: stations[i].name,
                icon: '../Trackmaster_files/Fuel/green.png'
            });
                  
        }
        else if (i == stations.length - 1) {
            new google.maps.Marker({
                position: stations[i],
                map: map,
                title: stations[i].name,
                icon: '../Trackmaster_files/Fuel/red.png'
            });
        }
        else {
            new google.maps.Marker({
                position: stations[i],
                map: map,
                title: stations[i].name,
                icon: '../Trackmaster_files/Fuel/sky.png'
            });
        }


    }

    // Divide route to several parts because max stations limit is 25 (23 waypoints + 1 origin + 1 destination)
    for (var i = 0, parts = [], max = 8 - 1; i < stations.length; i = i + max)
        parts.push(stations.slice(i, i + max + 1));
    var totalDistance = 0;
    var totalTime = 0;

    // Callback function to process service results
    var service_callback = function (response, status) {
        if (status != 'OK') {
            console.log('Directions request failed due to ' + status);
            return;
        }
        var renderer = new google.maps.DirectionsRenderer;
        renderer.setMap(map);
        renderer.setOptions({ suppressMarkers: true, preserveViewport: true });
        renderer.setDirections(response);


                

        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        var distanceValue = document.getElementById('txtManualDistance');
        var ettValue = document.getElementById('txtETT');

            
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
                    
            var routeSegment = i + 1;
            summaryPanel.style.display = "block";
            summaryPanel.innerHTML += '<b>' + routeSegment +
                '</b><br>';
            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';

            //getting total distance
            totalDistance = totalDistance + parseFloat((route.legs[i].distance.value / 1000).toFixed(0));
            //getting total estimated time
            totalTime = totalTime + parseFloat((route.legs[i].duration.value / parseInt(60)).toFixed(0));


        }
        distanceValue.value = totalDistance;
        $("#test1").html(totalTime + "minutes");
        ettValue.value = totalTime;
    };

    // Send requests to service to get route (for stations count <= 25 only one request will be sent)
    for (var i = 0; i < parts.length; i++) {
        // Waypoints does not include first station (origin) and last station (destination)
        var waypoints = [];
        for (var j = 1; j < parts[i].length - 1; j++)
            waypoints.push({ location: parts[i][j], stopover: false });
        // Service options
        var service_options = {
            origin: parts[i][0],
            destination: parts[i][parts[i].length - 1],
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING
        };



        // Send request
        service.route(service_options, service_callback);
    }
             

}


//function getDirections() {
//    var request = {
//        origin: startLoc,
//        destination: endLoc,
//        waypoints: morePoints,
//        optimizeWaypoints: true,
//        travelMode: google.maps.TravelMode.DRIVING
//        //travelMode: google.maps.DirectionsTravelMode.DRIVING //defining the travel mode, so that you can have an estimation of time and best route
//    };
//    var ettValue = document.getElementById('txtETT');

//    directionsService.route(request, function (response, status) {
//        if (status == google.maps.DirectionsStatus.OK) {
//            directionsDisplay.setDirections(response);

//            var route = response.routes[0];
//            var summaryPanel = document.getElementById('directions-panel');
//            var distanceValue = document.getElementById('txtManualDistance');
                  

//            var totalDistance = 0;
//            var totalTime = 0;

//            summaryPanel.innerHTML = '';
//            // For each route, display summary information.
//            for (var i = 0; i < route.legs.length; i++) {

//                var routeSegment = i + 1;
//                summaryPanel.style.display = "block";
//                summaryPanel.innerHTML += '<b>' + routeSegment +
//                    '</b><br>';
//                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';

//                //getting total distance
//                totalDistance = totalDistance + parseFloat((route.legs[i].distance.value / 1000).toFixed(0));
//                //getting total estimated time
//                totalTime = totalTime + parseFloat((route.legs[0].duration.value / parseInt(60 * 60)).toFixed(0));


//            }
//            distanceValue.value = totalDistance;
//            //  ettValue.value = totalTime;
//        } else {
//            window.alert('Directions request failed due to ' + status);
//        }


//    });


//    //  var ettValue = document.getElementById('txtETT');
//    //var service = new google.maps.DistanceMatrixService();

//    //service.getDistanceMatrix({
//    //    origins: [startLoc],
//    //    destinations: [endLoc],
//    //    travelMode: google.maps.TravelMode.DRIVING,
//    //    unitSystem: google.maps.UnitSystem.METRIC,
//    //    avoidHighways: false,
//    //    avoidTolls: false
//    //}, function (response, status) {
//    //    if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {

//    //        var distance = response.rows[0].elements[0].distance.text;
//    //        var duration = response.rows[0].elements[0].duration.value;
//    //        var duration1 = response.rows[0].elements[0].duration.text;
//    //        var dvDistance = document.getElementById("dvDistance");

//    //        $("#test1").html(duration1);

//    //        ettValue.value = Math.round(parseInt(duration)/60);
//    //    } else {
//    //        alert("Unable to find the distance via road.");
//    //    }
//    //});
//}



function computeTotalDistance(result) {
    var total = 0;
    var duration = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;

    }
    total = total / 1000;


    document.getElementById('txtManualDistance').innerHTML = total + ' km';
}

    var circle = null;
var markers = [];
var searchLatLng;
function AjaxGetVehicleNearestToPoint() {

    //thi is used to clear markers
    deleteMarkers();
    // this is used to clear the table
    // $("#vehTable tr").remove();
    //if (circle != null) {
    //    circle.setMap(null);
    //}

    //200 meter
    var Radius = parseInt((1000));


    var mySplitResult = startLoc.split(",");

    var lat = mySplitResult[0].toLowerCase().replace(/[\,\(\)\!\$]/g, '');
    var lng = mySplitResult[1].toLowerCase().replace(/[\,\(\)\!\$]/g, '');


    var myLatlng = new google.maps.LatLng(lat, lng);
    searchLatLng = myLatlng;
    map.setCenter(myLatlng);
    var infowindow = new google.maps.InfoWindow()

    var marker = new google.maps.Marker({
        map: map,
        position: myLatlng

    });
    //circle = new google.maps.Circle({
    //    map: map,
    //    radius: Radius,    // 10 miles in metres
    //    fillColor: '#8e9d13'
    //});
    //circle.bindTo('center', marker, 'position');
    //var vehicleType = $("#ddlVehicleType").val();
    //if (!vehicleType) {
    //    vehicleType = "0";
    //}
    //var url = apiBase.apiurl + "MapAPI/GetVehicleNearestToPoint";
    //$.ajax({
    //    url: url,
    //    dataType: "json",
    //    type: "GET",
    //    contentType: 'application/x-www-form-urlencoded; charset=utf-8',    //replace /json to the urlenoded
    //    data: { Lats: lat, Lngs: lng, DiameterInMeter: Radius, custId: $custid },                  // data is not json
    //    async: true,
    //    processData: true,                                                  //important to use it as true
    //    cache: false,

    //    success: function (data) {

    //        var count = 0;

    //        $.each(data, function (i, variant) {
    //            count += 1;
    //            $('#lbltotalvehicle').html(count);

    //            var myLatLng = new google.maps.LatLng(variant.Latitude, variant.Longitude);
    //            plotMarker(myLatLng, map, variant.VehicleName, variant.Location, variant.LastDate, variant.VehcileStatus, variant.BBID, variant.IsDispatched, variant.Latitude, variant.Longitude, variant.icon)

    //            //test
    //            $("#hdnVehicleList").removeClass("hidden");

    //        });


    //    },
    //    error: function (xhr) {
    //        $("#divLoader").addClass("hidden");
    //    }
    //});
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

//plot marker
function plotMarker(position, map, name, Location, currentdate, VehStatus, bbid, IsDispatched, lat, lng, icon) {

    VehStatus = VehStatus.replace("~/", "../../");
    poiMarker = new google.maps.Marker({

        position: position,
        map: map,
        draggable: false,
        clickable: true,
        icon: VehStatus,
        animation: google.maps.Animation.DROP
    });
    var poimarker1 = poiMarker;
    markers.push(poiMarker);

    var contentString = '<b>Vehicle Name:</b>' + name + '<br/><b>Location:</b>' + Location + '<br/>' + '<b>Date: </b>' + currentdate + status;
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    google.maps.event.addDomListener(poimarker1, 'click', function () {
        infowindow.open(map, poimarker1);
    });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

$("#imgclose").click(function () {
    //$("#hidedivnew").css('display', 'none');
    $("#hidedivnew").slideToggle();
    $("#btntrip").css('display', 'block');
    $("#btntripN").css('display', 'block');
});


$("#btntrip").click(function () {
    $("#hidedivnew").css('display', 'block');
    $("#btntrip").css('display', 'none');

});



$("#btnaddpoi").click(function () {
    $("#hidedivnewd").css('display', 'block');


});

$("#btntripN").click(function () {
    $("#hidedivnew").css('display', 'block');

    $("#btntripN").css('display', 'none');
});

function Close() {
    $("#hidedivnewd").css('display', 'none');
}


function submitUpdateSettings() {
    var custId = $custid;

    var startLocation = $("#ddlStartLocationPOI").val();
    var endLocation = $("#ddlEndLocationPOI").val();
    var morePoiIds = $("#ddlMoreLocationsPOI").val();
    var morePoiIdsList = morePoiIds.toString();

    var triptypeID = $("#triptype").val();


    var routeName = $("#txtRouteName").val();
    var ettTime = $("#txtETT").val();


    var bbidArray = $("#ddlVehicleList").val();
    var bbidList = bbidArray.toString();



    var distanceKm;
    distanceKm = $("#txtManualDistance").val();

    //getting datetime
    var startDateTime = $beginDate;
    var endDateTime = $endDate;


    if (!startLocation || !endLocation || !routeName) {
        $("#valStartLocation").removeClass("hidden");
        $("#valEndLocation").removeClass("hidden");
        $("#valRouteName").removeClass("hidden");


        return false;
    }
    else {
        $("#valStartLocation").addClass("hidden");
        $("#valEndLocation").addClass("hidden");
        $("#valvehicleslist").addClass("hidden");
        $("#valRouteName").addClass("hidden");
    }





    swal({
        title: "You want to create Route as Trip?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes!",
        cancelButtonText: "No!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
function (isConfirm) {
    var Routetype = 0;
    if (isConfirm) {
        swal("Created!", "Your Route saved successfully as Trip", "success");

        Routetype = 3;
    } else {
        swal("Declined", "Your request declined  ", "error");
        Routetype = 1;
    }
    $.blockUI({ message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>' });

    var baseurl = apiBase.apiurl;
    var url = baseurl + "adminapi/UpdateTripSettings";
    $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: { SLocation: startLocation, ELocation: endLocation, custId: custId, distance: distanceKm, triptypeID: triptypeID, routeName: routeName, ettTime: ettTime, bbidList: bbidList, poiIds: morePoiIdsList, startDateTime: startDateTime, endDateTime: endDateTime, Routetype: Routetype },

        success: function (data) {
            $.unblockUI();
            toastr.success('Route Created successfully!');

        },
        error: function (err) {
            $.unblockUI();
            toastr.warning('something went wrong!');
        }

    });
});

    return false;
}