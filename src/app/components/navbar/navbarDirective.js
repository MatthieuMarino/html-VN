export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    controller: function($scope, $location, UserFactory, AuthService){
      'ngInject';
      // $scope.location = $location.path();
      $scope.$watch(function () {
        return UserFactory.isConnected()
      }, function (newValue) {
        if (newValue) {

          // UserFactory.initUser();
          // console.log('$scope.userId', $scope.userId);
          $scope.user = UserFactory.getCurrentUser();
        }
      });

      $scope.logOut = function () {
        AuthService.disconnect();
        $location.path('/signup');
      }
    }
  };

  return directive;


}
