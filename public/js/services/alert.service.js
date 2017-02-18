(function() {
  angular.module('RaidAlert')
        .factory('AlertService', AlertService);

  AlertService.$inject = ['$http'];

  function AlertService($http){
    init();
    var alerts = [];
    return {
      get: getAllAlerts,
      create: createOneAlert,
      update: updateOneAlert,
      delete: deleteOneAlert
    };

    function init(){ // this is going to make our first data request upon file load
      $http.get('/alerts')
            .then(function(response){
              alerts = response.data.alerts;
            })
            .catch(function(err){
              console.log(err);
            });
    }
    function getAllAlerts(){
      return alerts;
    }
    function createOneAlert(alert){
      $http.post('/alerts', alert)
          .then(function(response){
            alerts.push(alert);
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function updateOneAlert(index, updatedAlert){
      $http.put('/alerts/' + updatedAlert._id, updatedAlert)
          .then(function(response){
            alerts.splice(index, 1, updatedAlert);
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function deleteOneAlert(index, deletedAlert){
      $http.delete('/alerts/' + deletedAlert._id)
          .then(function(){
            alerts.splice(index, 1);
          })
          .catch(function(){
            console.log(err);
          });
    }

  }
}());
