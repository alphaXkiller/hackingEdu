var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var queSchema = new Schema ({
	question: String,
	answer: String
});

var Questions = mongoose.model('questions', queSchema);

module.exports = Questions;