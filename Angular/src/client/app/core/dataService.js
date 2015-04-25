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
        	console.log("Getting tasks for: " + username);
        	var userTasks = getTasksByUser(username);
   //      	if (userTasks.length == 0) {

   //      	}

			// if (tasks.length == 0) {
			// 	tasks = getDefaultTasks();
			// } 

			return $q.when(userTasks);
        }
		
		function createTask(username, description) {
			console.log("Creating tasks for: " + username);
			console.log("Count: " + tasks.length);
			var userTasks = getTasksByUser(username);
		    var newId = userTasks[userTasks.length-1].id + 1;
			userTasks.push({id: newId, description: description, isComplete: false});
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
				{id: 1, description: 'Eat breakfast', isComplete: false},
				{id: 2, description: 'Take a shower', isComplete: false},
				{id: 3, description: 'Dominate the day', isComplete: false}
			]
		}

		// function foo() {
		// 	var tasks = [
		// 		{username: "cartman", tasks = [{id: 1, name="name"}
		// 									   {id: 2, name="last"}]},
		// 		{username: "marsh", tasks = [{id: 1, name="name"}
		// 									   {id: 2, name="last"}]}

		// 	]

		// }

    }
})();