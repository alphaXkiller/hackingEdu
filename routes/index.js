'use strict'
var Ques = require('../controllers/questions');
var mongoose = require('mongoose');
var Questions = require('../model/questions');
var parse = require('co-body');
var watson = require('watson-developer-cloud');
var fs = require('fs');

module.exports = function (router) {
	router.post('/api/db/post', function* () {
		var newQuestion = yield parse.json(this);
		
		yield Questions.create(newQuestion, function (err) {
			if (err)
				console.error(err);
		});
		this.redirect('/');
	})

	router.get('/api/db', function* () {
		var questions = {};
		var textToSpeech = watson.text_to_speech({
			username: 'cd8c307b-2707-4a7c-a63d-c8c3957a0e5e',
			password: 'ogOpRc4d0rV4',
			version: 	'v1'
		});
		var params = {
			text: "Whats the name of your university?University of Nevada, Las Vegaswhere are you?In San Mateo",
			voice: "en-US_MichaelVoice",
			accept: 'audio/wav'
		};

		yield Questions.find({}, function (err, data) {
			if (err) throw err;
			questions.questions = data;
			// data.forEach(function (question, index) {
			// 	params.text = params.text.concat(question.question).concat(question.answer);
			// })
			console.log(params);
			textToSpeech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
		});

		this.body = questions;

	});

	router.del('/api/db/remove/', function* () {
		var delQuestion = yield parse.json(this);

		yield Questions.find({_id:delQuestion._id}, function (err, data) {
			if (err) throw err;
			console.log(data);
		})
		yield Questions.findOneAndRemove({_id: delQuestion._id}, function	(err) {
			if (err) throw err;
			console.log('deleted');
		});

		console.log(this);

		this.response.status = 200;
	});
};