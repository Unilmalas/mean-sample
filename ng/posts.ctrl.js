// Posts controller
angular.module('app')
.controller('PostsCtrl', function ($scope, PostsSvc) {
	
  $scope.addPost = function () {
    if ($scope.postBody && $scope.isAuth) { // postBody from: input ng-model='postBody' in template posts.html
      PostsSvc.create({
        //username: 'bernie',
        body:     $scope.postBody
      })
      .success(function (post) {
        $scope.posts.unshift(post);
        $scope.postBody = null;
      })
    } else {
		console.log('You are not authenticated!');
	}
  }
  
  PostsSvc.fetch()
  .success(function (posts) {
	$scope.posts = posts;
  });
  
});