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

  $scope.uploadFile = function() { // called from html upload button
	   var file = $scope.myFile;
	   console.log('file is ' );
	   console.dir(file);
	   //var uploadUrl = "/api/posts/fileUpload";
	   PostsSvc.uploadFileToUrl(file); // call the upload function of the PostsSvc service
  };
})
.directive('fileModel', ['$parse', function ($parse) { // directives in controller; ng-model does not work with input type "file"
	return {
	   restrict: 'A', // only matches attribute name
	   link: function(scope, element, attrs) { // compiled only once, applicable to all instances of a directive (controller reactive)
		  var model = $parse(attrs.fileModel); // $parse takes an expression and returns a function 
		  var modelSetter = model.assign; // the object returned by $parse has an assign() method for setting values
		  
		  element.bind('change', function(){ // deprecated; like on()
			 scope.$apply(function(){
				modelSetter(scope, element[0].files[0]);
			 });
		  });
	   }
	};
}]);