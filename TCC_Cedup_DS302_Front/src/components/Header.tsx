import './css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHeart, faHouse, faSearch, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [searchBook, setSearchBook] = useState({
    book: ''
  });

  const [showAside, setShowAside] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

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
  }

  // Função para lidar com o envio do formulário de busca
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Livro buscado:', searchBook.book);
    // Aqui você normalmente faria uma requisição à API
  };

  // Função para atualizar o estado da busca
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchBook({ book: value });
  };

  return (
    <header className='header w-[100%]'>
      <div className='align-header'>
        <Link to="/" className='logo-link'>
        </Link>

      

        <form onSubmit={handleSubmit} className='form-search-book-header'>
          <input
            type="text"
            name="book"
            placeholder='Buscar livro...'
            value={searchBook.book}
            onChange={handleChange}
            className='input-search-book-header'
          />
          <button type="submit" className='button-submit-search-book-header'>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        <nav className='main-navigation'>
          <ul>
            <li className='flex justify-center items-center'>
              <Link to="/">
                <FontAwesomeIcon icon={faHouse} size='lg' />
                <span className='text-[20px]'>Início</span>
              </Link>
            </li>
            <li className='flex justify-center items-center'>
              <Link to="/perfil">
                <FontAwesomeIcon icon={faUser} />
                <span className='text-[20px]'>Perfil</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botão do menu mobile */}
        <button className='mobile-menu-button' onClick={toggleAside}>
          <FontAwesomeIcon icon={showAside ? faTimes : faBars} />
        </button>

        {/* Menu lateral para mobile */}
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
                  <Link to="/perfil" onClick={toggleAside}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Perfil</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </header>
  );
};

export default Header;