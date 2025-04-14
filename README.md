# Movie Advertisement

Esse projeto é uma propaganda de um filme, em que o usuário pode escrever perguntas e ao registrar/logar o admin pode responde-las.

## Para Execução Local

Na root do projeto abra o terminal e digite os comandos:

### Para baixar as dependências:
```
npm install
```

### Para executar o banco de dados:

1. Crie uma conta no [MongoDb Atlas](https://www.mongodb.com/cloud/atlas/register) e inicialize um projeto.

2. Crie um arquivo **.env** dentro da pasta **./backend**, em seguida aplique a seguinte variavel de ambiente:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
```
3. Substitua **username** por seu nome de usuário do MongoDB Atlas.
4. Substitua **password** pela senha do usuário que você configurou no MongoDB Atlas.
5. Substitua **database** pelo nome do banco de dados que você configurou no MongoDB Atlas.


### Para executar o programa:
```
npm start
```
Em seguida, abra [http://localhost:3000](http://localhost:3000) para vizualizar em seu navegador.

