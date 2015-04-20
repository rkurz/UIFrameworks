(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authenticationservice', authenticationservice);

    authenticationservice.$inject = ['sessionservice'];
    function authenticationservice(sessionservice) {
        var service = {
            isValid: isValid,
			signInUser: signInUser
        };

        return service;

		function isValid(email, password) {
			if (email != "")
				return true;
			else
				return false;
		}
		
		function signInUser(email) {
			sessionservice.currentUser.email = email;
			sessionservice.currentUser.token = "tbd";
			sessionservice.currentUser.isLoggedIn = true;
		}

    }
})();