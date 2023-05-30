var table;
var poilist;
var inputval;



function getpoilist() {



    $.ajax({
        url: apiBase.apiurl + 'CommonApi/GetPOI?custid=' + $custid,
        type: "get",
        async: false,
        success: function (data) {
            poilist = data;


        },
        error: function () {
            connectionError();
        }
    });
}


//function format(d) {


//    var list = d.ListVehicles;


//    //var selectnews = $("<select class='childclass'  multiple='multiple'></select>");
//    //if (list.length > 0) {
//    //    $.each(list, function (j, item) {

//    //        if (item.Selected) {

//    //            selectnews.append($('<option selected="selected"></option>').val(item.Value).html(item.Text));
//    //        }

//    //        else {
//    //            selectnews.append($('<option></option>').val(item.Value).html(item.Text));
//    //        }
//    //    });
//    //}
//    var poipoints = d.POIpoints;
//    var arrya = poipoints.split(",");
//    var poiLI = $("<select class='childclass'  multiple='multiple'></select>");
//    if (poilist.length > 0) {
//        $.each(poilist, function (j, item) {

//            if (arrya.indexOf(item.id) != -1)
//            {

//                poiLI.append($('<option selected="selected"></option>').val(item.id).html(item.details));
//            }
//            else
//            {
//                poiLI.append($('<option> </option>').val(item.id).html(item.details));

//            }

//        });
//    }


//    return '<table  id="tbChild"  cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
//         '<thead ><tr><th>StartLocation</th>' +
//         '<th >End Location</th>' +
//         '<th >More Points </th>' +
//          '<th >Action </th>' +
//         '</tr ></thead>' +
//        '<tr >' +

//            '<td>' + d.StartLocation + '</td>' +

//            '<td>' + d.EndLocation + '</td>' +
//            '<td >' + poiLI.prop("outerHTML") + '</td>' +
//              '<td ><input type="button" id="btnupdate" class="button button1" value="Update"> </td>' +
//        '</tr>' +            
//    '</table>';



//}




function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();

};

$(document).ready(function () {

    getpoilist();
    GetPoidetails();

    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        debugger;
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
            $(".childclass").select2({
                placeholder: "Select an Option",
                dropdownCssClass: 'bigdrop'
            });
        }
    });

    $('#dt_basic_Master').on('click', 'input[type="checkbox"]', function () {


        var data = table.row($(this).parents('tr')).data();
        var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

        var PL = bbidArray.selector.rows;



        $("#RoueTimingDialog").dialog({
            autoOpen: true,
            position: { my: "center", at: "200", of: window },
            width: 900,
            height: 550,
            resizable: true,
            title: 'Schedule Timings Of Route',
            modal: true,
            open: function () {

                var url = "../fms/GetRoutetimePartialView?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                $(this).load(url);
                $(".ui-dialog-titlebar-close").hide();
            },
            buttons: {
                Close: function () {

                    $(this).dialog("close");
                }
            }
        });




    });
    $('#dt_basic_Master').on('click', 'input[type="button"]', function () {

        var data = table.row($(this).parents('tr')).data();
        var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

        var PL = bbidArray.selector.rows;
        if (PL == null) {
            PL = "";
        }
        if ($(this).attr('id') == "btnedit") { // str1.indexOf(str2) != -1


            alertify.confirm("Before submit make sure you have added all the  records in the required Fields . Do you want to proceed?", function (ex) {
                if (ex) {
                    $.ajax({
                        dataType: "json", type: "GET",
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                        url: apiBase.apiurl + "AdminAPI/UpdateManageRoute",
                        data: { routeId: data.RouteId, bbidList: PL.toString(), custId: $custid, beginDate: $beginDate, endDate: $beginDate },
                        success: function (data) {

                            toastr.success('successfully Done!');
                        }
                    });
                    return true;
                } else {

                    alertify.error("You've clicked Cancel");
                    return false;
                }
            });

        }
        else if ($(this).attr('id') == "btndelete") {


            alertify.confirm("Are you sure you want  to Delete route ,it will effects route timing and data on other screen. Do you want to proceed?", function (ex) {
                if (ex) {
                    $.ajax({
                        url: apiBase.apiurl + 'AdminAPI/DeleteRoute?Id=' + data.RouteId,
                        type: "get",
                        success: function (data) {
                            toastr.warning("Route is Deleted successfully.");
                            location.reload(true);
                        },
                        error: function () {
                            toastr.warning("something went wrong!");
                        }
                    });
                    return true;
                } else {

                    alertify.error("You've clicked Cancel");
                    return false;
                }
            });

        }

        else if ($(this).attr('id') == "btnadvancesetting") {

            var data = table.row($(this).parents('tr')).data();
            var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

            var PL = bbidArray.selector.rows;



            $("#RouteDialog").dialog({
                autoOpen: true,
                position: { my: "center", at: "200", of: window },
                width: 900,
                height: 550,
                resizable: true,
                title: 'Advanced Timings Of Route',
                modal: true,
                open: function () {

                    var url = "../fms/GetAdvancedRouteDetails?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                    $(this).load(url);
                    $(".ui-dialog-titlebar-close").hide();
                },
                buttons: {
                    Close: function () {

                        $(this).dialog("close");
                    }
                }
            });


        }

        else if ($(this).attr('id') == "btntiming") {

            var data = table.row($(this).parents('tr')).data();
            var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

            var PL = bbidArray.selector.rows;



            $("#RoueTimingDialog").dialog({
                autoOpen: true,
                position: { my: "center", at: "200", of: window },
                width: 900,
                height: 550,
                resizable: true,
                title: 'Schedule Timings Of Route',
                modal: true,
                open: function () {

                    var url = "../fms/GetRoutetimePartialView?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                    $(this).load(url);
                    $(".ui-dialog-titlebar-close").hide();
                },
                buttons: {
                    Close: function () {

                        $(this).dialog("close");
                    }
                }
            });

        }

        else if ($(this).attr('id') == "btnDriver") {

            var data = table.row($(this).parents('tr')).data();
            var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

            var PL = bbidArray.selector.rows;




            $("#DriverDialog").dialog({
                autoOpen: true,
                position: { my: "center", at: "200", of: window },
                width: 900,
                height: 550,
                resizable: true,
                title: 'Assign Driver',
                modal: true,
                open: function () {



                    var url = "../fms/GetDriverPartialView?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                    $(this).load(url);
                    $(".ui-dialog-titlebar-close").hide();
                },
                buttons: {
                    Close: function () {

                        $(this).dialog("close");
                    }
                }
            });

        }
        else if ($(this).attr('id') == "btnConductor") {

            var data = table.row($(this).parents('tr')).data();
            var bbidArray = table.row($(this).closest('tr').find('.js-example-basic-multiple').select2("val"));

            var PL = bbidArray.selector.rows;




            $("#ConductorDialog").dialog({
                autoOpen: true,
                position: { my: "center", at: "200", of: window },
                width: 900,
                height: 550,
                resizable: true,
                title: 'Assign Conductor and ETM with Vehicle',
                modal: true,
                open: function () {



                    var url = "../fms/GetConductorPartialView?vehicleName=" + data.RouteName.replace(/\s+/g, '') + "&VehicleId=" + data.RouteId + "&custid=" + $custid;
                    $(this).load(url);
                    $(".ui-dialog-titlebar-close").hide();
                },
                buttons: {
                    Close: function () {

                        $(this).dialog("close");
                    }
                }
            });

        }

    });
    $('#dt_basic_Master').on('draw.dt', function () {
        $("button").attr('disabled', 'disabled');
        //This will get called when data table data gets redrawn to the      table.
        $(".js-example-basic-multiple").select2({
            placeholder: "Select an Option",
        });

    });




    $("#tbChild tbody").on("click", 'input[type="button"]', function (e) {
        debugger;


        var $row = $(this).closest("tr");

        if (this.checked) {
            $row.addClass("active");
        } else {
            $row.removeClass("active");
        }

        // Prevent click event from propagating to parent
        e.stopPropagation();
    });
});



