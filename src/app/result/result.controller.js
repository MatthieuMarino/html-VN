export class ResultController {
  constructor ($scope, $location, UserFactory) {
    'ngInject';

    $scope.$watch(function () {
      return UserFactory.isConnected()
    }, function (newValue) {
      if (newValue) {
        console.log('UserFactory.getUserId()', UserFactory.getUserId());
        UserFactory.getResult(UserFactory.getUserId(),$scope.storyId).$loaded(function(data){
          $scope.result = data;
          // console.log('load finished');
          console.log('$scope.result', $scope.result);
        });
      }
    });
    $scope.storyId = $location.search().storyId;
    if(!$scope.storyId){
      $location.path('/');
    }


  }
}
