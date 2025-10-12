import type { Image } from "./AuthorInfoInterface";

// Representa o livro principal retornado em "book"
export interface Book {
    id: string;
    title: string;
    path: string;
    numPages: number;
    rating: number;
    yearPublished: number | null;
    description: string;
    authors: string[]; // IDs dos autores
    images: string[];  // IDs das imagens do livro
    archive: Image;    // capa principal do livro
}
