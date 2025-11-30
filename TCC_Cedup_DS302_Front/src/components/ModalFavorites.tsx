import { faTimes, faTrash, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import RouteButton from "./RouteButton";
import { Book } from "../interfaces/BookInterfaces";


interface ModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFavorites = ({ setOpen }: ModalProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER_UNIQUE;
    const API_URL_UNFAVORITE = import.meta.env.VITE_API_URL_UNFAVORITE;
    const idUser = localStorage.getItem("idUser");

    useEffect(() => {
        const loadFavoritesBook = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!idUser) {
                    setError("O login não foi efetuado!");
                    setLoading(false);
                    return;
                }


                const response = await fetch(`${API_URL}=${idUser}`, {
                    method: "GET",
                    headers: {
                        "X-API-Key": API_KEY,
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) throw new Error("Erro na requisição: " + response.status);

                const data = await response.json();

                if (data && Array.isArray(data.booksFavorited)) {
                    setBooks(data.booksFavorited);
                } else {
                    setBooks([]);
                }

            } catch (error) {
                console.error("Erro:", error);
                setError("Erro ao carregar livros favoritos: " + error);
            } finally {
                setLoading(false);
            }
        };

        loadFavoritesBook();
    }, [API_KEY, API_URL, idUser]);

    const closeModal = () => {
        setOpen(false);
    }

    const handleRemoveFavorite = async (bookId: string) => {
        try {
            const response = await fetch(`${API_URL_UNFAVORITE}`, {
                method: "POST",
                headers: {
                    "X-API-Key": API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idUser: idUser, idBook: bookId }),
            });

            if (!response.ok) throw new Error("Erro na requisição");
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        } finally {
            setOpen(false);
        }
    }

    return (
        <>
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content w-[80vw] max-w-[500px]" data-aos="zoom-in-up" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Seus Livros Favoritos</h2>
                        <button className="close-button" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <div className="modal-body">
                        {loading ? (
                            <div className="loading-state">
                                <p className="text-black">Carregando seus livros favoritos...</p>
                            </div>
                        ) : error ? (
                            <div className="error-state">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : books.length === 0 ? (
                            <div className="empty-state text-black">
                                <FontAwesomeIcon icon={faBook} className="empty-icon" />
                                <p>Nenhum livro favorito encontrado</p>
                                <span>Adicione livros aos favoritos para vê-los aqui!</span>
                            </div>
                        ) : (
                            <div className="favorites-list">
                                {books.map((book) => (
                                    <div key={book.id} className="favorite-item">
                                        <div className="book-content">
                                            <div className="book-info">
                                                <RouteButton classe="cursor-pointer" path={`/catalogo/livro/${book.path}`} label={<h3 className="book-title text-black">{book.title}</h3>} />
                                            </div>
                                        </div>
                                        <button
                                            className="remove-favorite"
                                            onClick={() => handleRemoveFavorite(book.id)}
                                            title="Remover dos favoritos"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center items-center" style={{ marginBottom: "20px" }}>
                        <div className="favorites-count">
                            {!loading && !error && (
                                <span className="text-black">{books.length} {books.length === 1 ? 'livro' : 'livros'} favorito(s)</span>
                            )}
                        </div>
                        <button className="close-modal-button" onClick={closeModal} style={{ marginLeft: "20px" }}>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFavorites;