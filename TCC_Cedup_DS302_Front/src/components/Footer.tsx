import { Link, useNavigate } from 'react-router-dom';
import './css/footer.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import ModalFavorites from './ModalFavorites';

const Footer = () => {

    const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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

    const handleProfileClick = () => {
        const user = localStorage.getItem("idUser");

        if (!user) {
            navigate("/login")
        } else {
            navigate("/perfil")
        }
    }

    return (
        <>
            <footer className="footer fixed bottom-0 left-0 w-full h-[10dvh] z-50">
                <div className="footer-content flex justify-around items-center" style={{height: '10dvh'}}>
                    <Link to="/" className='link-to-home-header'>
                        <FontAwesomeIcon icon={faHouse} color='white' size='2x' />
                    </Link>
                    <button className='button-for-favorites-header' onClick={toggleModal}>
                        <FontAwesomeIcon icon={faHeart} color='white' size='2x'/>
                    </button>
                    <button onClick={handleProfileClick} className="footer-link">
                        <FontAwesomeIcon icon={faUser} color='white' size='2x' />
                    </button>
                </div>
            </footer> 

            {showModal && 
                <ModalFavorites
                    setOpen={setShowModal}
                />
            }
        </>
    );
};

export default Footer;