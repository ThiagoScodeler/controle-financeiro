'use strict';

angular.module('Editar')

.factory('EditarService', ['$http', function ($http) {

    var service = {};
    var urlBase = 'http://54.233.186.50:3000/api/';

    service.listar = function (data) {
        return $http.get(urlBase + 'lancamento/'+ data);
    };

    service.editar = function (data_id,data) {
        return $http.put(urlBase + 'lancamento/'+ data_id, data);
    };

    service.listarTipoLancamentos = function () {
        return $http.get(urlBase + 'tipo-lancamento');
    };

  return service;
}])