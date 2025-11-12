import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";

interface Book {
    id: string;
    titulo: string;
    arquivo: {
        src: string;
        alt: string;
    };
    path: string;
    avaliacao: number;
}

const SearchResult = () => {
    const { bookName } = useParams<{ bookName: string }>(); // <-- Captura o termo da URL
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_QUERY;
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${API_URL}=${bookName}`, {
                    method: "GET",
                    headers: {
                        "X-API-Key": API_KEY,
                        "Content-Type": "application/json",
                    },
                });
                
                if (!response.ok) {
                    throw new Error("Erro ao carregar livros: " + response.status);
                }
                const data = await response.json();

                if (Array.isArray(data)) {
                const mappedBooks: Book[] = data
                    .filter((item) => item.book?.archive?.src)
                    .map((item) => ({
                    id: item.book.id,
                    titulo: item.book.title,
                    arquivo: {
                        src: item.book.archive.src,
                        alt: item.book.archive.alt || item.book.title,
                    },
                    path: item.book.path,
                    avaliacao: item.book.rating || 0,
                    }));                

                    // 🔍 Filtra com base no termo de pesquisa da URL
                    const filteredBooks = mappedBooks.filter((book) =>
                        book.titulo.toLowerCase().includes(bookName?.toLowerCase() || "")
                    );

                    const uniqueBooks = Array.from(
                        new Map(filteredBooks.map((b) => [b.id, b])).values()
                    );

                    setBooks(uniqueBooks);
                } else {
                    console.warn("Formato inesperado:", data);
                    setBooks([]);
                }
            } catch (err) {
                console.error("Erro ao buscar os livros:", err);
            } finally {
                setLoading(false);
            }
        };

        if (bookName) fetchBooks();
    }, []);

    if (loading) {
        return (
        <div className="flex justify-center h-[21.5dvh]" style={{ margin: "30px" }}>
            <div className="loader h-[50px] w-[50px]"></div>
        </div>
        );
    }

    if (books.length === 0) {
        return (
        <>
            <Header />
            <div className="text-center py-8">
            Nenhum livro encontrado para: <strong>{bookName}</strong>
            </div>
            <Footer />
        </>
        );
    }

    return (
        <>
        <Header />
        <div className="flex flex-wrap justify-center gap-4 p-6">
            {books.map((book) => (
            <div
                key={book.id}
                className="flex-shrink-0 w-auto rounded-2xl overflow-hidden transition-transform hover:scale-105 hover:z-10"
                style={{ scrollSnapAlign: "start", padding: "10px" }}
            >
                <RouteButton
                img={<BookImage src={book.arquivo.src} alt={book.titulo} />}
                path={`/catalogo/livro/${book.path}`}
                />
            </div>
            ))}
        </div>
        <Footer />
        </>
    );
};

export default SearchResult;
