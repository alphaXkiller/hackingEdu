'use strict'
var mongoose = require('mongoose');
var Questions = require('../model/questions');

module.exports.queryQ = function* () {
	var questions = {};

	yield Questions.find({}, function (err, data) {
		if (err) throw err;
		questions.questions = data;
	});

	this.body = questions;
};

// exports.postQ = function () {
// 	var questions = new queSchema();
// }