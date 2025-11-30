import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHouse, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ModalFavorites from './ModalFavorites';

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
      const encodedSearchTerm = searchTerm.replace(/\s+/g, "-").toLowerCase();
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
    <header className='bg-[var(--primary)] w-screen relative top-0 z-50 text-white max-md:flex max-md:justify-center max-md:items-center' data-aos="fade-down" style={{ paddingRight: "1rem" }}>
      <div className='flex justify-between items-center' style={{ margin: "0 auto" }}>
        <Link to="/" className='logo-link'></Link>

        <form onSubmit={handleSubmit} className='flex items-center grow max-w-[500px] border-white border-2 rounded-xl text-black' style={{ margin: "20px 0" }}>
          <input
            type="text"
            name="book"
            placeholder='Buscar livro...'
            value={searchBook.book}
            onChange={handleChange}
            className='w-screen bg-white max-md:w-[60dvw]'
            style={{ padding: "0.5rem", borderRadius: "9px 0 0 9px" }}
          />

          <button type="submit" className='bg-[var(--primary-clear)] cursor-pointer' style={{ padding: "0.5rem 1rem", borderRadius: "0 16px 16px 0" }}>
            <FontAwesomeIcon icon={faSearch} color='white' />
          </button>
        </form>

        <nav style={{ margin: "0 50px 0 -27dvw" }} className='max-lg:hidden max-sm:hidden'>
          <ul className='flex list-none gap-4'>
            <li className='flex justify-center items-center'>
              <Link to="/">
                <FontAwesomeIcon icon={faHouse} size='lg' className='sm:hidden' />
                <span className='text-[20px]' style={{ marginLeft: "5px" }}>Início</span>
              </Link>
            </li>
            {typeUser === "admin" && (
              <li className='flex justify-center items-center'>
                <Link to="/newbook">
                  <FontAwesomeIcon icon={faPlus} />
                  <span className='text-[20px]' style={{ marginLeft: "5px" }}>Novo Livro</span>
                </Link>
              </li>
            )}
            <li className='flex justify-center items-center'>
              <button className='button-for-favorites-header' onClick={toggleModal}>
                <FontAwesomeIcon icon={faHeart} size='lg' className='sm:hidden' />
                <span className='text-[20px]' style={{ marginLeft: "5px" }}>Favoritos</span>
              </button>
            </li>
            <li className='flex justify-center items-center'>
              <button onClick={checkedLogin}>
                <FontAwesomeIcon icon={faUser} />
                <span className='text-[20px]' style={{ marginLeft: "5px" }}>Perfil</span>
              </button>
            </li>
          </ul>
        </nav>

        {showModal && <ModalFavorites setOpen={setShowModal} />}
      </div>
    </header>
  );
};

export default Header;