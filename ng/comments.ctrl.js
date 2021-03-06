// Comments controller
angular.module('app')
.controller('CommentsCtrl', ['$scope', '$routeParams', 'CommentsSvc', function ($scope, $routeParams, CommentsSvc) { // $routeParams have to be injected into controller
// order matters here: .controller(ctrl_name, [scope, rtparams, svc_name, function (scope, rtparams, svc_name) {}]), function params in the same order

  //$scope.postbody = $routeParams.postbody;
  //$scope.postid = $routeParams.postid;

  $scope.addComment = function () {
    if ($scope.commentBody && $scope.isAuth) { // commentBody from: input ng-model='commentBody' in template comments.html
      CommentsSvc.create({
        body:		$scope.commentBody
      }, $routeParams.postid)
      .success(function (comment) {
        $scope.comments.unshift(comment);
        $scope.commentBody = null;
      })
    } else {
		console.log('You are not authenticated!');
	}
  }
  
  $scope.upvote = function (comment) { // ngRepeat directive instantiates a template once per item from a collection, each template instance gets its own scope
    this.comment.upvotes++;
	if ($scope.isAuth) { // commentBody from: input ng-model='commentBody' in template comments.html
      CommentsSvc.upvote({
		_id: this.comment._id // for ng-repeat: this.obj.field
      })
      .success(function (comment) {
		// foo
      })
    } else {
		console.log('You are not authenticated!');
	}
  }
  
  $scope.downvote = function (comment) { // ngRepeat directive instantiates a template once per item from a collection, each template instance gets its own scope
    this.comment.upvotes--;
	if ($scope.isAuth) { // commentBody from: input ng-model='commentBody' in template comments.html
      CommentsSvc.downvote({
		_id: this.comment._id // for ng-repeat: this.obj.field
      })
      .success(function (comment) {
		// foo
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