'use strict';

angular.module('Form',[])

.controller('FormController', ['$scope','FormService',
function ($scope, FormService) {

    listTipoLancamento();

    $scope.add = function (lancamento) {
        console.log(lancamento);
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

    function listTipoLancamento() {
        FormService.listarTipoLancamentos()
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