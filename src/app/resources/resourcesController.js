export class ResourcesController {
  constructor($scope, $location, UserFactory, FileUploader) {
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
            }else{
              $location.path('/')
            }
          }).catch((function(){
            $location.path('/');
          }))
        });

      }
    });

    $scope.uploadBackground = function(file){
      FileUploader.uploadFile(file,"backgrounds").then(function(url){
        $scope.backgroundURL = url;
      })
    };

    $scope.saveBackground = function(){
      FileUploader.saveBackground($scope.background, $scope.backgroundURL)
    }


  }


}
