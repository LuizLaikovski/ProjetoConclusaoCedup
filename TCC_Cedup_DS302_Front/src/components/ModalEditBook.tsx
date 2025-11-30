import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { EditBook } from "../interfaces/BookInterfaces";
import { useNavigate } from "react-router-dom";

interface ModalEditBookProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    bookId: string;
    bookTitle: string;
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

const ModalEditBook = ({ setModal, bookId, bookTitle }: ModalEditBookProps) => {
    const navigate = useNavigate();

    const [bookUpdate, setBookUpdate] = useState<EditBook>({
        id: bookId,
        title: "",
        path: "",
        numPages: undefined,
        yearPublished: null,
        description: "",
        archive: { src: "", alt: "" },
        image: { src: "", alt: "" }
    });

    const API_URL = import.meta.env.VITE_API_URL_BOOK_EDIT;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const closeModal = () => setModal(false);

    const editBook = async (bookId: string) => {
        try {
            const bodyData: any = { id: bookId };

            if (bookUpdate.title?.trim()) {
                bodyData.title = bookUpdate.title;
                bodyData.path = normalize(bookUpdate.title);
            }

            if (bookUpdate.numPages && bookUpdate.numPages > 0) {
                bodyData.numPages = bookUpdate.numPages;
            }

            if (bookUpdate.yearPublished instanceof Date && !isNaN(bookUpdate.yearPublished.getTime())) {
                bodyData.yearPublished = bookUpdate.yearPublished.toISOString();
            }

            if (bookUpdate.description?.trim()) {
                bodyData.description = bookUpdate.description;
            }

            if (bookUpdate.archive && (bookUpdate.archive.src.trim() || bookUpdate.archive.alt.trim())) {
                bodyData.archive = {};
                if (bookUpdate.archive.src.trim()) bodyData.archive.src = bookUpdate.archive.src;
                if (bookUpdate.archive.alt.trim()) bodyData.archive.alt = bookUpdate.archive.alt;
            }

            if (bookUpdate.image && (bookUpdate.image.src.trim() || bookUpdate.image.alt.trim())) {
                bodyData.image = {};
                if (bookUpdate.image.src.trim()) bodyData.image.src = bookUpdate.image.src;
                if (bookUpdate.image.alt.trim()) bodyData.image.alt = bookUpdate.image.alt;
            }

            await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify(bodyData)
            });

            setModal(false);
            if (bookUpdate.title.trim()) navigate(`/catalogo/livro/${normalize(bookUpdate.title)}`);
            location.reload();
        } catch (error) {
            alert(`Houve um erro: ${error}`);
        }
    };

    // formatar date para input
    const formatDate = (date: Date | null) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
            <div className="modal-content bg-white rounded-2xl shadow-xl w-[90dvw] p-6 relative" data-aos="zoom-in-up" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header flex justify-between items-center mb-4">
                    <h2>Editar <strong>{bookTitle}</strong></h2>
                    <button onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} color="white" />
                    </button>
                </div>

                <div className="modal-body flex flex-col gap-3 text-center text-black">

                    <input
                        type="text"
                        placeholder="Título"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                        value={bookUpdate.title}
                        onChange={(e) => setBookUpdate({ ...bookUpdate, title: e.target.value })}
                    />

                    <input
                        type="number"
                        placeholder="Número de páginas"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                        value={bookUpdate.numPages ?? ""}
                        onChange={(e) =>
                            setBookUpdate({ ...bookUpdate, numPages: Number(e.target.value) || undefined })
                        }
                    />

                    <input
                        type="date"
                        placeholder="Ano de publicação"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                        value={formatDate(bookUpdate.yearPublished || new Date())}
                        onChange={(e) =>
                            setBookUpdate({
                                ...bookUpdate,
                                yearPublished: e.target.value ? new Date(e.target.value) : null
                            })
                        }
                    />

                    <textarea
                        placeholder="Descrição"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                        value={bookUpdate.description ?? ""}
                        onChange={(e) => setBookUpdate({ ...bookUpdate, description: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Imagem SRC"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                        value={bookUpdate.image?.src ?? ""}
                        onChange={(e) =>
                            setBookUpdate({ ...bookUpdate, image: { ...bookUpdate.image!, src: e.target.value } })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Imagem ALT"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                        value={bookUpdate.image?.alt ?? ""}
                        onChange={(e) =>
                            setBookUpdate({ ...bookUpdate, image: { ...bookUpdate.image!, alt: e.target.value } })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Arquivo SRC"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                        value={bookUpdate.archive?.src ?? ""}
                        onChange={(e) =>
                            setBookUpdate({ ...bookUpdate, archive: { ...bookUpdate.archive!, src: e.target.value } })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Arquivo ALT"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                        value={bookUpdate.archive?.alt ?? ""}
                        onChange={(e) =>
                            setBookUpdate({ ...bookUpdate, archive: { ...bookUpdate.archive!, alt: e.target.value } })
                        }
                    />
                </div>

                <div className="modal-footer flex justify-end mt-6 gap-3">
                    <button className="secondary-button" onClick={closeModal}>Sair</button>
                    <button onClick={() => editBook(bookId)} className="primary-button">Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditBook;
