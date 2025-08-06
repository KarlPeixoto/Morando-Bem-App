# 🧠 Desafio Técnico - Neki

Este repositório contém a implementação de um sistema completo desenvolvido como parte do processo seletivo da empresa **Neki**. O objetivo do projeto é demonstrar habilidades em desenvolvimento fullstack, com backend em Java (Spring Boot), frontend mobile em React Native e frontend web em React.

---

## 🎯 Objetivo

Construir um sistema de gerenciamento de usuários e suas habilidades (skills), com autenticação segura e interfaces funcionais para web e mobile.

---

## 🧰 Tecnologias Utilizadas

### 🔙 Backend (Java + Spring Boot)
- Java 17
- Spring Boot
- Spring Security com JWT
- Spring Data JPA
- PostgreSQL
- Maven
- Swagger/OpenAPI

### 📱 Frontend Mobile
- React Native
- Expo
- Axios
- React Navigation
- Context API

### 🖥️ Frontend Web
- React
- Axios
- Styled Components
- React Router DOM

---

## 🗂️ Estrutura do Projeto

/nekiprojeto/
├── backend/ # API REST com Spring Boot
├── frontend-mobile/ # Aplicativo mobile (React Native)
├── frontend-web/ # Interface web (React)
└── database/ # Script SQL para criação do banco de dados


## ⚙️ Funcionalidades

- ✅ Cadastro e login de usuários (com JWT)
- ✅ CRUD de usuários
- ✅ CRUD de habilidades (skills)
- ✅ Associação entre usuários e suas habilidades
- ✅ Documentação da API com Swagger
- ✅ Interface mobile com autenticação e visualização
- ✅ Interface web com foco em usabilidade

---

## 🛠️ Como Executar o Projeto

### 📌 Pré-requisitos

- Java 17 instalado
- Node.js e npm/yarn instalados
- PostgreSQL instalado e em execução
- Git instalado
- (Opcional: DBeaver para gerenciar o banco)

🐘 Banco de Dados

1. Crie um banco de dados chamado `sistema_skill` no PostgreSQL
2. Execute o script localizado em: `database/SistemaSkill.sql`

▶️ Backend

```bash
cd backend
./mvnw spring-boot:run
API disponível em: http://localhost:8080

```
🌐 Frontend Web

```bash
cd frontend-web
npm install
npm start
Interface disponível em: http://localhost:3000

```
📱 Frontend Mobile

```bash
cd frontend-mobile
npm install
npx expo start
Use o aplicativo Expo Go no celular para escanear o QR code.

```
👨‍💻 Autor
Mateus Karl Peixoto
