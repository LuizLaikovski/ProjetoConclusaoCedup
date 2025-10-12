import type { Author } from "./AuthorInterface";
import type { image } from "./imageInterface";

/**
 * @interface AuthorInfo
 * @description Interface que representa a combinação de um objeto Author e suas imagens associadas.
 * Corresponde aos itens dentro do array 'authorsImages' da resposta da API.
 */
export interface AuthorInfo {
    /**
     * @property {Author} author - O objeto Author contendo os detalhes do autor.
     */
    author: Author;
    /**
     * @property {image[]} images - Lista de objetos de imagem detalhados para o autor.
     */
    images: image[];
}

