(function (app) {
    'use strict';
    app.controller('indexCtrl', indexCtrl);
    indexCtrl.$inject = ['$scope', 'notificationService'];

    function indexCtrl($scope, notificationService) {
        notificationService.displaySuccess('Home');
    }
})(angular.module('blackbox'));