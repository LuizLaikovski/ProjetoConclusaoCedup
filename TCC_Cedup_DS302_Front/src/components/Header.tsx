import './css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHeart, faHouse, faSearch, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ModalFavorites from './ModalFavorites';

const Header = () => {
  const [searchBook, setSearchBook] = useState({
    book: ''
  });

  const [showAside, setShowAside] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showAside && asideRef.current && !asideRef.current.contains(event.target as Node)) {
        setShowAside(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAside]);

  const toggleAside = () => {
    setShowAside(!showAside);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const searchTerm = searchBook.book.trim();

    if (searchTerm) {
      const encodedSearchTerm = searchTerm.replace(/\s+/g, "-").toLowerCase();
      navigate(`/search/${encodedSearchTerm}`);
    }
  };

  const checkedLogin = () => {
    const user = localStorage.getItem("idUser");

    if (!user) {
      navigate("/login")
    } else {
      navigate("/perfil")
    }
  }

  // Atualiza o valor do input sem pesquisar automaticamente
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBook({ book: e.target.value });
  };

  return (
    <header className='header w-[100dvw]'>
      <div className='align-header'>
        <Link to="/" className='logo-link'></Link>

        <form onSubmit={handleSubmit} className='form-search-book-header text-black'>
          <input
            type="text"
            name="book"
            placeholder='Buscar livro...'
            value={searchBook.book}
            onChange={handleChange}
            className='input-search-book-header bg-white'
          />

          <button type="submit" className='button-submit-search-book-header'>
            <FontAwesomeIcon icon={faSearch} color='white' />
          </button>
        </form>

        <nav className='main-navigation'>
          <ul>
            <li className='flex justify-center items-center'>
              <Link to="/">
                <FontAwesomeIcon icon={faHouse} size='lg' className='sm:hidden' />
                <span className='text-[20px]'>Início</span>
              </Link>
            </li>
            <li className='flex justify-center items-center'>
              <button className='button-for-favorites-header' onClick={toggleModal}>
                <FontAwesomeIcon icon={faHeart} size='lg' className='sm:hidden' />
                <span className='text-[20px]'>Favoritos</span>
              </button>
            </li>
            <li className='flex justify-center items-center'>
              <button onClick={checkedLogin}>
                <FontAwesomeIcon icon={faUser} />
                <span className='text-[20px]'>Perfil</span>
              </button>
            </li>
          </ul>
        </nav>

        <button className='mobile-menu-button' onClick={toggleAside}>
          <FontAwesomeIcon icon={showAside ? faTimes : faBars} />
        </button>

        {showAside && (
          <aside className='mobile-aside' ref={asideRef}>
            <nav>
              <ul>
                <li>
                  <Link to="/" onClick={toggleAside}>
                    <FontAwesomeIcon icon={faHouse} />
                    <span>Início</span>
                  </Link>
                </li>
                <li>
                  <Link to="" onClick={checkedLogin}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Perfil</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        {showModal && (
          <ModalFavorites setOpen={setShowModal} />
        )}
      </div>
    </header>
  );
};

export default Header;
