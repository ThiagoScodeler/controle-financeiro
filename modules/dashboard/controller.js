'use strict';

angular.module('Dashboard', [])

    .controller('DashboardController', ['$scope', 'DashboardService',
        function ($scope, DashboardService) {

            checkSaldo();
            getUltimosLancamentosMes();
            getGastosMes();

            function checkSaldo() {
                DashboardService.checkSaldo()
                    .then(
                    function (data) {
                        $scope.saldo = data.data.saldo_total.toFixed(2);
                        $scope.entradas = data.data.entrada.quantidade;
                        $scope.saidas = data.data.saida.quantidade;
                        $scope.pagar = data.data.pagar.quantidade;
                    },
                    function (error) {
                        $scope.status = 'Erro ao consultar saldo';
                    });
            };

            function getUltimosLancamentosMes(){
                DashboardService.ultimosLancamentosMes()
                    .then(
                    function (data){
                        $scope.ultimosLancamentos = data.data;
                    },
                    function(err){
                        $scope.status = 'Erro ao listar ultimos lancamentos';
                    });
            };

            function getGastosMes(){
                DashboardService.gastosMes()
                    .then(
                    function (data){
                        $scope.gastos = data.data;
                    },
                    function(err){
                        $scope.status = 'Erro ao listar ultimos gastos';
                    });
            };
        }]);