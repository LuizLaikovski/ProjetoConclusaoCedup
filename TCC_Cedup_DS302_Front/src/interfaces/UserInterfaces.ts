import { FavoriteBook } from "./BookInterfaces";

export interface UserData {
    id: string;
    name: string;
    email: string;
    password: string;
    booksFavorited: FavoriteBook[];
}