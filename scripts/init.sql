-- Criação do banco de dados
DROP DATABASE IF EXISTS matricula;

CREATE DATABASE IF NOT EXISTS matricula;

-- Criação da tabela 'aluno' com chave primária
CREATE TABLE aluno (
    codigo serial PRIMARY KEY,
    nome varchar(50)
);

-- Criação da tabela 'curso' com chave primária
CREATE TABLE curso (
    codigo serial PRIMARY KEY,
    nome varchar(50),
    ementa text
);

-- Criação da tabela 'curso_aluno' com chave primária e chaves estrangeiras
CREATE TABLE curso_aluno (
    codigo serial PRIMARY KEY,
    codigo_aluno int REFERENCES aluno(codigo),
    codigo_curso int REFERENCES curso(codigo)
);
