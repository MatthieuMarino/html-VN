export class StoryController {
  constructor($scope, $routeParams, $timeout, $location, UserFactory, StoriesFactory) {
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
          console.log('user', $scope.user);
          StoriesFactory.getStory($scope.storyId).$loaded(function (data) {
            // console.log('data', data);
            $scope.storyData = data;
            // $scope.characters = $scope.storyData.questions[$scope.index].characters;
            $scope.moods = {};
            $scope.init();
            // console.log('$scope.moods', $scope.moods);
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
      // console.log('answer', answer);
      if(answer){
        UserFactory.saveResult($scope.user.$id, $scope.storyId, $scope.index, {id: answer.id, text: answer.text});
        angular.forEach(answer.characters, function (chara, key) {
          $scope.moods[key] = chara;
          // console.log('chara.mood', chara);
        });
        if (answer.userMood) {
          $scope.userMood = answer.userMood;
        }
      }else{
        UserFactory.saveResult($scope.user.$id, $scope.storyId, $scope.index, {id: 0, text: '-'});
      }

      $timeout(function () {
        if ($scope.index < $scope.storyData.questions.length - 1) {
          $scope.index++;
          $scope.init();
          // console.log('$scope.index', $scope.index);
        } else {
          // console.log('fini ', $scope.user.walkthroughs[$scope.storyId]);
          $location.search({
            storyId: $scope.storyId
          });
          $location.path('/result');
        }
      }, 3000);


    };

    $scope.init = function () {
      if ($scope.storyData.questions[$scope.index].characters) {
        $scope.storyData.questions[$scope.index].characters.map(function (chara) {
          $scope.moods[chara.name] = chara.mood;
        });
      }
      if ($scope.storyData.questions[$scope.index].userMood) {
        $scope.userMood = $scope.storyData.questions[$scope.index].userMood;
      }else{
        $scope.userMood = 'NEUTRAL';
      }
    };

    $scope.return = function () {
      if ($scope.index > 0) {
        $scope.index--;
        $scope.init();
      }
    };

    $scope.quit = function () {
      $location.path('/');
    };

    $scope.stopSound = function () {
      //TODO stop sound
      // console.log('Stop sound');
      $scope.sound = !$scope.sound;
    };

    $scope.showMenu = function () {
      $scope.menu = !$scope.menu;
    };


  }


}
