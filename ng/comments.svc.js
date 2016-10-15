// comments services
angular.module('app')
.service('CommentsSvc', function ($http) {
  this.fetch = function (postid) {
    return $http.get('/api/comments', {params:{"postid": postid}}); // passing paramters like so {params:{"postid": postid...
  }
  this.create = function (comment, postid) {
    //return $http.post('/api/comments', comment);
	return $http({
		url: '/api/comments',
		method: "POST",
		params: {"postid": postid},
		data: comment
    });
  }
  this.upvote = function (comment) {
	return $http({
		url: '/api/comments/:upvote', // route for upvotes
		method: "PUT", // // Use PUT when you can update a resource completely through a specific resource
		data: comment
    });
  }
  this.downvote = function (comment) {
	return $http({
		url: '/api/comments/:downvote', // route for downvotes
		method: "PUT", // // Use PUT when you can update a resource completely through a specific resource
		data: comment
    });
  }
});