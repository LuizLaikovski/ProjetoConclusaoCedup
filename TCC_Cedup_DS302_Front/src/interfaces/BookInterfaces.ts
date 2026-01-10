import { newAuthor } from "./AuthorInterfaces";

export interface Book {
    id: string;
    title: string;
    path: string;
    numPages?: number;
    grades: [];
    rating: number;
    yearPublished: Date | null;
    description?: string;
    autors?: string[];
    image: {
        id: string;
        src: string;
        alt: string;
    };
    archive: {
        src: string;
        alt: string;
    };
}

export interface newBook {
    title: string;
    path: string;
    numPages?: number;
    rating: number;
    yearPublished: Date | null;
    description?: string;
    archive: {
        src: string;
        alt: string;
    };
    image?: {
        src: string;
        alt: string;
    };
}


export interface EditBook {
    id: string;
    title: string;
    path: string;
    numPages?: number;
    yearPublished?: Date | null;
    description?: string;
    archive?: {
        src: string;
        alt: string;
    };
    image?: {
        src: string;
        alt: string;
    };
}


export interface ImageBook {
    id: string;
    src: string;
    alt: string;
}

export interface FavoriteBook {
    path: string;
    title: string;
    images: {
        id: string;
        src: string;
        alt: string;
    }[];
}

export interface BookSearch {
    id: string;
    path: string;
    title: string;
    image: {
        id: string;
        src: string;
        alt: string;
    };
}

export interface NewBookAPI {
    book: newBook;
    authors: newAuthor[];
}