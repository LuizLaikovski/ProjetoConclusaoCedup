import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const Catalog = () => {
    return (
        <>
            <section className="Catalog">
                <Header />
                <Carousel minBooks={0} maxBooks={9} styles={{marginBottom: '15px', marginTop: '15px'}} />
                <Carousel minBooks={10} maxBooks={19} styles={{marginBottom: '15px', marginTop: '15px'}} />
                <Carousel minBooks={20} maxBooks={29} styles={{marginBottom: '15px', marginTop: '15px'}} />
                <Footer />
            </section>
        </>
    );
};

export default Catalog;