// API for comments
var Comment = require('../../models/comment');
var Post = require('../../models/post');
var User   = require('../../models/user');
var router = require('express').Router();
var mongoose = require('mongoose'); // should this be here? decouple express from mongoose?

router.get('/', function (req, res, next) { // get endpoint: note namespace (.use in server.js)
  Comment.find({ _post: mongoose.Types.ObjectId(req.query.postid) }) // postid passed as string, need to convert to objectid
  .sort('-date')
  .populate('_user') // use foreign key
  .populate('username') // use foreign key
  .exec(function (err, comments) {
    if (err) { return next(err); }
    res.json(comments); // render out the comments as JSON
  });
});

router.post('/', function (req, res, next) { // post endpoint: note namespace (.use in server.js)
	var comment = new Comment({
		body:		req.body.body,
		_post:		mongoose.Types.ObjectId(req.query.postid) }); // from model comment
	User.findOne({ username: req.auth.username }) // find user
	.exec(function (err, user) {
		if (err) { return next(err); }
			comment._user = user._id; // set the post user_id
			comment.save(function (err, comment) {
				if (err) { return next(err); }
				res.status(201).json(comment);
		});
	});
});

// post endpoint for upvote
router.put('/upvote', function (req, res, next) { // Use PUT when you can update a resource completely through a specific resource.
	Comment.findOneAndUpdate({ _id: req.body._id }, { $inc: { upvotes: 1 }})
		.exec( function (err, comment) {
			if (err) { return next(err); }
			res.status(202).json(comment); // http 202 = submitted
		});
});

// post endpoint for downvote
router.put('/downvote', function (req, res, next) { // Use PUT when you can update a resource completely through a specific resource.
	Comment.findOneAndUpdate({ _id: req.body._id }, { $inc: { upvotes: -1 }})
		.exec( function (err, comment) {
			if (err) { return next(err); }
			res.status(202).json(comment); // http 202 = submitted
		});
});

module.exports = router;
