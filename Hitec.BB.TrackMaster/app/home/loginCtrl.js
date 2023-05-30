
var $custid;
(function (app) {
    'use strict';

    app.controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', 'membershipService', 'notificationService', '$rootScope', '$location'];

    function loginCtrl($scope, membershipService, notificationService, $rootScope, $location) {

        $scope.login = login;
        $scope.loginnew = loginnew;

        $scope.user = {};


        function loginnew() {
            debugger;


            $scope.user.username = $("#username").val();
            $scope.user.password = $("#txtPassword").val();

            $scope.disableSubmit = true;
            localStorage.setItem("withoutlogin", 1);
            membershipService.login($scope.user, loginCompleted)

        }
        function login() {
            //commenting code is for term and condition check

            //if (!$("#chkTermConditions").is(':checked')) {
            //    notificationService.displayWarning('Please accept Terms and Conditions.');
            //    $scope.disableSubmit = false;
            //}
            //else {
            $scope.disableSubmit = true;
            membershipService.login($scope.user, loginCompleted)
            //}
        }

        function loginCompleted(result) {
            debugger;
            console.log(result.data);
            //this check is for awmoo1
            //if (result.data.CustId == 12248) {
            //    return false;
            //}

            localStorage.setItem('custid', result.data.CustId);
            if (result != null && result.data.CustId > 0) {
                if (result.data.LoginCount > 100) {
                    notificationService.displayError('Login limit exceeded.Please logout from other systems.');
                    return false;
                }
                if (result.data.IsPasswordUpdated == false) {

                    debugger;
                    $custid = result.data.CustId;
                    membershipService.saveCredentials($scope.user, result);
                    //for updating passowrd
                    $.get('/settings/_changePassword/Settings?userType=userPassword', function (data) {
                        $('#modalInnerContain').html(data);
                        $('#modalOuterDiv').modal('show');
                    });
                    
                    $scope.disableSubmit = false;
                    return false;
                }
                debugger;
                if (result.data.msg == "Your Account is blocked due to non payment! Kindly contact your Account executive." || result.data.msg == "Your Account is deactive! Kindly contact your Service executive.") {
                    notificationService.displayError(result.data.msg);

                    $.ajax({
                        type: "Get",
                        //url: 'https://api1.trackmaster.in/api/addonAPI/GetnewAppBanner',
                        url: 'https://api1.trackmaster.in/api/invoiceAPI/GetAppBanner',
                        data: {
                            custid: parseInt(result.data.CustId), type: "Blackbox"
                        },
                        contentType: "application/x-www-form-urlencoded",
                        dataType: "json",
                        success: function (data) {

                            debugger;
                            membershipService.saveCredentials($scope.user, result);
                            notificationService.displaySuccess('Login successful. Redirecting...');
                            if (data.Message.length > 0) {
                                localStorage.setItem('custid', result.data.CustId);
                                window.location.href = "/settings/billpayment";

                            }
                            else {
                                if (localStorage.getItem("withoutlogin") == 1) {

                                    window.location.href = "/report/Livestatus";

                                }

                                else if (result.data.IsCustomDashboard == 1) {
                                    window.location.href = "/map/Iconshowmap";
                                }
                                else if (result.data.IsCustomDashboard == 2) {
                                    window.location.href = "/dashboard/dashboard2";
                                }
                                else {
                                    window.location.href = "/dashboard/dashboard";
                                }


                            }
                        }
                    });
                    $scope.disableSubmit = false;
                    return false;
                }
                else {
                    $.ajax({
                        type: "Get",
                        //url: 'https://api1.trackmaster.in/api/addonAPI/GetnewAppBanner',
                        url: 'https://api1.trackmaster.in/api/invoiceAPI/GetAppBanner',
                        data: {
                            custid: parseInt(result.data.CustId), type: "Blackbox"
                        },
                        contentType: "application/x-www-form-urlencoded",
                        dataType: "json",
                        success: function (data) {

                            debugger;
                            membershipService.saveCredentials($scope.user, result);
                            notificationService.displaySuccess('Login successful. Redirecting...');
                            if (data.Message.length > 0) {
                                localStorage.setItem('custid', result.data.CustId);
                                window.location.href = "/settings/billpayment";

                            }
                            else {
                                if (localStorage.getItem("withoutlogin") == 1) {

                                    window.location.href = "/report/Livestatus";

                                }

                                else if (result.data.IsCustomDashboard == 1) {
                                    window.location.href = "/map/Iconshowmap";
                                }
                                else if (result.data.IsCustomDashboard == 2) {
                                    window.location.href = "/dashboard/dashboard2";
                                }
                                else if (result.data.IsCustomDashboard == 3) {
                                    window.location.href = "/dashboard/dashboard3";
                                    localStorage.setItem("iscustom", 3);
                                }
                                else {
                                    window.location.href = "/dashboard/dashboard";
                                }


                            }
                        }
                    });
                }



            }
            else {
                $scope.disableSubmit = false;
                membershipService.loginStaff($scope.user, loginCompleted1);
                //  notificationService.displayError('Login failed. Try again.');
            }
        }
        function loginCompleted1(result) {
            console.log(result.data);
            if (result != null && result.data != null) {
                membershipService.saveCredentialsForStaff($scope.user, result);
                notificationService.displaySuccess('Login successful. Redirecting...');

                window.location.href = "/admin/staff";

            }
            else {
                notificationService.displayError('Login failed. Try again.');
                $scope.disableSubmit = false;
                return false;
            }
        }
    }


    window.submitPassword = function () {
        var custId = $custid;
        var url;
        if (userType == "admin") {
            url = apiBase.apiurl + "AdminAPI/UpdateAdminPassword";
        }
        else {
            url = apiBase.apiurl + "AdminAPI/ChangePassword";
        }

        var CurrentPassword = $("#CurrentPassword").val();
        var userType = $("#userType").val();
        var NewPassword = $("#txtNewPassword").val();
        var txtCnfrmNewPwd = $("#txtCnfrmNewPwd").val();
        if (NewPassword == txtCnfrmNewPwd) {
            //     var form= $("#formChangePassword").serialize();
            $.ajax({
                dataType: "json",
                type: "GET",
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                url: url,
                data: { custId: custId, CurrentPassword: CurrentPassword, NewPassword: NewPassword },
                success: function (data) {
                    toastr.success("Password Updated");
                    setTimeout(function () {
                        location.href = "/dashboard/dashboard"
                    }, 1000);

                },
                error: function (error) {
                    toastr.error("Something went wrong. please fill unique password!");
                }
            });
        }
        else {
            toastr.error("Confirm password and New password does not match!");
        }
    }



})(angular.module('common.core'));