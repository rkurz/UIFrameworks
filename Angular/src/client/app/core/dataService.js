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
			createTask: createTask,
			getTaskSummaryByUser: getTaskSummaryByUser
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
			];
		}

		//Fake data for the sample task summary report.
		function getTaskSummaryByUser(){
			var report = [
							{name: "Eric Cartman", overdueTaskCount: 5, incompleteTaskCount: 5, completeTaskCount: 0},
							{name: "Stan Marsh", overdueTaskCount: 0, incompleteTaskCount: 3, completeTaskCount: 4},
							{name: "Kyle Broflovski", overdueTaskCount: 2, incompleteTaskCount: 3, completeTaskCount: 1},
							{name: "Kenny McCormick", overdueTaskCount: 0, incompleteTaskCount: 0, completeTaskCount: 0},
							{name: "Butters Stotch", overdueTaskCount: 0, incompleteTaskCount: 0, completeTaskCount: 10},
							{name: "Randy Marsh", overdueTaskCount: 1, incompleteTaskCount: 1, completeTaskCount: 1},
							{name: "Jimmy Valmer", overdueTaskCount: 0, incompleteTaskCount: 0, completeTaskCount: 0}
						];
			return $q.when(report);
		}

    }
})();