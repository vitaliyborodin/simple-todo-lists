(function() {
	var app = angular.module('simpleTodo', []);

	app.controller('ListsController', function($scope, $http){
		$scope.formData = {};

		$http.get('/api/lists')
		.success(function(data) {
			$scope.lists = data;
	            // console.log(data);	
	        })
		.error(function(data) {
			console.log('Error: ' + data);
		});

		$scope.createList = function() {
			$http.post('/api/lists')
			.success(function(data) {
				$scope.lists = data;
	                // console.log(data);
	            })
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

		$scope.editList = function(listId, listName) {
			$http.post('/api/lists/' + listId + '?name=' + listName)
			.success(function(data) {
				$scope.lists = data;
	                // console.log(data);
	            })
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

		$scope.deleteList = function(listId) {
			$http.delete('/api/lists/' + listId)
			.success(function(data) {
				$scope.lists = data;
	                // console.log(data);
	            })
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

		$scope.createTask = function(listId, taskText) {
			$http.post('/api/lists/' + listId + '/' + taskText)
			.success(function(data) {
				$scope.formData = {};
				$scope.lists = data;
	                // console.log(data);
	            })
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

		$scope.deleteTask = function(listId, taskId) {
			$http.delete('/api/lists/' + listId + '/' + taskId)
			.success(function(data) {
				$scope.lists = data;
	                // console.log(data);
	            })
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

		$scope.editTask = function(taskId, taskText) {
			$http.put('/api/tasks/' + taskId + '?text=' + taskText)
			.success(function(data) {
				$scope.lists = data;
	                // console.log(data);
	            })
			.error(function(data) {
				console.log('Error: ' + data);
			});
		}

	    $scope.doneTask = function(taskId, isDone) {
	        $http.post('/api/tasks/' + taskId + '?done=' + isDone)
	            .success(function(data) {
	                $scope.lists = data;
	                // console.log(data);
	            })
	            .error(function(data) {
	                console.log('Error: ' + data);
	            });
	    };

	});

})();