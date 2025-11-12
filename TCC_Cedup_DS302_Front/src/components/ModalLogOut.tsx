import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ModalProp {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalLogOut = ({setModal}: ModalProp) => {
    const navigate = useNavigate();

    const closeModal = () => {
        setModal(false);
    }

    const logOutAcount = () => {
        localStorage.clear();
        navigate("/home");
    }

    return (
        <>
            <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
                <div
                    className="modal-content bg-white rounded-2xl shadow-xl w-[90vw] sm:w-[400px] p-6 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header flex justify-between items-center mb-4">
                        <h2>Sair da conta</h2>
                        <button onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} color="white" />
                        </button>
                    </div>
                    <div className="modal-body flex flex-col gap-3 text-center text-black">
                    <h1>Deseja realmente sair da sua conta?</h1>
                    </div>
                    <div className="modal-footer flex justify-end mt-6 gap-3">
                        <button onClick={closeModal} className="secondary-button">
                            Não
                        </button>
                        <button className="primary-button" onClick={logOutAcount}>
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalLogOut;