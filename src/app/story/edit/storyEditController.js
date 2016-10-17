export class StoryEditController {
  constructor($scope, $routeParams, $location, UserFactory, StoriesFactory, FileUploader) {
    'ngInject';

    $scope.storyId = $routeParams.storyId;
    console.log('$scope.storyId', $scope.storyId);

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
              StoriesFactory.getStory($scope.storyId).$loaded(function(data){
                console.log('data', data);
                $scope.story = data;
              });
              $scope.backgrounds = StoriesFactory.getBackgrounds();
              console.log('$scope.backgrounds', $scope.backgrounds);
            }else{
              $location.path('/')
            }
          }).catch((function(){
            $location.path('/');
          }));

          // console.log('$scope.storyData', $scope.storyData);
        });

      }
    });

    $scope.index = 0;

    $scope.addQuestion = function(){
      $scope.story.questions.push({
        answers: [],
        characters: []
      })
    };

    $scope.addAnswer = function(question){
      question.answers.push({})
    };

    $scope.saveStory = function(story){
      story.$save().then(function(){
        $location.path('/stories')
      })
    };

    $scope.upload = function(question, file){
      FileUploader.uploadFile(file,"backgrounds").then(function(url){
        question.background = url;
      })
    }


  }


}
