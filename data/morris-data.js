$(function() {

    infos = getDailyInfos();
    console.log(infos);

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
    
});


function getDailyInfos(){

    results = [];

    var d = new Date();
    var month = d.getMonth()+1;

    const urlBase = 'http://localhost:3000/api/reports/movimento-by-day/';
    url = urlBase+ month;
    $.get(url, function(data){
        return data;
    });
    return results;
}