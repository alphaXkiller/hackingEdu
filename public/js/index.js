var app = angular.module('hackingEdu', ['ngAudio']);

app.controller('MainCtrl', function ($scope, $http, ngAudio) {

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

	$scope.sound = ngAudio.load("media/notes.ogg");
	$scope.play = function () {
		$scope.sound.play();
	}

	$scope.pause = function () {
		$scope.sound.pause();
	}

	$scope.stop = function () {
		$scope.sound.stop();
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