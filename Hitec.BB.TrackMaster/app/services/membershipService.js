﻿(function (app) {
    'use strict';

    app.factory('membershipService', membershipService);

    membershipService.$inject = ['apiService', 'notificationService', '$http', '$base64', '$rootScope', '$cookies'];

    function membershipService(apiService, notificationService, $http, $base64, $rootScope, $cookies) {
     

        
        var service = {
            login: login,
            loginStaff:loginStaff,
            saveCredentials: saveCredentials,
            removeCredentials: removeCredentials,
            isUserLoggedIn: isUserLoggedIn,
            saveCredentialsForStaff:saveCredentialsForStaff
        }

        function login(user, completed) {
            var config = {
                params: {
                    userId: user.username,
                    password: CryptoJS.SHA1(user.password).toString(),
                    
                }
            };

    // apiService.get('https://api1.trackmaster.in/' + 'api/commonAPI/AuthorizeUser', config,
         apiService.get('http://localhost:3970/' + 'api/commonAPI/AuthorizeUser', config,

            completed,
            loginFailed);
        }

        function loginStaff(user, completed) {
            var config = {
                params: {
                    userId: user.username,
                    password: user.password,
                }
            };

          // apiService.get('https://api1.trackmaster.in/' + 'api/commonAPI/AuthorizeStaff', config,
            apiService.get('http://localhost:3970/' + 'api/commonAPI/AuthorizeUser', config,
            completed,
            loginFailed);
        }

        function saveCredentials(user, result_data) {
            // Set Session
            localStorage.setItem("cid", JSON.stringify(result_data));
           var logindata = JSON.parse(localStorage.getItem("cid"));
            localStorage.setItem("IsCustomMenu", logindata.data.IsCustomMenu);
            var membershipData = $base64.encode(user.username + ':' + user.password);
            $rootScope.repository = {
                loggedUser: {
                    username: user.username,
                    authdata: membershipData,
                    custId: result_data.data.CustId
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + membershipData;
            //$cookieStore.put('repository', $rootScope.repository);
        }

        function saveCredentialsForStaff(user, result_data) {
            // Set Session
            localStorage.setItem("staffId", JSON.stringify(result_data));

            var membershipData = $base64.encode(user.username + ':' + user.password);
            $rootScope.repository = {
                loggedUser: {
                    username: user.username,
                    authdata: membershipData,
                    custId: result_data.data.CustId
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + membershipData;
            //$cookieStore.put('repository', $rootScope.repository);
        }

        function removeCredentials() {
        
            var  logindata = JSON.parse(localStorage.getItem("cid"));
            if (logindata) {
          $custid = logindata.data.CustId;
          
              var config = {
                  params: {
                      custId: $custid,
                  }
              };

              //reducing number of login check
              apiService.get('https://api1.trackmaster.in/' + 'api/commonAPI/Logout', config, function () { }, function () { });
          }

            // Remove Session
            localStorage.removeItem("cid");
            localStorage.removeItem("staffId");
            localStorage.removeItem("custID");


            localStorage.removeItem("customMenuList");
          
            localStorage.removeItem("custId");
            //for group user
            localStorage.removeItem("GroupSelectedUser");
            localStorage.removeItem("SubUsers");
            localStorage.removeItem('IsVerified');
            localStorage.clear();

            $http.defaults.headers.common.Authorization = '';
        };

        function loginFailed(response) {
            notificationService.displayError('Please enter valid Username and password.');
            $("#btnSubmit").removeAttr('disabled');
        }

        function registrationFailed(response) {
            notificationService.displayError('Registration failed. Try again.');
        }

        function isUserLoggedIn() {
            return $rootScope.repository.loggedUser != null;
        }

        return service;
    }



})(angular.module('common.core'));