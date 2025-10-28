import { useState, useEffect, useRef } from 'react';
import RouteButton from './RouteButton';
import BookImage from './BookImage';
import type { CSSProperties } from '@mui/material';

interface Book {
  id: string;
  titulo: string;
  arquivo: {
    src: string;
    alt: string;
  };
  path: string;
  avaliacao: number;
}

interface CarouselProps {
  minBooks: number;
  maxBooks: number;
  classe?: string;
  styles?: CSSProperties;
}

const Carousel = ({ minBooks, maxBooks, classe, styles }: CarouselProps) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          API_URL,
          {
            method: "GET",
            headers: {
              "X-API-Key": API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar livros: " + response.status);
        }

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2)); // debug
        

        if (Array.isArray(data)) {
        const mappedBooks: Book[] = data.map((item) => ({
          id: item.book?.id ?? crypto.randomUUID(),
          titulo: item.book?.title ?? "Sem título",
          arquivo: {
            // 🔹 Garante que o caminho da imagem esteja correto
            src: item.book.archive.src,
            alt: item.book?.archive?.alt ?? item.book?.title ?? "Capa",
          },
          path: item.book?.path ?? "#",
          avaliacao: item.book?.rating ?? 0,
        }));

        setBooks(mappedBooks);
      } else {
        console.warn("Formato inesperado da resposta:", data);
        setBooks([]);
      }

      } catch (error) {
        console.error("Erro ao buscar capas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [API_KEY, API_URL]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center h-[21.5dvh]" style={{margin: "30px"}}>
            <div className="loader h-[50px] w-[50px]"></div>
        </div>
      </>
    );
  }

  if (books.length === 0) {
    return <div className="text-center py-8">Nenhum livro disponível</div>;
  }

  return (
    <div
      className={`relative w-full max-w-full mx-auto my-8 px-8 ${classe}`}
      style={styles}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="carrousel relative h-[32.5dvh] overflow-hidden">
        {/* Botão esquerdo */}
        <button
          onClick={scrollLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black bg-opacity-70 text-white rounded-full flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundColor: 'var(--primary-clear)' }}
          aria-label="Scroll left"
        >
          <span className="text-2xl font-bold">&#8249;</span>
        </button>

        {/* Carrossel */}
        <div
          ref={carouselRef}
          className="flex h-[45dvh] overflow-x-auto scrollbar-hide space-x-4 py-4 px-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {books.slice(minBooks, maxBooks).map((book) => (
            <div
              key={book.id}
              className="shrink-0 w-auto rounded-2xl overflow-hidden transition-transform hover:scale-105 hover:z-10"
              style={{ scrollSnapAlign: 'start', padding: "10px" }}
            >
              <RouteButton
                img={<BookImage src={book.arquivo.src} alt={book.titulo} />}
                path={`/catalogo/livro/${book.path}`}
              />
            </div>
          ))}
        </div>

        {/* Botão direito */}
        <button
          onClick={scrollRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-opacity-70 rounded-full flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundColor: 'var(--primary-clear)' }}
          aria-label="Scroll right"
        >
          <span className="text-2xl font-bold">&#8250;</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;