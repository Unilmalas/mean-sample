// Posts controller
angular.module('app')
.controller('PostsCtrl', function ($scope, PostsSvc) {
	
  $scope.addPost = function () {
    if ($scope.postBody && $scope.isAuth) { // postBody from: input ng-model='postBody' in template posts.html
      PostsSvc.create({
        //username: 'bernie',
        body:     $scope.postBody,
		link:	  $scope.postLink
      })
      .success(function (post) {
        $scope.posts.unshift(post);
        $scope.postBody = null;
      })
    } else {
		console.log('You are not authenticated or post empty!');
	}
  }
  
  PostsSvc.fetch()
  .success(function (posts) {
	$scope.posts = posts;
  });

  $scope.uploadFile = function() { // from http://stackoverflow.com/questions/18571001/file-upload-using-angularjs
		var f = document.getElementById('ulfile').files[0], // matches ID from html input for file
		  r = new FileReader(); // FileReader lets web apps asynchronously read the contents of files (or raw data buffers) stored on the user's computer
		r.onloadend = function(e) { // async: event is triggered when the reading operation is completed
		var data = e.target.result; // get the element that triggered a specific event
			//send your binary data via $http or $resource or do anything else with it
			//console.log('file is ' + data);
			if ($scope.postBody && $scope.isAuth) { // postBody from: input ng-model='postBody' in template posts.html
					PostsSvc.create({
					body:     	$scope.postBody,
					img:		data
				})
				.success(function (post) {
					$scope.posts.unshift(post);
					$scope.postBody = null;
				})
			} else {
				console.log('You are not authenticated or post empty!');
			}
		}
		r.readAsBinaryString(f); // Starts reading the contents of the specified Blob, once finished, the result attribute contains the raw binary data from the file as a string
   };
	// drag-and-drop upload: http://jsfiddle.net/vishalvasani/4hqVu/
})