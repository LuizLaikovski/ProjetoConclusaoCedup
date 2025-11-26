export interface ApiImage {
    id?: string;
    src?: string;
    alt?: string;
}

export interface ApiAuthor {
    id: string;
    name: string;
    yearBorn?: string | null;
    yearDeath?: string | null;
    description?: string | null;
    path?: string | null;
    books: string[];
    image?: string;
}

export interface ApiBook {
    id: string;
    title: string;
    path: string;
    numPages?: number;
    rating?: string | number;
    description?: string;
    authors: string[];
    archive?: ApiImage;
}

export interface ApiResponse {
    author: ApiAuthor;
    books: ApiBook[];
    imageBook?: ApiImage;
    imageAuthor?: ApiImage;
}

export interface BookForUI {
    id: string;
    titulo: string;
    path: string;
    arquivo: { src?: string; alt?: string };
    avaliacao: number;
}

export interface ImageAuthor {
    id: string;
    src: string;
    alt: string;
}

export interface Author {
    id: string;
    name: string;
    yearBorn: Date;
    yearDeath: Date;
    description: string;
    path: string;
    books: string[];
    image: string;

}

export interface Authors {
    author: Author[];
}