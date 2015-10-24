var app = angular.module('hackingEdu', []);

app.controller('MainCtrl', function ($scope, $http) {

	listQuestions();

	$scope.submit = function () {
		$http.post('/api/db/post', {
			question: $scope.Q,
			answer: $scope.A
		});
		listQuestions();
		$scope.Q = "";
		$scope.A = "";
	}

	$scope.removeQuestion = function (index) {
		$http.delete('/api/db/remove', {
			data : JSON.stringify({"_id" : $scope.questions[index]._id})
		}).then(
			function (succ) {
				$scope.questions.splice(index, 1);
			});
	}

	function listQuestions () {
		$http.get('/api/db')
			.then(
				function success (res) {
					data = res.data.questions;
					$scope.questions = data;
				},
				function error (err) {
					console.log(err);
				})		
	}

});