(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    Login.$inject = ['$location', 'authenticationservice'];
    function Login($location, authenticationservice) {
        var vm = this;
        vm.email = "";
		vm.password = "";
		vm.authenticate = authenticate;
		vm.message = "";
		
		function authenticate() {
			if (authenticationservice.isValid(vm.email, vm.password))
			{
				authenticationservice.signInUser(vm.email);
				
				//Take user to task list
				$location.path("/tasks");
			} else {
				vm.message = "Credentials not valid.";
			}
		}
    }
})();