export class StoryController {
  constructor($scope, $routeParams, $location, UserFactory, StoriesFactory) {
    'ngInject';

    $scope.storyId = $routeParams.storyId;
    console.log('$scope.storyId', $scope.storyId);

    $scope.urlBack = './assets/images/background.svg';

    $scope.$watch(function () {
      return UserFactory.isConnected()
    }, function (newValue) {
      if (newValue) {
        // UserFactory.initUser();
        UserFactory.getCurrentUser().$loaded(function (userData) {
          $scope.user = userData;
          // $scope.storyData = {}
          // var data = {
          //   type: 'simple',
          //   questions: [
          //     {
          //       text: 'Youpi tralala',
          //       characters: [
          //         {
          //           name: 'Nobody'
          //         }
          //       ],
          //       answers: [
          //         {text: 'Oh oui alors', id:0},
          //         {text: 'Oh non alors', id:1}
          //       ]
          //     },
          //     {
          //       text: 'never gonna give you up',
          //       characters: [
          //         {
          //           name: 'Nobody'
          //         }
          //       ],
          //       answers: [
          //         {text: 'oh sh-', id:0},
          //         {text: 'Fly, you fools', id:1}
          //       ]
          //     }
          //   ]
          // };
          StoriesFactory.getStory($scope.storyId).$loaded(function(data){
            console.log('data', data);
            $scope.storyData = data;
          });
          // console.log('$scope.storyData', $scope.storyData);
        });

      }
    });

    $scope.index = 0;

    $scope.chooseAnswer = function (answer) {
      console.log('answer', answer);
      UserFactory.saveResult($scope.user.$id,$scope.storyId,$scope.index, {id:answer.id,text:answer.text});
      // if(!$scope.user.walkthroughs){
      //   $scope.user.walkthroughs = {};
      // }
      // if(!$scope.user.walkthroughs[$scope.storyId] ){
      //   $scope.user.walkthroughs[$scope.storyId] = {};
      // }
      // $scope.user.walkthroughs[$scope.storyId][$scope.index] = answer;
      // $scope.user.$save();
      if($scope.index < $scope.storyData.questions.length -1){
        $scope.index++;
        console.log('$scope.index', $scope.index);
      }else{
        console.log('fini ', $scope.user.walkthroughs[$scope.storyId]);
        $location.search({
          storyId:$scope.storyId
        });
        $location.path('/result');
      }

    }


  }


}
