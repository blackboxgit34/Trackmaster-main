(function (app) {
    'use strict';
    app.controller('rootCtrl', rootCtrl);

    rootCtrl.$inject = ['$scope', '$rootScope', 'membershipService', 'notificationService'];
    function rootCtrl($scope, $rootScope, membershipService, notificationService) {
        $scope.logout = logout;
        if (JSON.parse(localStorage.getItem("cid")) != null) {
            $rootScope.loginName = JSON.parse(localStorage.getItem("cid")).data.CustName;
        }
        else {
            if (JSON.parse(localStorage.getItem("custId")) != null) {
                $rootScope.loginName = JSON.parse(localStorage.getItem("custId"));
            }
            else {
                if (JSON.parse(localStorage.getItem("custID")) != null) {
                    $rootScope.loginName = JSON.parse(localStorage.getItem("custID"));

                }
                else if (JSON.parse(localStorage.getItem("cid")) != null) {
                    $rootScope.loginName = JSON.parse(localStorage.getItem("cid")).data.CustName;
                }
                else if (JSON.parse(localStorage.getItem("staffId")) != null) {
                    $rootScope.loginName = JSON.parse(localStorage.getItem("staffId")).data.EmpID;
                }
                else   {

                    $rootScope.loginName = JSON.parse(localStorage.getItem("custID"));
                }
               
            }
        }


        function logout() {
            membershipService.removeCredentials();
            notificationService.displaySuccess("logging out...");
            window.location.href = "/home/login";
        }
    }

})(angular.module('blackbox'));