import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RouteButton from "../components/RouteButton";
import Footer from "../components/Footer";
import "./css/BooksSpecification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface BookAPIItem {
  book: {
    id: string;
    title: string;
    archive: {
      src: string;
      alt: string;
    };
    authors: string[];
    numPages?: number;
    rating?: number;
    description?: string;
  };
  authorsImages: {
    author: {
      id: string;
      name: string;
      path: string;
    };
    images: { src: string; alt: string }[];
  }[];
}

interface Book {
  id: string;
  titulo: string;
  autor: string;
  autorPath: string;
  pags?: number;
  descricao?: string;
  arquivo: {
    src: string;
    alt: string;
  };
  avaliacao: number;
  path: string;
}

const BookSpecifications = () => {
  const { bookName } = useParams<{ bookName: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  // Normaliza strings para URL amigável
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          API_URL,
          {
            headers: { "X-API-Key": API_KEY },
          }
        );
        if (!res.ok) throw new Error("Erro ao carregar os livros");

        const data: BookAPIItem[] = await res.json();

        // Mapeia os livros e pega o nome do autor correto
        const mappedBooks: Book[] = data
          .filter((item) => item.book.archive?.src)
          .map((item) => ({
            id: item.book.id,
            titulo: item.book.title,
            autor:
              item.authorsImages?.[0]?.author?.name || "Autor desconhecido",
            autorPath: item.authorsImages?.[0]?.author.name.toLowerCase().replace(/\s+/g, "-"),
            pags: item.book.numPages || 0,
            descricao: item.book.description || "Sem descrição disponível",
            arquivo: {
              src: item.book.archive.src,
              alt: item.book.archive.alt || item.book.title,
            },
            avaliacao: item.book.rating || 0,
            path: normalize(item.book.title),
          }));

        // Procura o livro pela URL
        const foundBook = mappedBooks.find(
          (b) => normalize(b.path) === normalize(bookName || "")
        );

        setBook(foundBook || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (bookName) fetchBook();
    else setLoading(false);
  }, [bookName]);

  if (loading)
    return (
        <div className="preloader">
            <div className="loader h-[75px] w-[75px]"></div>
        </div>
    );

  if (!book)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Livro não encontrado</h1>
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Voltar à tela inicial
        </button>
      </div>
    );

    // Função para renderizar as estrelas baseadas na avaliação
    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
                <FontAwesomeIcon 
                    key={index}
                    icon={faStar}
                    className="star-icon"
                    style={{
                        color: ratingValue <= rating ? "#ffc107" : "#e4e5e9",
                        height: "25px"
                    }}
                />
            );
        });
    };

  return (
        <>
            <Header />
            <main className="book-specifications-main flex justify-center items-center flex-col w-[100dvw] h-auto" style={{margin: "20px"}}>
                <div className="bg-white h-auto w-[90dvw] text-black rounded-2xl shadow-2xl flex justify-center items-center flex-col" style={{padding: "15px"}}>
                    <img src={book.arquivo.src} alt={book.arquivo.alt} className="h-50 shadow-2xl" />
                    <h1 className="text-4xl text-center">{book.titulo}</h1>
                    <div className="avaliation-starts-book">
                        {renderStars(book.avaliacao)}
                    </div>
                    <RouteButton path={`/perfilAutor/${book.autorPath}`} label={`${book.autor}`} classe="font-bold text-2xl cursor-pointer" />
                    <h1 className="sm:text-2xl">Quantidade de Páginas: {book.pags}</h1>
                </div>

                <div className="bg-white h-auto w-[90dvw] text-black rounded-2xl shadow-2xl flex justify-center items-center flex-col text-justify sm:text-[20px]" style={{padding: "15px", marginTop: "30px"}}>
                    <h1>{book.descricao}</h1>
                </div>

                <button className="primary-button w-[80dvw] text-2xl">Leia Agora</button>
                <Footer />
                <div className="h-[10dvh]"></div>
            </main>
        </>
    );
};

export default BookSpecifications;
