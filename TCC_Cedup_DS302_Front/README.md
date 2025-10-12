# 📚 TCC_Cedup_DS302_Front: Frontend de Aplicação de Livros

Este projeto é o *frontend* desenvolvido para o Trabalho de Conclusão de Curso (TCC) do CEDUP. Ele é a interface principal de uma aplicação de gerenciamento e visualização de livros, focada em proporcionar uma experiência de usuário fluida e responsiva.

## 🌟 Tecnologias Utilizadas

O projeto foi construído com um *stack* moderno e robusto, utilizando as seguintes tecnologias principais:

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Framework** | **React** | Biblioteca principal para a construção da interface de usuário. |
| **Linguagem** | **TypeScript** | Garante a tipagem estática, aumentando a robustez e a manutenibilidade do código. |
| **Bundler** | **Vite** | Ferramenta de *build* rápida e eficiente para o ambiente de desenvolvimento. |
| **Roteamento** | `react-router-dom` | Gerenciamento de rotas e navegação na aplicação. |
| **Estilização** | `styled-components` | Utilizado para estilização de componentes com a abordagem CSS-in-JS. |
| **UI/Design** | `@mui/material` & `@radix-ui/themes` | Componentes de interface de usuário de alta qualidade, baseados em Material Design e Radix UI. |
| **Animações** | `aos` | Biblioteca para animações de *scroll* (Animate On Scroll). |

## 🚀 Primeiros Passos

Siga as instruções abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

O projeto utiliza o **Vite**, que requer uma versão específica do Node.js para compatibilidade total:

> **Node.js 20.19+** ou **22.12+** [1].

Certifique-se de que seu ambiente atende a este requisito.

### Instalação

1.  **Clone o repositório** (ou navegue até o diretório do projeto):

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd TCC_Cedup_DS302_Front
    ```

2.  **Instale as dependências** utilizando o gerenciador de pacotes `npm`:

    ```bash
    npm install
    ```

### Execução

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará acessível em `http://localhost:5173` (verifique o console para a porta exata).

## 🗺️ Estrutura de Rotas da Aplicação

O roteamento é centralizado e define a navegação principal do usuário através da aplicação.

| Rota | Componente Principal | Descrição |
| :--- | :--- | :--- |
| `/` | Redirecionamento para `/home` | Ponto de entrada que direciona para a página inicial. |
| `/home` | `Home` | Página inicial, apresentando destaques e carrosséis. |
| `/home/livro/:bookName` | `BookSpecifications` | Detalhes completos de um livro específico. |
| `/catalogo` | `Catalog` | Página de listagem, busca e filtragem de todos os livros. |
| `/catalogo/livro/:bookName` | `BookSpecifications` | Detalhes do livro acessados via catálogo. |
| `/search/:bookName` | `Home` | Exibe resultados de busca na página inicial. |
| `/login` | `Login` | Formulário de autenticação. |
| `/cadastro` | `Register` | Formulário de registro de novos usuários. |
| `/perfil` | `ProfileUser` | Área de visualização e edição do perfil do usuário logado. |
| `/perfilAutor/:authorName` | `ProfileAuthor` | Perfil biográfico e listagem de obras de um autor. |
| `*` | `ErrorPage` | Rota de *fallback* para páginas não encontradas (404). |

**Nota:** As rotas `/home` e `/catalogo` são aninhadas sob um *layout* principal (o componente `App`), que gerencia elementos comuns como `Header` e `Footer`.

## 🧩 Organização de Componentes

O projeto segue uma organização modular, separando componentes de página (Rotas) de componentes reutilizáveis.

### Componentes de Rota (`src/routes`)

Estes representam as páginas principais da aplicação:

*   **`Home.tsx`**: Exibição principal, com foco em conteúdo dinâmico e promoções.
*   **`Catalog.tsx`**: Interface para exploração e filtragem da biblioteca completa.
*   **`BookSpecifications.tsx`**: Exibe informações detalhadas, sinopse e metadados de um livro.
*   **`Login.tsx` / `Register.tsx`**: Páginas dedicadas ao fluxo de autenticação.
*   **`ProfileUser.tsx` / `ProfileAuthor.tsx`**: Páginas de perfil para usuários e autores, respectivamente.
*   **`ErrorPage.tsx`**: Componente de tratamento de erros.

### Componentes Reutilizáveis (`src/components`)

Estes são blocos de construção utilizados em múltiplas páginas:

*   **`Header.tsx` / `Footer.tsx`**: Elementos de navegação e rodapé.
*   **`Carousel.tsx`**: Componente de carrossel/slider, implementado com a biblioteca `swiper`.
*   **`ListBooks.tsx`**: Componente genérico para renderizar listas ou grades de livros.
*   **`BookImage.tsx`**: Componente especializado para renderização de imagens de livros.
*   **`RouteButton.tsx`**: Botão que encapsula a lógica de navegação do `react-router-dom`.
*   **`RiskH.tsx`**: Componente de separação visual (provavelmente uma linha horizontal estilizada).

## 💻 Documentação de Tipagem (Interfaces)

Para garantir a segurança e a consistência dos dados, o projeto utiliza interfaces TypeScript rigorosas, modeladas a partir da resposta da API.

### 1. `objectGeneral` (Objeto Raiz da API)

Define a estrutura da resposta completa da API.

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `book` | `Book` | O objeto principal do livro (singular). |
| `imagesBook` | `image[]` | Lista de objetos de imagem detalhados para o livro. |
| `authorsImages` | `AuthorInfo[]` | Lista de informações detalhadas sobre os autores. |

### 2. `Book` (Detalhes do Livro)

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único. |
| `title` | `string` | Título. |
| `numPages` | `number` | Número de páginas. |
| `rating` | `number` | Classificação (e.g., 1 a 5). |
| `yearPublished` | `number \| null` | Ano de publicação. |
| `description` | `string` | Sinopse. |
| `authors` | `string[]` | Lista de IDs dos autores. |
| `archive` | `archive` | Informações da capa principal. |

### 3. `Author` (Detalhes do Autor)

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único. |
| `name` | `string` | Nome completo. |
| `yearBorn` | `number \| null` | Ano de nascimento. |
| `yearDeath` | `number \| null` | Ano de falecimento. |
| `description` | `string \| null` | Biografia. |
| `books` | `string[]` | IDs dos livros escritos. |

### 4. `AuthorInfo` (Autor com Imagens Detalhadas)

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `author` | `Author` | Objeto `Author` com detalhes biográficos. |
| `images` | `image[]` | Lista de objetos de imagem detalhados do autor. |

---

## 🔗 Referências

[1] **Vite.** *Vite 6.0 is out!* Disponível em: [https://vite.dev/blog/announcing-vite6](https://vite.dev/blog/announcing-vite6). Acesso em: 11 de Outubro de 2025.

