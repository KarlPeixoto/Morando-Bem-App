-- Sistema Skill - App "Morando Bem"
-- Script de criação do banco de dados
-- Aplicação para ajudar pessoas que estão morando sozinhas pela primeira vez

-- Drop das tabelas se existirem
DROP TABLE IF EXISTS usuario_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Drop das sequences se existirem
DROP SEQUENCE IF EXISTS seq_usuarios CASCADE;
DROP SEQUENCE IF EXISTS seq_skills CASCADE;
DROP SEQUENCE IF EXISTS seq_usuario_skills CASCADE;

-- Criação das sequences
CREATE SEQUENCE seq_usuarios
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE seq_skills
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE SEQUENCE seq_usuario_skills
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

-- Criação das tabelas
CREATE TABLE usuarios (
    id BIGINT DEFAULT nextval('seq_usuarios') PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    codigo_confirmacao VARCHAR(10),
    email_confirmado BOOLEAN DEFAULT FALSE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_confirmacao TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT chk_login_length CHECK (LENGTH(login) >= 3),
    CONSTRAINT chk_senha_length CHECK (LENGTH(senha) >= 6)
);

CREATE TABLE skills (
    id BIGINT DEFAULT nextval('seq_skills') PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuario_skills (
    id BIGINT DEFAULT nextval('seq_usuario_skills') PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    level INTEGER NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_usuario_skills_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_usuario_skills_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    CONSTRAINT chk_level_range CHECK (level >= 1 AND level <= 5),
    CONSTRAINT uk_usuario_skill_unique UNIQUE (usuario_id, skill_id, ativo)
);

-- Índices
CREATE INDEX idx_usuarios_login ON usuarios(login);
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_ativo ON usuarios(ativo);
CREATE INDEX idx_skills_nome ON skills(nome);
CREATE INDEX idx_skills_ativo ON skills(ativo);
CREATE INDEX idx_usuario_skills_usuario_id ON usuario_skills(usuario_id);
CREATE INDEX idx_usuario_skills_skill_id ON usuario_skills(skill_id);
CREATE INDEX idx_usuario_skills_ativo ON usuario_skills(ativo);

-- Skills pré-definidas para o app "Morando Bem"
INSERT INTO skills (nome, descricao) VALUES
('Cozinhar Básico', 'Preparar refeições simples e saudáveis'),
('Limpeza Doméstica', 'Manter a casa organizada e limpa'),
('Gestão Financeira', 'Controlar gastos e fazer orçamento'),
('Manutenção Básica', 'Reparos simples em casa'),
('Organização Pessoal', 'Gerenciar tempo e rotinas'),
('Compras Inteligentes', 'Fazer compras com melhor custo-benefício'),
('Segurança Doméstica', 'Cuidados básicos de segurança'),
('Decoração', 'Tornar o ambiente mais agradável'),
('Planejamento de Refeições', 'Organizar cardápio semanal'),
('Economia de Energia', 'Reduzir gastos com contas de luz'),
('Cuidados com Roupas', 'Lavar, passar e organizar roupas'),
('Gestão de Resíduos', 'Separar lixo e reciclagem'),
('Primeiros Socorros', 'Conhecimentos básicos de emergência'),
('Relacionamento com Vizinhos', 'Convivência harmoniosa'),
('Autocuidado', 'Cuidar da saúde física e mental'),
('Tecnologia Doméstica', 'Usar apps e dispositivos úteis'),
('Culinária Avançada', 'Receitas mais elaboradas'),
('Jardinagem Básica', 'Cuidar de plantas e pequenos jardins'),
('Economia de Água', 'Reduzir consumo de água'),
('Planejamento de Viagens', 'Organizar viagens e passeios');