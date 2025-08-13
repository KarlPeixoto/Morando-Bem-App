# 🧠 Desafio Técnico - Neki

Este repositório contém a implementação de um sistema completo desenvolvido como parte do processo seletivo da empresa **Neki**. O objetivo do projeto é demonstrar habilidades em desenvolvimento fullstack, com backend em Java (Spring Boot), frontend mobile em React Native e frontend web em React.

---

## 🎯 Objetivo

Construir um sistema de gerenciamento de usuários e suas habilidades (skills), com autenticação segura e interfaces funcionais para web e mobile.

---

## 🧰 Tecnologias Utilizadas

### 🔙 Backend (Java + Spring Boot)
- Java 17
- Spring Boot 3.5.4
- Spring Security com JWT
- Spring Data JPA
- PostgreSQL
- Maven
- Swagger/OpenAPI 3.0

### 📱 Frontend Mobile
- React Native
- Expo
- Axios
- React Navigation
- Context API

### 🖥️ Frontend Web
- React 19
- Axios
- Styled Components
- React Router DOM

---

## 🗂️ Estrutura do Projeto

```
/nekiprojeto/
├── backend/ # API REST com Spring Boot
├── frontend-mobile/ # Aplicativo mobile (React Native)
├── frontend-web/ # Interface web (React)
└── database/ # Script SQL para criação do banco de dados
```

## ⚙️ Funcionalidades

- ✅ Cadastro e login de usuários (com JWT)
- ✅ CRUD de usuários
- ✅ CRUD de habilidades (skills)
- ✅ Associação entre usuários e suas habilidades
- ✅ Documentação da API com Swagger/OpenAPI
- ✅ Interface mobile com autenticação e visualização
- ✅ Interface web com foco em usabilidade
- ✅ Configuração segura com variáveis de ambiente

---

## 🛠️ Como Executar o Projeto

### 📌 Pré-requisitos

- Java 17 instalado
- Node.js e npm/yarn instalados
- PostgreSQL instalado e em execução
- Git instalado
- (Opcional: DBeaver para gerenciar o banco)

### 🔧 Configuração do Ambiente

#### 1. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` no diretório `backend/sistemaskill/`:

```bash
cd backend/sistemaskill
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/sistema_skill
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_do_banco

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu_email@gmail.com
MAIL_PASSWORD=sua_senha_de_app

# JWT Configuration
JWT_SECRET=sua_chave_secreta_jwt_aqui
JWT_ACCESS_EXPIRATION=3600000
JWT_REFRESH_EXPIRATION=604800000

# Server Configuration
SERVER_PORT=8080
SHOW_SQL=false

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000
```

#### 2. Configurar Banco de Dados

1. Crie um banco de dados chamado `sistema_skill` no PostgreSQL
2. Execute o script localizado em: `database/SistemaSkill.sql`

#### 3. Configurar Frontend Mobile

Edite o arquivo `frontend-mobile/MorandoBem/config/api.ts` e ajuste o IP local:

```typescript
export const API_CONFIG = {
  development: {
    baseURL: "http://SEU_IP_LOCAL:8080/api", // Substitua pelo seu IP
    timeout: 10000,
  },
  // ...
}
```

### 🚀 Executando o Projeto

#### ▶️ Backend

```bash
cd backend/sistemaskill
./mvnw spring-boot:run
```

API disponível em: http://localhost:8080
**Documentação Swagger:** http://localhost:8080/swagger-ui/index.html

#### 🌐 Frontend Web

```bash
cd frontend-web/frontend-web
npm install
npm run dev
```

Interface disponível em: http://localhost:5173

#### 📱 Frontend Mobile

```bash
cd frontend-mobile/MorandoBem
npm install
//Se estiver dando erro: npm install --legacy-peer-deps
npx expo start
```

Use o aplicativo Expo Go no celular para escanear o QR code.

---

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI:

- **URL:** http://localhost:8080/swagger-ui/index.html
- **OpenAPI JSON:** http://localhost:8080/v3/api-docs

### Endpoints Principais

- **Autenticação:** `/api/auth/*`
- **Usuários:** `/api/usuarios/*`
- **Skills:** `/api/skills/*`
- **Usuário-Skills:** `/api/usuario-skills/*`

---

## 🔒 Segurança

- ✅ Credenciais removidas do código
- ✅ Variáveis de ambiente configuradas
- ✅ JWT com configuração segura
- ✅ CORS configurado adequadamente
- ✅ Validações implementadas

---

## 🧪 Testes

Para executar os testes:

```bash
cd backend/sistemaskill
./mvnw test
```

---

👨‍💻 **Autor:** Mateus Karl Peixoto
