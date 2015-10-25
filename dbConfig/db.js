'use strict';

var mongoose = require('mongoose');
var queModel = require('../model/questions');

mongoose.connect('mongodb://'
	.concat("hackingedu"
		.concat(':'
			.concat("test123"
				.concat("@c499.candidate.56.mongolayer.com:10499,candidate.55.mongolayer.com:10368,candidate.56.mongolayer.com:10499/hackingEdu?replicaSet=set-562ca9640c81ada022000510")))));

mongoose.connection.on('error', function (err) {
	console.log('DB Connection err: ' + err);
});

mongoose.connection.on('connected', function () {
	console.log('DB is connected successfully');
});

