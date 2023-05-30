$(document).ready(function () {
    $("#vehicletype").select2({
    });
    $("#ddlGroupUserList").select2({
    });
    $("#Plants").select2({
    });
    $("#hireown").select2({
    });

    loadVehicles();
    loadplants();

    loadtype();
    GetVehicleDetails();
    $('#dt_basic_Master').on('click', 'input[type="button"]', function () {


        debugger;
        var data = table.row($(this).parents('tr')).data();


        if ($(this).attr('id') == "btndelete") {


            alertify.confirm("Are you sure you want  to Delete route . Do you want to proceed?", function (ex) {
                if (ex) {
                    $.ajax({
                        url: apiBase.apiurl + 'AdminAPI/DeletePrisumenteryofstation?bbid=' + data.bbid,
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

    });
});
var baseUrl = apiBase.apiurl;

//function GetVehicleDetails() {
//    $('#dt_basic_Master').dataTable({
//        "bDestroy": true
//    }).fnDestroy();

//    var url = baseUrl + "CustomAPI/Getprismvehplantsdetails";
//    var table = $('#dt_basic_Master').DataTable({
//        "processing": true,
//        "serverSide": true,
//        destroy: true,
//        retrieve: true,
//        "searching": false,
//        "bPaginate": false,
//        "sAjaxSource": url,
//        "fnServerParams": function (param) {
//            param.push({ "name": "custid", "value": $custid });
//        },
//        "columns": [
//                {
//                    "data": "vehname",
//                    "bSortable": false
//                },
//                {
//                    "data": "plantname",
//                    "bSortable": false
//                },
//                {
//                    "data": "type",
//                    "bSortable": false
//                },
//                {
//                    "data": "hire",
//                    "bSortable": false
//                }
//        ]
//    });
//}

function GetVehicleDetails() {

    debugger;

    //var zone = $("#ddlzone option:selected").val();
    //var branch = $("#ddlbranch option:selected").text();
    //var plant = $("#Plants option:selected").val();
    //var type = $("#vehicletype option:selected").val();

    var hire = $("#hireown option:selected").val();

    //if (zone == undefined) {
    var zone = "ALL";
    var branch = "ALL";
    var plant = "ALL";
    var type = "ALL";
    var hire = "ALL";
    //}
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    var url = baseUrl + "CustomAPI/Getprismvehplantsdetails";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "searching": true,
        "bPaginate": false,
        "sAjaxSource": url,
        "fnServerParams": function (param) {
            param.push({ "name": "custid", "value": $custid }, { "name": "zone", "value": zone }, { "name": "branch", "value": branch }, { "name": "plant", "value": plant }, { "name": "type", "value": type }, { "name": "hire", "value": hire });
        },
        "columns": [
                {
                    "data": "vehname",
                    "bSortable": false
                },
                {
                    "data": "plantname",
                    "bSortable": false
                },
                {
                    "data": "type",
                    "bSortable": false
                },
                {
                    "data": "hire",
                    "bSortable": false
                },
        {
            "targets": -1,
            "data": null,
            "defaultContent": "<input type='button' id='btndelete' class='button button2' value='Delete'>"
        },
        ]
    });
    //var url = baseUrl + "CustomAPI/Getprismvehplantsdetails";
    //var table = $('#dt_basic_Master').DataTable({
    //    "processing": true,
    //    "serverSide": true,
    //    destroy: true,
    //    retrieve: true,
    //    "searching": false,
    //    "bPaginate": false,
    //    "sAjaxSource": url,
    //    "fnServerParams": function (param) {
    //        param.push({ "name": "custid", "value": $custid }, { "name": "zone", "value": zone }, { "name": "branch", "value": branch }, { "name": "plant", "value": plant }, { "name": "type", "value": type }, { "name": "hire", "value": hire });
    //    },
    //    "columns": [
    //            {
    //                "data": "vehname",
    //                "bSortable": false
    //            },
    //            {
    //                "data": "plantname",
    //                "bSortable": false
    //            },
    //            {
    //                "data": "type",
    //                "bSortable": false
    //            },
    //            {
    //                "data": "hire",
    //                "bSortable": false
    //            },
    //    {
    //        "targets": -1,
    //        "data": null,
    //        "defaultContent": "<input type='button' id='btndelete' class='button button2' value='Delete'>"
    //    },
    //    ]
    //});
}

function loadVehicles() {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "CustomAPI/GetVehiclesforPlant",
        data: { custid: $custid },
        success: function (result) {
            //for appending vehicle list
            var list = result;
            count = 0;
            if (list.length > 0) {
                $('#vehicleslist').append($('<option></option>').val(0).html("All Vehicles"));
                $.each(list, function (j, item) {
                    count = count + 1;
                    var selected = '<option></option>';
                    if (item.Selected) {
                        selected = '<option selected="selected" ></option>';
                    }
                    $('#ddlGroupUserList').append($(selected).val(item.Value).html(item.Text));
                });

            }  //end of appending options into timing

            $('.body').unblock();
        },
        error: function () {
            //toastr.error("Something went wrong. try after sometime");

        }
    });
}


function loadplants() {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "CustomAPI/GetPlantsPrism",
        data: { custid: $custid, branch: $custid },
        success: function (result) {
            //for appending vehicle list
            var list = result;
            count = 0;
            if (list.length > 0) {

                //$('#Plants').append($('<option></option>').val(0).html("All Vehicles"));
                $.each(list, function (j, item) {
                    count = count + 1;
                    var selected = '<option></option>';
                    if (item.Selected) {
                        selected = '<option selected="selected" ></option>';
                    }
                    $('#Plants').append($(selected).val(item.Value).html(item.Text));
                });

            }  //end of appending options into timing

            $('.body').unblock();
        },
        error: function () {
            //toastr.error("Something went wrong. try after sometime");

        }
    });
}

function loadtype() {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "CustomAPI/GetPrismvehtype",
        data: { custid: $custid },
        success: function (result) {
            //for appending vehicle list
            var list = result;
            count = 0;
            if (list.length > 0) {

                //$('#Plants').append($('<option></option>').val(0).html("All Vehicles"));
                $.each(list, function (j, item) {
                    count = count + 1;
                    var selected = '<option></option>';
                    if (item.Selected) {
                        selected = '<option selected="selected" ></option>';
                    }
                    $('#vehicletype').append($(selected).val(item.Value).html(item.Text));
                });

            }  //end of appending options into timing

            $('.body').unblock();
        },
        error: function () {
            //toastr.error("Something went wrong. try after sometime");

        }
    });
}

window.btnSubmit = function () {
    var vehtype = $("#vehicletype").val();

    var vehicles = $("#ddlGroupUserList").val();
    var plant = $("#Plants").val();

    var hire = $("#hireown").val();
    //vehicleList = "jhk,hgjh,khgjh";


    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: apiBase.apiurl + "CustomAPI/Assignplant",
        data: { veh: vehicles, vehtype: vehtype, custid: $custid, plant: plant, hire: hire },
        success: function (result) {
            debugger;
            //for appending vehicle list
            toastr.success("Successfully Updated");

            GetVehicleDetails();
        },
        error: function () {
            //toastr.error("Something went wrong. try after sometime");

        }
    });

};