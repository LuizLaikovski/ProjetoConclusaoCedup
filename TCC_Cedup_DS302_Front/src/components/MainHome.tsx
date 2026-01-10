import { useEffect, useState } from 'react';
import Carousel from './Carousel';

const MainHome = () => {
    const [books, setBooks] = useState([]);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_CATALOG;

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const res = await fetch(API_URL, {
                    headers: { "X-API-Key": API_KEY }
                });

                if (!res.ok) throw new Error("Erro ao buscar livros");

                const data = await res.json();
                setBooks(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadBooks();
    }, []);
    

    return (
        <div className="flex justify-center items-center flex-col">
            <Carousel books={books} minBooks={0} maxBooks={12} />
            <Carousel books={books} minBooks={13} maxBooks={25} />
            <Carousel books={books} minBooks={26} maxBooks={38} />
            <div className="h-[7dvh] min-[900px]:hidden"></div>
        </div>
    );
};

export default MainHome;
