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

  function CharacterCtrl() {
    'ngInject';


    //if the console.log is commented => annotation error
    // console.log('scope data character user ', $scope.data);
    // console.log('mood', $scope.mood);
    // console.log('$scope.data.moods[$scope.mood]', $scope.data.moods[$scope.mood]);

  }

}
