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
    .when('/followus', {
      templateUrl: 'app/followus/followus.html',
      controller: 'Followus'
    })
    .when('/story/:storyId', {
      templateUrl: 'app/story/story.html',
      controller: 'Story',
      resolve:redirectToLogin
    })
    .when('/stories', {
      templateUrl: 'app/story/list/stories.html',
      controller: 'Stories',
      resolve:{
        'authorize':function(AuthService,$location, UserFactory){
          'ngInject';
          if(!AuthService.isConnected()){
            $location.search({target:$location.path()});
            $location.path('/signup');
          }else{
            // console.log('connected');
            UserFactory.getCurrentUser().$loaded(function (userData) {
              // console.log('userData', userData);
              UserFactory.isAdmin(userData.$id).catch(function(error){
                  // console.log('error', error);
                if(error == 'not admin'){
                  if(userData.gender.name == 'user-woman'){
                    //TODO change to correct story
                    $location.path('/story/-KV9YOe45n7ns7l1QyL7');
                  }else if (userData.gender.name == 'user-man') {
                    $location.path('/story/-KV9YOe45n7ns7l1QyL7');
                  }else {
                    $location.path('/story/-KV9YOe45n7ns7l1QyL7');
                  }
                }
                })
            });
          }
        }
        }
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
    .when('/metaStories/', {
      templateUrl: 'app/metaStories/metaStories.html',
      controller: 'MetaStories',
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
    .when('/backgrounds', {
      templateUrl: 'app/backgrounds/backgrounds.html',
      controller: 'Backgrounds',
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
      controller: 'Followus',
      templateUrl: 'app/followus/followus.html'
    })
    .when('/flavour', {
      templateUrl: 'app/flavour/flavour.html',
      controller: 'Flavour',
      resolve:redirectToLogin
    })
    .otherwise({
      redirectTo: '/login'
    });
}
