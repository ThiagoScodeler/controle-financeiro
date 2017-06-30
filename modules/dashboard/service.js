'use strict';

angular.module('Dashboard')

.factory('DashboardService', ['$http', function ($http) {

    var service = {};
    var urlBase = 'http://54.233.186.50:3000/api/';
    //var urlBase = 'http://localhost:3000/api/';
    var checkSaldo = 'reports/check-saldo/';
    var gastoMes = 'reports/gastos-mes/';
    var ultimosLancamentos = 'reports/ultimos-lancamentos/';

    service.checkSaldo = function (data) {
        return $http.get(urlBase + checkSaldo);
    };

    service.ultimosLancamentosMes = function(data){
      var month = new Date().getMonth()+1;
      return $http.get(urlBase + ultimosLancamentos + month);
    };

    service.gastosMes = function(data){
      var month = new Date().getMonth()+1;
      return $http.get(urlBase + gastoMes + month);
    };

  return service;
}])