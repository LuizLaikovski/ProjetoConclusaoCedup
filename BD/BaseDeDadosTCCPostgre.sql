/* CRIANDO O BANCO DE DADOS */
CREATE SCHEMA bibliotecacedup;

-- No PostgreSQL, precisamos definir o schema como padrão para a sessão atual
SET search_path TO bibliotecacedup;

-- TABELA DE LIVRO
CREATE TABLE livro (
  idLivro SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  genero VARCHAR(50) NULL,
  descricao TEXT NULL, -- PostgreSQL não precisa especificar tamanho para TEXT
  numPaginas INT NULL
);

-- TABELA DE USUARIOS
CREATE TABLE usuario (
  idUsuario SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  CPF VARCHAR(45) NOT NULL UNIQUE,
  tipoUser VARCHAR(5) NOT NULL CHECK (tipoUser IN ('ADMIN', 'ALUNO', 'PROF')),
  senha VARCHAR(50) NOT NULL
);