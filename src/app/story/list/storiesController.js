export class StoriesController {
  constructor($scope, $location, UserFactory, StoriesFactory) {
    'ngInject';

    $scope.$watch(function () {
      return UserFactory.isConnected()
    }, function (newValue) {
      if (newValue) {
        // UserFactory.initUser();
        UserFactory.getCurrentUser().$loaded(function (userData) {
          $scope.user = userData;
          $scope.stories = StoriesFactory.getStories();
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
    }


  }


}
