import Header from "../components/Header";
import RouteButton from "../components/RouteButton";
import './css/BookSpecifications.css';

const BookSpecifications = () => {
    return (
        <>
            <Header />
            <section className="book-specifications-main">
                <div className="book-specifications-container">
                    
                    <RouteButton path="/home" label="Voltar a tela inicial" />
                </div>
            </section>
        </>
    );
};

export default BookSpecifications;