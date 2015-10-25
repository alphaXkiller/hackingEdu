'use strict'
var Ques = require('../controllers/questions');
var mongoose = require('mongoose');
var Questions = require('../model/questions');
var parse = require('co-body');
var watson = require('watson-developer-cloud');
var fs = require('fs');
var textToSpeech = watson.text_to_speech({
	username: 'ab05588c-3b05-4191-b89c-505ec7a54bd5',
	password: 'HV45jhEDMob2',
	version: 	'v1'
});
var params = {
	text: "",
	voice: "en-US_MichaelVoice",
	accept: 'audio/wav'
};

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

		yield Questions.find({}, function (err, data) {
			if (err) throw err;
			questions.questions = data;
			data.forEach(function (question, index) {
				params.text = params.text.concat(question.question).concat(question.answer);
			});
			console.log(params);
			textToSpeech.synthesize(params).pipe(fs.createWriteStream('public/media/notes.wav'));
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