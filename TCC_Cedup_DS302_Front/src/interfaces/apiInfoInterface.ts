import type { Book } from "./BookInfoInterface";
import type { Image, AuthorInfo } from "./AuthorInfoInterface";

// Estrutura completa retornada pela API
export interface ApiResponse {
    book: Book;
    imagesBook: Image[];
    authorsImages: AuthorInfo[];
}
