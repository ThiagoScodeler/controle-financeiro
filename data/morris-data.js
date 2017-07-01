$(function () {

    series = getTotal();
    console.log( series);
    //infos = getDailyInfos();
    //console.log(infos);
/*
    Morris.Area({
        element: 'morris-area-chart',
        data: infos,
        xkey: 'Dia',
        ykeys: ['entrada', 'saida', 'pagar'],
        labels: ['Entrada', 'Saída', 'A pagar'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
*/
    Morris.Donut({
        element: 'donut-chart-report',
        data: series
    });

/*
    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });
*/
});

function getDailyInfos() {

    results = [];

    var d = new Date();
    var month = d.getMonth() + 1;

    const urlBase = 'http://localhost:3000/api/reports/movimento-by-day/';
    url = urlBase + month;
    $.get(url, function (data) {
        return data;
    });
    return results;
}


function getTotal() {

    results = [];

    //const url = 'http://localhost:3000/api/reports/check-saldo';
    const url = 'http://54.233.186.50:3000/api/reports/check-saldo';

    $.ajax({
     async: false,
     type: 'GET',
     url: url,
     success: function(data) {
         if (data.entrada != null) {
            entrada = new Object();
            entrada.label= 'Entrada';
            entrada.value =  parseInt(data.entrada.total);
            results.push(entrada);
        }
        if (data.pagar != null) {
            pagar = new Object();
            pagar.label = 'Saida';
            pagar.value =  parseInt(data.pagar.total);
            results.push(pagar);        
        }
        if (data.saida != null) {
            saida =  new Object();
            saida.label = 'Pagar';
            saida.value =  parseInt(data.saida.total);
            results.push(saida);     
        }
     }
    });
    return results;
}
