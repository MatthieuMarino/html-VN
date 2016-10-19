export class LoginController {
  constructor ($scope, $routeParams, $location, AuthService) {
    'ngInject';

    console.log('$location.search().target', $location.search().target);
    
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

    $scope.error = $routeParams.error;

    $scope.connectViaMail = (login, password) => AuthService.connectViaMail(login, password);

    AuthService.getUser();


  }
}
