import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHouse, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ModalFavorites from './ModalFavorites';
import { normalize } from '../dto/normalizePath';

const Header = () => {
  const [searchBook, setSearchBook] = useState({ book: '' });
  const [showAside, setShowAside] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const typeUser = localStorage.getItem("typeUser");
  const navigate = useNavigate();  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showAside && asideRef.current && !asideRef.current.contains(event.target as Node)) {
        setShowAside(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAside]);

  const toggleModal = () => setShowModal(!showModal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = searchBook.book.trim();

    if (searchTerm) {
      const encodedSearchTerm = normalize(searchTerm);
      navigate(`/search/${encodedSearchTerm}`);
    }
  };

  const checkedLogin = () => {
    const user = localStorage.getItem("idUser");
    navigate(user ? "/perfil" : "/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBook({ book: e.target.value });
  };

  return (
    <header
      className="bg-[var(--primary)] w-full h-[5.5rem] relative top-0 z-50 text-white flex items-center justify-between px-4 
            max-lg:flex-col max-lg:gap-4 max-lg:py-4"
      data-aos="fade-down"
    >

      {/* LOGO — Desktop apenas */}
      <Link to="/" className="max-lg:hidden w-[33dvw]">
        <img
          src="./logoClickReady.png"
          alt=""
          style={{ height: "12vh", margin: "0 0 0 1rem" }}
          rel='preload'
          loading='lazy'
        />
      </Link>

      {/* SEARCH — Sempre centralizado */}
      <div className="flex justify-center flex-1 w-[33dvw] max-lg:w-[85dvw] max-lg:h-auto">
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full max-w-[500px] mx-auto rounded-xl text-black 
              max-lg:order-1 shadow-2xl"
        >
          <input
            type="text"
            name="book"
            placeholder="Buscar livro..."
            value={searchBook.book}
            onChange={handleChange}
            className="bg-white flex-1"
            style={{ padding: "0.5rem", borderRadius: "9px 0 0 9px" }}
          />

          <button
            type="submit"
            className="bg-[var(--primary-clear)] cursor-pointer"
            style={{ padding: "0.5rem 1rem", borderRadius: "0 16px 16px 0" }}
          >
            <FontAwesomeIcon icon={faSearch} color="white" />
          </button>
        </form>
      </div>

      {/* NAV — Desktop apenas */}
      <nav className="max-lg:hidden w-[33dvw] flex justify-end" style={{ margin: ' 0 2rem 0 0' }}>
        <ul className="flex list-none gap-4">

          <li className="flex items-center">
            <Link to="/">
              <FontAwesomeIcon icon={faHouse} size="lg" />
              <span className="text-[20px]" style={{ marginLeft: "5px" }}>Início</span>
            </Link>
          </li>

          {typeUser === "admin" && (
            <li className="flex items-center">
              <Link to="/newbook">
                <FontAwesomeIcon icon={faPlus} />
                <span className="text-[20px]" style={{ marginLeft: "5px" }}>Novo Livro</span>
              </Link>
            </li>
          )}

          <li className="flex items-center">
            <button className="button-for-favorites-header" onClick={toggleModal}>
              <FontAwesomeIcon icon={faHeart} size="lg" />
              <span className="text-[20px]" style={{ marginLeft: "5px" }}>Favoritos</span>
            </button>
          </li>

          <li className="flex items-center">
            <button onClick={checkedLogin}>
              <FontAwesomeIcon icon={faUser} />
              <span className="text-[20px]" style={{ marginLeft: "5px" }}>Perfil</span>
            </button>
          </li>
        </ul>
      </nav>

      {showModal && <ModalFavorites setOpen={setShowModal} />}
    </header>


  );
};

export default Header;