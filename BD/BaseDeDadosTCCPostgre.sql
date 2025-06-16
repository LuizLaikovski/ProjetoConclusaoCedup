/* CRIANDO O BANCO DE DADOS */
CREATE SCHEMA bibliotecacedup;

-- No PostgreSQL, precisamos definir o schema como padrão para a sessão atual
SET search_path TO bibliotecacedup;

-- Tabela: usuario
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    tipo_user VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela: livro
CREATE TABLE livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    genero VARCHAR(100),
    descricao TEXT,
    num_paginas INTEGER NOT NULL
);
