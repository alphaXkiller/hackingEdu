'use strict'
var Ques = require('../controllers/questions');
var mongoose = require('mongoose');
var Questions = require('../model/questions');
var parse = require('co-body');

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