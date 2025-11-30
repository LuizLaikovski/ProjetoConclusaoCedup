import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface prop {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    bookTitle?: string;
    bookId?: string;
}
const ModalDeleteBook = ({ setModal, bookTitle, bookId }: prop) => {

    const API_URL = import.meta.env.VITE_API_URL_DELETE_BOOK;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const closeModal = () => {
        setModal(false);
    }

    const deleteBook = async (idBook: string) => {
        await fetch(`${API_URL}=${idBook}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        });

        setModal(false);
        window.location.reload();
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
                        <h2>Excluir <strong>{bookTitle}</strong></h2>
                        <button onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} color="white" />
                        </button>
                    </div>
                    <div className="modal-body flex flex-col gap-3 text-center text-black">
                        <h1>Deseja realmente excluir o livro <strong>{bookTitle}</strong>?</h1>
                    </div>
                    <div className="modal-footer flex justify-end mt-6 gap-3">
                        <button
                            onClick={closeModal}
                            className="secondary-button"
                        >
                            Sair
                        </button>
                        <button onClick={() => deleteBook(bookId!)} className="primary-button">Excluir</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDeleteBook;