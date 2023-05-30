var baseUrl = apiBase.apiurl;
var custId
var roleval;
var table;
$(function () {
    custId = $custid;
    //debugger;

    //var VehicleUrl = baseUrl + "TaxiAPI/GetTaxiUser";
    //$.get(VehicleUrl, { custid: custId }, function (data) {

    //    $.each(data, function (key, value) {
    //        $("#SubUserName").append($("<option></option>").val(value.custid).html(value.CustName));
    //    });
    //});


    GetVehicleDetails();

    $('#dt_basic_Master tbody').on('click', '.btn-update', function (e) {


        var data = table.row($(this).parents('tr')).data();
        var mobile = String($(this).closest('tr').find('.mobile').val());
        var email = String($(this).closest('tr').find('.email').val());
        var address = String($(this).closest('tr').find('.address').val());
        var Panno = String($(this).closest('tr').find('.PanNo').val());
        var GSTNo = String($(this).closest('tr').find('.GstNo').val());






        alertify.confirm(" Do you want to Update Vendor details?", function (e) {
            if (e) {
                $.ajax({
                    dataType: "json",
                    type: "GET",
                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                    url: baseUrl + "commonapi/updateTaxicustdetails",
                    data: { mobile: mobile, email: email, address: address, custid: data.custid, role: 0, PanNo: Panno, GSTNo: GSTNo },
                    success: function (data) {



                        if (data == "success") {


                            toastr.success("Record updated successfully!");

                            location.reload();


                        }

                    },
                    error: function (error) {
                        toastr.error("something went wrong!");
                        return;
                    }
                });

            } else {
                alertify.error("You've clicked Cancel");
                return false;
            }
        });

        console.log('suggested-in-comment', 'click');
    });


});

$(document).ready(function () {

    PopulateDropDownList();
});

function PopulateDropDownList() {
    var Url = baseUrl + "TaxiApi/GetDCMdepartment";
    $.ajax({
        url: Url,
        type: "GET",
        data: { custId: $custid },
        datatype: "json",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            // var optionhtml = '<option value="Select">--Department--</option>'
            //$('#department').append('<option value="Select">--Department--</option>');
            $.each(data, function (key, value) {
                debugger;
                for (var i = 0; i < value.length; i++) {
                    optionhtml = '<option value="' + value[i].custid + '">' + value[i].Departmentname + '</option>';
                    $('#department').append(optionhtml);
                }

                //$("#department").append($("<option></option>").val(value.custid).html(value.Departmentname));
            });

        }

    });
}

$('#source').on('change', function () {
    debugger;
    // var value = $(this).val("Admin");
    roleval = $('#source option:selected').text();


    if (roleval == "TaxiHead") {
        $('.dept').hide();
        $('#source2a').hide();


    }
    else if (roleval == "Vendor") {
        $('.dept').hide();
        $('#source2a').hide();

    }
    else {
        $('.dept').hide();
        $('#source2a').show();

    }

});



function AddServicePostApiCall() {

    debugger;
  
    var UserStatus = $('input[name="candy"]:checked').val();

    var SubuserId = $("#SubUserName").val().toString();


    if (UserStatus == "2") {

        if (SubuserId.length == 0) {
            $('#ErrorMessage').text("Please Select Subuser,If you want to add user under Sub User Master");

            return;
        }
        if (SubuserId.indexOf(',') != -1) {

            $('#ErrorMessage').text("Please Select One  Subuser and try again");
            return;

        }
    }
    var VehicleName = $("#SubUserName option:selected").text();
    var Commentss = "test";
    var SubUsername = $("#SubUserName option:selected").text();

    var email = $("#txtemail").val();
    var Name = $("#txtName").val();
    var mobile = $("#txtMob").val();
    var Password = $("#txtpassword").val();
    var add = $("#txtaddress").val();
    var role = $("#role").val();
    var ConfirmPassword = $("#txtconfirmpassword").val();
    var dept = $("#department").val();
    var panno = $("#txtPanNo").val();
    var gstno = $("#txtGstNo").val();
    if (Password != ConfirmPassword) {
        $('#ErrorMessage').text("Kindly Re-enter  your password & make sure it will match confirm password");
        return;
    }
    var Status = "Open";
    if (Commentss == null) {
        Commentss = 'N/A';
    }

    var selectedAnswer = [];
    $('#divChkbox input:checked').each(function () {
        selectedAnswer.push($(this).attr('name'));
    });
    if (roleval == "Vendor") {
        
        if (panno == null || panno == "") {
            $('#ErrorMessage').text("Kindly enter Pan No.");
            return;
        }
        if (gstno == null || gstno == "") {
            $('#ErrorMessage').text("Kindly enter GST No.");
            return;

        }
        if (add == null || add == "") {
            $('#ErrorMessage').text("Kindly enter Address.");
            return;
        }

    }

    $.blockUI({ message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /></h1>' });
    var AddComplaintUrl = baseUrl + "TaxiAPI/AddSubuserTaxi";
    $.ajax({
        type: "GET",
        data: { Custid: custId, SubUserId: SubuserId, SubUserName: SubUsername, Status: Status, email: email, CreateName: Name, Password: Password, mobile: mobile, add: add, role: role, designation: dept, PanNo: panno, GstNo: gstno },
        url: AddComplaintUrl,
        success: function (data) {
            if (data) {
                $.unblockUI();
                if (data == 1) {

                    swal("Success", "Your User has been registered Successfully with Login " + Name + "", "success")

                    location.reload();
                }
                else {


                    swal("Success", "Please try again ,You are entering wrong Details", "success")

                }
                GetVehicleDetails();
            }
            else {
                $.unblockUI();
                $('#ErrorMessage').text("Record Not Saved.");
            }
        }
    });





}


function inactiveid(custid, status) {
    debugger;
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: baseUrl + "commonapi/updatecustid",
        data: { custid: custid, status: status },
        success: function (data) {



            if (data == "success") {


                toastr.success("Record updated successfully!");

                location.reload();


            }

        },
        error: function (error) {
            toastr.error("something went wrong!");
            return;
        }
    });
}




