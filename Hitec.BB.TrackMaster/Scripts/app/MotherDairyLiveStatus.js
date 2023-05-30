//Global variable
var param1;
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0">' +
        '<tr>' +
            '<td  style="color: black;">Latitude:</td>' +
            '<td>' + d.Latitude + '</td>' +
        '<td  style="color: black;">Longitude:</td>' +
            '<td>' + d.Longitude + '</td>' +
          '<td  style="color: black;">Driver Name:</td>' +
            '<td>' + d.DriverName + '</td>' +
         '<td  style="color: black;">Driver Mobile number:</td>' +
            '<td>' + d.DriverMobileNumber + '</td>'
    '</tr>'

    '</table>';
}

$(document).ready(function () {
    var url = apiBase.apiurl + "LiveStatus/LiveStatusForMotherDairy";
    var table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "sAjaxSource": url,
        "aaSorting": [],
        "columns": [
            {
                "class": "hidden",
                "render": function (data, type, full, meta) {
                    
                    return '<span class="hidden">' + full.BBID + '</span>';
                }
            },
            {
                "orderable": false, "targets": 0,
                "data": "Sno",
                "width": "2%"
            },
            {
                "orderable": false, "targets": 0,
                "render": function (data, type, full, meta) {
                    Vicon = full.VIcon.replace("~/", "/");
                    return '<img src="' + Vicon + '">';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    return '<a href="/Report/Details?bbid=' + full.BBID + '">' + full.VehicleName + '</a>';
                }
            },
            {
                "orderable": false, "targets": 0,
                "render": function (data, type, full, meta) {

                    VehStatus = full.Status.replace("~/", "../../");
                    return '<span data-toggle="tooltip" title="this is test">' + '<img src="' + VehStatus + '">' + '</span>';
                }
            },
            {
                "orderable": false, "targets": 0,
                "data": "DateTime"
            },
            {
                "orderable": false, "targets": 0,
                "data": "Location"
            },
             {
                 "orderable": false, "targets": 0,
                 "data": "POILocation"
             },
            {
                "orderable": false, "targets": 0,
                "data": "Speed"
            },
            {
                "orderable": false, "targets": 0,
                "data": "Distance"
            },
            {
                "orderable": false, "targets": 0,
                "render": function (data, type, full, meta) {
                    GSMSignal = full.antenaText.replace("~/", "../../");
                    return '<img src="' + GSMSignal + '">';
                }
            },
            {
                "orderable": false, "targets": 0,
                "render": function (data, type, full, meta) {
                    GPSText = full.gpsText.replace("~/", "../../");
                    return '<img src="' + GPSText + '">';
                }
            },
            {
                "orderable": false, "targets": 0,
                "render": function (data, type, full, meta) {
                    BatteryText = full.batteryText.replace("~/", "../../");
                    return '<img src="' + BatteryText + '">';
                }
            },
             {
                 "orderable": false, "targets": 0,
                 "data": "CurrentTemperature"
             },
            {
                "orderable": false, "targets": 0,
                "render": function (data, type, full, meta) {
                    return '<div class="mouseon-examples">' + '<a href="#">Reports</a>' + '</div>';
                }
            },
                  
            {
                "orderable": false, "targets": 0,
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''

            },
            {
                "orderable": false, "targets": 0,
                "render": function (data, type, full, meta) {
                    return '<a href="/Report/Details?bbid=' + full.BBID + '">Details</a>';

                }
            }
        ],
        "order": [[3, "desc"]]
    });

    $('#dt_basic_Master').on('draw.dt', function () {
        
        $('[data-toggle="tooltip"]').tooltip();
        var mouseOnDiv = $('.mouseon-examples');
        var tipContent = $(
            '<p><a href="#" onClick="myClick()"; class="reportToolTip">Report1sfdfsdfdfsdfd</a></p>' +
            '<p><a href="#" class="reportToolTip">Report1</a></p>' +
            '<p><a href="#" class="reportToolTip">Report1</a></p>' +
            '<p><a href="#" class="reportToolTip">Report1</a></p>'
        );
        mouseOnDiv.data('powertipjq', tipContent);
        mouseOnDiv.powerTip({
            placement: 's',
            mouseOnToPopup: true,
            smartPlacement: true,
            //  manual: true
        });

        //window.myClick = function () {
        //    alert(param1);
        //};
        // hook custom onclick function
        $('.mouseon-examples').on('click', function () {
            alert("Tolltip");
            // hide any open tooltips
            // this is optional, but recommended in case we optimize away the sanity
            // checks in the API at some point.
            $.powerTip.hide();
            // show the tooltip for the element that received the click event
            $.powerTip.show(this);
        });

        // hook custom mouse events
        $('.mouseon-examples').on({
            mouseenter: function (event) {
                
                // note that we pass the jQuery mouse event to the show() method
                // this lets PowerTip do the hover intent testing
                param1 = $(this).parents('tr:first').find('td:eq(0)').text()
                $.powerTip.show(this, event);
            },
            mouseleave: function () {
                // alert("mouseenter");
                // note that we pass the element to the hide() method
                // this lets PowerTip wait before closing the tooltip, if the users
                // mouse cursor returns to this element before the tooltip closes then
                // the close will be canceled
                $.powerTip.hide(this);
            }
        });
    });

    // Add event listener for opening and closing details
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
});

