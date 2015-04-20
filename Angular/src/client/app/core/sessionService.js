(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('sessionservice', sessionservice);

    function sessionservice() {
		var currentUser = {
			email: "",
			token: "",
			isLoggedIn: false
		}
		
        var service = {
            currentUser: currentUser
        };

        return service;
    }
})();