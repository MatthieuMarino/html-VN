export function CharacterDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/character/character.html',
    scope:{
      data: '=',
      mood: '@'
    },
    controller: CharacterCtrl
  };

  return directive;

  function CharacterCtrl($scope) {
    'ngInject';

    console.log('scope data character user ', $scope.data);
    // console.log('$scope.mood', $scope.mood);

  }

}
