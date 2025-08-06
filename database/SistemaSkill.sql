CREATE SEQUENCE seq_usuario_id START 1;
CREATE SEQUENCE seq_skill_id START 1;
CREATE SEQUENCE seq_usuario_skill_id START 1;

CREATE TABLE usuario (
    id INTEGER PRIMARY KEY DEFAULT nextval('seq_usuario_id'),
    login VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE skill (
    id INTEGER PRIMARY KEY DEFAULT nextval('seq_skill_id'),
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    imagem_url TEXT
);

CREATE TABLE usuario_skill (
    id INTEGER PRIMARY KEY DEFAULT nextval('seq_usuario_skill_id'),
    usuario_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    level VARCHAR(50),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_skill FOREIGN KEY (skill_id) REFERENCES skill(id) ON DELETE CASCADE,
    CONSTRAINT unq_usuario_skill UNIQUE (usuario_id, skill_id)
);
