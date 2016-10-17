export function CharacterDirective($compile) {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/character/character.html',
    scope:{
      data: '=',
      mood: '='
    },
    controller: CharacterCtrl
  };

  return directive;

  function CharacterCtrl($scope) {
    'ngInject';

    console.log('scope data character ', $scope.data);
  }

}
