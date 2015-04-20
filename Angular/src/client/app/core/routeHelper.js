(function() {
    'use strict';

    angular
        .module('app.core')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$route', 'routehelperConfig', 'sessionservice'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        this.config = {
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $route, routehelperConfig, sessionservice) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };

        init();

        return service;
        ///////////////

        function configureRoutes(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/tasks'});
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    $location.path('/');
                }
            );
			
			//NOTE: Authentication of routes was put here for now.  There's a better way to do this using httpProvider interceptors but we need the backend in place for that.
			$rootScope.$on('$routeChangeStart',
				function(event, next, current) {
					if (next.$$route) {
						if (next.$$route.originalPath != "/login" 
						    && !sessionservice.currentUser.isLoggedIn) {
							$location.path("/login");
						}
					}
				}
			);
        }

        function init() {
            handleRoutingErrors();
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        
    }
})();