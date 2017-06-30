const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/controle_financeiro';

const cors = require('cors');
router.use(cors());
router.options('*', cors());

router.post('/', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = req.body;
  console.log(data);
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO lancamentos(data_lancamento, descricao, valor, tipo_lancamento_id) values($1, $2, $3, $4)',
    [data.data_lancamento, data.descricao, data.valor, data.tipo_lancamento_id]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM lancamentos ORDER BY id ASC');
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

router.get('/', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT lancamentos.id, lancamentos.data_lancamento, lancamentos.descricao, \
    lancamentos.valor, tipo_lancamento.nome FROM lancamentos JOIN tipo_lancamento \
    ON lancamentos.tipo_lancamento_id = tipo_lancamento.id;');
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

router.get('/:lancamento_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.lancamento_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM lancamentos where id=($1);',[id]);
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


router.put('/:lancamento_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.lancamento_id;
  // Grab data from http request
  const data = req.body
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE lancamentos SET data_lancamento=($1), descricao=($2), valor=($3), tipo_lancamento_id=($4) WHERE id=($5)',
    [data.data_lancamento, data.descricao, data.valor, data.tipo_lancamento_id, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM lancamentos ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/:lancamento_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.lancamento_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM lancamentos WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM lancamentos ORDER BY id ASC');
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

module.exports = router;
