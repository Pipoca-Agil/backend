# Instruções para rodar a aplicação

- Crie um arquivo para configurar as variáveis de ambientes (.env);

  `MONGO_URI=mongodb+srv://<username>:<password>@cluster-agil.wmtjmmh.mongodb.net/?retryWrites=true&w=majority`
  basta substituir o username e password;

- Rode o container com docker compose up -d

- Utilize o comando `docker exec -it pipoca_agil_backend_container bash`;

- Dentro do terminal do container utilize o comando npm install e depois npm start para começar a aplicação.

- Pode rodar o comando npm install fora do terminal para instalar as dependências localmente.
