import { useState } from "react";
import Aside from "../components/Aside";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import './css/catalog.css';

const Catalog = () => {
    const [minRating, setMinRating] = useState<number | null>(null);

    return (
        <>
            <Header />
            <Aside onRatingChange={setMinRating} currentRating={minRating} />
            <ListBooks minRating={minRating} />
        </>
    );
};

export default Catalog;