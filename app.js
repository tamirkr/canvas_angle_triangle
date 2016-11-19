/**
 * Created by Tamir on 14/11/2016.
 */
var app = angular.module("app", ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider' ,function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home')

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controllerAs: 'vm',
                controller: 'HomeCtrl'
            })
            .state('triangle', {
                url: '/triangle',
                templateUrl: 'triangle.html',
                controllerAs: 'vm',
                controller: 'TriangleCtrl'
            })
    }])
