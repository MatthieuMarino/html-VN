export class ResourcesController {
  constructor($scope, $location, UserFactory, FileUploader) {
    'ngInject';

    $scope.character = {moods: {}};

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
            }else{
              $location.path('/')
            }
          }).catch((function(){
            $location.path('/');
          }))
        });

      }
    });

    // $scope.uploadBackground = function(file){
    //   FileUploader.uploadFile(file,"backgrounds").then(function(url){
    //     $scope.backgroundURL = url;
    //   })
    // };
    //
    // $scope.saveBackground = function(){
    //   // FileUploader.saveBackground($scope.background, $scope.backgroundURL)
    //
    // };

    $scope.uploadCharacter = function(mood, file){
      FileUploader.uploadFile(file,"characters").then(function(url){
        $scope.character.moods[mood] = url;
      })
    };

    $scope.saveCharacter = function(character){
      FileUploader.saveCharacter(character);
      console.log('fichier enregistré');
    }

  }


}
