/**
 * @interface archive
 * @description Interface que define a estrutura do objeto de arquivo/capa dentro do objeto Book.
 */
export interface archive {
    /**
     * @property {string} src - Caminho ou URL da fonte da capa.
     */
    src: string;
    /**
     * @property {string} alt - Texto alternativo para a capa.
     */
    alt: string;
}

