export class StoryController {
  constructor($scope, $routeParams, $location, UserFactory, StoriesFactory) {
    'ngInject';

    $scope.storyId = $routeParams.storyId;
    // console.log('$scope.storyId', $scope.storyId);

    $scope.urlBack = './assets/images/background.svg';

    $scope.$watch(function () {
      return UserFactory.isConnected()
    }, function (newValue) {
      if (newValue) {
        // UserFactory.initUser();
        UserFactory.getCurrentUser().$loaded(function (userData) {
          $scope.user = userData;
          console.log('user',  $scope.user );
          StoriesFactory.getStory($scope.storyId).$loaded(function(data){
            // console.log('data', data);
            $scope.storyData = data;
            $scope.characters = $scope.storyData.questions[$scope.index].characters;
            // console.log('storyData', $scope.storyData.questions[$scope.index].characters);
          });
          // console.log('$scope.storyData', $scope.storyData);
        });

      }
    });

    $scope.index = 0;
    $scope.sound = true;
    $scope.menu = false;

    $scope.chooseAnswer = function (answer) {
      console.log('answer', answer);
      UserFactory.saveResult($scope.user.$id,$scope.storyId,$scope.index, {id:answer.id,text:answer.text});
      if($scope.index < $scope.storyData.questions.length -1){
        $scope.index++;
        // console.log('$scope.index', $scope.index);
      }else{
        // console.log('fini ', $scope.user.walkthroughs[$scope.storyId]);
        $location.search({
          storyId:$scope.storyId
        });
        $location.path('/result');
      }

    };

    $scope.return = function(){
      if($scope.index>0){
        $scope.index--;
      }
    };

    $scope.quit = function(){
      $location.path('/');
    };

    $scope.stopSound = function(){
      //TODO stop sound
      // console.log('Stop sound');
      $scope.sound = !$scope.sound;
    };

    $scope.showMenu = function(){
      $scope.menu = !$scope.menu;
    };


  }


}
