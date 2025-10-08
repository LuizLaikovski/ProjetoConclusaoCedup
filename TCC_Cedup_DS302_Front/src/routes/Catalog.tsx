import { useState } from "react";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import Footer from "../components/Footer";

const Catalog = () => {
    const [minRating] = useState<number | null>(null);

    return (
        <>
            <section className="Catalog">
                <Header />
                <ListBooks minRating={minRating} />
                <Footer />
            </section>
        </>
    );
};

export default Catalog;