'use strict';

angular.module('Editar',['ngRoute'])

.config(function($locationProvider) {
 
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
    });
})

.controller('EditarController', ['$scope','$location','EditarService',
function ($scope, $location, EditarService) {

    var lancamento_id = $location.search().lancamento;
    console.log(lancamento_id);

    listLancamentoToEdit(lancamento_id);
    listTipoLancamento();

    function listLancamentoToEdit(lancamento_id) {
        EditarService.listar(lancamento_id)
        .then(
        function(data) {
           //$scope.lancamento = data.data;
        },
        function(error) {
            $scope.error = true;
            $scope.errorMessage = 'Erro ao listar lançamento';
            $scope.reset();
        });
    };

    $scope.edit = function (lancamento) {
        console.log(lancamento);
        EditarService.editar(lancamento_id,lancamento)
        .then(
        function(data) {
            $scope.success = true;
            $scope.successMessage = 'Lançamento editado com sucesso';
            $scope.reset();
        },
        function(error) {
            $scope.error = true;
            $scope.errorMessage = 'Erro ao editar lançamento';
        });
    };

    function listTipoLancamento() {
        EditarService.listarTipoLancamentos()
        .then(
        function(data) {
            $scope.tipos = data.data;
        },
        function(error) {
            $scope.error = true;
            $scope.errorMessage = 'Erro ao listar lançamento';
        });
    };

    $scope.reset = function() {
        $scope.lancamento = angular.copy($scope.master);
    };

}]);