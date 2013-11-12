// create the module and name it ngModuleSimpleApp
var ngModuleSimpleApp = angular.module('ngModuleSimpleApp', []);

// configure our routes
ngModuleSimpleApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('simpleapp/', {
            templateUrl : 'public/partials/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('simpleapp/about', {
            templateUrl : 'public/partials/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('simpleapp/contact', {
            templateUrl : 'public/partials/contact.html',
            controller  : 'contactController'
        });
});

// create the controller and inject Angular's $scope
ngModuleSimpleApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

ngModuleSimpleApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

ngModuleSimpleApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});