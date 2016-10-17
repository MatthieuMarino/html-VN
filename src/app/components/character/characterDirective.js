export function CharacterDirective($compile) {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/character/character.html',
    scope:{
      data: '=',
      mood: '='
    },
    controller: CharacterCtrl,
    link: LinkFunction
  };

  return directive;

  function CharacterCtrl($scope) {
    'ngInject';

    $scope.characterPic = " ../../assets/images/char.svg ";
  }

  function LinkFunction (scope, element, attrs) {

    scope.$watch('characterPic', function(){
      $('character').empty();
      $('character').css({"width": "150px", "height": "300px"}).append($compile(`<img src=" ${ scope.characterPic } "/>`)(scope));
      console.log('watcher characterPic', scope.characterPic);
    });
  }


}
