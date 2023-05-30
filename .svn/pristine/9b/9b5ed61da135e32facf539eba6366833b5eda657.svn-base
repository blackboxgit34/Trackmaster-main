
$(document).ready(function () { 
var url = apiBase.apiurl + "AdminAPI/GetUpdateTripSettings";

table = $('#dt_basic_Master').DataTable({
    //"oLanguage": {
    //    "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
    //},
    "processing": true,
    "serverSide": true,
    destroy: true,
    retrieve: true,
    "sAjaxSource": url,
    "iDisplayLength": 20,
    language: {
        searchPlaceholder: "Search Vehicle Name",
        sSearch: ""
    },
    "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
    language: {
        searchPlaceholder: "Search Route Name",
        sSearch: ""
    },
    "fnServerParams": function (param) {
        param.push({ "name": "custId", "value": $custid });
    },

    "columns": [
            {
                "class": "hidden",
                "render": function (data, type, full, meta) {

                    return '<span class="hidden">' + full.RouteID + '</span>';
                }
            },

            {
                "data": "RouteName"
            },
            {
                "data": "StartLocation"
            },
            {
                "data": "EndLocation"
            },
            {
                "data":"MoreLocations"
            },

            {
                "data": "ExpectedTime"

            },
             {
                 "data": "Distance"

             },
             {
                 "data": "TripType"

             },

            {
                "width": "15%",
                "data": null,
                "render": function (data, type, full, meta) {
                    return '<span><button class="btn btn-danger btn-small" data-toggle="tooltip" title="Delete" type="button"  id="' + full.RouteID + '" onClick="deleteRoute(this.id);"><i class="fa fa-trash-o"></i></button></span>';
                }
            },
    ]
    //"rowCallback": function (row, data, index) {
    //    if (data.objRefTemperature == 0) {
    //        var target = $(row).find(".details-control");
    //        var index = (target).index();
    //        $(row).find('td:eq(' + index + ')').removeClass('details-control')
    //    }
    //}
});


window.deleteRoute=function(id) {
    
    alertify.confirm("It will Delete your route. Do you want to proceed?", function (e) {
        if (e) {
            $.ajax({
                url: apiBase.apiurl + 'AdminAPI/DeleteRoute?Id=' + id,
                type: "get",
                success: function (data) {
                    toastr.success("successfully done!");
                    location.reload(true);
                },
                error: function () {
                    toastr.warning("something went wrong!");
                }
            });
            //ajaxResponse(bbid, Geofence, lidType, overspeedAlert, MainBatteryStatus, IgnitionSMSActive, auxIP, smsActive, notificationActive)
        } else {
            return false;
        }
    });
};

});