function GetVehicleDetails() {
    debugger;
    var i = 0;
    var url = baseUrl + "TaxiAPI/GetTaxiDetails";

    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "searching": false,
        "bPaginate": false,
        "sAjaxSource": url,
        "fnServerParams": function (param) {
            param.push({ "name": "custid", "value": $custid });
        },
        "columns": [
            {
                "data": null,
                "bSortable": false,
                "render": function (data, type, full) {
                    i = i + 1;

                    return i;
                }
            },
                {
                    "width": "5%",
                    "data": "login",
                    "bSortable": false
                },
                {
                    "width": "5%",
                    "data": "CustName",
                    "bSortable": false
                },


        {
            "data": null,
            "width": "13%",
            "bSortable": false,
            "render": function (data, type, full) {



                return '<input value="' + full.address + '"  type="text" class="address"/>';

            }

        }
                 ,

        {
            "data": null,
            "width": "15%",
            "bSortable": false,
            "render": function (data, type, full) {



                return '<input value="' + full.email + '"  type="email" class="email"/>';

            }

        }
                 ,


        {
            "data": null,
            "width": "11%",
            "bSortable": false,
            "render": function (data, type, full) {



                return '<input value="' + full.mobile + '"  type="text" class="mobile"/>';

            }

        }
                 ,
                 {
                     "data": null,
                     "width": "11%",
                     "bSortable": false,
                     "render": function (data, type, full) {



                         return '<input value="' + full.PanNo + '"  type="text" class="PanNo"/>';

                     }

                 },
                 {
                     "data": null,
                     "width": "11%",
                     "bSortable": false,
                     "render": function (data, type, full) {

                         return '<input value="' + full.GSTNo + '"  type="text" class="GstNo"/>';

                     }

                 },

                {
                    "width": "7%",
                    "data": "CreatedBy",
                    "bSortable": false
                },
                {
                    "width": "7%",
                    "data": "CreatedOn",
                    "bSortable": false
                },
                 //{
                 //    "data": "status",
                 //    "bSortable": false
                 //}
                  {
                      "data": null,
                      "bSortable": false,
                      "render": function (data, type, full) {

                          if (full.role == "17") {
                              return 'TaxiHead';
                          }
                          else if (full.role == "15") {

                              return 'Admin/' + full.EmpName + '';
                          }
                      }

                  },

        {
            "data": null,
            "bSortable": false,
            "render": function (data, type, full) {

                if (full.status == "Active") {
                    return '<span style="color:green;font-weight:bold;">' + full.status + '</span>';
                }
                else {

                    return '<span style="color:red;font-weight:bold;">' + full.status + '</span>';
                }
            }

        },

                {
                    "width": "20%",
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        return "<button class='btn btn-submit' id='1' onclick='inactiveid(" + full['custid'] + ",0)' >In-active</button>&nbsp;&nbsp;<button class='btn btn-submit' id='1' onclick='inactiveid(" + full['custid'] + ",1)' >Active</button>&nbsp;&nbsp;<button class='btn btn-update'   >Update</button>";
                    }
                }
        ]
    });
}