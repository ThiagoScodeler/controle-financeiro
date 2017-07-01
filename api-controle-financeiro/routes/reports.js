const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/controle_financeiro';

const cors = require('cors');
router.use(cors());
router.options('*', cors());

router.get('/ultimos-lancamentos', (req, res, next) => {
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT lancamentos.id, lancamentos.data_lancamento, lancamentos.descricao, \
        lancamentos.valor, tipo_lancamento.nome FROM lancamentos JOIN tipo_lancamento \
        ON lancamentos.tipo_lancamento_id = tipo_lancamento.id \
        ORDER BY data_lancamento ASC limit 5;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

router.get('/ultimos-lancamentos/:month', (req, res, next) => {
    const results = [];
    const month = req.params.month;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT lancamentos.id, lancamentos.data_lancamento, lancamentos.descricao, \
        lancamentos.valor, tipo_lancamento.nome FROM lancamentos JOIN tipo_lancamento \
        ON lancamentos.tipo_lancamento_id = tipo_lancamento.id \
        WHERE extract(month from lancamentos.data_lancamento) = $1 \
        ORDER BY data_lancamento DESC limit 5;', [month]);
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

router.get('/gastos-mes/:month', (req, res, next) => {
    const results = [];

    const month = req.params.month;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM lancamentos WHERE extract(month from data_lancamento) = $1 \
    and tipo_lancamento_id = 2 ORDER BY data_lancamento DESC;',
            [month]);
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

router.get('/check-saldo', (req, res, next) => {
    const results = {};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT l.tipo_lancamento_id as tipo_id, t.nome as tipo_nome, \
        sum(l.valor) as total, count(l.id) as quantidade \
        FROM lancamentos l join tipo_lancamento t on t.id = l.tipo_lancamento_id \
        GROUP BY l.tipo_lancamento_id, t.nome ORDER BY tipo_id ASC;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            if (row['tipo_id'] == 3) {
                results['pagar'] = row;
            } else {
                results[[row['tipo_nome']]] = row;
            }
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            saldo = results.entrada.total - results.saida.total;
            results['saldo_total'] = saldo;
            done();
            return res.json(results);
        });
    });
});

router.get('/movimento-by-day/:month', (req, res, next) => {
    const registers = [];

    const month = req.params.month;
    //dates 
    var d = new Date();
    var year = d.getFullYear();
    var lastDay = (new Date(year, month, 0)).getDate();

    for (var day = 1; day <= lastDay; day++) {
        var register = getMovimentByDay(month, day);
        console.log(register);
        registers.push(register);
    }
    return res.json(registers);

});

function getMovimentByDay(month, day) {
    const results = [];
    var result = {};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return {success: false, data: err };
        }
        // SQL Query > Select Data
        const query = client.query('SELECT EXTRACT(DAY FROM l.data_lancamento) as dia, l.tipo_lancamento_id as tipo_id, \
        t.nome as tipo_nome, sum(l.valor) as total, count(l.id) as quantidade \
        FROM lancamentos l JOIN tipo_lancamento t on t.id = l.tipo_lancamento_id \
        WHERE EXTRACT(DAY FROM l.data_lancamento) = $1 AND EXTRACT(MONTH FROM l.data_lancamento) = $2 \
        GROUP BY (l.tipo_lancamento_id, t.nome, dia) ORDER BY dia;', [day, month]);
        // Stream results back one row at a time
        query.on('row', (row) => {
            if (row['tipo_id'] == 3) {
                results['pagar'] = row;
            } else {
                results[[row['tipo_nome']]] = row;
            }
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            var entrada = 0;
            var saida = 0;
            var pagar = 0;
            if (results.entrada != null) {
                entrada = results.entrada.total;
            }
            if (results.pagar != null) {
                pagar = results.pagar.total;
            }
            if (results.saida != null) {
                saida = results.saida.total;
            }
            result['Dia'] = day;
            result['entrada'] = entrada;
            result['saida'] = saida;
            result['pagar'] = pagar;
            console.log(result);
            return JSON.stringify(result);
        });
    });
    return result;
}

module.exports = router;
