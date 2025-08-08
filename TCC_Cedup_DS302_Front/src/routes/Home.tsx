import RouteButton from "../components/RouteButton";
import "../App.css";
import './css/Home.css'
import Header from "../components/Header";
import MainHome from "../components/MainHome";
import Aside from "../components/Aside";
import { useState } from "react";
import Footer from "../components/Footer";

const Home = () => {
    const [minRating, setMinRating] = useState<number | null>(null);

    return(
        <>
            <section className="Home">
                <Header />
                <MainHome />
                <Footer />
            </section>
        </>
    );
};

export default Home;