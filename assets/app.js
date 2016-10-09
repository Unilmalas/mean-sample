angular.module('app', [
	'ngRoute'
]); // setter - called only once before getters
// application controller
angular.module('app') // getter
.controller('ApplicationCtrl', function ($scope, UserSvc) {

    /*if (!$scope.isAuth){
        $location.path('/login');
    } else {
        $location.path('/');
    }*/

	$scope.$on('login', function (_, user) { // receives $emit; _=ignore this binding/parameter
		$scope.currentUser = user;
		$scope.isAuth = true;
	});
	
	$scope.logout = function(){
        $scope.currentUser = null;
        //$location.path('/login');
        UserSvc.removeToken();
        $scope.isAuth = false;
    }
});
// login controller
angular.module('app')
.controller('LoginCtrl', function ($scope, UserSvc) {
	
  $scope.login = function (username, password) {
    UserSvc.login(username, password)
    .then(function (response) {
		//console.log(user);
		$scope.$emit('login', response.data); // pass event up to to ApplicationCtrl
		//$location.path('/');
    });
  }
});
// logout controller
angular.module('app')
.controller('LogoutCtrl', function ($scope, UserSvc) {
	
  $scope.logout = function () {
		delete $scope.currentUser;
		$scope.$emit('logout'); // pass event up to to ApplicationCtrl
  }
});
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
// posts services
angular.module('app')
.service('PostsSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/posts');
  }
  this.create = function (post) {
    return $http.post('/api/posts', post);
  }
});
// register user controller
angular.module('app')
.controller('RegisterCtrl', function ($scope, UserSvc) {
	
  $scope.register = function (username, password) {
    UserSvc.register(username, password) // call register in UserSvc service
    .then(function (response) {
		$scope.$emit('login', response.data); // pass event up to to ApplicationCtrl
		//$location.path('/');
    });
  }
});
// routes
angular.module('app') // getter
.config(function ($routeProvider) {
  $routeProvider 	// each route has a controller and a template associated with it
	.when('/',         { controller: 'PostsCtrl', templateUrl: '/templates/posts.html' })  // html-files are loaded on demand
	.when('/register', { controller: 'RegisterCtrl', templateUrl: '/templates/register.html' })
	.when('/login',    { controller: 'LoginCtrl', templateUrl: '/templates/login.html' })
	//.when('/logout',	 { controller: 'LogoutCtrl', templateUrl: '/templates/logout.html' })
  //$locationProvider.html5Mode(true);
});
angular.module('app')
.service('UserSvc', function ($http) {
  var svc = this;
  
  svc.getUser = function () {
    return $http.get('/api/users'); // get the logged-in users information
  }
  
  svc.login = function (username, password) {
    return $http.post('/api/sessions', { // get a JWT coming back from the sessions/post
      username: username, password: password
	}).then(function (val) {
	  svc.token = val.data;
	  $http.defaults.headers.common['X-Auth'] = val.data;
      return svc.getUser();
    });
  }
  
  svc.register = function (username, password) {
	return $http.post('/api/users', { // create a user
		username: username, password: password
	}).then(function () {
		return svc.login(username, password);
	});
  }
  
  svc.removeToken = function () {
	$http.defaults.headers.common['X-Auth'] = "";
  }
});