export class MetaStoriesController {
  constructor($scope, $routeParams, $location, UserFactory, StoriesFactory, MetaStoriesFactory) {
    'ngInject';

    // console.log('here');
    console.log('$routeParams.metaId', $routeParams.metaId);
    if($routeParams.metaId){
      $scope.showMTS = [];
      $scope.showMTS[$routeParams.metaId] = true;
    }

    $scope.$watch(function () {
      return UserFactory.isConnected()
    }, function (newValue) {
      if (newValue) {
        // UserFactory.initUser();
        UserFactory.getCurrentUser().$loaded(function (userData) {
          $scope.user = userData;
          UserFactory.isAdmin($scope.user.$id).then(function(admin){
            if(admin){
              $scope.unlock = true;
              $scope.metaStories = MetaStoriesFactory.getMetaStories();
              $scope.stories = StoriesFactory.getStories();
            }else{
              $location.path('/')
            }
          }).catch((function(){
            $location.path('/');
          }))
        });

      }
    });

    $scope.createMetaStory = function(name){
      console.log('name', name);
      MetaStoriesFactory.createMetaStory({title:name});

    };

    $scope.addStory = function(metaStory){
      if(!metaStory.stories){
        metaStory.stories = [];
      }
      metaStory.stories.push({title:'Nothing choosed'});
    };

    $scope.saveMetaStory = function(metaStory){
      let newStories = [];
      metaStory.stories.map(function(story){
        newStories.push({
          title: story.title,
          id: story.$id
        })
      });
      metaStory.stories = newStories;
      $scope.metaStories.$save(metaStory);
    }



  }


}
