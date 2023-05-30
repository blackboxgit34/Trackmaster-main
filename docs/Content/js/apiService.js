(function (app) {
    'use strict';

    app.factory('apiService', apiService);

    apiService.$inject = ['$http', '$location', 'notificationService','$rootScope'];

    function apiService($http, $location, notificationService, $rootScope) {
        var service = {
            get: get,
            post: post
        };

        function get(url, config, success, failure) {
            return $http.get(url, config)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        if (error.status == '401') {
                            notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }

        function post(url, data, success, failure) {
            return $http.post(url, data)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        console.log(error);
                        if (error.status == '401') {
                            notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (error.status == '400') {
                            for (var i = error.data.Errors.length -1; i >= 0 ; i--)
                            {
                                notificationService.displayError(error.data.Errors[i]);
                            }
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }

        return service;
    }

})(angular.module('common.core'));