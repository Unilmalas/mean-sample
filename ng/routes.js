// routes
angular.module('app') // getter
.config(function ($routeProvider) {
  $routeProvider 	// each route has a controller and a template associated with it
	.when('/',         { controller: 'PostsCtrl', templateUrl: '/templates/posts.html' })  // html-files are loaded on demand
	.when('/register', { controller: 'RegisterCtrl', templateUrl: '/templates/register.html' })
	.when('/login',    { controller: 'LoginCtrl', templateUrl: '/templates/login.html' })
	//.when('/logout',	 { controller: 'LogoutCtrl', templateUrl: '/templates/logout.html' })
	.when('/comments/:postid*', { controller: 'CommentsCtrl', templateUrl: '/templates/comments.html' }) // $routeParams.postid
	// routes like /color/:color/largecode/:largecode*\/edit will match /color/brown/largecode/code/with/slashes/edit 
	// and extract: color: brown largecode: code/with/slashes and stored in $routeParams under the given name
	.otherwise(			{ redirectTo: '/' });
  //$locationProvider.html5Mode(true);
});