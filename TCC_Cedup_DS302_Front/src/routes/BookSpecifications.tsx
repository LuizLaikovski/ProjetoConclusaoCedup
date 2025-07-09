import Header from "../components/Header";
import RouteButton from "../components/RouteButton";
import './css/BookSpecifications.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
}

const BookSpecifications = () => {
    const { bookName } = useParams<{ bookName: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const response = await fetch('/BooksTest.json');
                
                if (!response.ok) {
                    throw new Error('Falha ao carregar dados');
                }

                const data: { books: Book[] } = await response.json();
                const fullPath = `/${bookName}`; // Reconstruir o path completo
                const foundBook = data.books.find(b => b.path.toLowerCase() === fullPath.toLowerCase()); // O ERRO TA AQUI
                
                if (!foundBook) {
                    setError('Livro não encontrado');
                } else {
                    setBook(foundBook);
                }
            } catch (error) {
                console.error('Erro ao carregar livro:', error);
                setError('Erro ao carregar os dados do livro');
            } finally {
                setLoading(false);
            }
        };

        if (bookName) {
            loadBook();
        } else {
            setError('Nenhum livro especificado');
            setLoading(false);
        }
    }, [bookName]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando livro...</p>
            </div>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="error-container">
                    <p>{error}</p>
                    <RouteButton 
                        path="/home" 
                        label="Voltar à tela inicial" 
                        style={{ marginTop: '20px' }}
                    />
                </div>
            </>
        );
    }

    
    if (!book) {
        return (
            <>
                <Header />
                <div className="not-found-container">
                    <p>Livro não encontrado</p>
                    <RouteButton 
                        path="/home" 
                        label="Voltar à tela inicial" 
                        style={{ marginTop: '20px' }}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="book-specifications-main">
                <div className="book-details-container">
                    <div className="book-cover-container">
                        <img 
                            src={book.arquivo.src} 
                            alt={book.arquivo.alt} 
                            className="book-cover"
                            onError={(e) => {
                                e.currentTarget.src = '/Cover/default-book.jpg';
                                e.currentTarget.alt = 'Capa padrão';
                            }}
                        />
                    </div>
                    
                    <div className="book-info">
                        <h1 className="book-title">{book.titulo}</h1>
                        <h2 className="book-author">por {book.autor}</h2>
                        
                        <div className="book-meta">
                            {book.genero && <p><strong>Gênero:</strong> {book.genero}</p>}
                            {book.pags && <p><strong>Páginas:</strong> {book.pags}</p>}
                        </div>
                        
                        {book.descricao && (
                            <div className="book-description">
                                <h3>Sinopse</h3>
                                <p>{book.descricao}</p>
                            </div>
                        )}
                        
                        <div className="book-actions">
                            <RouteButton 
                                path="/catalogo" 
                                label="Voltar ao catálogo" 
                            />
                            <RouteButton 
                                path="/home" 
                                label="Página inicial" 
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BookSpecifications;