﻿$(function () {
    var logindata;

    if (JSON.parse(localStorage.getItem("GroupSelectedUser")) != true) {
        if (JSON.parse(localStorage.getItem("cid")) != null) {
            logindata = JSON.parse(localStorage.getItem("cid"));
            $custid = logindata.data.CustId;
            localStorage.setItem("custId", $custid);
        }
        else if (JSON.parse(localStorage.getItem("staffId")) != null) {
            var logindata = JSON.parse(localStorage.getItem("staffId"));
            $custid = JSON.parse(localStorage.getItem("custID"));
            //for super admin  checking
            logindata.data.CustId = $custid;
            //$("#btnAdmin").removeClass("hidden");
            document.getElementById("btnAdmin").style.display = "block";
        }
        else {
            $custid = JSON.parse(localStorage.getItem("custID"));
        }
        // //for getting subusers
        if (!JSON.parse(localStorage.getItem("SubUsers"))) {
            $.get(apiBase.apiurl + "UserAPI/GetSubUser?custid=" + $custid, asyn = false, function (data) {
                if (data.length > 1) {
                    document.getElementById("divDdlGroupUser").style.display = "block";
                    // $("#divDdlGroupUser").removeClass("hidden");
                    localStorage.setItem("GroupSelectedUser", "true");
                    localStorage.setItem("SubUsers", data);
                    $.each(data, function (i, item) {
                        $('#ddlGroupUser').append($('<option id=' + item.custid + '></option>').val(item.custid).html(item.CustName));

                        var d = '#' + item.custid;
                        if (parseInt(item.custid) == parseInt($custid)) {

                            $(d).addClass('Subuser');
                            master = item.custid;
                        }
                    })
                }
            });
        }
    }
    else {
        //$custid = JSON.parse(localStorage.getItem("custId"));
        //if (JSON.parse(localStorage.getItem("staffId")) != null) {
        //    $custid = JSON.parse(localStorage.getItem("custID"));
        //}
        if (!JSON.parse(localStorage.getItem("custId"))) {
            logindata = JSON.parse(localStorage.getItem("cid"));
            $custid = (logindata) ? logindata.data.CustId : JSON.parse(localStorage.getItem("custID"));
            //for getting subusers
        }

        else {
            $custid = JSON.parse(localStorage.getItem("custId"));
        }
        if (JSON.parse(localStorage.getItem("cid")) != null) {
            logindata = JSON.parse(localStorage.getItem("cid"));
        }
        var rootCustId = (logindata) ? logindata.data.CustId : JSON.parse(localStorage.getItem("custID"));
        if (JSON.parse(localStorage.getItem("GroupSelectedUser")) == true) {
            $("#divDdlGroupUser").removeClass("hidden");
            $.get(apiBase.apiurl + "UserAPI/GetSubUser?custid=" + rootCustId, asyn = false, function (data) {
                if (data.length > 1) {
                    document.getElementById("divDdlGroupUser").style.display = "block";

                    //                                $("#divDdlGroupUser").removeClass("hidden");
                    localStorage.setItem("GroupSelectedUser", "true");
                    localStorage.setItem("SubUsers", data);
                    $.each(data, function (i, item) {
                        if (item.custid == rootCustId) {
                            $('#ddlGroupUser').append($('<option id=' + item.custid + ' selected="selected"></option>').val(item.custid).html(item.CustName));
                            var d = '#' + item.custid;
                            if (parseInt(item.custid) == parseInt(rootCustId)) {

                                $(d).addClass('Subuser');

                            }
                        }
                        else {
                            $('#ddlGroupUser').append($('<option id=' + item.custid + '></option>').val(item.custid).html(item.CustName));
                            var d = '#' + item.custid;
                            if (parseInt(item.custid) == parseInt(rootCustId)) {

                                $(d).addClass('Subuser');

                            }
                        }
                    })
                }
                if (localStorage.getItem("custId") != null) {
                    $("#ddlGroupUser").val(localStorage.getItem("custId"));
                }
            });
        }




        if (JSON.parse(localStorage.getItem("staffId")) != null) {
            //$("#btnAdmin").removeClass("hidden");
            document.getElementById("btnAdmin").style.display = "block";
        }
    }



    //to redirect to login page
    if (!$custid) {
        window.location.href = "/home/login?logout=y";
    }
    $.ajax({
        url: 'https://api1.trackmaster.in//api/commonapi/' + 'Getisblocked',
        data: { custid: localStorage["custID"] },
        success: function (data) {
            var pathname = window.location.pathname;
            if (pathname == '/billing/account-summary' || pathname == '/billing/bill' || window.location.href.includes('localhost')) { }
            else {
                if (data == "True") {
                    window.location.href = "/billing/account-summary"
                }
            }


        }


    });

    $('#ddlGroupUser').on('change', function () {
        localStorage.removeItem("custId");
        localStorage.setItem("GroupSelectedUser", "true");
        var selectedUser = $("#ddlGroupUser").val();
        localStorage.setItem("custId", selectedUser);

        $custid = selectedUser;
        location.reload(true);
    })

    //check for custom menu and navbar
    if (localStorage.getItem("IsCustomMenu") == "true") {
        $("#divCustomMenu").removeClass("hidden");
        $("#divNavbar").addClass("hidden");

        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "commonapi/GetCustomMenuListNTM",
            data: { custid: $custid },
            success: function (data) {
                $("#cust_navbar-collapse").append(data);
            },
            error: function (error) {
                toastr.error("something went wrong!");
            }
        });

    }
    else {
        $("#divCustomMenu").addClass("hidden");
        $("#divNavbar").removeClass("hidden");
    }


});

