import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./css/BooksSpecification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ModalAssessment from "../components/ModalAssessment";
import RouteButton from "../components/RouteButton";
import ModalError from "../components/ModalError";

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
interface FavoriteBook {
  path: string;
  title: string;
  images: {
    id: string;
    src: string;
    alt: string;
  }[];
}
interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  booksFavorited: FavoriteBook[];
}


const BookSpecifications = () => {
  const { bookName } = useParams<{ bookName: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalAssessment, setModalAssessment] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [error, setError] = useState('');
  const [isFavorited, setIsFavorite] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL_FAVORITE;
  const API_URL_UNIQUE = import.meta.env.VITE_API_URL_USER_UNIQUE;
  const API_URL_UN = import.meta.env.VITE_API_URL_UNFAVORITE;
  const API_URL_BOOKS = import.meta.env.VITE_API_URL_BOOK;
  const idUser = localStorage.getItem("idUser");

  const toggleModal = () => {
    if (!idUser) {
      setError("Usuário não encontrado");
      setModalError(true);
    } else {
      setModalAssessment(!modalAssessment);
    }
  }

  // Normaliza strings para URL amigável
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

  const formatPath = (path: string) => {
    if (!path) return "";
    return path.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  }

  useEffect(() => {
    const loadData = async () => {

      try {
        const checkedBook = async (bookData: Book) => {
          const idUser = localStorage.getItem("idUser");
          if (!bookData || !idUser) return;

          try {
            const response = await fetch(`${API_URL_UNIQUE}=${idUser}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": API_KEY,
              },
            });

            if (!response.ok) throw new Error("Erro ao buscar usuario");

            const data: UserData = await response.json();

            const isBookFavorited = data.booksFavorited?.some(
              (favBook) => favBook.path === bookData.path
            );

            setIsFavorite(isBookFavorited);
          } catch (error) {
            console.error(error);
          }
        };

        const res = await fetch(`${API_URL_BOOKS}${bookName}`, {
          method: "GET",
          headers: { "X-API-Key": API_KEY },
        });

        if (!res.ok) throw new Error("Erro ao carregar os livros");

        const rawData = await res.json();

        const item = rawData;

        const mappedBook: Book = {
          id: item.book.id,
          titulo: item.book.title,
          autor: item.authorsImage?.[0]?.author?.name || "Autor desconhecido",
          autorPath: item.authorsImage?.[0]?.author?.name
            ?.toLowerCase()
            .replace(/\s+/g, "-"),
          pags: item.book.numPages || 0,
          descricao: item.book.description || "Sem descrição disponível",
          arquivo: {
            src: `/images/${formatPath(item.book.path)}.jpeg`,
            alt: item.imageBook.alt || item.book.title,
          },
          avaliacao: item.book.rating ?? 0,
          path: normalize(item.book.title),
        };


        setBook(mappedBook);
        await checkedBook(mappedBook);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (bookName) loadData();
    else setLoading(false);
  }, [bookName]);


  const favoriteBook = async () => {
    const idUser = localStorage.getItem("idUser");


    if (!book || !idUser) {
      setError("Usuário não encontrado");
      setModalError(true);
      return;
    }

    const dataJson = {
      idBook: book.id,
      idUser: idUser
    }

    try {
      await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY
        },
        body: JSON.stringify(dataJson)
      });
    } catch (error) {
      console.error("Erro ao favoritar:", error);
      setError("Error ao favoritar");
      setModalError(true);
    } finally {
      location.reload();
    }''
  };

  const unFavoriteBook = async () => {
    const idUser = localStorage.getItem("idUser");


    if (!book || !idUser) {
      setError("Usuário não encontrado");
      setModalError(true);
      return;
    }

    const dataJsonUn = {
      idBook: book.id,
      idUser: idUser
    }

    try {
      await fetch(API_URL_UN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY
        },
        body: JSON.stringify(dataJsonUn)
      })
    } catch (error) {
      console.error(error);
      setError("Error ao favoritar");
      setModalError(true);
    } finally {
      location.reload();
    }
  }


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
      <main className="min-h-screen flex flex-col justify-center items-center py-10 px-6">
        <section className="bg-white w-[90dvw] h-auto rounded-2xl shadow-2xl flex flex-col justify-center items-center lg:flex-row relative overflow-hidden" style={{ padding: "50px 50px 50px 50px", marginTop: "50px" }} data-aos="flip-up">
          <div className="lg:w-[35%] flex justify-center items-center p-8">
            {book?.arquivo?.src ? (
              <img
                src={book.arquivo.src}
                alt={book.arquivo.src}
                className="rounded-lg shadow-xl w-[250px] lg:w-[300px]"
              />
            ) : (
              <div className="w-[250px] h-[350px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p>Sem imagem</p>
              </div>
            )}

          </div>

          <div className="flex flex-col inset-y-0 left-0 items-center w-[40dvw]">
            <div className="max-sm:w-[70dvw]">
              <div className="flex flex-col items-center lg:items-start">
                <h1 className="text-4xl text-center font-bold text-black lg:text-left mb-3">
                  {book.titulo}
                </h1>

                <RouteButton
                  path={`/perfilAutor/${book.autorPath}`}
                  classe="text-[20px] cursor-pointer"
                  label={<h1>{book.autor}</h1>}
                />
              </div>

              <div className="flex justify-center lg:justify-start items-center" style={{ marginBottom: "20px", marginTop: "20px" }}>
                {renderStars(book.avaliacao)}
                <span className="ml-2 text-black font-semibold text-lg">
                  {Number(book.avaliacao).toFixed(1)}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-b border-gray-300" style={{ paddingBlock: "16px", marginBottom: "24px" }}>
                <div>
                  <p className="font-semibold text-2xl text-gray-700">Nº de páginas: {book.pags}</p>
                </div>
              </div>
            </div>

            <p className="text-justify text-[17px] leading-relaxed text-gray-800 max-sm:w-60" data-aos="fade-up">
              {book.descricao}
            </p>
          </div>

          {/* Botões laterais */}
          <div className="flex justify-center items-center">
            <div className="hidden lg:flex h-[40dvh] w-[20dvw] flex-col gap-4 right-6 top-1/3 shadow-2xl" style={{ marginLeft: "7dvw", padding: "20px" }} data-aos="fade-up">
              <a className="primary-button text-center">
                Leia Agora
              </a>
              <button className="primary-button" onClick={toggleModal}>
                Avaliar
              </button>
              <button
                className={isFavorited ? "secondary-button" : "primary-button"}
                onClick={isFavorited ? unFavoriteBook : favoriteBook}
              >
                {isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
              </button>

            </div>
          </div>
        </section>

        {/* Botões embaixo (para telas menores, até notebook) */}
        <div className="sm:hidden flex h-[35dvh] w-[80dvw]  lg:w-[20dvw] flex-col gap-4 right-6 top-1/3 lg:shadow-2xl">
          <a className="primary-button text-center" data-aos="fade-up">
            Leia Agora
          </a>
          <button className="primary-button" onClick={toggleModal} data-aos="fade-up">
            Avaliar
          </button>
          <button
            className={isFavorited ? "secondary-button" : "primary-button"}
            onClick={isFavorited ? unFavoriteBook : favoriteBook}
            data-aos="fade-up"
          >
            {isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </button>

        </div>
        <div className="sm:hidden h-[5dvh]"></div>

        {modalAssessment && (
          <ModalAssessment
            setModalAssessment={setModalAssessment}
            idBook={book.id}
          />
        )}

        {modalError && (
          <ModalError 
            setModal={setModalError}
            error={error}
          />
        )}


        <Footer />
        <div className="h-[6dvh]"></div>
      </main>
    </>
  );
};

export default BookSpecifications;