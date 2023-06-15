# Pipoca Ágil - Backend

## Utilizando a API localmente na sua máquina

Este documento fornece instruções sobre como configurar e executar a API localmente.

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados em seu sistema:

1. [Node.js](https://nodejs.org) e o gerenciador de pacotes npm (normalmente instalados juntos com o Node.js).
2. [MySQL Workbench](https://www.mysql.com/products/workbench/) (ou qualquer outro cliente de banco de dados MySQL).
3. [Insomnia](https://insomnia.rest/) (ou qualquer outro cliente de API REST) para testar as rotas da API.

### Configuração

Siga as etapas abaixo para configurar e executar a API localmente:

1. Clone este repositório em sua máquina local;
2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

    ```text
    DATABASE_URL="mysql://<usuario>:<senha>@localhost:3306/<nome_do_schema>"
    JWT_SECRET="chavesecreta"
    ```

3. Abra um terminal na pasta raiz do projeto e execute o seguinte comando para instalar as dependências do projeto:

    ```text
    npm install
    ```

4. Inicie a aplicação executando o seguinte comando:

    ```text
    npm start
    ```

A API será iniciada e estará disponível em http://localhost:3001.

### Testando as Rotas

Agora você pode usar o Insomnia (ou qualquer outro cliente de API REST) para testar as rotas da API. Certifique-se de usar a URL base `http://localhost:3001` para todas as requisições.

## 📚 Documentação (endpoints)

Documentação da API para o site Pipoca Ágil

### 🫂 User

| Método | Funcionalidade                          | URL                         |
| ------ | --------------------------------------- | --------------------------- |
| `POST` | Realiza o cadastro do usuário na aplicação | <http://localhost:3001/user> |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

- **Request Body**:
  - `name` (string, Obrigatório): Nome do Usuário.
  - `surname` (string, Opcional): Sobrenome do Usuário.
  - `email` (string, Obrigatório): Email.
  - `password` (string, Obrigatório): Senha.
  - `role` (string, Opcional): Acesso do Usuário (default: 'user').

```http
Content-Type: application/json

{
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "password": "Password123",
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte:</summary>

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "<generated-token>"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>

- A rota retorna o código <code>400</code>, com a mensagem <code>O nome é obrigatório</code> caso o campo name não seja informado no body da requisição;

- A rota retorna o código <code>400</code>, com a mensagem <code>Email é obrigatório</code> caso o campo email não seja informado no body da requisição;

- A rota retorna o código <code>400</code>, com a mensagem <code>Senha é obrigatório</code> caso o campo password não seja informado no body da requisição;

- A rota retorna o código <code>400</code>, com a mensagem <code>O nome deve ter no mínimo 3 caracteres</code> caso o campo name tenha menos de 3 caracteres;

- A rota retorna o código <code>400</code>, com a mensagem <code>O sobrenome deve ter no mínimo 3 caracteres</code> caso o campo surname tenha menos de 3 caracteres;

- A rota retorna o código <code>400</code>, com a mensagem <code>Endereço de Email inválido</code> caso o campo email seja inválido;

- A rota retorna o código <code>400</code>, com a mensagem <code>Email já está em uso. Por favor, escolha outro.</code> caso o usuário tente criar uma conta com email existente;

- A rota retorna o código <code>400</code>, com a mensagem <code>Senha deve ter 8 caracteres ou mais</code> caso o usuário tente criar uma senha com menos de 8 caracteres;

- A rota retorna o código <code>400</code>, com a mensagem <code>A senha deve conter pelo menos uma letra maiúscula</code> caso o usuário tente criar uma senha sem letra maiúscula;

- A rota retorna o código <code>400</code>, com a mensagem <code>A senha deve conter pelo menos uma letra minúscula</code> caso o usuário tente criar uma senha sem letra minúscula;

- A rota retorna o código <code>400</code>, com a mensagem <code>A senha deve conter pelo menos um número</code> caso o usuário tente criar uma senha sem números;

</details>

### 🔑 Login
