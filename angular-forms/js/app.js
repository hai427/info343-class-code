/*
 script file for the index.html page
 */

// The array contains strings from the ui-router module
angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return [{
            id: 'default-delete-me',
            fname: 'John',
            lname: 'S-117',
            phone: '206-555-1212',
            dob: '3/28/2255'
        }];
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', { // Name called list
                url: '/contacts',
                templateUrl: 'views/contacts-list.html', // injects into empty <div>
                controller: 'ContactsController'
            })
            .state('detail', { // Name called detail
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });
        $urlRouterProvider.otherwise('/contacts');
    })
    .controller('ContactsController', function($scope, contacts) { // Takes factory param 'contacts'
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts) {
        $scope.contact = contacts.find(function(contact) {
            return contact.id === $stateParams.id; // We used :id in the second .state() if :foo we would use .foo instead of .id
        });

    })
    .controller('EditContactController', function($scope, $stateParams, $state, contacts) {
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            angular.copy($scope.contact, existingContact); // Left is source, right is destination
            $state.go('list');
        }
    });