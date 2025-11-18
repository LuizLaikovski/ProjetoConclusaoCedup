import "../App.css";
import Header from "../components/Header";
import MainHome from "../components/MainHome";
import Footer from "../components/Footer";

const Home = () => {

    return(
        <>
            <section className="Home">
                <Footer />
                <Header />
                <MainHome />
            </section>
        </>
    );
};

export default Home;