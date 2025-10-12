// Representa uma imagem (pode ser do livro ou do autor)
export interface Image {
    id: string;
    src: string;
    alt: string;
}

// Representa o objeto "author" dentro de "authorsImages"
export interface Author {
    id: string;
    name: string;
    yearBorn: number | null;
    yearDeath: number | null;
    description: string | null;
    books: string[]; // IDs dos livros que ele escreveu
    images: string[]; // IDs das imagens do autor
}

// Representa o item dentro do array "authorsImages"
export interface AuthorInfo {
    author: Author;
    images: Image[]; // imagens do autor
}
