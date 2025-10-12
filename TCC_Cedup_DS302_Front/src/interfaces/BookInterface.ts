import type { archive } from "./archiveInterface";

/**
 * @interface Book
 * @description Interface que define a estrutura de um objeto de livro.
 */
export interface Book {
    /**
     * @property {string} id - Identificador único do livro.
     */
    id: string;
    /**
     * @property {string} title - Título do livro.
     */
    title: string;
    /**
     * @property {string} path - Slug ou caminho URL do livro.
     */
    path: string;
    /**
     * @property {number} numPages - Número total de páginas do livro.
     */
    numPages: number;
    /**
     * @property {number} rating - Classificação ou nota do livro (e.g., de 1 a 5).
     */
    rating: number;
    /**
     * @property {number | null} yearPublished - Ano de publicação do livro. Pode ser nulo.
     */
    yearPublished: number | null;
    /**
     * @property {string} description - Descrição detalhada ou sinopse do livro.
     */
    description: string;
    /**
     * @property {string[]} authors - Lista de IDs dos autores do livro.
     */
    authors: string[];
    /**
     * @property {string[]} images - Lista de IDs das imagens associadas ao livro.
     */
    images: string[];
    /**
     * @property {archive} archive - Objeto contendo informações da capa principal do livro.
     */
    archive: archive;
}

