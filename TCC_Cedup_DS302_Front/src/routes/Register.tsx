import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import "./css/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER;
    const navigate = useNavigate();

    const saveToDB = async (data: typeof formData) => {
        try {
            const bodyData = {
                name: data.nomeCompleto.trim(),
                email: data.email.trim(),
                password: data.password,
                booksFavorited: []
            };
    
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
                throw new Error(`Erro ao cadastrar usuário — código ${response.status}`);
            }
    
            const result = JSON.parse(resultText);
            
            if (result.id) {
                localStorage.setItem("idUser", JSON.stringify(result.id));
                localStorage.setItem("nameUser", JSON.stringify(result.name));
                localStorage.setItem("emailUser", JSON.stringify(result.email));
                navigate("/home");
            }
    
        } catch (error) {
            console.error("🚨 Erro ao salvar usuário:", error);
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        await saveToDB(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section
            id="register"
            className="flex justify-center items-center relative min-h-screen text-white"
        >
            <div className="box-register">
                <FontAwesomeIcon icon={faCircleUser} size="4x" className="text-secondary-clear" />
            </div>

            <div className="container-register absolute z-10 w-[90vw] sm:w-[30vw] h-auto min-h-[55vh] rounded-3xl shadow-xl flex flex-col justify-center items-center p-8">
                
                <form
                    className="flex flex-col justify-center items-center w-full h-[74dvh]"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-primary">Cadastro</h1>

                    <div className="w-full flex justify-center mb-6">
                        <input
                            type="text"
                            id="nomeCompleto"
                            name="nomeCompleto"
                            value={formData.nomeCompleto}
                            className="h-[7dvh] w-[20dvw] transition placeholder-gray-400 bg-white rounded-xl text-black"
                            style={{padding: "10px", marginBottom: "30px", marginTop: "30px"}}
                            placeholder="Digite seu nome completo"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="w-full flex justify-center mb-6">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            className="h-[7dvh] w-[20dvw] transition placeholder-gray-400 bg-white rounded-xl text-black"
                            style={{padding: "10px", marginBottom: "30px"}}
                            placeholder="Digite seu email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            className="h-[7dvh] w-[20dvw] transition placeholder-gray-400 bg-white rounded-xl text-black"
                                style={{padding: "10px"}}
                            placeholder="Digite sua senha"
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/4 transform-translate-y-1/2 text-gray-500 hover:text-gray-700 eyesPassword"
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                    )}

                    {successMessage && (
                        <p className="text-green-400 text-sm mt-2">{successMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="register-button mt-4"
                    >
                        Confirmar
                    </button>

                    <Link to="/home" className="text-[20px] underline" style={{margin: "20px"}}>Voltar a tela inicial</Link>
                </form>
            </div>

            <Footer />
        </section>
    );
};

export default Register;
