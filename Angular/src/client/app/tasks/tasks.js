(function() {
    'use strict';

    angular
        .module('app.tasks')
        .controller('Tasks', Tasks);

    Tasks.$inject = ['dataservice'];
    function Tasks(dataservice) {
        var vm = this;
        vm.tasks = [];
		vm.createTask = createTask;

        activate();

        function activate() {
            return getTasks().then(function() {
                
            });
        }

        function getTasks() {
            return dataservice.getTasks().then(function(data) {
                vm.tasks = data;
                return vm.tasks;
            });
        }
		
		function createTask() {
			dataservice.createTask(this.newTask);
		}
    }
})();