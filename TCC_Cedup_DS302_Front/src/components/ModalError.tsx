import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface modalProp {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    error: string
}

const ModalError = ({ setModal, error }: modalProp) => {
    const closeModal = () => {
        setModal(false);
    }
    return (
        <>
            <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
                <div
                    className="modal-content bg-white rounded-2xl shadow-xl w-[90vw] sm:w-[400px] p-6 relative"
                    data-aos="zoom-in-up"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header flex justify-between items-center mb-4">
                        <h2>Houve um erro!</h2>
                        <button onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} color="white" />
                        </button>
                    </div>
                    <div className="modal-body flex flex-col gap-3 text-center text-black">
                        <h1 className="text-red-600 text-2xl">{error}</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalError;