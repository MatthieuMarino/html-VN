export class StoryCreateController {
  constructor($scope, $location, UserFactory, StoriesFactory, FileUploader) {
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
              $scope.backgrounds = StoriesFactory.getBackgrounds();
            }else{
              $location.path('/')
            }
          }).catch((function(){
            $location.path('/');
          }))
        });

      }
    });

    $scope.index = 0;
    $scope.newStory = {title: 'Nouvelle histoire',
    questions:[]};

    $scope.addQuestion = function(){
      $scope.newStory.questions.push({
        answers: [],
        characters: []
      })
    };

    $scope.addAnswer = function(question){
      question.answers.push({})
    };

    $scope.saveStory = function(story){
      StoriesFactory.createStory(story).then(function(){
        $location.path('/stories');
      })
    };

    $scope.upload = function(question, file){
      FileUploader.uploadFile(file,"backgrounds").then(function(url){
        question.background = url;
      })
    }


  }


}
