import './css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header className='header'>
      <div className='align-header'>
        {/* ADICIONAR A LOGO AQUI */}
        <img src="" alt="" />
        <Link to="/home" className='link-to-home-header'>Home</Link>

        <form className="search-container">
          <input
            type="text"
            placeholder="Digite sua busca..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} color='black' size='2x' />
          </button>
        </form>

        <Link to="/login" className='link-to-login-header'>Faça seu Login</Link>
        <button className='button-for-favorites-header'>
          <FontAwesomeIcon icon={faHeart} size='2x' className='favorite-book-header'/>
        </button>
      </div>
      <div className='container-category-header'>
        <ul>     {/* Futuramente implemenatr botões no lugar dos li's para querys */}
          <Link to='/catalogo'><li>Todos</li></Link>     
          <li>Mais Procurados</li>
          <li>Em Alta</li>
          <li>Clássicos</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;