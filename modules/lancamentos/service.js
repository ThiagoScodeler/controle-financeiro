'use strict';

angular.module('Lancamentos')

.factory('LancamentosService', ['$http', function ($http) {

    var service = {};
    var urlBase = 'http://54.233.186.50:3000/api/';

    service.cadastrar = function (data) {
        return $http.post(urlBase + 'lancamento', data);
    };

    service.listar = function (data) {
        return $http.get(urlBase, data);
    };

    service.editar = function (data) {
        return $http.put(urlBase, data);
    };

    service.remover = function (data) {
        console.log(data);
        return $http.delete(urlBase + 'lancamento/'+ data);
    };

    service.listarLancamentos = function () {
        return $http.get(urlBase + 'lancamento');
    };

  return service;
}])