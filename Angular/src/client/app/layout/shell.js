(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$scope', 'sessionservice'];
    function Shell($scope, sessionservice) {
        var vm = this;
        vm.isLoggedIn = sessionservice.currentUser.isLoggedIn;
		vm.username = sessionservice.currentUser.email;
		
		//Keep an eye on the logged in user so that the view model will know if something changes.
		$scope.$watch(angular.bind(this, function() {
			return sessionservice.currentUser.isLoggedIn;
		}), function (newVal, oldVal) {
			vm.isLoggedIn = newVal;
		});
		$scope.$watch(angular.bind(this, function() {
			return sessionservice.currentUser.email;
		}), function (newVal, oldVal) {
			vm.username = newVal;
		});
    }
})();