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

        }else {
          $location.path('/stories');
        }
      }
    });


    ResourcesFactory.getCharacters().$loaded(function(characters) {
      $scope.characters =  characters;
      // console.log('characters', characters);
      // console.log('$scope.characters["user-man"]', $scope.characters["user-man"]);
      characters.map(function(chara){
        // console.log('chara', chara);
        // console.log('chara.name ', chara.name, ' == "user-man" ', chara.name == "user-man");
        if(chara.name == 'user-man'){
          $scope.manUser = chara;
        }else if(chara.name == 'user-woman'){
          $scope.womanUser = chara;
        }
      });

      // console.log('$scope.manUser', $scope.manUser);
      $scope.user.gender = {
        name: $scope.womanUser.name,
        moods: $scope.womanUser.moods
      };
    });

    $scope.createUser = function (user) {
      $scope.error = '';
      if(user.email) {
        UserFactory.createUser(user).then(function(uid){
          // console.log('res', res);
          // $location.search(res);
          $location.path('/stories');
        }).catch(function(error){
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
