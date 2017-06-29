'use strict';

angular.module('Form')

.factory('FormService', ['$http', function ($http) {

    var service = {};
    var urlBase = 'http://54.233.186.50:3000/api/';

    service.cadastrar = function (data) {
        console.log(data);
        return $http.post(urlBase + 'lancamento', data);
    };

    service.listar = function (data) {
        return $http.get(urlBase, data);
    };

    service.editar = function (data) {
        return $http.put(urlBase, data);
    };

    service.remover = function (data) {
        return $http.delete(urlBase, data);
    };

    service.listarTipoLancamentos = function () {
        return $http.get(urlBase + 'tipo-lancamento');
    };

  return service;
}])