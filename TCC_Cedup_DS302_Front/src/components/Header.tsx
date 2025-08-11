import './css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHouse, faSearch, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [searchBook, setSearchBook] = useState({
    book: ''
  });

  const [showData, setShowData] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowData(true);
    console.log('Busca:', searchBook.book);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSearchBook({ book: value });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header className='header'>
      <div className='align-header '>
        {/* ADICIONAR A LOGO AQUI */}
        <img src="" alt="" />

        <Link to="/" className='link-to-home-header'><FontAwesomeIcon icon={faHouse} color='white' size='2x' /></Link>
        <Link to="/pesquisa" className='link-to-search-header'><FontAwesomeIcon icon={faSearch} color='white' size='2x' /></Link>

        {showData && (
          <div>
            <p>dados enviados para a requisição: {searchBook.book}</p>
          </div>
        )}

        <Link to="/login" className='link-to-login-header'><FontAwesomeIcon icon={faUser} /></Link>

        {/* BOTÃO QUE ABRE O MODAL DE FAVORITOS */}
        {/* <button className='button-for-favorites-header' onClick={toggleModal}>
          <FontAwesomeIcon icon={faHeart} size='2x' className='favorite-book-header'/>
        </button> */}
      </div>

      {/* Modal de Favoritos */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Seus Favoritos</h2>
              <button className="close-button" onClick={toggleModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              {/* Conteúdo dos favoritos vai aqui */}
              <p>Lista de livros favoritos aparecerá aqui</p>
              {/* Exemplo de item de favorito */}
              <div className="favorite-item">
                <span>Nome do Livro Favorito</span>
                <button className="remove-favorite">Remover</button>
              </div>
            </div>
            <div className="modal-footer">
              <button className="close-modal-button" onClick={toggleModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;