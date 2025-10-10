# TCC_Cedup_DS302_Front

Este projeto é o *frontend* de uma aplicação desenvolvida para o Trabalho de Conclusão de Curso (TCC) do CEDUP, utilizando **React** com **TypeScript** e **Vite** como *bundler*. O projeto é focado na interface do usuário, gerenciamento de estado e roteamento da aplicação.

## 🚀 Tecnologias e Instalação

Para rodar este projeto localmente, você precisará ter o **Node.js** instalado.

### ⚙️ Versão do Node.js

O projeto utiliza o **Vite 6.3.5**, que, de acordo com a documentação oficial, requer as seguintes versões do Node.js:

> **Node.js 20.19+** ou **22.12+** [1].

Recomenda-se utilizar uma dessas versões para garantir a compatibilidade total.

### 📦 Instalação das Dependências

1.  **Clone o repositório** (se aplicável) ou navegue até o diretório do projeto.
2.  **Instale as dependências** utilizando o gerenciador de pacotes `npm`:

```bash
cd TCC_Cedup_DS302_Front
npm install
```

### ▶️ Como Rodar o Projeto

Após a instalação, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
```

O projeto estará acessível em `http://localhost:5173` (ou outra porta, conforme indicado pelo Vite).

## 📚 Bibliotecas Principais

O projeto utiliza as seguintes bibliotecas principais para sua funcionalidade e *design*:

| Categoria | Biblioteca | Versão | Descrição |
| :--- | :--- | :--- | :--- |
| **Roteamento** | `react-router-dom` | `^7.6.2` | Gerenciamento de rotas e navegação na aplicação. |
| **UI/Estilização** | `@mui/material` | `^7.1.2` | Componentes de interface do usuário baseados no Material Design. |
| **UI/Estilização** | `@radix-ui/themes` | `^3.2.1` | Componentes de UI de alta qualidade e acessíveis. |
| **Estilização** | `styled-components` | `^6.1.19` | Estilização de componentes com CSS-in-JS. |
| **Animações** | `aos` | `^3.0.0-beta.6` | Biblioteca para animações de *scroll* (Animate On Scroll). |
| **Ícones** | `@fortawesome/react-fontawesome` | `^0.2.2` | Integração de ícones Font Awesome. |
| **Carrossel** | `swiper` | `^11.2.10` | Componente moderno de carrossel/slider. |
| **React** | `react` / `react-dom` | `^19.1.0` | Biblioteca principal para construção da interface. |

## 🗺️ Rotas da Aplicação

O roteamento é configurado no arquivo `src/main.tsx` utilizando o `react-router-dom`. A estrutura de rotas é a seguinte:

| Rota | Componente Principal | Descrição |
| :--- | :--- | :--- |
| `/` | `Navigate` para `/home` | Redireciona o usuário para a página inicial. |
| `/home` | `Home` (aninhado em `App`) | Página inicial da aplicação. |
| `/home/livro/:bookName` | `BookSpecifications` | Exibe os detalhes de um livro específico. |
| `/login` | `Login` | Página de autenticação do usuário. |
| `/cadastro` | `Register` | Página de registro de novos usuários. |
| `/search/:bookName` | `Home` | Exibe resultados de busca na página inicial. |
| `/perfil` | `ProfileUser` | Perfil do usuário logado. |
| `/perfilAutor/:authorName` | `ProfileAuthor` | Perfil de um autor específico. |
| `/catalogo` | `Catalog` (aninhado em `App`) | Página de catálogo de livros. |
| `/catalogo/livro/:bookName` | `BookSpecifications` | Exibe os detalhes de um livro específico dentro do catálogo. |
| `*` | `ErrorPage` | Rota de erro (página não encontrada). |

**Nota sobre Rotas Aninhadas:** As rotas `/home` e `/catalogo` utilizam o componente `App` como *layout* principal, que contém o `<Outlet />` para renderizar seus filhos.

## 🧩 Componentes

O projeto está organizado em componentes de rota (`src/routes`) e componentes reutilizáveis (`src/components`).

### Componentes de Rota (`src/routes`)

Estes componentes representam as páginas principais da aplicação:

*   **`Home.tsx`**: A página inicial, provavelmente contendo *banners*, carrosséis e listagens de livros.
*   **`Catalog.tsx`**: A página principal de listagem e filtragem de livros.
*   **`BookSpecifications.tsx`**: Exibe as informações detalhadas de um livro, utilizando o parâmetro de rota `:bookName`.
*   **`Login.tsx`**: Formulário para login de usuários.
*   **`Register.tsx`**: Formulário para cadastro de novos usuários.
*   **`ProfileUser.tsx`**: Página de visualização e edição do perfil do usuário.
*   **`ProfileAuthor.tsx`**: Página de visualização do perfil de um autor, utilizando o parâmetro de rota `:authorName`.
*   **`ErrorPage.tsx`**: Componente exibido para rotas não encontradas ou erros.

### Componentes Reutilizáveis (`src/components`)

Estes são componentes menores, utilizados em diversas páginas para construir a interface:

*   **`Header.tsx`**: O cabeçalho de navegação da aplicação.
*   **`Footer.tsx`**: O rodapé da aplicação.
*   **`Carousel.tsx`**: Componente de carrossel, provavelmente utilizando a biblioteca `swiper`.
*   **`ListBooks.tsx`**: Componente para exibir uma lista ou grade de livros.
*   **`BookImage.tsx`**: Componente para renderizar a imagem de um livro.
*   **`Checkbox.tsx`**: Componente de *checkbox* customizado.
*   **`MainHome.tsx`**: Possivelmente o corpo principal da página *Home*.
*   **`RiskH.tsx`**: Nome de componente não padrão, mas provavelmente uma linha horizontal (`<hr>`) estilizada ou um separador.
*   **`RouteButton.tsx`**: Um botão que encapsula a navegação do `react-router-dom`.

---

## 🔗 Referências

[1] Vite. **Vite 6.0 is out!**. Disponível em: [https://vite.dev/blog/announcing-vite6](https://vite.dev/blog/announcing-vite6). Acesso em: 09 de Outubro de 2025.

