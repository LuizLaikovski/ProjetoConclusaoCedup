// ListBooks.tsx
import { useEffect, useState } from 'react';
import './css/listbooks.css';
import RouteButton from './RouteButton';
import BookImage from './BookImage';
import GeneroLivro from '../types/genres';

interface Book {
    id: number;
    titulo: string;
    autor: string;
    genero?: string;
    descricao?: string;
    pags?: number;
    path: string;
    arquivo: {
        src: string;
        alt: string;
    };
    avaliacao: number;
}

interface ListBooksProps {
    minRating: number | null;
}

const ListBooks = ({ minRating }: ListBooksProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const jsonPath = '/BooksTest.json';
                const response = await fetch(jsonPath);
                
                if (!response.ok) throw new Error(`Erro ${response.status}`);
                
                const data = await response.json();
                
                if (!data.books || !Array.isArray(data.books)) {
                    throw new Error('Formato de dados inválido');
                }
                
                setBooks(data.books);
            } catch (err) {
                console.error('Erro na requisição:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = minRating 
        ? books.filter(book => book.avaliacao >= minRating)
        : books;

    if (loading) {
        return <div className="loading-container">Carregando...</div>;
    }

    if (error) {
        return <div className="error-message">Erro: {error}</div>;
    }

    return (
        <main className='MainListBook'>
            <div className="main-content-catalog">
                <div className="books-grid">
                    {filteredBooks.sort(() => Math.random() - 0.5).map((book) => (
                        <RouteButton
                            key={book.id}
                            path={`livro/${book.path}`}
                            img={<BookImage src={book.arquivo.src} alt={book.titulo} />}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ListBooks;