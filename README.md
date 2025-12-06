# 📱 Tech Challenge – Front-end Mobile (React Native + Expo)

Front-end mobile desenvolvido em **React Native com Expo**, consumindo uma API REST em Node.js + Sequelize.  
Projeto criado para o **Tech Challenge da Faculdade**, seguindo boas práticas de arquitetura, autenticação, controle de permissões e UI moderna.

---

## 🚀 Tecnologias Utilizadas

- **React Native**
- **Expo SDK 54**
- **Expo Router / React Navigation**
- **Axios**
- **Context API**
- **AsyncStorage**
- **Expo Vector Icons**
- **Docker (build web para produção)**

---

## 🎯 Objetivo do Projeto

Criar uma aplicação mobile onde:

- Professores e administradores podem **criar, editar e excluir postagens**
- Alunos podem **visualizar e comentar postagens**
- Existe **controle de acesso por perfil**
- Interface moderna, intuitiva e responsiva
- Integração total com o backend REST

---

## 👥 Perfis de Usuário

### 👨‍🎓 Aluno
- Login
- Visualizar postagens
- Comentar postagens

### 👨‍🏫 Professor
- Login
- Criar, editar e excluir postagens
- Gerenciar alunos
- Comentar postagens

### 👑 Administrador
- Login
- Todas as permissões de professor
- Gerenciar professores
- Área administrativa completa

---

## ✅ Funcionalidades

- ✅ Autenticação (Login / Logout)
- ✅ Registro de usuários (Professor / Admin / Aluno)
- ✅ Autorização por perfil
- ✅ Listagem de postagens
- ✅ Busca por postagens
- ✅ Detalhes do post
- ✅ Comentários em postagens
- ✅ CRUD completo de posts
- ✅ CRUD de alunos
- ✅ CRUD de professores
- ✅ Tela administrativa
- ✅ Feedback visual (alerts)
- ✅ Interface adaptada ao teclado
- ✅ SafeArea (respeita barra superior/inferior)

---

## 🧱 Arquitetura de Pastas

```
src/
 ├── api/
 │   └── api.js
 ├── components/
 │   ├── Screen.js
 │   └── Card.js
 ├── context/
 │   └── AuthContext.js
 ├── screens/
 │   ├── Auth/
 │   ├── Posts/
 │   ├── Students/
 │   └── Teachers/
 ├── styles/
 │   └── theme.js
 └── routes/
     └── index.js
```

---

## ▶️ Rodando o Projeto

```bash
npm install
npx expo start
```

---

## 🌐 Configuração da API

Edite o arquivo:

```
src/api/api.js
```

```js
const api = axios.create({
  baseURL: "http://SEU_IP:3000",
});
```

---

## 🐳 Docker (Web – Produção)

### Build local
```bash
docker build -t villares/4fase-tech-challenge-front-end .
```

### Docker Compose
```bash
docker-compose up --build
```

### Pull Image
```bash
docker pull villares/4fase-tech-challenge-front-end:latest
```

### Executar container
```bash
docker run --name 4FaseTechChallengeFrontEnd -p 80:80 villares/4fase-tech-challenge-front-end:latest
```



---

## 👨‍💻 Autor

Jonathas Villares  
🎓 Tech Challenge 