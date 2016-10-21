export class SignupPageController {
  constructor ($scope, $location, UserFactory, ResourcesFactory, AuthService) {
    'ngInject';

    $scope.user = {
      firstName: '',
      lastName: '',
      email: ''
    };

    $scope.$watch(function () {
      return AuthService.isConnected()
    }, function (newValue) {
      // console.log('newValue', newValue);
      if (newValue) {
        if($location.search().target){
          var target = $location.search().target;
          if(!target){
            target = '/stories';
          }
          $location.search({});
          $location.path(target);

        }
      }
    });


    ResourcesFactory.getCharacters().$loaded(function(characters) {
      $scope.characters =  characters;
      $scope.manUser = $scope.characters.$getRecord("user-male");
      $scope.womanUser = $scope.characters.$getRecord("user-female");
      $scope.user.gender = $scope.womanUser;
    });

    $scope.createUser = function (user) {
      $scope.error = '';
      if(user.email) {
        UserFactory.createUser(user).then(function(res){
          console.log('res', res);
          $location.search(res);
          $location.path('/stories');
        },function(error){
          $scope.error = error;
        });
      }
    };

    $scope.setCharacter = function(character){
      $scope.user.gender = {
        name: character.name,
        moods: character.moods
      }
    };

  }


}
