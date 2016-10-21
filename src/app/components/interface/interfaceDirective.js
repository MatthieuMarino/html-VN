export function InterfaceDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/interface/interface.html',
    controller: function(){
      'ngInject';
      // console.log('$scope.data', $scope.data);
    },
    scope:{
      data: '=',
      action: '='
    }
  };

  return directive;


}
