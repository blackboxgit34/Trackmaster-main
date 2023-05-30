(function (app) {
    'use strict';

    app.controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', 'membershipService', 'notificationService', '$rootScope', '$location'];

    function loginCtrl($scope, membershipService, notificationService, $rootScope, $location) {

        $scope.login = login;

        $scope.user = {};

        function login() {
            $scope.disableSubmit = true;
            membershipService.login($scope.user, loginCompleted)
        }

        function loginCompleted(result) {
            console.log(result.data);
            if (result != null && result.data.CustId > 0) {
                if (result.data.LoginCount > 100) {
                    notificationService.displayError('Login limit exceeded.Please logout from other systems.');
                    return false;
                }
                membershipService.saveCredentials($scope.user, result);
                notificationService.displaySuccess('Login successful. Redirecting...');
                window.location.href = "/dashboard/dashboard";
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

})(angular.module('common.core'));