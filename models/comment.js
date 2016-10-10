var db = require('../db');
var mongoose = require('mongoose');

var Comment = db.model('Comment', {
	body:		{ type: String, required: true },
	date:		{ type: Date,   required: true, default: Date.now }
	_user:		{ type: Schema.ObjectId, ref: 'User' },
	upvotes: 	{ type: Number, default: 0},
	post: 		{ type: Schema.ObjectId, ref: 'Post' }  // ref: tells Mongoose which model to use during population
});

module.exports = Post;