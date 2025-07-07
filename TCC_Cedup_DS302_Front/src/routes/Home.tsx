import RouteButton from "../components/RouteButton";
import "../App.css";
import './css/Home.css'
import Header from "../components/Header";
import MainHome from "../components/MainHome";

const Home = () => {
    return(
        <>
            <section className="Home">
                <Header />
                <MainHome />
            </section>
        </>
    );
};

export default Home;