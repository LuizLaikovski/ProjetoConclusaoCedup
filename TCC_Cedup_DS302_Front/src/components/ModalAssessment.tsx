import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface ModalAssessmentProp {
    setModalAssessment: React.Dispatch<React.SetStateAction<boolean>>;
    idBook: string;
}

const ModalAssessment = ({ setModalAssessment, idBook }: ModalAssessmentProp) => {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_RATE;

    const handleRatingClick = async (value: number) => {
        setRating(value);
        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify({ idBook: idBook, grade: value }),
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            location.reload();
        } catch (err) {
            console.error("Erro ao enviar nota:", err);
        }
    };

    return (
        <div className="modal-overlay" onClick={() => setModalAssessment(false)}>
            <div className="modal-content w-[75vw]" onClick={(e) => e.stopPropagation()} data-aos="zoom-in-up">

                <div
                    className="stars-container flex gap-2.5 justify-center mt-5"
                    style={{padding: "20px"}}
                >
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            onClick={() => handleRatingClick(value)}
                            onMouseEnter={() => setHover(value)}
                            onMouseLeave={() => setHover(0)}
                            style={{
                                fontSize: "2rem",
                                cursor: "pointer",
                                color: value <= (hover || rating) ? "#FFD700" : "#ccc",
                                transition: "color 0.2s ease",
                            }}
                        >
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                    ))}
                </div>

                <div className="modal-footer">
                    <button className="close-modal-button" onClick={() => setModalAssessment(false)}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAssessment;
