import React, { useEffect, useState } from 'react';
import Aside from '../components/Aside';
import './css/MainHome.css';
import RouteButton from './RouteButton';

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

const MainHome = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // 1. Verificação de ambiente
                const jsonPath = '/BooksTest.json';
                
                // 2. Fetch com tratamento completo
                const response = await fetch(jsonPath);
                
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }
                
                const contentType = response.headers.get('content-type');
                if (!contentType?.includes('application/json')) {
                    throw new Error('Resposta não é JSON');
                }
                
                const data = await response.json();
                
                // 3. Validação dos dados
                if (!data.books || !Array.isArray(data.books)) {
                    throw new Error('Formato de dados inválido');
                }
                
                setBooks(data.books);
            } catch (err) {
                console.error('Erro na requisição:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
                
                // 4. Fallback para dados mockados
                const fallbackBooks: Book[] = [
                    {
                        id: 1,
                        titulo: 'Apologia de Sócrates',
                        autor: 'Platão',
                        arquivo: {
                            src: '/Cover/ApologiaDeSocrates.jpeg',
                            alt: 'Capa Apologia de Sócrates'
                        },
                        path: '/apologiaDeSocrates'
                    },
                    // Adicione outros livros conforme necessário
                ];
                setBooks(fallbackBooks);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // 5. Componente de imagem com fallback
    const BookImage = ({ src, alt }: { src: string; alt: string }) => {
        const [imgSrc, setImgSrc] = useState(src);
        
        return (
            <img
                src={imgSrc}
                alt={alt}
                className="images-main"
                onError={() => setImgSrc('/Cover/default-book.jpg')}
            />
        );
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Carregando catálogo...</p>
            </div>
        );
    }

    if (error) {
        console.warn('Erro carregando dados:', error);
        // Continua mostrando os livros com fallback
    }

    return (
        <main className="MainHome">
            <Aside />
            <div className="main-content-home">
                <div className="books-grid">
                    {books.map((book) => (
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

export default MainHome;