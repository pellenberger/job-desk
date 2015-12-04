;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('UpdateService', function ($window, $interval, $mdToast) {

      var updateDelay = 6000;
      var toastHideDelay = 0;
      var appCache = $window.applicationCache;

      function init() {
        appCache.addEventListener('updateready', function() {
          if (appCache.status == appCache.UPDATEREADY) {
            showUpdateToast();
          }
        }, false);

        $interval(function () {
          appCache.update();
        }, updateDelay);
      }

      function showUpdateToast() {
        var toast = $mdToast.simple()
          .content('A new version is available !')
          .action('Update')
          .hideDelay(toastHideDelay)
          .position('top right');
        $mdToast.show(toast).then(function(response) {
          if (response == 'ok') {
            $window.location.reload();
          }
        });
      }

      return {
        init: init
      };
    });
}());



