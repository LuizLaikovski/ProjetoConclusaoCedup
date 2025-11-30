import { faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalEditUserProp {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const safeParse = (value: string | null) => {
    try {
        return JSON.parse(value ?? "");
    } catch {
        return value;
    }
};

const ModalEditUser = ({ setModal }: ModalEditUserProp) => {

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const update = () => {
            setName(localStorage.getItem("nameUser") || '');
            setEmail(localStorage.getItem("emailUser") || '');
        };

        window.addEventListener("storage", update);
        update();

        return () => window.removeEventListener("storage", update);
    }, []);

    const idUser = localStorage.getItem("idUser");

    const editUser = async () => {
        try {

            const bodyData = {
                name,
                email,
                password,
            };

            const response = await fetch(`${API_URL}/${safeParse(idUser)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify(bodyData),
            })

            if (!response.ok) throw new Error("Erro ao enviar dados");

            const data = await response.json()


            if (data.id) {
                localStorage.setItem("idUser", JSON.stringify(data.id));
                localStorage.setItem("nameUser", data.name);
                localStorage.setItem("emailUser", data.email)
            }
        } catch (error) {
            console.error("DEU PAU: ", error);
        } finally {
            setModal(false);
            window.dispatchEvent(new Event("storage"));
        }
    }

    const deleteUser = async () => {
        try {
            await fetch(`${API_URL}/u=${safeParse(idUser)}`, {
                method: "DELETE",
                headers: {
                    "X-API-Key": API_KEY
                }
            })
            localStorage.clear();
        } catch (error) {
            alert("DEU RED: " + error);
        } finally {
            setModal(false);
            navigate("/home");
        }
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
            <div
                className="modal-content bg-white rounded-2xl shadow-xl w-[90vw] sm:w-[400px] p-6 relative"
                data-aos="zoom-in"
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
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        style={{ padding: "6px" }}
                    />
                    <input
                        style={{ padding: "6px" }}
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <div className="relative">
                        <input
                            style={{ padding: "6px", paddingRight: "40px" }}
                            type={showPassword ? "text" : "password"}
                            placeholder="Nova Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                        />

                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <div className="modal-footer flex justify-end mt-6 gap-3">
                    <button
                        className="text-white bg-red-500 rounded-lg hover:bg-red-800 transition"
                        style={{ padding: "6px" }}
                        onClick={deleteUser}
                    >
                        Deleter Perfil
                    </button>
                    <button
                        className="bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        style={{ padding: "6px" }}
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-green-700 text-white rounded-lg hover:bg-green-800"
                        style={{ padding: "6px" }}
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