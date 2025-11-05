import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";
import Header from "../components/Header";
import ModalEditUser from "../components/ModalEditUser";

interface Book {
    id: number;
    title: string;
    arquivo?: { // 👈 agora opcional
        src: string;
        alt: string;
    };
    path: string;
    avaliacao: number;
}

interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    booksFavorited?: Book[];
}

const ProfileUser = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [modal, setModal] = useState(false);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER_UNIQUE;

    const handleModal = () => setModal(!modal);

    useEffect(() => {
        const idUser = localStorage.getItem("idUser");
        const nameUser = localStorage.getItem("nameUser");
        const emailUser = localStorage.getItem("emailUser");

        const fetchDataUser = async () => {
            try {
                const response = await fetch(`${API_URL}=${idUser}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": API_KEY,
                    },
                });
                const data = await response.json();

                if (idUser && nameUser && emailUser) {
                    setUser({
                        id: idUser,
                        name: nameUser,
                        email: emailUser,
                        booksFavorited: data.booksFavorited || [],
                    });
                }

                setBooks(data.booksFavorited);
                console.log(data.booksFavorited);
            } catch (error) {
                console.error("Erro ao carregar os livros do back:", error);
            }
        };

        fetchDataUser();
    }, []);

    return (
        <>
            <Header />
            <div className="flex justify-center items-center flex-col">
                <div className="ignore-margin w-[90dvw] h-[20dvh] flex items-center bg-white rounded-3xl shadow-2xl" style={{ margin: "20px" }}>
                    <FontAwesomeIcon icon={faUserCircle} style={{ marginLeft: "20px" }} size="5x" color="#003631" />
                    <div className="mr-10 text-black">
                        <h1 className="text-3xl" style={{ marginLeft: "20px" }}>{user?.name}</h1>
                        <h2 style={{ marginLeft: "20px" }}>Email: {user?.email}</h2>
                        <button style={{ marginLeft: "20px", marginTop: "5px" }} className="primary-button" onClick={handleModal}>
                            Editar Perfil
                        </button>
                    </div>
                </div>

                <div className="w-[100dvw] text-black top-35">
                    <h1 className="text-5xl" style={{ marginLeft: "20px" }}>Favoritos</h1>
                    <div className="border-y-green-900 border-2 w-[100dvw]"></div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 p-4" style={{ marginTop: "20px" }}>
                        {books.slice(0, 16).map((book) => (
                            <div key={book.id}>
                                {book.arquivo ? (
                                    <RouteButton
                                        path={`/catalogo/livro/${book.path}`}
                                        img={<BookImage src={book.arquivo.src} alt={book.title} style={{ height: "100px" }} />}
                                    />
                                ) : (
                                    <div className="text-gray-500 text-center p-4 border rounded-lg">
                                        Sem imagem
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="h-[10dvh]"></div>
                </div>
            </div>

            {modal && <ModalEditUser setModal={setModal} />}
            <Footer />
        </>
    );
};

export default ProfileUser;
