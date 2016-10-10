// API for comments
var Comment = require('../../models/comment');
var Post = require('../../models/post');
var User   = require('../../models/user');
var router = require('express').Router();

router.get('/', function (req, res, next) { // get endpoint: note namespace (.use in server.js)
  Post.find()
  .sort('-date')
  .populate('_user') // use foreign key
  .populate('username') // use foreign key
  .exec(function (err, comments) {
    if (err) { return next(err); }
    res.json(comments); // render out the comments as JSON
  });
});

router.post('/', function (req, res, next) { // post endpoint: note namespace (.use in server.js)
	var comment = new Comment({body:     req.body.body}); // from model comment
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

module.exports = router;
