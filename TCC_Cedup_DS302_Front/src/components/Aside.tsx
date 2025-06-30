import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/aside.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import StarRating from './StarRating';
import { useState } from 'react';

const Aside = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    

    return(
        <>
            <aside className='aside'>
                <h1>Livros:</h1>

                <div className="container-category-book">
                    <ul>
                        <li>Matemática</li>
                        <li>Biologia</li>
                        <li>Geografia</li>
                        <li>Química</li>
                        <li>Sociologia</li>
                        <li>Espanhol</li>
                        <li>Educação Física</li>
                    </ul>
                    <ul>
                        <li>Português</li>
                        <li>História</li>
                        <li>Filosofia</li>
                        <li>Física</li>
                        <li>Artes</li>
                        <li>Inglês</li>
                        <li>Administração</li>
                    </ul>
                </div>
                <div className="search-for-star">
                    <h1>Busca por Notas:</h1>

                    <div className="star-container">
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            
                            return (
                                <label key={index}>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        className="star-input"
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="star-icon"
                                        style={{
                                            color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                        }}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                        size="2x"
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Aside;