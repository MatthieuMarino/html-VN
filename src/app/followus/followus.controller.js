export class FollowusController {
  constructor($scope, AuthService) {
    'ngInject';

    AuthService.isAdmin(AuthService.getUser().uid).then(function (admin) {
      console.log('admin', admin);
      if (admin) {
        $scope.unlock = true;
      }
    });
    console.log('trololo');

    // console.log('AuthService.getUser()', AuthService.getUser());
    // $scope.$watch(function () {
    //   return AuthService.isConnected()
    // }, function (newValue) {
    //   if (newValue) {
    //     // UserFactory.initUser();
    //     console.log('AuthService.getUser()', AuthService.getUser());
    //     AuthService.isAdmin(AuthService.getUser().uid).then(function (admin) {
    //       if (admin) {
    //         $scope.unlock = true;
    //       }
    //     })
    //
    //
    //   }
    // });

    $scope.disconnect = function () {
      console.log('triggered');
      // AuthService.disconnect();
      // $location.path('/signup');
    };


  }
}
