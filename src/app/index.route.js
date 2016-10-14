export function routerConfig ($routeProvider) {
  'ngInject';

  var redirectToLogin = {
    'authorize':function(AuthService,$location){
      'ngInject';
      if(!AuthService.isConnected()){
        $location.search({target:$location.path()});
        $location.path('/login');
      }
    }
  };

  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      resolve:redirectToLogin
    })
    .when('/story/:storyId', {
      templateUrl: 'app/story/story.html',
      controller: 'Story',
      resolve:redirectToLogin
    })
    .when('/result', {
      templateUrl: 'app/result/result.html',
      controller: 'Result',
      resolve:redirectToLogin
    })
    .when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'Login',
    })
    .when('/signup', {
      templateUrl: 'app/signup/signup.html',
      controller: 'Signup',
    })
    .otherwise({
      redirectTo: '/login'
    });
}