$('.btnDelete').click(function () {
    alert("check");
});
function Deletepoi(id) {

    if (confirm("Do you really want to delete this poi?")) {

        $.ajax({

            url: apiBase.apiurl + "Commonapi/deletepoi",
            type: "GET",
            data: { id: id },


            //contentType: 'application/json',

            success: function (data) {

                if (data == "1") {
                    GetPoidetails();

                }
            }

        });
    }
    return false;

}


function GetPoidetails() {


    deleteTable();

    var url = apiBase.apiurl + "AdminAPI/GetManageRoutePaging";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "type", "value": "1" });
        },

        "columns": [

                   { "data": "StartDate", "orderable": false },
                   { "data": "RouteName", "orderable": false },
                   { "date": "RouteId", "visible": false, "orderable": false },
                   {

                       "render": function (data, type, full, meta) {




                           var list = full.ListVehicles;
                           var selectnew = $("<select class='js-example-basic-multiple'  multiple='multiple'></select>");
                           if (list.length > 0) {
                               $.each(list, function (j, item) {

                                   if (item.Selected) {

                                       selectnew.append($('<option selected="selected" ></option>').val(item.Value).html(item.Text));
                                   }

                                   else {
                                       selectnew.append($('<option></option>').val(item.Value).html(item.Text));
                                   }
                               });
                           }


                           return selectnew.prop("outerHTML");

                       }

                   },
                     { "data": "StartLocation", "orderable": false },
                       { "data": "EndLocation", "orderable": false },
                   { "data": "Distance", "orderable": false },
                    {


                        "targets": -1,
                        "data": null,
                        "defaultContent": "<input type='button' id='btnDriver' class='button button1' value='Assign Driver'>"
                    },
                     {


                         "targets": -1,
                         "data": null,
                         "defaultContent": "<input type='button' id='btnConductor' class='button button1' value='Assign Conductor'>"
                     },
                   {


                       "targets": -1,
                       "data": null,
                       "defaultContent": "<input type='button' id='btntiming' class='button button1' value='Departure Setting'>"
                   },
                    {
                        "targets": -1,
                        "data": null,
                        "defaultContent": "<input type='button' id='btnadvancesetting' class='button button3' value='Assign Bus'>"
                    },
                  {
                      "targets": -1,
                      "data": null,
                      "defaultContent": "<input type='button' id='btnedit' class='button button1' value='Save'> <input type='button' id='btndelete' class='button button2' value='Delete'>"
                  },
                      //{
                      //    "className": 'details-control',
                      //    "orderable": false,
                      //    "data": null,
                      //    "defaultContent": ''
                      //},



        ]


    });




}