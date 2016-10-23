// API for posts
var Post = require('../../models/post');
var User   = require('../../models/user');
var router = require('express').Router();

router.get('/', function (req, res, next) { // get endpoint: note namespace (.use in server.js)
  Post.find()
  .sort('-date')
  .populate('_user') // use foreign key
  .populate('username') // use foreign key
  .exec(function (err, posts) {
    if (err) { return next(err); }
    res.json(posts); // render out the posts as JSON
  });
});

router.post('/', function (req, res, next) { // post endpoint: note namespace (.use in server.js)
	var post = new Post({	body:     	req.body.body,
							link:		req.body.link,
							img:		req.body.img});
	//post.username = req.auth.username;
	User.findOne({ username: req.auth.username }) // find user
	.exec(function (err, user) {
		if (err) { return next(err); }
		post._user = user._id; // set the post user_id
		post.save(function (err, post) {
			if (err) { return next(err); }
			//console.log(post.img);
			res.status(201).json(post);
		});
	});
});

module.exports = router;