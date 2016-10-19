export class StoryEditController {
  constructor($scope, $routeParams, $location, UserFactory, StoriesFactory, FileUploader, ResourcesFactory) {
    'ngInject';

    $scope.storyId = $routeParams.storyId;
    console.log('$scope.storyId', $scope.storyId);

    $scope.columns = [];

    for (var i = 0; i < 8; i++) {
      $scope.columns[i] = {
        "name": "column " + i,
        'value': 115.50 * (i + 1) + 50
      }
    }

    $scope.$watch(function () {
      return UserFactory.isConnected()
    }, function (newValue) {
      if (newValue) {
        // UserFactory.initUser();
        UserFactory.getCurrentUser().$loaded(function (userData) {
          $scope.user = userData;
          UserFactory.isAdmin($scope.user.$id).then(function (admin) {
            if (admin) {
              $scope.unlock = true;
              StoriesFactory.getStory($scope.storyId).$loaded(function (data) {
                console.log('data', data);
                $scope.story = data;
              });
              $scope.backgrounds = StoriesFactory.getBackgrounds();
              $scope.characters = ResourcesFactory.getCharacters();
              console.log('$scope.backgrounds', $scope.backgrounds);
            } else {
              $location.path('/')
            }
          }).catch((function () {
            $location.path('/');
          }));

          // console.log('$scope.storyData', $scope.storyData);
        });

      }
    });

    $scope.index = 0;

    $scope.addQuestion = function () {
      if (!$scope.story.questions) {
        $scope.story.questions = [];
      }
      $scope.story.questions.push({
        answers: [],
        characters: []
      })
    };

    $scope.deleteQuestion = function(question){
      delete $scope.story.questions[$scope.story.questions.indexOf(question)];
    };

    $scope.deleteAnswer = function(question, answer){
      delete question.answers[question.answers.indexOf(answer)];
    };

    $scope.addAnswer = function (question) {
      if (!question.answers) {
        question.answers = [];
      }
      question.answers.push({})
    };

    $scope.saveStory = function (story) {
      story.$save().then(function () {
        $location.path('/stories')
      })
    };

    $scope.upload = function (question, file) {
      FileUploader.uploadFile(file, "backgrounds").then(function (url) {
        question.background = url;
      })
    };

    $scope.addChara = function (question) {
      if (!question.characters) {
        question.characters = [];
      }
      question.characters.push({});
    };

    $scope.deleteChara = function(question, char){
      delete question.characters[question.characters.indexOf(char)];
    }


  }


}
