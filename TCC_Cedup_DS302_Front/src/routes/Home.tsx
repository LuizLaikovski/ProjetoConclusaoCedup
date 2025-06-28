import RouteButton from "../components/RouteButton";
import "../App.css";
import Header from "../components/Header";

const Home = () => {
    return(
        <>
            <Header  />
            <h1>HOME</h1>
            <RouteButton label="LOGIN" path="/login" />
            <RouteButton label="catalogo" path="/home/catalogo" />
            <RouteButton label="livro" path="/home/catalogo/livro" />
            <RouteButton label="cadastro" path="/cadastro" />
        </>
    );
};

export default Home;