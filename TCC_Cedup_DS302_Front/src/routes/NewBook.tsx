import { useState } from "react";
import { newBook } from "../interfaces/BookInterfaces";
import { newAuthor } from "../interfaces/AuthorInterfaces";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

interface NewBookAPI {
    book: newBook;
    authors: newAuthor[];
}

const normalize = (str: any) => {
    if (typeof str !== "string") return "";
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/-+/g, "-");
};

export default function NewBookForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [numPages, setNumPages] = useState<number | undefined>(undefined);
    const [yearPublished, setYearPublished] = useState<Date | null>(null);
    const [description, setDescription] = useState("");

    const [imageSrc, setImageSrc] = useState("");
    const [imageAlt, setImageAlt] = useState("");

    const [archiveSrc, setArchiveSrc] = useState("");
    const [archiveAlt, setArchiveAlt] = useState("");

    const [authorsData, setAuthorsData] = useState<newAuthor>({
        name: "",
        yearBorn: null,
        yearDeath: null,
        description: "",
        path: ""
    });

    const [authors, setAuthors] = useState<newAuthor[]>([]);

    const API_URL = import.meta.env.VITE_API_URL_CREATE_BOOK;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!title.trim()) return alert("Título vazio!");

            const newBookData: NewBookAPI = {
                book: {
                    title,
                    path: normalize(title),
                    numPages,
                    rating: 0,
                    yearPublished,
                    description,
                    archive: {
                        src: archiveSrc,
                        alt: archiveAlt,
                    },
                    image: {
                        src: imageSrc,
                        alt: imageAlt,
                    },
                },
                authors: authors,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify(newBookData),
            });

            if (!response.ok) alert(`Erro ao criar o livro: ${response.statusText}`);

            navigate('/');
        } catch (error) {
            console.error("Error creating new book:", error);
            alert("Erro ao criar o livro.");
        }

    };

    return (
        <>
            <Header />
            <main className="min-h-screen flex justify-center items-center" style={{ padding: "2x" }}>
                <section
                    className="bg-white w-full max-w-[1300px] rounded-2xl shadow-xl flex flex-col lg:flex-row gap-10 border border-gray-200"
                    style={{ padding: "20px" }}
                >
                    {/* LADO ESQUERDO */}
                    <div
                        className="lg:w-[35%] flex flex-col items-center gap-6 w-full bg-gray-50 rounded-xl shadow-inner"
                        style={{ padding: "40px" }}
                    >
                        <h2 className="text-2xl font-extrabold text-gray-800">Imagem do Livro</h2>

                        <input
                            type="text"
                            placeholder="URL da imagem"
                            className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            style={{ padding: "10px" }}
                            value={imageSrc}
                            onChange={(e) => setImageSrc(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Texto alt"
                            className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            style={{ padding: "10px" }}
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                        />

                        <h2 className="font-bold text-xl mt-4">Adicionar Autor</h2>

                        <input
                            type="text"
                            placeholder="Nome do autor"
                            className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            style={{ padding: "10px" }}
                            value={authorsData.name}
                            onChange={(e) =>
                                setAuthorsData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                    path: normalize(e.target.value)
                                }))
                            }
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <input
                                type="date"
                                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                style={{ padding: "10px" }}
                                onChange={(e) =>
                                    setAuthorsData((prev) => ({
                                        ...prev,
                                        yearBorn: e.target.value ? new Date(e.target.value) : null
                                    }))
                                }
                            />

                            <input
                                type="date"
                                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                style={{ padding: "10px" }}
                                onChange={(e) =>
                                    setAuthorsData((prev) => ({
                                        ...prev,
                                        yearDeath: e.target.value ? new Date(e.target.value) : null
                                    }))
                                }
                            />
                        </div>

                        <textarea
                            placeholder="Descrição do autor"
                            className="border rounded-lg w-full p-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            style={{ padding: "10px" }}
                            rows={3}
                            value={authorsData.description ?? ""}
                            onChange={(e) =>
                                setAuthorsData((prev) => ({ ...prev, description: e.target.value }))
                            }
                        />

                        <button
                            type="button"
                            className="secondary-button w-full"
                            onClick={() => {
                                if (!authorsData.name.trim()) return;
                                setAuthors((prev) => [...prev, { ...authorsData }]);
                                setAuthorsData({
                                    name: "",
                                    yearBorn: null,
                                    yearDeath: null,
                                    description: "",
                                    path: ""
                                });
                            }}
                        >
                            Adicionar Autor
                        </button>

                        {authors.length > 0 && (
                            <ul className="text-sm list-disc ml-6 mt-2 w-full text-gray-700">
                                {authors.map((a, i) => (
                                    <li key={i}>{a.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* FORM PRINCIPAL */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6 w-full lg:w-[60%] px-2"
                    >
                        <h1 className="text-3xl font-extrabold text-center text-gray-800">Criar Novo Livro</h1>

                        <input
                            type="text"
                            placeholder="Título"
                            className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            style={{ padding: "10px" }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-gray-200 py-4">
                            <input
                                type="number"
                                placeholder="Número de páginas"
                                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 transition"
                                style={{ padding: "10px" }}
                                value={numPages ?? ""}
                                onChange={(e) =>
                                    setNumPages(e.target.value ? Number(e.target.value) : undefined)
                                }
                            />

                            <input
                                type="date"
                                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 transition"
                                style={{ padding: "10px" }}
                                onChange={(e) =>
                                    setYearPublished(e.target.value ? new Date(e.target.value) : null)
                                }
                            />
                        </div>

                        <textarea
                            placeholder="Descrição"
                            className="border border-gray-300 rounded-lg w-full p-3 text-lg focus:ring-2 focus:ring-blue-500 transition"
                            style={{ padding: "10px" }}
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div className="flex flex-col gap-2">
                            <h2 className="font-semibold text-gray-700">Arquivo do Livro</h2>

                            <input
                                type="text"
                                placeholder="URL do arquivo"
                                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 transition"
                                style={{ padding: "10px" }}
                                value={archiveSrc}
                                onChange={(e) => setArchiveSrc(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Texto alt do arquivo"
                                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 transition"
                                style={{ padding: "10px" }}
                                value={archiveAlt}
                                onChange={(e) => setArchiveAlt(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Salvar Livro
                        </button>
                    </form>
                    <div className="min-h-[7dvh]"></div>
                </section>
            </main>
            <Footer />
        </>
    );
}
