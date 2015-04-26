(function() {
    'use strict';

    angular
        .module('app.tasks')
        .controller('Tasks', Tasks);

    Tasks.$inject = ['dataservice', 'sessionservice'];
    function Tasks(dataservice, sessionservice) {
        var vm = this;
        vm.tasks = [];
        vm.newTask = '';
        vm.dueOn = null;
		vm.createTask = createTask;
        //date picker stuff
        vm.datepicker = {};
        vm.datepicker.isOpen = false;
        vm.datepicker.open = function($event) {
                                console.log("FUCK");
                                $event.preventDefault();
                                $event.stopPropagation();

                                vm.datepicker.isOpen = true;
                              };




        activate();

        function activate() {
            return getTasks().then(function() {
                
            });
        }

        function getTasks() {
            var username = sessionservice.currentUser.email;
            return dataservice.getTasks(username).then(function(data) {
                vm.tasks = data;
                return vm.tasks;
            });
        }
		
		function createTask() {
            var username = sessionservice.currentUser.email;
			dataservice.createTask(username, vm.newTask, vm.dueOn);
            vm.newTask = '';
            vm.dueOn = null;
		}
    }
})();