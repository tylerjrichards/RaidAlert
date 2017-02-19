(function() {
  angular.module('RaidAlert') // getter syntax
        .controller('MainController', MainController);

MainController.$inject = ['$scope', 'AlertService'];

function MainController($scope, AlertService){
  $scope.alerts = AlertService.get();
  $scope.createAlert = createAlert;
  $scope.deleteAlert = deleteAlert;
  $scope.editAlert = editAlert;
  $scope.saveAlert = saveAlert;
  $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };

  $scope.$watch(function(){
    return AlertService.get();
  }, function(){
    $scope.alerts = AlertService.get();
  });
  function createAlert(newAlert){
    AlertService.create(newAlert);
    $scope.newAlert = '';
  }
  function deleteAlert(index, alert){
    AlertService.delete(index, alert);
  }
  function editAlert(alert){
    alert.isBeingEdited = true;
  }
  function saveAlert(index, alert){
    AlertService.update(index, alert);
    alert.isBeingEdited = false;
  }

}

AOS.init();
$(window).on('load', function () {
    AOS.refresh();
});



}());
