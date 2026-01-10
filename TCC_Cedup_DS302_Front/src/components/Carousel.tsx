import { useRef, useState, useEffect } from 'react';
import RouteButton from './RouteButton';
import BookImage from './BookImage';
import type { CSSProperties } from '@mui/material';
import { Book } from '../interfaces/BookInterfaces';

interface CarouselProps {
  books: Book[];
  minBooks: number;
  maxBooks: number;
  classe?: string;
  styles?: CSSProperties;
}

const Carousel = ({ books, minBooks, maxBooks, classe, styles }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);

  let isDown = false;
  let startX = 0;
  let scrollLeftPos = 0;

  const visibleBooks = books.slice(minBooks, maxBooks);

  const loopBooks = [...visibleBooks, ...visibleBooks, ...visibleBooks];

  const startDrag = (e: any) => {
    isDown = true;
    const carousel = carouselRef.current;
    if (!carousel) return;

    startX = e.pageX || e.touches?.[0].pageX;
    scrollLeftPos = carousel.scrollLeft;
  };

  const moveDrag = (e: any) => {
    if (!isDown) return;
    e.preventDefault();
    const carousel = carouselRef.current;
    if (!carousel) return;

    const x = e.pageX || e.touches?.[0].pageX;
    const walk = (x - startX) * 1.1;
    carousel.scrollLeft = scrollLeftPos - walk;

    handleLooping();
  };

  const stopDrag = () => {
    isDown = false;
  };

  const scrollLeft = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({ left: -300, behavior: 'smooth' });
    setTimeout(handleLooping, 350);
  };

  const scrollRight = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({ left: 300, behavior: 'smooth' });
    setTimeout(handleLooping, 350);
  };

  const handleLooping = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const totalWidth = carousel.scrollWidth;
    const singleWidth = totalWidth / 3;

    if (carousel.scrollLeft >= singleWidth * 2) {
      carousel.scrollLeft = singleWidth;
    }

    if (carousel.scrollLeft <= 0) {
      carousel.scrollLeft = singleWidth;
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const singleWidth = carousel.scrollWidth / 3;
      carousel.scrollLeft = singleWidth;
    }
  }, [visibleBooks.length]);

  if (!visibleBooks.length) {
    return <div className="text-center py-8">Nenhum livro disponível</div>;
  }

  return (
    <div
      className={`relative w-full overflow-hidden my-8 px-4 ${classe}`}
      style={styles}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="relative h-[32.5dvh] overflow-hidden">

        <button
          onClick={scrollLeft}
          className={`absolute text-white left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-opacity-70 rounded-full 
            flex items-center justify-center transition-opacity duration-300 opacity-100 max-lg:opacity-100`}
          style={{ backgroundColor: 'var(--primary-clear)' }}
        >
          <span className="text-2xl font-bold">&#8249;</span>
        </button>

        <div
          ref={carouselRef}
          className="flex space-x-4 py-4 px-2 overflow-x-scroll overflow-y-hidden scrollbar-none select-none touch-pan-y"
          onScroll={handleLooping}
          onMouseDown={startDrag}
          onMouseMove={moveDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={startDrag}
          onTouchMove={moveDrag}
          onTouchEnd={stopDrag}
        >

          {loopBooks.map((book, i) => (
            <div
              key={`${book.id}-${i}`}
              className="shrink-0 w-auto rounded-2xl transition-transform hover:scale-105 hover:z-10"
              style={{ scrollSnapAlign: 'start', padding: '10px' }}
            >
              <RouteButton
                img={<BookImage src={book.image.src} alt={book.archive?.alt} classe="h-[25dvh]" />}
                path={`/catalogo/livro/${book.path}`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className={`absolute text-white right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-opacity-70 rounded-full flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundColor: 'var(--primary-clear)' }}
        >
          <span className="text-2xl font-bold">&#8250;</span>
        </button>

      </div>
    </div>
  );
};

export default Carousel;
