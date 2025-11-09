import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface ModalEditUserProp {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalEditUser = ({setModal}: ModalEditUserProp) => {

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER;

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const idUser = localStorage.getItem("idUser");
        setId(idUser ?? "");
    });

    const editUser = async () => {
        try {
            const bodyData = {
                id,
                name,
                email,
                password,
            };

            const response = await fetch(`${API_URL}${bodyData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify(bodyData)
            })

            if (!response.ok) throw new Error("Erro ao enviar dados");

            const data = await response.json()

            if (data.id) {
                localStorage.setItem("idUser", data.id);
                localStorage.setItem("nameUser", data.name);
                localStorage.setItem("emailUser", data.email)
            }

            console.log(data);
        } catch (error) {
            console.error("DEU PAU",  error);          
        } finally {
            setModal(false);
            location.reload();
        }
    }

    const deleteUser = async () => {
        try {
            const response = await fetch(`${API_URL}/u=${id}`, {
                method: "DELETE",
                headers: {
                    "X-API-Key": API_KEY
                }
            })

            const data = (await response).json()
            console.log(data); 
            localStorage.clear();           
        } catch (error) {
            alert("DEU RED: "+ error);
        } finally {
            setModal(false);
            location.reload()
        }
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="modal-content bg-white rounded-2xl shadow-xl w-[90vw] sm:w-[400px] p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header flex justify-between items-center mb-4">
                    <h2>Editar seus Dados</h2>
                    <button onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} color="white" />
                    </button>
                </div>
                <div className="modal-body flex flex-col gap-3 text-black">
                    <input
                        style={{padding: "6px"}}
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <input
                        style={{padding: "6px"}}
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <input
                        style={{padding: "6px"}}
                        type="password"
                        placeholder="Nova Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>
                <div className="modal-footer flex justify-end mt-6 gap-3">
                    <button
                        className="text-white bg-red-500 rounded-lg hover:bg-red-800 transition"
                        style={{padding: "6px"}}
                        onClick={deleteUser}
                    >
                        Deleter Perfil
                    </button>
                    <button
                        className="bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        style={{padding: "6px"}}
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-green-700 text-white rounded-lg hover:bg-green-800"
                        style={{padding: "6px"}}
                        onClick={editUser}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditUser;