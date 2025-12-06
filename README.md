# 📱 Tech Challenge – Frontend (React Native + Expo)

Este repositório contém o **frontend mobile** do projeto **Tech Challenge**, desenvolvido em **React Native com Expo**, integrado a uma API REST em Node.js.

O aplicativo foi pensado para uso acadêmico, com foco em **boas práticas**, **controle de permissões**, **UI profissional** e **funcionamento real em celular**.

---

## 🚀 Tecnologias Utilizadas

- **React Native**
- **Expo SDK 54**
- **Expo Go**
- **Axios**
- **React Navigation**
- **Context API**
- **AsyncStorage**
- **Expo Vector Icons**

---

## 👥 Tipos de Usuário

O sistema trabalha com **3 perfis distintos**:

### 👨‍🏫 Professor
- Login no sistema
- Criar, editar e excluir posts
- Gerenciar alunos
- Comentar postagens

### 👨‍🎓 Aluno
- Login no sistema
- Visualizar postagens
- Comentar postagens

### 👑 Administrador
- Todas as permissões de professor
- Gerenciar professores
- Área administrativa completa de posts

---

## 📱 Funcionalidades

### ✅ Autenticação
- Login de professores, alunos e administradores
- Logout
- Persistência de sessão com AsyncStorage

### ✅ Posts
- Listagem de posts
- Busca por palavra-chave
- Visualização de detalhes
- Criação, edição e exclusão (professor/admin)

### ✅ Comentários
- Listagem de comentários
- Criação de comentários
- Exibição do nome de quem comentou

### ✅ Administração
- CRUD de professores
- CRUD de alunos
- Controle de acesso por tipo de usuário

---

## 🧠 Controle de Acesso

O menu e as telas são exibidos dinamicamente de acordo com o perfil do usuário:

| Funcionalidade | Aluno | Professor | Admin |
|----------------|-------|-----------|-------|
| Ver Posts | ✅ | ✅ | ✅ |
| Comentar | ✅ | ✅ | ✅ |
| Criar Post | ❌ | ✅ | ✅ |
| Editar Post | ❌ | ✅ | ✅ |
| Gerenciar Alunos | ❌ | ✅ | ✅ |
| Gerenciar Professores | ❌ | ❌ | ✅ |

---

## 🧩 Estrutura de Pastas

```
src
 ├── api
 ├── components
 ├── context
 ├── navigation
 ├── screens
 │   ├── Auth
 │   ├── Posts
 │   ├── Students
 │   ├── Teachers
 │   └── Admin
 └── styles
```

---

## ▶️ Como executar o projeto

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o projeto
```bash
npx expo start
```

### 3. Executar no celular
- Instale o **Expo Go**
- Escaneie o QR Code exibido no terminal

---

## 🌐 Configuração da API

No arquivo:
```
src/api/api.js
```

Configure o `baseURL` com o IP da sua API backend:

```js
baseURL: "http://SEU_IP_LOCAL:3000"
```

⚠️ **Importante:** nunca use `localhost` no celular.

---

## 🎨 UI/UX

- Layout com cards
- Feedback visual para todas as ações
- Alertas em:
  - Login
  - Cadastro
  - Criação
  - Edição
  - Exclusão
- Respeito a:
  - Safe Area
  - Barra superior (hora, bateria)
  - Navegação Android

---

## 🎓 Projeto Acadêmico

Este projeto foi desenvolvido para fins acadêmicos, demonstrando:
- Integração mobile + API
- Autenticação e autorização
- Arquitetura limpa
- Uso real de Expo e React Native

🔥 Pronto para apresentação em faculdade.

---

## 📄 Licença

Uso livre para fins educacionais.
