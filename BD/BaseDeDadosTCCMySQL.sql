/* CRIANDO A DATABASE	 */
CREATE SCHEMA bibliotecacedup;

USE bibliotecacedup;

#  TROCAR GENERO PARA ENUM 
#  TABELA DE LIVRO
CREATE TABLE bibliotecacedup.livro (
  idLivro INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  genero VARCHAR(50) NULL,
  descricao TEXT(500) NULL,
  numPaginas INT NULL,
  PRIMARY KEY (idLivro));
  
  #  TABELA DE USUARIOS
 CREATE TABLE bibliotecacedup.usuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    CPF VARCHAR(45) NOT NULL,
    tipoUser ENUM('ADMIN', 'ALUNO', 'PROF') NOT NULL,
    senha VARCHAR(50) NOT NULL,
    PRIMARY KEY (idUsuario),
    UNIQUE INDEX CPF_UNIQUE (CPF)
);
