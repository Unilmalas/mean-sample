var db = require('../db');
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var Post = db.model('Post', {
	_user:	{ type: Schema.ObjectId, ref: 'User' },
	//username: { type: String, required: true },
	body:	{ type: String, required: true },
	date:	{ type: Date,   required: true, default: Date.now }
});

module.exports = Post;