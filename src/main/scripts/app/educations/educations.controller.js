;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('EducationsCtrl', function ($scope, $rootScope, $state, $filter, $translate, EducationsService, LocationsService, ArrleeService, $mdDialog, lodash) {

      $rootScope.searchType='educations';
      $scope.searchParams = EducationsService.params;

      $scope.distanceOptions = {min:10,max:150,step:10,value:30};
      $scope.travelTimeOptions = {min: 10, max: 60, step: 5, value: 30};

      $scope.count=0;
      $scope.nearestZip='';
      $scope.currentZip=$scope.searchParams.currentZip;
      $scope.sort=0;

      $scope.courseLanguages=[{text:'educations.result.languages.ger',code:'ger'},{text:'educations.result.languages.fre',code:'fre'},{text:'educations.result.languages.ita',code:'ita'},{text:'educations.result.languages.eng',code:'eng'},{text:'educations.result.languages.other',code:'other'}];

      $scope.swissdocMajorGroup=[{text:'swissdoc.0-100-0-0',code:'1',img:'apprenticeships/swissdoc1.png'},{text:'swissdoc.0-200-0-0',code:'2',img:'apprenticeships/swissdoc2.png'},{text:'swissdoc.0-300-0-0',code:'3',img:'apprenticeships/swissdoc3.png'},{text:'swissdoc.0-400-0-0',code:'4',img:'apprenticeships/swissdoc4.png'},{text:'swissdoc.0-500-0-0',code:'5',img:'apprenticeships/swissdoc5.png'},{text:'swissdoc.0-600-0-0',code:'6',img:'apprenticeships/swissdoc6.png'},{text:'swissdoc.0-700-0-0',code:'7',img:'apprenticeships/swissdoc7.png'},{text:'swissdoc.0-800-0-0',code:'8',img:'apprenticeships/swissdoc8.png'}];

      $scope.swissdocGroupLevel2=[];
      $scope.swissdocGroupLevel2['1']=[
        {code:'11', text:'swissdoc.0-110-0-0'},
        {code:'12', text:'swissdoc.0-120-0-0'},
        {code:'13', text:'swissdoc.0-130-0-0'},
        {code:'14', text:'swissdoc.0-140-0-0'},
        {code:'15', text:'swissdoc.0-150-0-0'},
        {code:'16', text:'swissdoc.0-160-0-0'},
        {code:'17', text:'swissdoc.0-170-0-0'}
      ];
      $scope.swissdocGroupLevel2['2']=[
        {code:'21', text:'swissdoc.0-210-0-0'},
        {code:'22', text:'swissdoc.0-220-0-0'},
        {code:'23', text:'swissdoc.0-230-0-0'}
      ];
      $scope.swissdocGroupLevel2['3']=[
        {code:'31', text:'swissdoc.0-310-0-0'},
        {code:'32', text:'swissdoc.0-320-0-0'},
        {code:'33', text:'swissdoc.0-330-0-0'},
        {code:'34', text:'swissdoc.0-340-0-0'},
        {code:'35', text:'swissdoc.0-350-0-0'}
      ];
      $scope.swissdocGroupLevel2['4']=[
        {code:'41', text:'swissdoc.0-410-0-0'},
        {code:'42', text:'swissdoc.0-420-0-0'},
        {code:'43', text:'swissdoc.0-430-0-0'},
        {code:'44', text:'swissdoc.0-440-0-0'},
        {code:'45', text:'swissdoc.0-450-0-0'}
      ];
      $scope.swissdocGroupLevel2['5']=[
        {code:'51', text:'swissdoc.0-510-0-0'},
        {code:'52', text:'swissdoc.0-520-0-0'},
        {code:'53', text:'swissdoc.0-530-0-0'},
        {code:'54', text:'swissdoc.0-540-0-0'},
        {code:'55', text:'swissdoc.0-550-0-0'},
        {code:'56', text:'swissdoc.0-560-0-0'},
        {code:'57', text:'swissdoc.0-570-0-0'},
        {code:'58', text:'swissdoc.0-580-0-0'},
        {code:'59', text:'swissdoc.0-590-0-0'}
      ];
      $scope.swissdocGroupLevel2['6']=[
        {code:'61', text:'swissdoc.0-610-0-0'},
        {code:'62', text:'swissdoc.0-620-0-0'},
        {code:'63', text:'swissdoc.0-630-0-0'},
        {code:'64', text:'swissdoc.0-640-0-0'}
      ];
      $scope.swissdocGroupLevel2['7']=[
        {code:'71', text:'swissdoc.0-710-0-0'},
        {code:'72', text:'swissdoc.0-720-0-0'},
        {code:'73', text:'swissdoc.0-730-0-0'}
      ];
      $scope.swissdocGroupLevel2['8']=[
        {code:'81', text:'swissdoc.0-810-0-0'},
        {code:'82', text:'swissdoc.0-820-0-0'},
        {code:'83', text:'swissdoc.0-830-0-0'}
      ];

      $scope.countJobs = function () {
        $scope.idle=true;

        if ($scope.searchParams.distanceType==='travelTime') {
          //** countJobs with travelTime parameter
          findByTravelTime();
        }
        else {
          //** countJobs with distance parameter
          find(false);
        }
      };

      $scope.loadMoreResults=function(){
        if ($scope.searchParams.from<$scope.count) {
          $scope.idle=true;

          var from = $scope.searchParams.from;
          from += $scope.searchParams.size;
          if (from > $scope.count) {
            from = $scope.count;
          }
          $scope.searchParams.from = from;
          find(true);
        }
      };

      function findByTravelTime(){
        ArrleeService.getHeatmap($scope.searchParams.currentZip,$scope.searchParams.travelTime).success(function (result) {
          $scope.heatmap = result.heatmap;
          ArrleeService.getZips($scope.searchParams.travelTime).success(function (result) {
            $scope.searchParams.zips = lodash.pluck(result.POI, 'name');
            //** find Jobs with searchParams
            find(false);
          })
            .error(function (error) {
              // todo error handling
              console.log(error);
            });
        })
          .error(function (error) {
            // todo error handling
            console.log(error);
          });
      }

      function find(scroll){
        EducationsService.find().success(function(result){
          if (scroll && angular.isArray($rootScope.educations)){
            $rootScope.educations = $rootScope.educations.concat(result.hits.hits);
          }
          else {
            $rootScope.educations = result.hits.hits;
          }
          $scope.count = result.hits.total;
          $scope.idle=false;
        })
        .error(function (error) {
          // todo error handling
          console.log(error);
        });
      }


      $scope.showTimeInH=function(time){
        var hour = Math.floor(time/60);
        var minute = time-(hour*60);
        if (minute<10){
          minute='0'+minute;
        }
        return hour+':'+minute;
      };

      $scope.setSwissdocGroup=function(swissdoc){
        $scope.searchParams.educationGroup=swissdoc;
        $state.go('education-search');
      };

      function setNewCoords(coords){
        LocationsService.getLocation(coords).success(function(nearestZip){
          if (nearestZip.hits.total>0) {
            $scope.searchParams.currentCoords=coords;
            $scope.nearestZip = nearestZip.hits.hits[0]._source.zip + ' (' + nearestZip.hits.hits[0]._source.name + ')';
            $scope.searchParams.currentZip = parseInt(nearestZip.hits.hits[0]._source.zip,10);
            $scope.currentZip = $scope.searchParams.currentZip;
            $scope.countJobs();
          }
          else {
            $scope.locationError('errors.msg.noValidCoords');
          }
        })
          .error(function(error){
            // todo error handling
            console.log(error);
          });
      }


      $scope.setMyLocation = function () {
        setNewCoords($rootScope.myCoords);
      };

      $scope.setCurrentCoords=function(coords){
        setNewCoords(coords);
      };

      $scope.$watchCollection('myCoords', function () {
        if ($rootScope.myCoords !== undefined && $scope.searchParams.currentCoords===undefined) {
          $scope.searchParams.currentCoords = $rootScope.myCoords;
        }
      });

      $scope.$watchCollection('searchParams.distanceType', function (newValue, oldValue) {
        if (newValue!==oldValue){
          $scope.countJobs();
        }
      });

      $scope.setCurrentZip=function(zip){
        LocationsService.getLocationFromZip(zip).success(function(nearestZip){
          if (nearestZip.hits.total>0) {
            setNewCoords(nearestZip.hits.hits[0]._source.geoLocation);
          }
          else {
            // todo error handling
            $scope.setCurrentZip($scope.searchParams.currentZip);
            $scope.locationError('errors.msg.noValidZip');
          }
        })
          .error(function(error){
            // todo error handling
            console.log(error);
          });
      };

      $scope.locationError=function(errorKey){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .content($translate.instant(errorKey))
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      };

      $scope.sort = 0;
      $scope.sortList = [
        {sort: { field: 'title', order: 'desc' }, text: 'global.sort.coursetitle_az'},
        {sort: { field: 'title', order: 'asc' }, text: 'global.sort.coursetitle_za'},
        {sort: { field: 'location.zip', order: 'desc' }, text: 'global.sort.courseLocation_1000'},
        {sort: { field: 'location.zip', order: 'asc' }, text: 'global.sort.courseLocation_9999'}
      ];
      $scope.sortResultList = function () {
        $scope.searchParams.sort=$scope.sortList[$scope.sort].sort;
        $scope.countJobs();
      };

      $scope.resetSearchParams=function(){
        return EducationsService.resetSearchParams();
      };

      if ($scope.searchParams.currentCoords !== undefined) {
        setNewCoords($scope.searchParams.currentCoords);
      }
      else {
        $scope.setMyLocation();
      }
    });


}());



