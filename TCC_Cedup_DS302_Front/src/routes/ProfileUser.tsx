import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import { faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";
import Header from "../components/Header";

interface User {
    idUser: number,
    name: string,
    email: string,
    favoriteBooks: string[],
}

interface Book {
    id: number;
    titulo: string;
    arquivo: {
        src: string;
        alt: string;
    };
    path: string;
    avaliacao: number;
}

const ProfileUser = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    }
    
    useEffect(() => {
        const fecthBooks = async () => {
            try {
                const response = await fetch("./BooksTest.json");
                const data = await response.json();
                setBooks(data.books); 
            } catch (error) {
                console.error("Error ao carregar os livros do back:", error);
            }
        };

        fecthBooks();
    }, []);


    return (
        <>
            {/* <Header /> */}
            <div className="flex justify-center items-center flex-col">
                <div className="ignore-margin w-[90dvw] h-[20dvh] flex items-center bg-white rounded-3xl shadow-2xl" style={{margin: "20px"}}>
                    <FontAwesomeIcon icon={faUserCircle} style={{marginLeft: "20px"}} size="5x" color="#003631" />
                    <div className="mr-10 text-black">
                        <h1 className="text-3xl" style={{marginLeft: "20px"}}>Luiz Henrique</h1>
                        <h2 style={{marginLeft: "20px"}}>Email: luizlaikovski@gmail.com</h2>
                        <button style={{marginLeft: "20px", marginTop: "5px"}} className="primary-button" onClick={handleModal}>Editar Perfil</button>
                    </div>
                </div>
                <div className="w-[100dvw] text-black top-35">
                    <h1 className="text-5xl" style={{marginLeft: "20px"}}>Favoritos</h1>
                    <div className="border-y-green-900 border-2 w-[100dvw]"></div>
                    <div className="grid grid-cols-2 sm: grid-cols-7">
                        {books.slice(0, 16).map((book) => (
                            <div key={book.id}>
                                <RouteButton path={`/catalogo/livro/${book.path}`}
                                    img={<BookImage src={book.arquivo.src} alt={book.arquivo.alt} style={{height: "200px"}} />}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {modal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Ediatr seus Dados</h2>
                            <button className="close-button" onClick={handleModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body text-black">
                        </div>
                        <div className="modal-footer">
                            <button className="close-modal-button" onClick={handleModal}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default ProfileUser;