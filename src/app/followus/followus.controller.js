export class FollowusController {
  constructor ($scope, AuthService) {
    'ngInject';


    $scope.disconnect = function(){
      console.log('triggered');
      // AuthService.disconnect();
      // $location.path('/signup');
    };


  }
}
