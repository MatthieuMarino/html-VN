export class SignupPageController {
  constructor ($scope, $location, UserFactory, ResourcesFactory) {
    'ngInject';

    $scope.user = {
      firstName: '',
      lastName: '',
      email: ''
    };


    ResourcesFactory.getCharacters().$loaded(function(characters) {
      $scope.characters =  characters;
      $scope.manUser = $scope.characters.$getRecord("user-male");
      $scope.womanUser = $scope.characters.$getRecord("user-female");
    });

    $scope.createUser = function (user) {
      $scope.error = '';
      $scope.noMatch = false;
      if(user.password  && $scope.password && user.password == $scope.password){
        UserFactory.createUser(user).then(function(res){
          // console.log('res', res);
          $location.path('/stories');
        },function(error){
          $scope.error = error;
        })
      }else{
        $scope.noMatch = true;
      }
    };

    $scope.setCharacter = function(character){
      $scope.user.gender = character;
    };



  }


}
