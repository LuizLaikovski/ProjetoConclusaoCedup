import RouteButton from "../components/RouteButton";
import "../App.css";
import './css/Home.css'
import Header from "../components/Header";
import Aside from "../components/Aside";

const Home = () => {
    return(
        <>
            <section className="Home">
                <Header />
                <Aside />
                <h1>HOME</h1>
                <RouteButton label="catalogo" path="/home/catalogo" />
                <RouteButton label="livro" path="/home/catalogo/livro" />
                <RouteButton label="cadastro" path="/cadastro" />
            </section>
        </>
    );
};

export default Home;