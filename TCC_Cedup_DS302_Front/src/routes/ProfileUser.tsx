import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";
import Header from "../components/Header";
import ModalEditUser from "../components/ModalEditUser";
import ModalLogOut from "../components/ModalLogOut";
import { Book } from "../interfaces/BookInterfaces";


const ProfileUser = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [modal, setModal] = useState(false);
    const [modalLogOut, setModalLogOut] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [dark, setDark] = useState(false);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER_UNIQUE;

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

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

        const updateProfile = () => {
            setName(localStorage.getItem("nameUser") || '');
            setEmail(localStorage.getItem("emailUser") || '');
        }

        const fetchDataUser = async () => {
            try {
                const response = await fetch(`${API_URL}=${idUser}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": API_KEY,
                    },
                });

                if (!response.ok) throw new Error("Erro interno")

                const data = await response.json();

                if (data.typeUser === "admin") {
                    setAdmin(true);
                }

                const books = data.booksFavorited.map((book: Book) => {
                    return {
                        id: book.id,
                        path: book.path,
                        title: book.title,
                        image: {
                            src: book.image?.src,
                            alt: book.archive?.alt || "",
                        }
                    };
                });

                setBooks(books);
            } catch (error) {
                console.error("Erro ao carregar os livros do back:", error);
            }
        };
        fetchDataUser();

        window.addEventListener("storage", updateProfile);
        updateProfile();

        return () => window.removeEventListener("storage", updateProfile);

    }, []);

    return (
        <>
            <Header />
            <div className="flex justify-center items-center flex-col ">
                <div className="ignore-margin w-[96dvw] h-[32dvh] flex items-center bg-white rounded-3xl shadow-2xl" data-aos="zoom-in-down" style={{ margin: "20px" }}>
                    <FontAwesomeIcon icon={faUserCircle} style={{ marginLeft: "20px" }} size="5x" color="#003631" />
                    <div className="mr-10 w-[70dvw]">
                        <h1 className="text-2xl" style={{ marginLeft: "20px" }}>{name}</h1>
                        <h2 className="text-[13px]" style={{ marginLeft: "20px" }}>Email: {email}</h2>
                        <div className="overflow-hidden flex flex-col h-[20dvh] w-[70dvw]" style={{ padding: "0 0 0 0" }}>
                            {/* <button style={{ margin: "20px 15px -10px 20px" }} className="secondary-button" onClick={() => setDark(!dark)}>
                                {dark ? 'Modo Claro' : 'Modo Escuro'}
                            </button> */}
                            <button style={{ margin: "20px 15px 0 20px" }} className="primary-button" onClick={handleModal}>
                                Editar Perfil
                            </button>
                            <button style={{ margin: "10px 15px 0 20px" }} className="secondary-button" onClick={logOutAccountModal}>
                                Sair da Conta
                            </button>
                        </div>
                    </div>
                </div>

                <main className=" top-35">

                    {admin && (
                        <div>
                            <RouteButton
                                classe="cursor-pointer bg-[var(--primary-clear)] hover:bg-[var(--primary)] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center"
                                style={{ padding: "10px" }}
                                path="/newBook"
                                img={<span>Adicionar Livro</span>}
                            />
                        </div>
                    )}



                    <h1 className="text-5xl text-[var(--text-color)]" style={{ marginLeft: "20px" }}>Favoritos</h1>
                    <div className="border-y-green-900 border-2 w-[90dvw]"></div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-4 mt-6 " style={{ marginTop: "24px" }}>
                        {books && books.length > 0 ? (
                            books.map((book) => (
                                <div key={book.id} data-aos="zoom-in-up" className="flex flex-col items-center">
                                    {book.image ? (
                                        <RouteButton
                                            classe="cursor-pointer"
                                            path={`/catalogo/livro/${book.path}`}
                                            img={
                                                <BookImage
                                                    src={book.image?.src}
                                                    alt={book.title}
                                                    style={{
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
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 col-span-full text-center text-lg mt-4">
                                Nenhum livro favoritado ainda.
                            </p>
                        )}
                    </div>


                    <div className="h-[13dvh]"></div>
                </main>
            </div>

            {modal && <ModalEditUser setModal={setModal} />}
            {modalLogOut && <ModalLogOut setModal={setModalLogOut} />}
            <Footer />
        </>
    );
};

export default ProfileUser;