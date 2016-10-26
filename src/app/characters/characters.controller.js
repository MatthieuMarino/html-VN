export class CharactersController {
  constructor($scope, $location, UserFactory, StoriesFactory, FileUploader) {
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
              $scope.characters = StoriesFactory.getCharacters();
            }else{
              $location.path('/')
            }
          }).catch((function(){
            $location.path('/');
          }))
        });

      }
    });

    $scope.uploadCharacter = function(character, mood, file){
      // console.log('character', character);
      // console.log('$scope.characters[character]', $scope.characters[character]);
      FileUploader.uploadFile(file,"characters").then(function(url){
        character.moods[mood] = url;
        // $scpe.characters.$save(character);
      })
    };

    $scope.saveCharacter = function(character){
      $scope.characters.$save(character);
    };

    $scope.delete = function(character){
      $scope.characters.$remove(character);
    };

  }


}
