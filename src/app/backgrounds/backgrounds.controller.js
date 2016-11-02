export class BackgroundsController {
  constructor($scope, $location, UserFactory, StoriesFactory, FileUploader) {
    'ngInject';

    $scope.character = {moods: {}};
    // $scope.image = './assets/images/zootrope_background.svg';

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
              $scope.backgrounds = StoriesFactory.getBackgrounds();
            }else{
              $location.path('/')
            }
          }).catch((function(){
            $location.path('/');
          }))
        });

      }
    });

    $scope.uploadBackground = function(id, file){
      FileUploader.uploadFile(file,"backgrounds").then(function(url){
        $scope.backgrounds[id] = url;
      })
    };

    $scope.saveBackground = function(background){
      $scope.backgrounds.$save( background)
    };

    $scope.delete = function(background){
      $scope.backgrounds.$remove(background);
    };

  }


}
