import type { AuthorInfo } from "./AuthorInfoInterface";
import type { Book } from "./BookInterface";
import type { image } from "./imageInterface";

/**
 * @interface objectGeneral
 * @description Interface principal que representa a estrutura da resposta completa da API.
 */
export interface objectGeneral {
    /**
     * @property {Book} book - O objeto principal do livro.
     */
    book: Book;
    /**
     * @property {image[]} imagesBook - Lista de objetos de imagem detalhados para o livro.
     */
    imagesBook: image[];
    /**
     * @property {AuthorInfo[]} authorsImages - Lista de informações detalhadas sobre os autores, incluindo suas imagens.
     */
    authorsImages: AuthorInfo[];
}

