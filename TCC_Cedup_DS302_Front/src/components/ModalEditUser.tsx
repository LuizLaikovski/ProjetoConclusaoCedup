import { faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasCapitalLetter, hasNumber, hasSpecialCharacter } from "../dto/passwordDTO";
import NewPassword from "./NewPassword";

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
    const API_URL_PASSWORD = import.meta.env.VITE_API_URL_USER_OLD_PASSWORD;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const emailUser = localStorage.getItem("emailUser") || "";

    // Estados quando editando TUDO
    const [newPasswordVerify, setNewPasswordVerify] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPasswordVerify, setShowPasswordVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Estados quando editando apenas senha
    const [oldPassword, setOldPassword] = useState("");
    const [passwordOnly, setPasswordOnly] = useState("");
    const [passwordOnlyConfirm, setPasswordOnlyConfirm] = useState("");

    const [newInputs, setNewInputs] = useState(false);

    const [error, setError] = useState("");

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
            if (newInputs) {

                if (passwordOnly !== passwordOnlyConfirm) {
                    setError("As senhas não coincidem!");
                    return;
                }

                if (!hasNumber(passwordOnly)) {
                    setError("A senha deve conter ao menos um número!");
                    return;
                }

                if (!hasCapitalLetter(passwordOnly)) {
                    setError("A senha deve conter ao menos uma letra maiúscula!");
                    return;
                }

                if (!hasSpecialCharacter(passwordOnly)) {
                    setError("A senha deve conter ao menos um caractere especial!");
                    return;
                }

                const bodyData = {
                    email: emailUser,
                    oldPassword,
                    newPassword: passwordOnly,
                };

                const response = await fetch(API_URL_PASSWORD, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": API_KEY
                    },
                    body: JSON.stringify(bodyData),
                });

                if (!response.ok) throw new Error("Erro ao alterar senha!");
                setModal(false);
                return;
            }

            // =========================
            // EDIÇÃO COMPLETA (nome/email/senha)
            // =========================
            if (newPassword !== newPasswordVerify) {
                setError("As senhas não coincidem!");
                return;
            }

            if (!hasNumber(newPassword)) {
                setError("A senha deve conter ao menos um número!");
                return;
            }

            if (!hasCapitalLetter(newPassword)) {
                setError("A senha deve conter ao menos uma letra maiúscula!");
                return;
            }

            if (!hasSpecialCharacter(newPassword)) {
                setError("A senha deve conter ao menos um caractere especial!");
                return;
            }

            const bodyData = {
                name,
                email,
                newPassword,
            };

            const response = await fetch(`${API_URL}/${safeParse(idUser)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) throw new Error("Erro ao enviar dados");

            const data = await response.json()

            if (data.id) {
                localStorage.setItem("idUser", JSON.stringify(data.id));
                localStorage.setItem("nameUser", data.name);
                localStorage.setItem("emailUser", data.email)
            }

            setModal(false);
            window.dispatchEvent(new Event("storage"));

        } catch (error) {
            console.error("Erro:", error);
        }
    };

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
            setError("Erro ao deletar: " + error);
        } finally {
            setModal(false);
            navigate("/home");
        }
    };

    const closeModal = () => setModal(false);

    const ShowInputs = () => setNewInputs(!newInputs);

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
            <div
                className="modal-content bg-white rounded-2xl shadow-xl w-[90vw] sm:w-[400px] p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header flex justify-between items-center mb-4">
                    <h2>Editar seus Dados</h2>
                    <button onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="modal-body flex flex-col gap-3 text-black">

                    {!newInputs && (
                        <>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2"
                                style={{ padding: "6px" }}
                            />

                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2"
                                style={{ padding: "6px" }}
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nova Senha"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                    style={{ padding: "6px", paddingRight: "40px" }}
                                />

                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPasswordVerify ? "text" : "password"}
                                    placeholder="Confirmar Nova Senha"
                                    value={newPasswordVerify}
                                    onChange={(e) => setNewPasswordVerify(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                    style={{ padding: "6px", paddingRight: "40px" }}
                                />

                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    onClick={() => setShowPasswordVerify(!showPasswordVerify)}
                                >
                                    <FontAwesomeIcon icon={showPasswordVerify ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </>
                    )}

                    {newInputs && (
                        <NewPassword
                            oldPassword={oldPassword}
                            onOldPasswordChange={setOldPassword}
                            newPassword={passwordOnly}
                            onNewPasswordChange={setPasswordOnly}
                            newPasswordConfirm={passwordOnlyConfirm}
                            onNewPasswordConfirmChange={setPasswordOnlyConfirm}
                            error={error}
                        />
                    )}
                </div>

                <div className="modal-footer flex justify-end mt-4 gap-2">

                    <button
                        className="text-white bg-red-500 rounded-lg hover:bg-red-800"
                        style={{ padding: "6px" }}
                        onClick={deleteUser}
                    >
                        Deleter Perfil
                    </button>

                    <button
                        className="bg-[var(--white)] text-[var(--primary-clear)] font-bold rounded-[5px] border-2 border-[var(--primary-clear)] hover:bg-[var(--primary-clear)] hover:text-white"
                        style={{ padding: "6px" }}
                        onClick={ShowInputs}
                    >
                        Criar nova senha
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
