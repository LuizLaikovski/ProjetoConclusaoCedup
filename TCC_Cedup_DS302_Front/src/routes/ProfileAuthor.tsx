import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Tipos principais
interface Book {
  id: number;
  titulo: string;
  path: string;
  arquivo: {
    src: string;
    alt: string;
  };
  avaliacao: number;
}


interface ApiAuthor {
  id: string;
  name: string;
  email?: string;
  yearBorn?: string | null;
  yearDeath?: string | null;
  description?: string | null;
  books: number[]; // IDs dos livros
  images: string[]; // IDs das imagens
}

const ProfileAutor = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL;
    const { authorName } = useParams<{ authorName: string }>();
    const [author, setAuthor] = useState<ApiAuthor | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthorData = async () => {
            try {
                setLoading(true);
                setError(null);

                // 🔹 Busca autores do backend
                const authorResponse = await fetch(API_URL, {
                    headers: {"X-API-Key": API_KEY}
                });
                if (!authorResponse.ok) {
                    throw new Error("Erro ao buscar dados dos autores");
                }
                const authors: ApiAuthor[] = await authorResponse.json();

                // 🔹 Encontra o autor pelo nome na URL
                const foundAuthor = authors.find(
                (a) => a.name.toLowerCase().replace(/\s+/g, "-") === authorName?.toLowerCase()
                );

                if (!foundAuthor) {
                    throw new Error("Autor não encontrado");
                }

                setAuthor(foundAuthor);

                // 🔹 Busca todos os livros e filtra os do autor
                const booksResponse = await fetch("https://projetoconclusaocedup.onrender.com/book/books");
                if (!booksResponse.ok) {
                throw new Error("Erro ao buscar dados dos livros");
                }
                const allBooks: Book[] = await booksResponse.json();

                // Filtra apenas os livros que o autor escreveu
                const authorBooks = allBooks.filter((book) =>
                foundAuthor.books.includes(book.id)
                );
                setBooks(authorBooks);
            } catch (err) {
                console.error("Erro ao carregar os dados:", err);
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (authorName) {
            fetchAuthorData();
        } else {
            setError("Nenhum autor especificado");
            setLoading(false);
        }
    }, [authorName]);

    // 🔹 Carregando
    if (loading) {
        return (
            <div className="loading-container flex flex-col justify-center items-center h-[100dvh] text-white">
                <div className="loader h-[75px] w-[75px]"></div>
            </div>
        );
    }

  // 🔹 Erro
    if (error) {
        return (
        <>
            <Header />
            <div className="error-container bg-[var(--secondary)] text-white flex flex-col justify-center items-center min-h-[50vh]">
            <p className="text-2xl text-black font-semibold">{error}</p>
            <RouteButton
                path="/home"
                label="Voltar à tela inicial"
                style={{ marginTop: "20px", fontSize: "20px", color: "black" }}
            />
            </div>
        </>
        );
    }

  // 🔹 Nenhum autor encontrado
    if (!author) {
        return (
        <>
            <Header />
            <div className="not-found-container flex flex-col items-center text-white min-h-[50vh] justify-center">
            <p className="text-2xl">Autor não encontrado</p>
            <RouteButton
                path="/home"
                label="Voltar à tela inicial"
                style={{ marginTop: "20px", fontSize: "20px" }}
            />
            </div>
        </>
        );
    }

  // 🔹 Renderização principal
    return (
        <>
        <Header />
        <main className="flex justify-center items-center flex-col w-[100dvw] h-auto" style={{ margin: "20px" }}>
            {/* Perfil do Autor */}
            <div className="bg-white w-[90dvw] h-auto flex items-center rounded-3xl shadow-2xl p-6 text-black mb-10">
                <FontAwesomeIcon icon={faUserCircle} size="6x" color="#003631" className="ml-4 mr-6" />
                <div>
                    <h1 className="text-3xl font-semibold">{author.name}</h1>
                    {author.email && <p>Email: {author.email}</p>}
                    {author.yearBorn && <p>Nascimento: {author.yearBorn}</p>}
                    {author.yearDeath && <p>Falecimento: {author.yearDeath}</p>}
                    {author.description && <p className="mt-3">{author.description}</p>}
                </div>
            </div>

            {/* Livros do Autor */}
            <div className="w-[100dvw] text-black">
                <h1 className="text-4xl mb-2 ml-4">Livros do Autor</h1>
                <div className="border-y-2 border-green-900 w-[100dvw] mb-6"></div>

                {books.length === 0 ? (
                    <p className="text-center text-gray-600 text-xl">Nenhum livro encontrado para este autor.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 px-4">
                    {books.map((book) => (
                        <div key={book.id} className="flex flex-col items-center">
                        <RouteButton
                            path={`/catalogo/livro/${book.path}`}
                            img={<BookImage src={book.arquivo.src} alt={book.arquivo.alt} style={{ height: "200px" }} />}
                        />
                        <p className="mt-2 font-semibold text-center">{book.titulo}</p>
                        </div>
                    ))}
                    </div>
                )}
            </div>

            <Footer />
            <div className="h-[10dvh]"></div>
        </main>
        </>
    );
};

export default ProfileAutor;
