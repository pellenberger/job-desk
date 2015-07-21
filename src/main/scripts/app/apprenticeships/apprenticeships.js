'use strict';

angular.module('job-desk')
    .config(function ($stateProvider) {
        $stateProvider
            .state('apprenticeships', {
                parent: 'site',
                url: '/apprenticeships',
                label: 'global.menu.apprenticeships',
                views: {
                    'content@': {
                        templateUrl: 'views/content/apprenticeships/apprenticeships.html',
                        controller: 'ApprenticeshipsCtrl'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('apprenticeships');
                        return $translate.refresh();
                    }]
                }
            })
            .state('apprenticeship-search', {
              parent: 'site',
              url: '/apprenticeship-search',
              views: {
                'content@': {
                  templateUrl: 'views/content/apprenticeships/search.html',
                  controller: 'ApprenticeshipsCtrl'
                }
              },
              resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                  $translatePartialLoader.addPart('jobs');
                  return $translate.refresh();
                }]
              }
            });
    });
