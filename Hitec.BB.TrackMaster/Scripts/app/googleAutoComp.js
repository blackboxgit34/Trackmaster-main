alert("loading");

google.maps.event.addDomListener(window, 'load', initialize1);
function initialize1() {
    var input = document.getElementById('txtStartLocation');
    //input = $("#txtEndLocation").val();
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