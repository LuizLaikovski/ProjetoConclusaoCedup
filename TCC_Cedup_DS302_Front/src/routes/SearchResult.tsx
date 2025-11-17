import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";

interface Book {
    id: string;
    path: string;
    title: string;
    image: {
        id: string;
        src: string;
        alt: string;
    };
}

const SearchResult = () => {
    const { bookName } = useParams<{ bookName: string }>();
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_QUERY;
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const formatPath = (path: string) => {
        if (!path) return "";
        return path.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
    }


    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);

            if (!bookName) {
                setBooks([]);
                setLoading(false);
                return;
            }

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
                let normalizedArray: any[] = [];

                // ✅ 1) SE FOR ARRAY
                if (Array.isArray(data)) {
                    normalizedArray = data;
                }

                // ✅ 2) SE FOR OBJETO ÚNICO
                else if (typeof data === "object" && data !== null) {
                    normalizedArray = [data]; // transforma em array
                }

                // MAPEAMENTO PADRÃO
                const mappedBooks: Book[] = normalizedArray.map((item) => ({
                    id: item.id,
                    path: item.path,
                    title: item.title,
                    image: {
                        id: item.image?.id,
                        src: `/images/${formatPath(item.path)}.jpeg`,
                        alt: item.image?.alt || item.title,
                    },
                }));

                setBooks(mappedBooks);
            } catch (err) {
                console.error("Erro ao buscar os livros:", err);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [bookName]);


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
                            img={<BookImage src={book.image.src} alt={book.title} />}
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
