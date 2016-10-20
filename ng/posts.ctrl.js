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

  $scope.uploadFile = function() { // from http://stackoverflow.com/questions/18571001/file-upload-using-angularjs
	  var f = document.getElementById('ulfile').files[0],
		  r = new FileReader();
	  r.onloadend = function(e){
	  var data = e.target.result;
		//send your binary data via $http or $resource or do anything else with it
		console.log('file is ' + data);
		// todo: process data further
	  }
	  r.readAsBinaryString(f);
	};
	// drag-and-drop upload: http://jsfiddle.net/vishalvasani/4hqVu/
})