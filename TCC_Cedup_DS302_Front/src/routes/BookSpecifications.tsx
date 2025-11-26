import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalAssessment from "../components/ModalAssessment";
import RouteButton from "../components/RouteButton";
import ModalError from "../components/ModalError";
import RenderStars from "../components/RenderStars";
import { Book } from "../interfaces/BookInterfaces";
import { UserData } from "../interfaces/UserInterfaces";

const BookSpecifications = () => {
  const { bookName } = useParams<{ bookName: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [pathAuthor, setPathAuthor] = useState<string>("");
  const [nameAuthor, setNameAuthor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [modalAssessment, setModalAssessment] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [error, setError] = useState("");
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
  };

  const normalize = (str: any) => {
    if (typeof str !== "string") return "";
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };


  useEffect(() => {
    const loadData = async () => {
      try {
        const checkFavorite = async (bookData: Book) => {
          if (!idUser) return;

          const response = await fetch(`${API_URL_UNIQUE}=${idUser}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": API_KEY,
            },
          });

          if (!response.ok) throw new Error("Erro ao buscar usuário");

          const data: UserData = await response.json();

          const isFav = data.booksFavorited?.some(
            (fav) => fav.path === bookData.path
          );

          setIsFavorite(isFav);
        };

        const res = await fetch(`${API_URL_BOOKS}${bookName}`, {
          method: "GET",
          headers: { "X-API-Key": API_KEY },
        });

        if (!res.ok) throw new Error("Erro ao carregar livro");

        const raw = await res.json();
        setBook(raw.book);

        const authorName = raw.authors?.[0].path || "";
        console.log(authorName);

        // gera url amigável usando seu normalize
        setPathAuthor(normalize(authorName));
        setNameAuthor(raw.authors?.[0].name);

        await checkFavorite(raw.book);
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
    if (!book || !idUser) {
      setError("Usuário não encontrado");
      setModalError(true);
      return;
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify({
          idBook: book.id,
          idUser: idUser,
        }),
      });
    } finally {
      location.reload();
    }
  };

  const unFavoriteBook = async () => {
    if (!book || !idUser) {
      setError("Usuário não encontrado");
      setModalError(true);
      return;
    }

    try {
      await fetch(API_URL_UN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify({
          idBook: book.id,
          idUser: idUser,
        }),
      });
    } finally {
      location.reload();
    }
  };

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

  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col justify-center items-center py-10 px-6">
        <section
          className="bg-white w-[90dvw] h-auto rounded-2xl shadow-2xl flex flex-col justify-center items-center lg:flex-row relative overflow-hidden"
          style={{ padding: "50px" }}
          data-aos="flip-up"
        >
          <div className="lg:w-[35%] flex justify-center items-center p-8">
            {book.image?.src ? (
              <img
                src={book.image.src}
                alt={book.image.alt}
                className="rounded-lg shadow-xl w-[250px] lg:w-[300px]"
              />
            ) : (
              <div className="w-[250px] h-[350px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p>{book.image.src}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col inset-y-0 left-0 items-center w-[40dvw]">
            <div className="max-sm:w-[70dvw]">
              <div className="flex flex-col items-center lg:items-start">
                <h1 className="text-4xl text-center font-bold text-black lg:text-left mb-3">
                  {book.title}
                </h1>
                {pathAuthor && (
                  <RouteButton
                    path={`/perfilAutor/${pathAuthor}`}
                    classe="text-[20px] cursor-pointer hover:shadow-2xl transition px-3 py-1 rounded-full bg-gray-200"
                    style={{padding: "5px 15px 5px 15px"}}
                    label={<h1>{nameAuthor}</h1>}
                  />
                )}
              </div>

              <div
                className="flex justify-center lg:justify-start items-center"
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                {RenderStars(book.rating || 0)}
                <span className="ml-2 text-black font-semibold text-lg">
                  {Number(book.rating).toFixed(1)}
                </span>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-b border-gray-300"
                style={{ paddingBlock: "16px", marginBottom: "24px" }}
              >
                <div>
                  <p className="font-semibold text-2xl text-gray-700">
                    Nº de páginas: {book.numPages}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-2xl text-gray-700">
                    Ano de Publicação: {book.yearPublished ? new Date(book.yearPublished).getFullYear() : ""}
                  </p>
                </div>
              </div>
            </div>

            <p
              className="text-justify text-[17px] leading-relaxed text-gray-800 max-sm:w-60"
              data-aos="fade-up"
            >
              {book.description}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div
              className="hidden lg:flex h-[40dvh] w-[20dvw] flex-col gap-4 right-6 top-1/3 shadow-2xl"
              style={{ marginLeft: "7dvw", padding: "20px" }}
              data-aos="fade-up"
            >
              <a className="primary-button text-center" href={book.archive.src} target="blank">Leia Agora</a>

              <button className="primary-button" onClick={toggleModal}>
                Avaliar
              </button>

              <button
                className={isFavorited ? "secondary-button" : "primary-button"}
                onClick={isFavorited ? unFavoriteBook : favoriteBook}
              >
                {isFavorited
                  ? "Remover dos Favoritos"
                  : "Adicionar aos Favoritos"}
              </button>
            </div>
          </div>
        </section>

        <div className="sm:hidden flex h-[41dvh] w-[80dvw] flex-col gap-4">
          <a className="primary-button text-center">Leia Agora</a>

          <button className="primary-button" onClick={toggleModal}>
            Avaliar
          </button>

          <button
            className={isFavorited ? "secondary-button" : "primary-button"}
            onClick={isFavorited ? unFavoriteBook : favoriteBook}
          >
            {isFavorited
              ? "Remover dos Favoritos"
              : "Adicionar aos Favoritos"}
          </button>
          <div className="h-[6dvh]"></div>
        </div>

        {modalAssessment && (
          <ModalAssessment setModalAssessment={setModalAssessment} idBook={book.id} />
        )}

        {modalError && (
          <ModalError setModal={setModalError} error={error} />
        )}

        <Footer />
      </main>
    </>
  );
};

export default BookSpecifications;