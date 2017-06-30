'use strict';

angular.module('Lancamentos',[])

.controller('LancamentosController', ['$scope','LancamentosService',
function ($scope, LancamentosService) {

    listLancamentos();

    $scope.confirmDelete = function(lancamento) {
    $scope.lancamentoToDelete = lancamento;
        $('#modalRemove').modal('show');
    };

    $scope.deleteLancamento = function (lancamentoToDelete) {
        LancamentosService.remover(lancamentoToDelete.id)
        .then(
        function(data) {
            listLancamentos();
            $('#modalRemove').modal('hide');
        },
        function(error) {
            console.log('erro');
        });
    };

    $scope.edit = function (lancamento) {
        LancamentosService.editar(lancamento)
        .then(
        function(data) {
            $scope.status = 'Lançamento editado com sucesso';
        },
        function(error) {
            $scope.status = 'Erro ao editar lançamento';
        });
    };

    function listLancamentos() {
        LancamentosService.listarLancamentos()
        .then(
        function(data) {
            $scope.lancamentos = data.data;
        },
        function(error) {
            $scope.status = 'Erro ao listar tipos de lançamento';
        });
    };

}]);