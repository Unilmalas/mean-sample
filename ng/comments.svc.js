// comments services
angular.module('app')
.service('CommentsSvc', function ($http) {
  this.fetch = function (postid) {
    return $http.get('/api/comments', {params:{"postid": postid}});
  }
  this.create = function (comment) {
    return $http.post('/api/comments', comment);
  }
});