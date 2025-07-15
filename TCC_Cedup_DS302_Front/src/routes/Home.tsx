import RouteButton from "../components/RouteButton";
import "../App.css";
import './css/Home.css'
import Header from "../components/Header";
import MainHome from "../components/MainHome";
import Aside from "../components/Aside";
import { useState } from "react";

const Home = () => {
    const [minRating, setMinRating] = useState<number | null>(null);

    return(
        <>
            <section className="Home">
                <Header />
                <Aside onRatingChange={setMinRating} currentRating={minRating} />
                <MainHome />
            </section>
        </>
    );
};

export default Home;