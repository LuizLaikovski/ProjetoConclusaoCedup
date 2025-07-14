import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/aside.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface AsideProps {
    onRatingChange: (rating: number | null) => void;
    currentRating: number | null
}

const Aside = ({onRatingChange, currentRating}: AsideProps) => {
    const [hover, setHover] = useState(0);

    const handleRatingClick = (ratingValue: number) => {
        if (currentRating === ratingValue) {
            onRatingChange(null);
        } else {
            onRatingChange(ratingValue);
        }
    }
    

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
                                <>
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => handleRatingClick(ratingValue)}
                                            className="star-input" />

                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="star-icon"
                                            style={{
                                                color: ratingValue <= (hover || currentRating || 0) ? "#ffc107" : "#e4e5e9"
                                            }}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                            size="2x" />
                                    </label>
                                </>
                            );
                        })}
                    </div>

                    { currentRating && (
                        <button
                            onClick={() => onRatingChange(null)}
                        >Limpar Filtro</button>
                    )}
                </div>
                
                <h3 style={{marginLeft: '1dvw'}}>Buscar por quantidades de páginas:</h3>
                    <div className="aside-search-for-pages">
                        <div className='allign-search-for-checkbox'>
                            <div className="input-checkbox-individual-allign">
                                <h4>Menos que 100</h4>
                            </div>
                            <div className="input-checkbox-individual-allign">
                                <h4>100 - 300</h4>
                            </div>
                            <div className="input-checkbox-individual-allign">
                                <h4>300 - 500</h4>
                            </div>
                        </div>
                        <div className="allign-search-for-checkbox">
                            <div className="input-checkbox-individual-allign">
                                <h4>500 - 700</h4>
                            </div>
                            <div className="input-checkbox-individual-allign">
                                <h4>700 - 900</h4>
                            </div>
                            <div className="input-checkbox-individual-allign">
                                <h4>Mais que 900</h4>
                            </div>
                        </div>
                    </div>
            </aside>
        </>
    );
};

export default Aside;