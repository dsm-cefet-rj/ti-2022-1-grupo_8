# Pizzaria ON

## Integrantes do grupo

- Bernado Martins Correa D'Abreu e Costa - [GitHub](https://github.com/Bentroen)
- Dayvison Augusto de Oliveira Da Costa- [GitHub](https://github.com/Dayv1son)
- Matheus Coelho - [GitHub](https://github.com/matheuslmc)
- Nicolas Vycas Nery - [GitHub](https://github.com/tomast1337)

### No Wiki está a prototipagem e afins do projeto.

### Estrutura do Projeto:

`backend`: código do backend

`src`: código do frontend

# Como rodar o projeto?

criar arquivo .env com as seguintes informações:

```ini
JWT_SECRET={TOKEN_SECRET}
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.kjdieka.mongodb.net/?retryWrites=true&w=majority
MONGODB_USERNAME={username do banco}
MONGODB_PASSWORD={password do banco}
BACKEND_PORT=3001
```

O `JWT_SECRET` é um valor aleatório que deve ser usado para criptografar o token, ele pode ser obtido executando o comando em um shell com node:
```js
require('crypto').randomBytes(64).toString('hex')
```
ou usando o comando no shell
```sh
node -e 'console.log(require("crypto").randomBytes(64).toString("hex"))'
```

## Para rodar o projeto, basta executar os comandos abaixo:

```bash
    npm install
    npm run dev
```

## Abra esse projeto no Visual Studio Code

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7764983&assignment_repo_type=AssignmentRepo)
