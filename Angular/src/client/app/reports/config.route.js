(function() {
    'use strict';

    angular
        .module('app.reports')
        .run(appRun);

    appRun.$inject = ['routehelper']
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }
	
	function getRoutes() {
        return [
            {
                url: '/report/tasksummarybyuser',
                config: {
                    templateUrl: 'app/reports/taskSummaryByUser.html',
                    controller: 'TaskSummaryByUser',
                    controllerAs: 'vm',
                    title: 'Task Summary By User'
                }
            }
        ];
    }
    
})();