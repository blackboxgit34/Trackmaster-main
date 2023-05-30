$(document).ready(function () {
    $("#vehicletype").select2({
    });
    $("#ddlGroupUserList").select2({
    });
    $("#Plants").select2({
    });
    $("#hireown").select2({
    });
    $("#ddlzone").select2({
    });
    $("#ddlbranch").select2({
    });

    loadBranches("ALL");
    loadzone();
    loadVehicles("ALL","ALL");
    loadplants();

    loadtype();
    //GetVehicleDetails();
});
var baseUrl = apiBase.apiurl;

$(function () {
    $("#vehicletype").change(function () {
        debugger;
        GetVehicleDetails();


    });
});
$(function () {
    $("#hireown").change(function () {
        GetVehicleDetails();

    });
});
$(function () {
    $("#ddlzone").change(function () {
        debugger;
        loadBranches($("#ddlzone option:selected").val())

       
    });
});
    $(function () {
        $("#ddlbranch").change(function () {
            debugger;
            loadplants($("#ddlbranch option:selected").val())

            
        });
    });

    $(function () {
        $("#Plants").change(function () {
            debugger;
          

            GetVehicleDetails();
        });
    });
    function loadBranches(zone) {

    
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "CustomAPI/GetPrismBranchesZonewise",
            data: { custid: $custid, zone: zone },
            success: function (result) {
                //for appending vehicle list
                var list = result;
                count = 0;
                if (list.length > 0) {
                    $('#ddlbranch').empty();
                    debugger;
                    //$('#Plants').append($('<option></option>').val(0).html("All Vehicles"));
                    $.each(list, function (j, item) {
                        count = count + 1;
                        var selected = '<option></option>';
                        if (item.Selected) {
                            selected = '<option selected="selected" ></option>';
                        }
                        $('#ddlbranch').append($(selected).val(item.Value).html(item.Text));
                    });
                    loadplants($("#ddlbranch option:selected").val());
                }  //end of appending options into timing

                $('.body').unblock();
            },
            error: function () {
                //toastr.error("Something went wrong. try after sometime");

            }
        });
    }

    function GetVehicleDetails() {

        debugger;

        var zone = $("#ddlzone option:selected").val();
        var branch = $("#ddlbranch option:selected").text();
        var plant = $("#Plants option:selected").val();
        var type = $("#vehicletype option:selected").val();

        var hire = $("#hireown option:selected").val();

        if (zone == undefined) {
            zone = "ALL";
            branch = "ALL";
            plant = "ALL";
            type = "ALL";
            hire = "ALL";
        }
        $('#dt_basic_Master').dataTable({
            "bDestroy": true
        }).fnDestroy();

        var url = baseUrl + "CustomAPI/Getprismvehplantsdetails";
        var table = $('#dt_basic_Master').DataTable({
            "processing": true,
            "serverSide": true,
            destroy: true,
            retrieve: true,
            "searching": false,
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
                    }
            ]
        });
    }
    function loadzone() {
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "CustomAPI/Getzone",
            data: { custid: $custid },
            success: function (result) {
                //for appending vehicle list
                var list = result;
                count = 0;
                if (list.length > 0) {
                    var selected1 = '<option></option>';
                    $('#ddlzone').append($(selected1).val("ALL").html("ALL"));
                    //$('#Plants').append($('<option></option>').val(0).html("All Vehicles"));
                    $.each(list, function (j, item) {
                        count = count + 1;
                        var selected = '<option></option>';
                        if (item.Selected) {
                            selected = '<option selected="selected" ></option>';
                        }
                        $('#ddlzone').append($(selected).val(item.Value).html(item.Text));
                    });

                }  //end of appending options into timing

                $('.body').unblock();
            },
            error: function () {
                //toastr.error("Something went wrong. try after sometime");

            }
        });
    }
    function loadVehicles(branch,zone) {
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "CustomAPI/GetVehiclesforPlantmaster",
            data: { custid: $custid,branch:branch,zone:zone },
            success: function (result) {
                //for appending vehicle list
                var list = result;
                count = 0;
                $('#ddlGroupUserList').empty();
                if (list.length > 0) {
                    debugger;
                  
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


    function loadplants(branch) {
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "CustomAPI/GetPlantsPrism",
            data: { custid: $custid,branch:branch },
            success: function (result) {
                //for appending vehicle list
                var list = result;
                count = 0;
                $('#Plants').empty();
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
                    GetVehicleDetails();
                    debugger;
                    loadVehicles(branch, $("#ddlzone option:selected").val());
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

                    var selected1 = '<option></option>';
                    $('#vehicletype').append($(selected1).val("ALL").html("ALL"));
                   
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