(function() {
    'use strict';

    angular
        .module('app.tasks')
        .run(appRun);

    appRun.$inject = ['routehelper']
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }
	
	function getRoutes() {
        return [
            {
                url: '/tasks',
                config: {
                    templateUrl: 'app/tasks/tasks.html',
                    controller: 'Tasks',
                    controllerAs: 'vm',
                    title: 'Tasks'
                }
            }
        ];
    }
    
})();