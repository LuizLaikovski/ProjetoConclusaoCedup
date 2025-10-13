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

interface ApiAuthorObj {
    id: string;
    name: string;
    yearBorn?: string | null;
    yearDeath?: string | null;
    description?: string | null;
    path?: string | null;
    // outros campos que o backend tiver...
}

interface AuthorsImagesItem {
    author: ApiAuthorObj;
    images: ApiImage[];
    }

interface ApiItem {
    book: {
        id: string;
        title: string;
        path?: string | null;
        numPages?: number;
        rating?: number;
        description?: string;
        authors?: string[]; // array de author ids (strings)
        archive?: { src?: string; alt?: string };
    };
    imagesBook?: ApiImage[];
    authorsImages?: AuthorsImagesItem[];
}

interface BookForUI {
    id: string;
    titulo: string;
    path?: string | null;
    arquivo: { src?: string; alt?: string };
    avaliacao?: number;
    authors?: string[]; // ids
}

const normalize = (s?: string) =>
    (s ?? "")
        .normalize?.("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/gi, "")
        .toLowerCase();

const ProfileAutor = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL;
    const { authorName } = useParams<{ authorName: string }>();

    const [author, setAuthor] = useState<ApiAuthorObj | null>(null);
    const [books, setBooks] = useState<BookForUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthorData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!authorName) {
                    setError("Nenhum autor especificado na URL");
                    return;
                }

                const res = await fetch(API_URL, {
                    headers: API_KEY ? { "X-API-Key": API_KEY } : undefined,
                });

                if (!res.ok) throw new Error(`Erro ao buscar dados dos autores (${res.status})`);

                const items: ApiItem[] = await res.json();

                let foundAuthor: ApiAuthorObj | null = null;
                let foundAuthorId: string | null = null;

                for (const item of items) {
                    if (!item.authorsImages || !Array.isArray(item.authorsImages)) continue;

                    const match = item.authorsImages.find((ai) => {
                        const candidate = ai?.author?.name ?? ai?.author?.path ?? ai?.author?.id;
                        return normalize(candidate) === normalize(authorName);
                    });

                    if (match?.author) {
                        foundAuthor = match.author;
                        foundAuthorId = match.author.id;
                        break;
                    }
                }

                if (!foundAuthor || !foundAuthorId) {
                    throw new Error("Autor não encontrado");
                }

                setAuthor(foundAuthor);

                // agora constrói lista de livros (filtrando todos os itens cujo book.authors inclui foundAuthorId)
                const authorBooks: BookForUI[] = items
                .filter((it) => Array.isArray(it.book?.authors) && it.book.authors.includes(foundAuthorId!))
                .map((it) => ({
                    id: it.book.id,
                    titulo: it.book.title,
                    path: it.book.path ?? undefined,
                    arquivo: {
                    src: it.book.archive?.src ?? it.imagesBook?.[0]?.src ?? "",
                    alt: it.book.archive?.alt ?? it.book.title ?? "",
                    },
                    avaliacao: it.book.rating,
                    authors: it.book.authors,
                }));

                setBooks(authorBooks);
            } catch (err) {
                console.error("Erro ao carregar os dados:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorName]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="loading-container flex flex-col justify-center items-center h-[60vh]">
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
        <main className="flex justify-center items-center flex-col w-[100dvw] h-auto" style={{ margin: "20px" }}>
            <div className="bg-white w-[90dvw] h-auto flex items-center rounded-3xl shadow-2xl p-6 text-black mb-10">
                <FontAwesomeIcon icon={faUserCircle} size="6x" color="#003631" className="ml-4 mr-6" />
                <div>
                    <h1 className="text-3xl font-semibold">{author.name}</h1>
                    {author.yearBorn && <p>Nascimento: {author.yearBorn}</p>}
                    {author.yearDeath && <p>Falecimento: {author.yearDeath}</p>}
                    {author.description && <p className="mt-3">{author.description}</p>}
                </div>
            </div>

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
                                path={`/catalogo/livro/${book.path ?? book.id}`}
                                img={<BookImage src={`${book.arquivo.src}`} alt={`${book.arquivo.alt}`} style={{ height: "200px" }} />}
                            />
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
