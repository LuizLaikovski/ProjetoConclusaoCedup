# ProjetoConclusaoCedup
 Projeto de Conclusão de curso de desenvolvimento de sistemas na escola técnica Cedup Hermann Hering



# Documentação da API - Projeto Conclusão Cedup

Este documento fornece uma visão geral da API do projeto, incluindo seus endpoints, estrutura de dados e mecanismos de autenticação.

## Visão Geral

A API foi desenvolvida utilizando o framework Spring Boot em Java e utiliza o MongoDB como banco de dados. Ela fornece uma interface para gerenciar livros, autores e usuários, incluindo funcionalidades de busca, avaliação e favoritismo.

## Autenticação

O acesso à API é protegido por uma chave de API. Todas as requisições devem incluir o cabeçalho `X-API-Key` com uma chave válida para serem autenticadas. Requisições sem uma chave de API válida ou com uma chave inválida resultarão em uma resposta de `401 Unauthorized`.

## Estrutura do Banco de Dados

A API utiliza três coleções principais no MongoDB: `Books`, `Users` e `Authors`.

### Coleção `Books`

| Campo         | Tipo              | Descrição                                      |
|---------------|-------------------|------------------------------------------------|
| `id`          | `String`          | Identificador único do livro (MongoDB ObjectId)|
| `title`       | `String`          | Título do livro                                |
| `path`        | `String`          | Caminho do livro (para URLs amigáveis)         |
| `numPages`    | `Integer`         | Número de páginas do livro                     |
| `grades`      | `List<Double>`    | Lista de notas de avaliação do livro           |
| `rating`      | `String`          | Média das avaliações do livro                  |
| `yearPublished`| `LocalDate`       | Ano de publicação do livro                     |
| `description` | `String`          | Descrição do livro                             |
| `authors`     | `List<String>`    | Lista de IDs dos autores do livro              |
| `image`       | `Image`           | Objeto contendo informações da imagem do livro |
| `archive`     | `Archive`         | Objeto contendo informações do arquivo do livro|

### Coleção `Users`

| Campo            | Tipo           | Descrição                                      |
|------------------|----------------|------------------------------------------------|
| `id`             | `String`       | Identificador único do usuário (MongoDB ObjectId)|
| `name`           | `String`       | Nome do usuário                                |
| `email`          | `String`       | Email do usuário                               |
| `password`       | `String`       | Senha do usuário (criptografada)               |
| `type`           | `String`       | Tipo de usuário (ex: `admin`, `user`)          |
| `idBooksFavorited`| `List<String>` | Lista de IDs dos livros favoritados pelo usuário|

### Coleção `Authors`

| Campo       | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| `id`        | `String`    | Identificador único do autor (MongoDB ObjectId)|
| `name`      | `String`    | Nome do autor                                  |
| `yearBorn`  | `LocalDate` | Ano de nascimento do autor                     |
| `yearDeath` | `LocalDate` | Ano da morte do autor                          |
| `description`| `String`    | Descrição do autor                             |
| `path`      | `String`    | Caminho do autor (para URLs amigáveis)         |
| `books`     | `List<String>`| Lista de IDs dos livros do autor               |

## Endpoints da API

A seguir, uma lista dos endpoints disponíveis na API, agrupados por controlador.

### `BookController` (`/book`)

| Método | Rota             | Descrição                                     |
|--------|------------------|-----------------------------------------------|
| `POST` | `/createAll`     | Cria múltiplos livros com seus autores.       |
| `POST` | `/create`        | Cria um livro com seus autores.               |
| `PUT`  | `/edit`          | Edita as informações de um livro.             |
| `DELETE`| `/b={id}`        | Deleta um livro pelo seu ID.                  |
| `POST` | `/rate`          | Adiciona uma nota de avaliação a um livro.    |

### `UserController` (`/user`)

| Método | Rota                | Descrição                                     |
|--------|---------------------|-----------------------------------------------|
| `POST` | `/register`         | Registra um novo usuário.                     |
| `POST` | `/login`            | Autentica um usuário e retorna seus dados.    |
| `GET`  | `/one/u={id}`       | Busca um usuário pelo seu ID.                 |
| `POST` | `/exists`           | Verifica se um usuário existe pelo email.     |
| `PUT`  | `/edit/password`    | Altera a senha de um usuário.                 |
| `PUT`  | `/edit/oldpassword` | Altera a senha de um usuário (com senha antiga).|
| `PUT`  | `/edit/admin`       | Transforma um usuário em administrador.       |
| `GET`  | `/all`              | Retorna todos os usuários.                    |
| `DELETE`| `/u={id}`           | Deleta um usuário pelo seu ID.                |
| `PUT`  | `/{id}`             | Atualiza as informações de um usuário.        |
| `POST` | `/favorite`         | Adiciona um livro aos favoritos de um usuário.|
| `POST` | `/unfavorite`       | Remove um livro dos favoritos de um usuário.  |

### `BookSearchController` (`/book`)

| Método | Rota          | Descrição                                     |
|--------|---------------|-----------------------------------------------|
| `GET`  | `/q={query}`  | Busca livros por um termo de pesquisa.        |
| `GET`  | `/catalog`    | Retorna todos os livros do catálogo.          |
| `GET`  | `/{query}`    | Busca um livro pelo seu `path`.               |

### `InfoAuthorController` (`/author`)

| Método | Rota       | Descrição                                     |
|--------|------------|-----------------------------------------------|
| `GET`  | `/{path}`  | Busca um autor pelo seu `path`.               |

## Como Executar o Projeto

Para executar o projeto, você precisará ter o Docker e o Docker Compose instalados. As variáveis de ambiente necessárias estão definidas no arquivo `application.properties` e devem ser configuradas de acordo com o seu ambiente.

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```

2.  **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

    ```
    MONGODB_URI=<SUA_URI_DO_MONGODB>
    FRONTEND=<URL_DO_SEU_FRONTEND>
    API_KEY=<SUA_CHAVE_DE_API>
    ```

3.  **Execute com Docker Compose:**

    ```bash
    docker-compose up -d
    ```

A API estará disponível em `http://localhost:8080`.
