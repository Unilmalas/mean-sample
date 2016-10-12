// Comments controller
angular.module('app')
.controller('CommentsCtrl', ['$scope', '$routeParams', 'CommentsSvc', function ($scope, $routeParams, CommentsSvc) { // $routeParams have to be injected into controller

  $scope.addComment = function () {
    if ($scope.commentBody && $scope.isAuth) { // commentBody from: input ng-model='commentBody' in template comments.html
      CommentsSvc.create({
        body:		$scope.commentBody,
		postid:		$routeParams.postid
      })
      .success(function (comment) {
        $scope.comments.unshift(comment);
        $scope.commentBody = null;
      })
    } else {
		console.log('You are not authenticated!');
	}
  }
  
  CommentsSvc.fetch($routeParams.postid) // from the route provider (Requires the ngRoute module to be installed)
  .success(function (comments) {
	$scope.comments = comments;
  });
  
}]);