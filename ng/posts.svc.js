// posts services
angular.module('app')
.service('PostsSvc', function ($http) {
	
  this.fetch = function () {
    return $http.get('/api/posts');
  }
  
  this.create = function (post) {
    return $http.post('/api/posts', post);
  }
  
  this.uploadFileToUrl = function(file) {
	var fd = new FormData();
	fd.append('file', file);
	
	// NEED MULTER --- body-parser does no longer support mulitpart
	
	// todo: keep it in temp storage till post has been saved then link, otherwise remove again
	/*$http.post('/api/posts/fileUpload', fd, { // the file data are semt as sections in a multipart document in the body of the request
		transformRequest: angular.identity, // undefined content-type and the transformRequest: angular.identity that give at the $http the ability to choose the right "content-type"
		headers: {'Content-Type': undefined}
	})*/
	$http.post('/api/posts/fileUpload', fd);
  }
});