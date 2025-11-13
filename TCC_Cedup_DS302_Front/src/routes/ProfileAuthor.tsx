import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface ApiImage {
    id?: string;
    src?: string;
    alt?: string;
}
interface ApiAuthor {
    id: string;
    name: string;
    yearBorn?: string | null;
    yearDeath?: string | null;
    description?: string | null;
    path?: string | null;
    books: string[];
    image?: string;
}
interface ApiBook {
    id: string;
    title: string;
    path: string;
    numPages?: number;
    rating?: string | number;
    description?: string;
    authors: string[];
    archive?: ApiImage;
}

interface ApiResponse {
    author: ApiAuthor;
    books: ApiBook[];
    imageBook?: ApiImage;
    imageAuthor?: ApiImage;
}

interface BookForUI {
    id: string;
    titulo: string;
    path: string;
    arquivo: { src?: string; alt?: string };
    avaliacao: number;
}

const ProfileAutor = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_AUTHOR;
    const { authorName } = useParams<{ authorName: string }>();

    const [author, setAuthor] = useState<ApiAuthor | null>(null);
    const [books, setBooks] = useState<BookForUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const ageAuthor = (yearBirth?: string, yearDeath?: string): number | null => {
        if (!yearBirth) return null;

        const birth = new Date(yearBirth).getFullYear();
        const ref = yearDeath
            ? new Date(yearDeath).getFullYear()
            : new Date().getFullYear();

        return ref - birth;
    };

    useEffect(() => {
        const fetchAuthorData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!authorName) {
                    setError("Nenhum autor especificado na URL");
                    return;
                }

                const res = await fetch(`${API_URL}/${authorName}`, {
                    headers: { "X-API-Key": API_KEY },
                });

                if (!res.ok) throw new Error(`Erro ao buscar autor (${res.status})`);

                const data: ApiResponse = await res.json();

                if (!data.author) throw new Error("Autor não encontrado");

                setAuthor(data.author);

                const mappedBooks: BookForUI[] = data.books.map((b) => ({
                    id: b.id,
                    titulo: b.title,
                    path: b.path,
                    arquivo: {
                        src: b.archive?.src ?? data.imageBook?.src ?? "",
                        alt: b.archive?.alt ?? b.title,
                    },
                    avaliacao: Number(b.rating ?? 0),
                }));

                setBooks(mappedBooks);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar dados do autor");
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorData();
    }, [authorName, API_URL, API_KEY]);

    if (loading) {
        return (
            <>
                <div className="loading-container flex flex-col justify-center items-center h-[100vh]">
                    <div className="loader h-[75px] w-[75px]"></div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="error-container bg-[var(--secondary)] text-black flex flex-col justify-center items-center min-h-[50vh] p-6">
                    <p className="text-2xl font-semibold">O Erro foi: {error}</p>
                    <RouteButton path="/home" label="Voltar à tela inicial" style={{ marginTop: "20px" }} />
                </div>
                <Footer />
            </>
        );
    }

    if (!author) {
        return (
            <>
                <Header />
                <div className="not-found-container flex flex-col items-center text-black min-h-[50vh] justify-center">
                    <p className="text-2xl">Autor não encontrado</p>
                    <RouteButton path="/home" label="Voltar à tela inicial" style={{ marginTop: "20px" }} />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-[80dvh]">
                <main className="flex justify-center items-center flex-col w-[90dvw] h-auto" style={{ marginTop: "20px" }}>
                    <div className="flex justify-center items-center flex-col">
                        <div className="bg-white w-[90dvw] h-[20dvh] flex items-center rounded-3xl shadow-2xl p-6 text-black">
                            <FontAwesomeIcon icon={faUserCircle} size="6x" color="#003631" className="ml-4 mr-6" style={{ marginLeft: "20px" }} />
                            <div style={{ marginLeft: "20px" }}>
                                <h1 className="text-2xl font-semibold">{author.name}</h1>
                                <p className="text-[14px]">
                                    Data de Nascimento:{" "}
                                    {author.yearBorn ? new Date(author.yearBorn).getFullYear() : "não informada"}
                                </p>

                                {!author.yearDeath && author.yearBorn && (
                                    <p className="text-[14px]">Idade: {ageAuthor(author.yearBorn)} anos</p>
                                )}
                                {author.yearDeath && (
                                    <p className="text-[14px]">
                                        Data de Falecimento: {new Date(author.yearDeath).getFullYear()}
                                    </p>
                                )}


                            </div>


                        </div>
                    </div>

                    <div className="w-[90dvw] text-black flex justify-center items-center flex-col" style={{ marginTop: "20px" }}>
                        <h1 className="text-4xl mb-2 ml-4">Livros do Autor</h1>
                        <div className="border-y-2 border-green-900 w-[80dvw] mb-6"></div>

                        {books.length === 0 ? (
                            <p className="text-center text-gray-600 text-xl">Nenhum livro encontrado para este autor.</p>
                        ) : (
                            <div className="grid w-[80dvw] grid-cols-2 sm:grid-cols-6 gap-4 px-4" style={{ margin: "20px" }}>
                                {books.map((book) => (
                                    <div key={book.id} className="flex flex-col items-center"
                                    >
                                        <RouteButton
                                            classe="cursor-pointer hover:scale-108 transition"
                                            path={`/catalogo/livro/${book.path ?? book.id}`}
                                            img={<BookImage src={`${book.arquivo.src}`} alt={`${book.arquivo.alt}`} style={{ height: "200px", margin: "20px" }} />}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Footer />
                    <div className="h-[10dvh]"></div>
                </main>
            </div>
        </>
    );
};

export default ProfileAutor;