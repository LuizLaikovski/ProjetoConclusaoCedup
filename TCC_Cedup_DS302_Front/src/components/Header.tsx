import './css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faSearch, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [searchBook, setSearchBook] = useState({
    book: ''
  });

  const [showAside, setShowAside] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Hook para navegação

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
    
    // Remove espaços extras e verifica se não está vazio
    const searchTerm = searchBook.book.trim();
    
    if (searchTerm) {
      // Codifica o termo de busca para URL (trata caracteres especiais)
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      
      // Navega para a rota de pesquisa
      navigate(`/search/${encodedSearchTerm}`);
    }
  };

  const handleRealTimeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchBook({ book: value });
    
    // Se quiser busca em tempo real enquanto digita, descomente abaixo:
    const searchTerm = value.trim();
    if (searchTerm) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className='header w-[100dvw]'>
      <div className='align-header 2xl:'>
        <Link to="/" className='logo-link'>
        </Link>

        <form onSubmit={handleSubmit} className='form-search-book-header text-black'>
          <input
            type="text"
            name="book"
            placeholder='Buscar livro...'
            value={searchBook.book}
            onChange={handleRealTimeSearch}
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
              <Link to="/perfil">
                <FontAwesomeIcon icon={faUser} />
                <span className='text-[20px]'>Perfil</span>
              </Link>
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