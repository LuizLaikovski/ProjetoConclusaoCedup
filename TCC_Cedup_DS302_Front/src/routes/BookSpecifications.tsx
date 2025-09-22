import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import RouteButton from "../components/RouteButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

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

    useEffect(() => {
        const loadBook = async () => {
            try {
                const response = await fetch('/BooksTest.json');
                if (!response.ok) {
                    throw new Error('Falha ao carregar dados');
                }

                const data: { books: Book[] } = await response.json();
                const foundBook = data.books.find(b => b.path.toLowerCase() === bookName?.toLowerCase());
                
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

    // Função para renderizar as estrelas baseadas na avaliação
    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
                <FontAwesomeIcon 
                    key={index}
                    icon={faStar}
                    className="star-icon"
                    style={{
                        color: ratingValue <= rating ? "#ffc107" : "#e4e5e9",
                        height: "25px"
                    }}
                />
            );
        });
    };

    return (
        <>
            <Header />
            <main className="book-specifications-main flex justify-center items-center flex-col w-[100dvw] h-auto" style={{margin: "20px"}}>
                <div className="bg-white h-auto w-[90dvw] text-black rounded-2xl shadow-2xl flex justify-center items-center flex-col" style={{padding: "15px"}}>
                    <img src={book.arquivo.src} alt={book.arquivo.alt} className="h-50 shadow-2xl" />
                    <h1 className="text-3xl text-center">{book.titulo}</h1>
                    <div className="avaliation-starts-book">
                        {renderStars(book.avaliacao)}
                    </div>
                    <h1>{book.autor}</h1>
                    <h1>Quantidade de Páginas: {book.pags}</h1>
                    <h1>Gênero: {book.genero}</h1>
                </div>

                <div className="bg-white h-auto w-[90dvw] text-black rounded-2xl shadow-2xl flex justify-center items-center flex-col text-justify" style={{padding: "15px", marginTop: "30px"}}>
                    <h1>{book.descricao}</h1>
                </div>

                <button className="primary-button w-[80dvw] text-2xl">Leia Agora</button>
            </main>
            <Footer />
        </>
    );
};

export default BookSpecifications;