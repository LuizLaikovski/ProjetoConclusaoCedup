import { faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { useNavigate } from "react-router-dom";
import { hasCapitalLetter, hasNumber, hasSpecialCharacter } from "../dto/passwordDTO";

interface ModalProp {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalForgotPassword = ({ setModal }: ModalProp) => {
    const [email, setEmail] = useState('');
    const [numberVerify, setNumberVerify] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [codeGenerated, setCodeGenerated] = useState('');
    const [step, setStep] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [button, setButton] = useState(true);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL_EMAIL_EXISTS;
    const API_URL_EDIT = import.meta.env.VITE_API_URL_EDIT;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const closeModal = () => setModal(false);

    const generateCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const forgotPassword = async () => {
        setError('');
        setLoading(true);
        setButton(false);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) throw new Error("Falha na requisição");

            const result = await response.json();
            console.log(result);

            if (result) {
                const code = generateCode();
                setCodeGenerated(code);

                const ok = await sendCodeEmail(email, code);

                if (!ok) {
                    setError(`Erro ao enviar código. Tente novamente`);
                    setLoading(false);
                    return;
                }

                setLoading(false);
                setStep(2);
            } else {
                setError("Email não cadastrado.");
                setLoading(false);
            }

        } catch (error) {
            console.error(error);
            setError("Erro ao conectar ao servidor.");
            setLoading(false);
        } finally {
            setButton(true);
        }
    };

    const sendCodeEmail = async (email: string, code: string) => {
        try {
            await emailjs.send(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                { user_email: email, verification_code: code },
                import.meta.env.VITE_PUBLIC_KEY
            );

            return true;
        } catch (error) {
            console.error("Erro ao enviar email:", error);
            return false;
        }
    };

    const confirmCode = () => {
        if (numberVerify === codeGenerated) {
            setStep(3);
        } else {
            setError("Código incorreto.");
        }
    };

    const newPassword = async () => {
        try {

            setLoading(true);

            if (newPasswordInput.length < 8) {
                setError('Sua senha deve conter pelo menos 8 digitos.');
                setLoading(false);
                setButton(true);
                return;
            }
            if (!hasNumber(newPasswordInput)) {
                setError('Sua senha deve conter um numero.');
                setLoading(false);
                setButton(true);
                return;
            }
            if (!hasCapitalLetter(newPasswordInput)) {
                setError('Sua senha deve conter pelo menos uma letra maiuscula.');
                setLoading(false);
                setButton(true);
                return;
            }
            if (!hasSpecialCharacter(newPasswordInput)) {
                setError('Sua senhe deve conter um caractere especial.');
                setLoading(false);
                setButton(true);
                return;
            }

            console.log(newPassword);
            


            const response = await fetch(API_URL_EDIT, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify({
                    email: email,
                    password: newPasswordInput
                }),
            })

            if (!response.ok){
                setError("Houve um erro ao trocar a senha");
            }

            const data = await response.json()
            
            localStorage.setItem("idUser", data.id);
            localStorage.setItem("nameUser", data.name);
            localStorage.setItem("emailUser", data.email);
            setModal(false);
            navigate("/home");
        } catch (error) {
            console.error(error);
            setError(`Houve um erro: ${error}`);
        }
    }

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
            <div
                className="modal-content bg-white rounded-2xl shadow-xl w-[90vw] sm:w-[400px] p-6 relative"
                data-aos="zoom-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header flex justify-between items-center mb-4">
                    <h2>Esqueci minha senha</h2>
                    <button onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} color="white" />
                    </button>
                </div>

                <div className="modal-body flex flex-col gap-3 text-center text-black">

                    {step === 1 && (
                        <>
                            <input
                                type="email"
                                className="bg-white rounded-xl h-[7vh] border-2 text-black placeholder-gray-400 transition w-full"
                                style={{ padding: "10px" }}
                                placeholder="Digite seu Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="flex items-center justify-center">
                                {error && <p className="text-red-500">{error}</p>}
                                {loading && <div className="loader h-[45px] w-[45px]"></div>}
                            </div>

                            {button && <button className="primary-button mt-2" onClick={forgotPassword}>
                                Enviar código
                            </button>}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <input
                                type="number"
                                className="bg-white rounded-xl h-[7vh] border-2 text-black placeholder-gray-400 transition w-full"
                                style={{ padding: "10px" }}
                                placeholder="Código de verificação"
                                value={numberVerify}
                                onChange={(e) => setNumberVerify(e.target.value)}
                            />

                            {error && <p className="text-red-500">{error}</p>}

                            {button && <button className="primary-button mt-2" onClick={confirmCode}>
                                Verificar código
                            </button>}
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="bg-white rounded-xl h-[7vh] border-2 text-black placeholder-gray-400 transition w-full"
                                    style={{ padding: "10px", paddingRight: "40px" }}
                                    placeholder="Digite sua nova senha"
                                    value={newPasswordInput}
                                    onChange={(e) => setNewPasswordInput(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>

                            {error && <p className="text-red-500">{error}</p>}

                            {button && <button className="primary-button mt-2" onClick={newPassword}>
                                Salvar nova senha
                            </button>}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ModalForgotPassword;