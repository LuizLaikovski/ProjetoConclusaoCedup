import { Link } from 'react-router-dom';
import './css/footer.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHouse, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const Footer = () => {

    const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showModal && modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);
    

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <footer className="footer fixed bottom-0 left-0 w-full h-[10dvh] z-50">
                <div className="footer-content flex justify-around items-center" style={{height: '10dvh'}}>
                    <Link to="/" className='link-to-home-header'>
                        <FontAwesomeIcon icon={faHouse} color='white' size='2x' />
                    </Link>
                    <button className='button-for-favorites-header' onClick={toggleModal}>
                        <FontAwesomeIcon icon={faHeart} size='2x'/>
                    </button>
                    <Link to="/perfil" className="footer-link">
                        <FontAwesomeIcon icon={faUser} color='white' size='2x' />
                    </Link>
                </div>
            </footer> 


            {/* Modal de Favoritos */}
            {showModal && (
                <div className="modal-overlay" ref={modalRef}>
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
        </>
    );
};

export default Footer;
