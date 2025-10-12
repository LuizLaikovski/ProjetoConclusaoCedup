/**
 * @interface Author
 * @description Interface que define a estrutura de um objeto de autor.
 */
export interface Author {
    /**
     * @property {string} id - Identificador único do autor.
     */
    id: string;
    /**
     * @property {string} name - Nome completo do autor.
     */
    name: string;
    /**
     * @property {number | null} yearBorn - Ano de nascimento do autor. Pode ser nulo.
     */
    yearBorn: number | null;
    /**
     * @property {number | null} yearDeath - Ano de falecimento do autor. Pode ser nulo.
     */
    yearDeath: number | null;
    /**
     * @property {string | null} description - Breve descrição ou biografia do autor. Pode ser nulo.
     */
    description: string | null;
    /**
     * @property {string[]} books - Lista de IDs dos livros escritos pelo autor.
     */
    books: string[];
    /**
     * @property {string[]} images - Lista de IDs das imagens associadas ao autor.
     */
    images: string[];
}

