# Front-end React Native (Expo) - Tech Challenge

Aplicativo **refeito do zero**, alinhado ao seu backend Node + Sequelize.

## Funcionalidades implementadas

- Login de professor/admin (`/auth/login`)
- Registro de professor/admin (`/auth/register`)
- Lista de posts com:
  - título, autor e prévia do conteúdo
  - busca por palavra-chave
  - botão para criar post (apenas professor/admin)
  - botão para área administrativa, professores e alunos
- Leitura de post + comentários (`/posts/:id` e `/posts/:id/comments`)
- Criação e edição de posts (`/posts`)
- CRUD de professores (`/teachers`)
- CRUD de alunos (`/students`)
- Área administrativa de posts
- Autorização por perfil (teacher/admin)
- Alert em **todas** as ações de criar / editar / excluir / erro

## Como rodar

1. Entre na pasta do projeto:

   ```bash
   cd mobile_refeito
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Ajuste o IP do backend:

   Edite `src/api/api.js` e troque:

   ```js
   baseURL: "http://192.168.1.13:3000"
   ```

   para o IP da sua máquina (mesma rede do celular).

4. Rode o aplicativo:

   ```bash
   npm start
   ```

5. Abra com o **Expo Go** no Android.

## Observações

- Login padrão que você já testou no backend (curl, Insomnia) deve funcionar aqui também.
- Se receber 404 ou erro de rede, quase sempre é:
  - IP errado no `api.js`
  - Backend não está rodando
  - Celular e PC não estão na mesma rede
