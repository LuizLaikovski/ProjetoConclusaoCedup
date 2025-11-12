import { faTimes, faTrash, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import RouteButton from "./RouteButton";

interface Book {
    id: number;
    title: string;
    arquivo?: {
        src: string;
        alt: string;
    };
    path: string;
    avaliacao: number;
}

interface ModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFavorites = ({ setOpen }: ModalProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER_UNIQUE;
    const idUser = localStorage.getItem("idUser");

    useEffect(() => {
        const loadFavoritesBook = async () => {
            try {
                setLoading(true);
                setError(null);
                
                if (!idUser) {
                    setError("Usuário não identificado");
                    setLoading(false);
                    return;
                }

                console.log(`${API_URL}=${idUser}`);
                
                const response = await fetch(`${API_URL}=${JSON.parse(idUser)}`, {
                    method: "GET",
                    headers: {
                        "X-API-Key": API_KEY,
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) throw new Error("Erro na requisição: " + response.status);

                const data = await response.json();
                console.log("Dados recebidos:", data);

                if (data && Array.isArray(data.booksFavorited)) {
                    setBooks(data.booksFavorited);
                } else {
                    setBooks([]);
                }

            } catch (error) {
                console.log("Erro:", error);
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

    const handleRemoveFavorite = async (bookId: number) => {
        try {
            // Aqui você pode implementar a lógica para remover dos favoritos
            console.log("Removendo livro ID:", bookId);
            
            // Atualiza o estado localmente
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
            
            // Se tiver uma API para remover favoritos:
            // await fetch(`${API_URL_REMOVE_FAVORITE}`, {
            //     method: "DELETE",
            //     headers: {
            //         "X-API-Key": API_KEY,
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ userId: idUser, bookId })
            // });
            
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        }
    }

    return (
        <>
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Seus Livros Favoritos</h2>
                        <button className="close-button" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    
                    <div className="modal-body">
                        {loading ? (
                            <div className="loading-state">
                                <p>Carregando seus livros favoritos...</p>
                            </div>
                        ) : error ? (
                            <div className="error-state">
                                <p>{error}</p>
                            </div>
                        ) : books.length === 0 ? (
                            <div className="empty-state">
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
                                                <RouteButton path={`/catalogo/livro/${book.path}`} label={<h3 className="book-title">{book.title}</h3>} />
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
                    
                    <div className="flex justify-center items-center" style={{marginBottom: "20px"}}>
                        <div className="favorites-count">
                            {!loading && !error && (
                                <span>{books.length} {books.length === 1 ? 'livro' : 'livros'} favorito(s)</span>
                            )}
                        </div>
                        <button className="close-modal-button" onClick={closeModal} style={{marginLeft: "20px"}}>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFavorites;