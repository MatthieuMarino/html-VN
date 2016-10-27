export function InterfaceDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/interface/interface.html',
    controller: function($scope){
      'ngInject';
      // console.log('$scope.data', $scope.data);
      $scope.notChoosed = true;
      $scope.choose = function(answer){
        $scope.notChoosed = false;
        $scope.action(answer);
        if(answer && answer.result){
          $scope.text = answer.result;
        }
      };

      $scope.$watch(function(){
        return $scope.data;
      }, function(newVal){
        // console.log('newVal', newVal);
        if(newVal){
          $scope.text = newVal.text;
          $scope.notChoosed = true;
        }
      })
    },
    scope:{
      data: '=',
      action: '=',
      name:'@'
    }
  };

  return directive;


}
