(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('TaskSummaryByUser', TaskSummaryByUser);

    TaskSummaryByUser.$inject = ['dataservice'];
    function TaskSummaryByUser(dataservice) {
        var vm = this;
        vm.report = {
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            data: []
        };

        activate();

        function activate() {
            return getReport().then(function() {
                
            });
        }

        function getReport() {
            return dataservice.getTaskSummaryByUser().then(function(data) {
                vm.report.data = data;
                return vm.report.data;
            });
        }
		
		
    }
})();