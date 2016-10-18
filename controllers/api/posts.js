// API for posts
var Post = require('../../models/post');
var User   = require('../../models/user');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
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
	var post = new Post({body:     req.body.body});
	//post.username = req.auth.username;
	User.findOne({ username: req.auth.username }) // find user
	.exec(function (err, user) {
		if (err) { return next(err); }
		post._user = user._id; // set the post user_id
		post.save(function (err, post) {
			if (err) { return next(err); }
			res.status(201).json(post);
		});
	});
});

/*router.post('/fileUpload', function (req, res, next) { // post endpoint for file upload: note namespace (.use in server.js)
	//for(i in req)
		console.log('file upload router post: ' + JSON.stringify(req.files));
	console.dir(req.files);
	res.status(201).json();
});*/

router.route('/fileUpload')
	.post(upload.single("ulfile"), function (req, res, next) { /* replace foo-bar with your form field-name */
		console.log('file upload router post: ' + req.files);
		res.status(201).json();
})

module.exports = router;