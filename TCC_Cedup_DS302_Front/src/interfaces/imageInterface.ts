/**
 * @interface image
 * @description Interface que define a estrutura de um objeto de imagem detalhado.
 */
export interface image {
    /**
     * @property {string} id - Identificador único da imagem.
     */
    id: string;
    /**
     * @property {string} src - Caminho ou URL da fonte da imagem.
     */
    src: string;
    /**
     * @property {string} alt - Texto alternativo para a imagem.
     */
    alt:string;
}

