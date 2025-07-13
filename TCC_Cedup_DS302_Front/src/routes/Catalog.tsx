import Aside from "../components/Aside";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import './css/catalog.css';

const Catalog = () => {
    return (
        <>
            <Header />
            <Aside />
            <ListBooks />
        </>
    );
};

export default Catalog;