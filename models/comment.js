var db = require('../db');
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Comment = db.model('Comment', {
	body:		{ type: String, required: true },
	date:		{ type: Date,   required: true, default: Date.now },
	_user:		{ type: Schema.ObjectId, ref: 'User' }, // uid for commenting user
	upvotes: 	{ type: Number, default: 0},
	_post: 		{ type: Schema.ObjectId, ref: 'Post' }  // points to Post parent; ref: tells Mongoose which model to use during population
});

module.exports = Comment;