export class StoriesController {
  constructor($scope, $location, UserFactory, StoriesFactory, MetaStoriesFactory) {
    'ngInject';

    $scope.$watch(function () {
      return UserFactory.isConnected()
    }, function (newValue) {
      if (newValue) {
        // UserFactory.initUser();
        UserFactory.getCurrentUser().$loaded(function (userData) {
          $scope.user = userData;
          $scope.stories = StoriesFactory.getStories();
          $scope.metaStories = MetaStoriesFactory.getMetaStories();
          UserFactory.isAdmin($scope.user.$id).then(function(admin){
            if(admin){
              $scope.unlock = true;
            }
          })
        });

      }
    });

    $scope.index = 0;

    $scope.deleteStory = function(story){
      StoriesFactory.deleteStory(story.$id);
    };

    $scope.deleteMetaStory = function(story){
      MetaStoriesFactory.deleteMetaStory(story);
    };

    $scope.switchGender = function(){
      if(!$scope.user.gender){
        $scope.user.gender = StoriesFactory.getCharacter('user-woman');
      }else if($scope.user.gender.name == 'user-woman') {
        $scope.user.gender = StoriesFactory.getCharacter('user-man');
      }else if($scope.user.gender.name == 'user-man') {
        $scope.user.gender = StoriesFactory.getCharacter('user-woman');
      }else{
        $scope.user.gender = StoriesFactory.getCharacter('user-woman');
      }
      $scope.user.gender.$loaded(function(){
        $scope.user.$save();
      })
    };


  }


}
