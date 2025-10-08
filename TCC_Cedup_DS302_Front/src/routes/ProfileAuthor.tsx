import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteButton from "../components/RouteButton";
import BookImage from "../components/BookImage";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

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

const ProfileAutor = () => {

    const [books, setBooks] = useState<Book[]>([]);
        
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

    return(
        <>
            <div className="flex justify-center items-center flex-col">
                <div className="ignore-margin w-[90dvw] h-[20dvh] flex items-center bg-white rounded-3xl shadow-2xl" style={{margin: "20px"}}>
                    <FontAwesomeIcon icon={faUserCircle} style={{marginLeft: "20px"}} size="5x" color="#003631" />
                    <div className="mr-10 text-black">
                        <h1 className="text-3xl" style={{marginLeft: "20px"}}>Luiz Henrique</h1>
                        <h2 style={{marginLeft: "20px"}}>Email: luizlaikovski@gmail.com</h2>
                    </div>
                </div>
                <div className="w-[100dvw] text-black top-35">
                    <h1 className="text-5xl" style={{marginLeft: "20px"}}>Favoritos</h1>
                    <div className="border-y-green-900 border-2 w-[100dvw]"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-7">
                        {books.slice(0, 16).map((book) => (
                            <div key={book.id}>
                                <RouteButton path={`/catalogo/livro/${book.path}`}
                                    img={<BookImage src={book.arquivo.src} alt={book.arquivo.alt} style={{height: "200px"}} />}
                                />
                            </div>
                        ))}
                    </div>

                </div>
                <Footer />
            </div>
        </>
    );
};

export default ProfileAutor