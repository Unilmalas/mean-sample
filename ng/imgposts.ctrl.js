// Posts controller
angular.module('app')
.controller('LimgCtrl', function ($scope, PostsSvc) {
	
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
  
// drop file uploader: http://jsfiddle.net/vishalvasani/4hqVu/
  
  $scope.add = function(){
  var f = document.getElementById('file').files[0],
      r = new FileReader();
  r.onloadend = function(e){
    var data = e.target.result;
    //send your binary data via $http or $resource or do anything else with it
  }
  r.readAsBinaryString(f);
}
  
  PostsSvc.fetch()
  .success(function (posts) {
	$scope.posts = posts;
  });
  
});