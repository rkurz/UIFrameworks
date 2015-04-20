(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q'];
    function dataservice($http, $location, $q) {
		var tasks = [];
        var service = {
            getTasks: getTasks,
			createTask: createTask
        };

        return service;

        function getTasks() {
			if (tasks.length == 0) {
				tasks = [
					{id: 1, description: 'Eat breakfast', isComplete: false},
					{id: 2, description: 'Take a shower', isComplete: false},
					{id: 3, description: 'Dominate the day', isComplete: true}
				];
			} 

			return $q.when(tasks);
        }
		
		function createTask(description) {
		    var newId = tasks[tasks.length-1].id + 1;
			tasks.push({id: newId, description: description, isComplete: false});
		}
		
		function completeTask(id) {
			tasks.filter(function(t) { return t.id == id })[0].isComplete = true;
		}

    }
})();