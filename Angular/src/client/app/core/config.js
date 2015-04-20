(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(configure);

	configure.$inject = ['$logProvider', '$routeProvider', 'routehelperConfigProvider'];

    function configure ($logProvider, $routeProvider, routehelperConfigProvider) {
        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'Tasks: ';
        var resolveAlways = { 
		
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;
    }
})();