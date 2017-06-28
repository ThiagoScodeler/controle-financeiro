--
-- Estrutura da tabela `tipo_lancamento`
--

CREATE TABLE tipo_lancamento(
   id serial not null,
   nome varchar(50) not null,
   constraint tipo_lancamento_pk primary key (id)
);

--
-- Estrutura da tabela `lancamentos`
--

CREATE TABLE lancamentos(
   id serial not null,
   data_lancamento timestamp not null default now(),
   descricao varchar(500) not null,
   valor decimal not null,
   tipo_lancamento_id integer not null,
   constraint lancamentos_pk primary key(id),
   constraint tipo_lancamento_fk foreign key (tipo_lancamento_id)
      references tipo_lancamento(id) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Inserindo dados da tabela `tipo_lancamento`
--

INSERT INTO tipo_lancamento (id, nome) VALUES (1, 'entrada');
INSERT INTO tipo_lancamento (id, nome) VALUES (2, 'saida');
INSERT INTO tipo_lancamento (id, nome) VALUES (3, 'a pagar');