import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";
import Header from "../components/Header";
import ModalEditUser from "../components/ModalEditUser";
import ModalLogOut from "../components/ModalLogOut";

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
    const [user, setUser] = useState<User| null>(null);
    const [modal, setModal] = useState(false);
    const [modalLogOut, setModalLogOut] = useState(false);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER_UNIQUE;

    const handleModal = () => setModal(!modal);

    const logOutAccountModal = () => {
        setModalLogOut(!modalLogOut)
    }

    useEffect(() => {
        const idUser = localStorage.getItem("idUser");
        const nameUser = localStorage.getItem("nameUser");
        const emailUser = localStorage.getItem("emailUser");

        if (!idUser || !nameUser || !emailUser) {
            console.warn("❌ Dados do usuário não encontrados no localStorage");
            return;
        }

        const fetchDataUser = async () => {
            try {
                const response = await fetch(`${API_URL}=${JSON.parse(idUser)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": API_KEY,
                    },
                });
                const data = await response.json();

                const updatedUser = {
                    id: JSON.parse(idUser),
                    name: JSON.parse(nameUser),
                    email: JSON.parse(emailUser),
                    booksFavorited: data.booksFavorited || [],
                }; 

                setUser(updatedUser);
                setBooks(data.booksFavorited || []);
            } catch (error) {
                console.error("Erro ao carregar os livros do back:", error);
            }
        };

        fetchDataUser();
    });

    return (
        <>
            <Header />
            <div className="flex justify-center items-center flex-col">
                <div className="ignore-margin w-[96dvw] h-[25dvh] flex items-center bg-white rounded-3xl shadow-2xl" style={{ margin: "20px" }}>
                    <FontAwesomeIcon icon={faUserCircle} style={{ marginLeft: "20px" }} size="5x" color="#003631" />
                    <div className="mr-10 w-[70dvw] text-black">
                        <h1 className="text-2xl" style={{ marginLeft: "20px" }}>{user?.name}</h1>
                        <h2 className="text-[13px]" style={{ marginLeft: "20px" }}>Email: {user?.email}</h2>
                        <button style={{ marginLeft: "20px", marginTop: "5px" }} className="primary-button" onClick={handleModal}>
                            Editar Perfil
                        </button>
                        <button className="secondary-button" style={{marginLeft: "10px"}} onClick={logOutAccountModal}>
                            Sair da Conta
                        </button>
                    </div>
                </div>

                <div className=" text-black top-35">
                    <h1 className="text-5xl" style={{ marginLeft: "20px" }}>Favoritos</h1>
                    <div className="border-y-green-900 border-2 w-[90dvw]"></div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-4 mt-6 " style={{marginTop: "24px"}}>
                        {books && books.length > 0 ? (
                            books.map((book) => (
                                <div key={book.id} className="flex flex-col items-center">
                                    {book.arquivo ? (
                                        <RouteButton
                                            path={`/catalogo/livro/${book.path}`}
                                            img={
                                                <BookImage
                                                    src={book.arquivo.src}
                                                    alt={book.title}
                                                    style={{
                                                        width: "150px",
                                                        height: "220px",
                                                        objectFit: "cover",
                                                        borderRadius: "10px",
                                                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                                    }}
                                                />
                                            }
                                        />
                                    ) : (
                                        <div className="w-[150px] h-[220px] flex items-center justify-center text-gray-500 border rounded-lg shadow-sm">
                                            Sem imagem
                                        </div>
                                    )}
                                    <RouteButton classe="cursor-pointer" path={`/catalogo/livro/${book.path}`} label={<h2 className="text-center text-sm mt-2 font-medium">{book.title}</h2>}/>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 col-span-full text-center text-lg mt-4">
                                Nenhum livro favoritado ainda.
                            </p>
                        )}
                    </div>


                    <div className="h-[10dvh]"></div>
                </div>
            </div>

            {modal && <ModalEditUser setModal={setModal} />}
            {modalLogOut && <ModalLogOut setModal={setModalLogOut} />}
            <Footer />
        </>
    );
};

export default ProfileUser;