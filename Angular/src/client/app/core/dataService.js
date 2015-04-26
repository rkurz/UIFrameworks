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

        function getTasks(username) {
        	var userTasks = getTasksByUser(username);

			return $q.when(userTasks);
        }
		
		function createTask(username, description, dueOn) {
			var userTasks = getTasksByUser(username);
		    var newId = userTasks[userTasks.length-1].id + 1;
			userTasks.push({id: newId, description: description, dueOn: dueOn, isComplete: false});
		}
		
		function completeTask(username, id) {
			var userTasks = getTasksByUser(username);
			userTasks.filter(function(t) { return t.id == id })[0].isComplete = true;
		}

		function getTasksByUser(username) {
			var result = tasks.filter(function(t) { return t.username == username });
			if (result.length > 0)
				return result[0].tasks;

			//?Setup user's inital tasks list.
			var defaultTasks = getDefaultTasks();
			tasks.push({username: username, tasks: defaultTasks});
			return defaultTasks;
		}

		function getDefaultTasks() {
			return [
				{id: 1, description: 'Eat breakfast', dueOn: new Date(), isComplete: false},
				{id: 2, description: 'Take a shower', dueOn: new Date(), isComplete: false},
				{id: 3, description: 'Dominate the day', dueOn: new Date(), isComplete: false}
			]
		}

    }
})();