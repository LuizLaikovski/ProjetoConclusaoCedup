import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { hasCapitalLetter, hasNumber, hasSpecialCharacter } from "../dto/passwordDTO";

const Register = () => {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        password: '',
        confirmePassword: '',
        numCndb: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [button, setButton] = useState(true);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER_REGISTER;
    const navigate = useNavigate();

    const saveToDB = async (data: typeof formData) => {
        try {
            setLoading(true)
            setButton(false);

            if (data.confirmePassword != data.password) {
                setLoading(false);
                setErrorMessage("Digite a mesma senha!!");
                setButton(true);
                return;
            }


            const bodyData = {
                name: data.nomeCompleto.trim(),
                email: data.email.trim(),
                password: data.password,
                numCndb: data.numCndb,
                booksFavorited: []
            };

            if (bodyData.password.length < 8) {
                setErrorMessage('Sua senha deve conter pelo menos 8 digitos.');
                setLoading(false);
                setButton(true);
                return;
            }
            if (!hasNumber(bodyData.password)) {
                setErrorMessage('Sua senha deve conter um numero.');
                setLoading(false);
                setButton(true);
                return;
            }
            if (!hasCapitalLetter(bodyData.password)) {
                setErrorMessage('Sua senha deve conter pelo menos uma letra maiuscula.');
                setLoading(false);
                setButton(true);
                return;
            }
            if (!hasSpecialCharacter(bodyData.password)) {
                setErrorMessage('Sua senhe deve conter um caractere especial.');
                setLoading(false);
                setButton(true);
                return;
            }
            

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify(bodyData)
            });

            const resultText = await response.text();

            if (!response.ok) {
                setLoading(false);
                setErrorMessage(resultText);
                setButton(true);
            }

            const result = JSON.parse(resultText);

            if (result.id) {
                localStorage.setItem("idUser", result.id);
                localStorage.setItem("nameUser", result.name);
                localStorage.setItem("emailUser", result.email);
                navigate("/home");
            }

        } catch (error) {
            console.error("🚨 Erro ao salvar usuário:", error);

        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        await saveToDB(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section
            id="register"
            className="flex justify-center items-center relative text-white"
            style={{
                minHeight: "100dvh",
                padding: "0",
                margin: "0"
            }}
        >

            <div
                className="container-register absolute z-10 rounded-3xl shadow-xl flex flex-col justify-center items-center"
                data-aos="zoom-in-up"
                style={{
                    width: "90%",
                    maxWidth: "450px",
                    padding: "32px",
                    minHeight: "55vh",
                    background: "var(--tertiary)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <form
                    className="flex flex-col justify-center items-center w-full"
                    onSubmit={handleSubmit}
                    style={{
                        minHeight: "60vh",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <h1
                        className="text-primary text-center"
                        style={{
                            marginBottom: "24px",
                            fontSize: "clamp(2rem, 6vw, 3rem)",
                            fontWeight: "700"
                        }}
                    >
                        Cadastro
                    </h1>

                    <div className="w-full flex justify-center">
                        <input
                            type="text"
                            id="nomeCompleto"
                            name="nomeCompleto"
                            value={formData.nomeCompleto}
                            className="transition placeholder-gray-400 bg-white rounded-xl text-black w-full"
                            style={{
                                height: "7vh",
                                minHeight: "45px",
                                padding: "10px",
                                marginBottom: "24px",
                                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
                            }}
                            placeholder="Digite seu nome completo"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="w-full flex justify-center">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            className="transition placeholder-gray-400 bg-white rounded-xl text-black w-full"
                            style={{
                                height: "7vh",
                                minHeight: "45px",
                                padding: "10px",
                                marginBottom: "24px",
                                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
                            }}
                            placeholder="Digite seu email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div
                        className="relative w-full flex justify-center"
                        style={{ marginBottom: "24px" }}
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            className="transition placeholder-gray-400 bg-white rounded-xl text-black w-full"
                            style={{
                                height: "7vh",
                                minHeight: "45px",
                                padding: "10px",
                                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
                            }}
                            placeholder="Digite sua senha"
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute text-gray-500 hover:text-gray-700 eyesPassword"
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            style={{
                                right: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)"
                            }}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                    <div
                        className="relative w-full flex justify-center"
                        style={{ marginBottom: "24px" }}
                    >
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmePassword"
                            name="confirmePassword"
                            value={formData.confirmePassword}
                            className="transition placeholder-gray-400 bg-white rounded-xl text-black w-full"
                            style={{
                                height: "7vh",
                                minHeight: "45px",
                                padding: "10px",
                                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
                            }}
                            placeholder="Confirmar sua senha"
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                            className="absolute text-gray-500 hover:text-gray-700 eyesPassword"
                            aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                            style={{
                                right: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)"
                            }}
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                    {errorMessage && (
                        <p
                            className="text-red-500"
                            style={{
                                marginBottom: "10px",
                                fontSize: "clamp(0.9rem, 2vw, 1rem)"
                            }}
                        >
                            {errorMessage}
                        </p>
                    )}

                    {loading && (
                        <div
                            className="loader"
                            style={{
                                height: "45px",
                                width: "45px",
                                marginTop: "10px"
                            }}
                        ></div>
                    )}

                    {button && (
                        <>
                            <button
                                type="submit"
                                className="primary-button w-[90%]"
                                style={{
                                    padding: "12px 0",
                                    marginTop: "10px",
                                }}
                            >
                                Confirmar
                            </button>

                            <Link
                                to="/home"
                                className="underline"
                                style={{
                                    margin: "20px",
                                    fontSize: "clamp(1rem, 3vw, 1.2rem)",
                                    color: "var(--secondary)"
                                }}
                            >
                                Voltar à tela inicial
                            </Link>
                        </>
                    )}
                </form>
            </div>

            <Footer />
        </section>
    );

};

export default Register;