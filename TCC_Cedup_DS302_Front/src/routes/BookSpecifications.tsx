import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import RouteButton from "../components/RouteButton";
import './css/BookSpecifications.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import RiskH from "../components/RiskH";

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

const BookSpecifications = () => {
    const { bookName } = useParams<{ bookName: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const response = await fetch('/BooksTest.json');
                console.log('Response status:', response.status); // Log do status da resposta
                if (!response.ok) {
                    throw new Error('Falha ao carregar dados');
                }

                const data: { books: Book[] } = await response.json();
                const fullPath = `${bookName}`; // Reconstruir o path completo
                const foundBook = data.books.find(b => b.path.toLowerCase() === fullPath.toLowerCase()); // O ERRO TA AQUI
                
                if (!foundBook) {
                    setError('Livro não encontrado(FoundBook)');
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
            
            <main className="book-specifications-main">
                <Header />
                <div className="book-specifications-container">
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
                        <h2 className="book-author"><strong>Autor: </strong>{book.autor}</h2>
                        <h2 className="book-author"><strong>Gênero: </strong>{book.genero}</h2>

                        <div className="avaliation-starts-book">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                
                                function setHover(ratingValue: number): void {
                                    throw new Error("Function not implemented.");
                                }

                                return (
                                    <label key={index} className="star-label">
                                        <input 
                                            type="radio" 
                                            name="rating" 
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                            className="star-input"
                                        />
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                            className="star-icon"
                                            style={{
                                                color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                            }}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    </label>
                                );
                            })}
                            <h1 style={{ fontSize: '5dvh', margin: '0 0 0 10px' }}>{book.avaliacao}</h1>
                        </div>
                        <RiskH grossura={2} largura={33} margens={20} />
                        <div>
                            <h2>ADICIONAR AS IMAGENS DO LIVRO NESTE LOCAL</h2>
                        </div>
                        <RiskH grossura={2} largura={33} margens={20} />
                        <div className="book-details">
                            <h2 className="book-pages"><strong>Número de Paginas: </strong>{book.pags}</h2>
                            <h2>Descrição</h2>
                            <p>{book.descricao}</p>
                        </div>
                    </div>
                    <div className="book-archiver-actions">
                        <div className="book-archiver-actions-container">
                            <button className="primary-button button-archiver">Download</button>
                            <button className="primary-button button-archiver">Favoritar</button>
                            <RouteButton path="/home" label='Voltar a Tela Inicial' classe="primary-button button-archiver" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BookSpecifications;