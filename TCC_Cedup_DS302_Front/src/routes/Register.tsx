import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import "./css/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        password: '',
    });

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER;
    const navigate = useNavigate();

    const saveToDB = async (data: typeof formData) => {
        try {
            const bodyData = {
                name: data.nomeCompleto,
                email: data.email,
                password: data.password,
            };

            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) throw new Error("Erro ao enviar dados");
            const result = await response.json();

            if (result.id) {
                localStorage.setItem("idUser", result.id);
                localStorage.setItem("nameUser", result.name);
                localStorage.setItem("emailUser", result.email)
            }

            navigate("/home");
        } catch (error) {
            alert("Erro ao cadastrar usuário!");
            console.error('Erro ao salvar usuário:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                    className="flex flex-col justify-center items-center w-full"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-primary">Cadastro</h1>
                    <div className="w-full flex justify-center"
                    style={{margin: "24px"}}>
                        <input
                            type="text"
                            id="nomeCompleto"
                            name="nomeCompleto"
                            value={formData.nomeCompleto}
                            className="border-2 border-transparent w-[80%] h-[5vh] px-3 bg-gray-100 rounded-lg outline-none transition-all duration-300 text-black focus:border-secondary focus:bg-white focus:shadow-[0_0_0_5px_rgba(255,230,153,0.2)]"
                            style={{padding: "15px"}}
                            placeholder="Digite seu nome completo"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full flex justify-center"
                    style={{marginBottom: "24px"}}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            className="border-2 border-transparent w-[80%] h-[5vh] px-3 bg-gray-100 rounded-lg outline-none transition-all duration-300 text-black focus:border-secondary focus:bg-white focus:shadow-[0_0_0_5px_rgba(255,230,153,0.2)]"
                            style={{padding: "15px"}}
                            placeholder="Digite seu email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full flex justify-center"
                    style={{marginBottom: "24px"}}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            className="border-2 border-transparent w-[80%] h-[5vh] px-3 bg-gray-100 rounded-lg outline-none transition-all duration-300 text-black focus:border-secondary focus:bg-white focus:shadow-[0_0_0_5px_rgba(255,230,153,0.2)]"
                            style={{padding: "15px"}}
                            placeholder="Digite sua senha"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="register-button"
                    >
                        Confirmar
                    </button>
                </form>
            </div>

            <Footer />
        </section>
    );
};

export default Register;
