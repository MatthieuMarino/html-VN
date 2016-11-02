export class FlavourController {
  constructor($scope, $location, UserFactory, StoriesFactory) {
    'ngInject';


    $scope.$watch(function () {
      return UserFactory.isConnected()
    }, function (newValue) {
      if (newValue) {
        // UserFactory.initUser();
        UserFactory.getCurrentUser().$loaded(function (userData) {
          $scope.user = userData;
          UserFactory.isAdmin($scope.user.$id).then(function(admin){
            if(admin){
              $scope.unlock = true;
              $scope.flavours = StoriesFactory.getFlavours();
            }else{
              $location.path('/')
            }
          }).catch((function(){
            $location.path('/');
          }))
        });

      }
    });

    $scope.createFlavour = function(name, text){
      console.log('creating', name);
      StoriesFactory.createFlavour({name, text});
      // $scope.flavours.$add({name, text});
    };

    $scope.saveFlavour = function(flavour){
      $scope.flavours.$save(flavour);
    };

    $scope.deleteFlavour = function(flavour){
      $scope.flavours.$remove(flavour);
    }

  }


}
