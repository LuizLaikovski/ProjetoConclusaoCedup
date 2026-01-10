import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const Catalog = () => {
    const [books, setBooks] = useState([]);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_CATALOG;

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const res = await fetch(API_URL, {
                    headers: { "X-API-Key": API_KEY }
                });

                if (!res.ok) throw new Error("Erro ao carregar livros");

                const data = await res.json();
                setBooks(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadBooks();
    }, []);

    return (
        <>
            <section className="Catalog">
                <Header />

                <Carousel books={books} minBooks={0} maxBooks={9} styles={{ marginBottom: '15px', marginTop: '15px' }} />
                <Carousel books={books} minBooks={10} maxBooks={19} styles={{ marginBottom: '15px', marginTop: '15px' }} />
                <Carousel books={books} minBooks={20} maxBooks={29} styles={{ marginBottom: '15px', marginTop: '15px' }} />

                <Footer />
            </section>
        </>
    );
};

export default Catalog;