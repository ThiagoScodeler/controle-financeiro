'use strict';

angular.module('Form',[])

.controller('FormController', ['$scope','FormService',
function ($scope, FormService) {

    listTipoLancamento();

    $scope.add = function (lancamento) {
        FormService.cadastrar(lancamento)
         .then(
        function(data) {
            $scope.success = true;
            $scope.successMessage = 'Lançamento adicionado com sucesso';
            $scope.reset();
        },
        function(error) {
            $scope.error = true;
            $scope.errorMessage = 'Erro ao adicionar lançamento';
            $scope.reset();
        });
    };

    $scope.list = function (lancamento) {
        FormService.listar(lancamento.id)
        .then(
        function(data) {
           
        },
        function(error) {
           
        });
    };

    $scope.remove = function (lancamento) {
        FormService.remover(lancamento.id)
        .then(
        function(data) {
            
        },
        function(error) {
            
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
            $scope.tipos = data.data;
        },
        function(error) {
            $scope.status = 'Erro ao listar tipos de lançamento';
        });
    };

    $scope.reset = function() {
        $scope.lancamento = angular.copy($scope.master);
    };

}]);