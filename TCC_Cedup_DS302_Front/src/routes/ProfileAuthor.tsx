import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiAuthor, ApiBook, ApiResponse, BookForUI } from "../interfaces/AuthorInterfaces";

const ProfileAutor = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_AUTHOR;
    const { pathAuthor } = useParams<{ pathAuthor: string }>();

    const [author, setAuthor] = useState<ApiAuthor | null>(null);
    const [books, setBooks] = useState<BookForUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const ageAuthor = (yearBirth?: string, yearDeath?: string): number | null => {
        if (!yearBirth) return null;
        const birth = new Date(yearBirth).getFullYear();
        const reference = yearDeath
            ? new Date(yearDeath).getFullYear()
            : new Date().getFullYear();
        return reference - birth;
    };

    useEffect(() => {
        const fetchAuthorData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!pathAuthor) {
                    setError("Nenhum autor especificado na URL");
                    return;
                }

                const res = await fetch(`${API_URL}/${pathAuthor}`, {
                    headers: { "X-API-Key": API_KEY },
                });

                if (!res.ok) throw new Error(`Erro ao buscar autor (${res.status})`);

                const data: ApiResponse = await res.json();
                if (!data.author) throw new Error("Autor não encontrado");

                setAuthor(data.author);

                const mappedBooks: BookForUI[] = data.books.map((b: ApiBook) => ({
                    id: b.id,
                    title: b.title,
                    path: b.path,
                    image: {
                        src: b.image?.src ?? data.imageBook?.src ?? "",
                        alt: b.image?.alt ?? b.title,
                    },
                }));

                setBooks(mappedBooks);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Erro desconhecido ao buscar dados do autor");
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorData();
    }, [pathAuthor, API_URL, API_KEY]);

    // LOADING
    if (loading) {
        return (
            <>
                <Header />
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="loader h-[75px] w-[75px]"></div>
                </div>
                <Footer />
            </>
        );
    }

    // ERRO
    if (error) {
        return (
            <>
                <Header />
                <div className="bg-[var(--secondary)] text-black flex flex-col justify-center items-center min-h-[50vh] p-6">
                    <p className="text-2xl font-semibold">Erro: {error}</p>
                    <RouteButton path="/home" label="Voltar à tela inicial" style={{ marginTop: "20px" }} />
                </div>
                <Footer />
            </>
        );
    }

    // AUTOR NÃO ENCONTRADO
    if (!author) {
        return (
            <>
                <Header />
                <div className="text-black flex flex-col items-center min-h-[50vh] justify-center">
                    <p className="text-2xl">Autor não encontrado</p>
                    <RouteButton path="/home" label="Voltar à tela inicial" style={{ marginTop: "20px" }} />
                </div>
                <Footer />
            </>
        );
    }

    // RENDER PRINCIPAL
    return (
        <>
            <Header />

            <div className="flex items-center justify-center min-h-[70dvh]">
                <main className="flex flex-col w-[90dvw] items-center">

                    {/* CARD DO AUTOR */}
                    <div className="bg-white w-[90dvw] rounded-3xl shadow-2xl p-6 text-black flex gap-6 items-center" style={{padding: "20px", margin: "20px 0 0 0"}}>
                        <FontAwesomeIcon icon={faUserCircle} size="6x" color="#003631" />

                        <div>
                            <h1 className="text-3xl font-semibold">{author.name}</h1>

                            <p className="text-[14px]">
                                Nascimento:{" "}
                                {author.yearBorn
                                    ? new Date(author.yearBorn).getFullYear()
                                    : "não informado"}
                            </p>

                            {!author.yearDeath && author.yearBorn && (
                                <p className="text-[14px]">
                                    Idade: {ageAuthor(author.yearBorn)} anos
                                </p>
                            )}

                            {author.yearDeath && (
                                <p className="text-[14px]">
                                    Falecimento: {new Date(author.yearDeath).getFullYear()}
                                </p>
                            )}

                            <div className="border-gray-200 border-1 w-[90%]" style={{margin: "5px 0 5px 0"}}></div>

                            {author.description && (
                                <p className="mt-2 text-[15px] text-gray-700">
                                    {author.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* LIVROS */}
                    <div className="w-[90dvw] text-black flex flex-col items-center" style={{margin: "20px 0 0 0"}}>
                        <h1 className="text-4xl mb-2">Livros do Autor</h1>
                        <div className="border-y-2 border-green-900 w-[80dvw]"></div>

                        {books.length === 0 ? (
                            <p className="text-center text-gray-600 text-xl">
                                Nenhum livro encontrado para este autor.
                            </p>
                        ) : (
                            <div className="grid w-[80dvw] grid-cols-2 sm:grid-cols-6 gap-4 px-4" style={{margin: "20px 0 0 0"}}>
                                {books.map((book) => (
                                    <div key={book.id} className="flex flex-col items-center">
                                        <RouteButton
                                            classe="cursor-pointer hover:scale-105 transition"
                                            path={`/catalogo/livro/${book.path ?? book.id}`}
                                            img={
                                                <BookImage
                                                    src={book.image.src}
                                                    alt={book.image.src}
                                                    style={{ height: "200px", margin: "20px" }}
                                                />
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-[10dvh]"></div>
                    <Footer />
                </main>
            </div>
        </>
    );
};

export default ProfileAutor;
