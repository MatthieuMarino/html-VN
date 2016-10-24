export function routerConfig ($routeProvider) {
  'ngInject';

  var redirectToLogin = {
    'authorize':function(AuthService,$location){
      'ngInject';
      if(!AuthService.isConnected()){
        $location.search({target:$location.path()});
        $location.path('/signup');
      }
    }
  };

  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
    .when('/story/:storyId', {
      templateUrl: 'app/story/story.html',
      controller: 'Story',
      resolve:redirectToLogin
    })
    .when('/stories', {
      templateUrl: 'app/story/list/stories.html',
      controller: 'Stories',
      resolve:redirectToLogin
    })
    .when('/create', {
      templateUrl: 'app/story/create/storyCreate.html',
      controller: 'StoryCreate',
      resolve:redirectToLogin
    })
    .when('/edit/:storyId', {
      templateUrl: 'app/story/edit/storyEdit.html',
      controller: 'StoryEdit',
      resolve:redirectToLogin
    })
    .when('/result', {
      templateUrl: 'app/result/result.html',
      controller: 'Result',
      resolve:redirectToLogin
    })
    .when('/resources', {
      templateUrl: 'app/resources/resources.html',
      controller: 'Resources',
      resolve:redirectToLogin
    })
    .when('/characters', {
      templateUrl: 'app/characters/characters.html',
      controller: 'Characters',
      resolve:redirectToLogin
    })
    .when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'Login'
    })
    .when('/signup', {
      templateUrl: 'app/signup/signup.html',
      controller: 'Signup'
    })
    .when('/followus', {
      templateUrl: 'app/followus/followus.html'
    })
    .when('/score', {
      templateUrl: 'app/score/scoreboard.html'
    })
    .otherwise({
      redirectTo: '/login'
    });
}
