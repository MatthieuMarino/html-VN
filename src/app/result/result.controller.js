export class ResultController {
  constructor ($scope, $location, UserFactory, StoriesFactory) {
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
          $scope.flavours= {};
          $scope.current = {count:0};
          $scope.result.map(function(res){
            if(res.flavour){
              console.log('res.flavour', res.flavour);
              if(!$scope.flavours[res.flavour]){
                $scope.flavours[res.flavour] = 0;
              }
              $scope.flavours[res.flavour] ++;
              if($scope.flavours[res.flavour] > $scope.current.count){
                console.log('new high');
                $scope.current = {id : res.flavour, count : $scope.flavours[res.flavour]};
              }
            }
          });
          console.log('$scope.current', $scope.current);
          $scope.display = StoriesFactory.getFlavour($scope.current.id);
        });
      }
    });
    $scope.storyId = $location.search().storyId;
    if(!$scope.storyId){
      $location.path('/');
    }


  }
}
