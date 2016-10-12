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
});