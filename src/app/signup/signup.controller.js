export class SignupPageController {
  constructor ($scope, $location, UserFactory) {
    'ngInject';

    $scope.user = {
      firstName: '',
      lastName: '',
      email: ''
    };

    $scope.createUser = function (user) {
      $scope.error = '';
      $scope.noMatch = false;
      if(user.password  && $scope.password && user.password == $scope.password){
        UserFactory.createUser(user).then(function(res){
          // console.log('res', res);
          $location.path('/');
        },function(error){
          $scope.error = error;
        })
      }else{
        $scope.noMatch = true;
      }
    };

    $scope.setMan = function(){
      $scope.user.gender = 'man';
      //TODO setup character
    };

    $scope.setWoman = function(){
      $scope.user.gender = 'woman';
      //TODO setup character
    };

  }


}
