export function CharacterDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/character/character.html',
    controller: function($scope){
      'ngInject';

    },
    scope:{
      data: '='
    }
  };

  return directive;


}
