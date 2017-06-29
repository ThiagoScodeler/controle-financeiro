'use strict';

angular.module('Form',[])

.controller('FormController', ['$scope','FormService',
function ($scope, FormService) {

    listTipoLancamento();
    $scope.status;

    $scope.add = function (lancamento) {
        FormService.cadastrar(lancamento)
         .then(
        function(data) {
            $scope.status = 'Lançamento adicionado com sucesso';
        },
        function(error) {
            $scope.status = 'Erro ao adicionar lançamento';
        });
    };

    $scope.list = function (lancamento) {
        FormService.listar(lancamento.id)
        .then(
        function(data) {
            $scope.status = 'Lançamento listado com sucesso';
        },
        function(error) {
            $scope.status = 'Erro ao listar lançamento';
        });
    };

    $scope.remove = function (lancamento) {
        FormService.remover(lancamento.id)
        .then(
        function(data) {
            $scope.status = 'Lançamento removido com sucesso';
        },
        function(error) {
            $scope.status = 'Erro ao remover lançamento';
        });
    };

    $scope.edit = function (lancamento) {
        FormService.editar(lancamento)
        .then(
        function(data) {
            $scope.status = 'Lançamento editado com sucesso';
        },
        function(error) {
            $scope.status = 'Erro ao editar lançamento';
        });
    };

    function listTipoLancamento() {
        FormService.listarTipoLancamentos()
        .then(
        function(data) {
            console.log(data);
            $scope.tipos = data;
        },
        function(error) {
            $scope.status = 'Erro ao listar tipos de lançamento';
        });
    };

}]);