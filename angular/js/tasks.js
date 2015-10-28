/* 
    script for the tasks.html file 
*/

angular.module('Tasks', [])
    .constant('taskKey', 'tasks')
    .controller('TasksController', function($scope, taskKey) {
        'use strict';

        //initialize tasks property on the scope to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(taskKey)) || [];
        //initialize newTask to an empty object
        $scope.newTask = {};

        function saveTasks() {
            localStorage.setItem(taskKey, angular.toJson($scope.tasks))
        }

        //add a function to add newTask to the array
        $scope.addTask = function() {
            //push the current value of the newTask into the tasks array
            $scope.tasks.push($scope.newTask);

            //save the tasks
            saveTasks();

            //reset newTask to an empty object
            $scope.newTask = {};
        }

        //function to toggle task done state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };
    });