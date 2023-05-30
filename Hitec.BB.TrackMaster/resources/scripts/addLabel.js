function addLabelToMap(marker, map, location)
{
    // Add the marker to the Fluster
    fluster.addMarker(marker);
    // Set styles
    // These are the same styles as default, assignment is only for demonstration ...
    fluster.styles = {
        // This style will be used for clusters with more than 0 markers
        0: {
            image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m1.png',
            //image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m1.png',
            textColor: '#FFFFFF',
            width: 53,
            height: 52
        },
        // This style will be used for clusters with more than 10 markers
        10: {
            image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m2.png',
            //image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m1.png',
            textColor: '#FFFFFF',
            width: 56,
            height: 55
        },
        20: {
            image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m3.png',
            //image: 'http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/1.0/images/m1.png',
            textColor: '#FFFFFF',
            width: 66,
            height: 65
        }
    };
    // Initialize Fluster
    // This will set event handlers on the map and calculate clusters the first time.
    fluster.initialize();
    var label = new Label({
        draggable: false,
        map: map
    });
    label.bindTo('position', marker, 'position');
    label.set('text', location);
}