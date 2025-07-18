import { useState } from "react";
import Aside from "../components/Aside";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import './css/catalog.css';
import Footer from "../components/Footer";

const Catalog = () => {
    const [minRating, setMinRating] = useState<number | null>(null);

    return (
        <>
            <section className="Catalog">
                <Header />
                <Aside onRatingChange={setMinRating} currentRating={minRating} />
                <ListBooks minRating={minRating} />
                <Footer />
            </section>
        </>
    );
};

export default Catalog;