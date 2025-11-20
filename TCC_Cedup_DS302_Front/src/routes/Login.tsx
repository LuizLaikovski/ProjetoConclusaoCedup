import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/Login.css';
import { faCircleUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import ModalForgotPassword from '../components/ModalForgotPassword';

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        rememberMe: false
    });
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL_USER;
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [button, setButton] = useState(true);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const Login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setButton(false);


        const bodyData = {
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify({
                    email: bodyData.email,
                    password: bodyData.password
                })
            });

            const raw = await response.text();
            let data: any = null;

            try {
                data = JSON.parse(raw);
            } catch {
                data = raw;
            }

            if (!response.ok) {
                let message = "Erro desconhecido";

                if (typeof data === "string") {
                    message = data;
                } else if (data?.error) {
                    message = data.error;
                } else if (data?.message) {
                    message = data.message;
                }

                setError(message);
                setLoading(false);
                setButton(true);
                return;
            }

            const dataUser = {
                id: data.id,
                name: data.name,
                email: data.email,
                booksFavorited: data.booksFavorited || []
            };

            localStorage.setItem("idUser", dataUser.id);
            localStorage.setItem("nameUser", dataUser.name);
            localStorage.setItem("emailUser", dataUser.email);
            localStorage.setItem("booksFavorited", JSON.stringify(dataUser.booksFavorited));

            navigate("/home");

        } catch (error) {
            console.error(error);
            setLoading(false);
            setButton(true);
            setError(error instanceof Error ? error.message : "Erro inesperado");
        }
    };

    const openModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <section className="flex justify-center items-center">
                <div className='flex justify-center items-center w-[40dvw] h-[85dvh]' style={{marginTop: "10dvh"}}>
                    <div
                        className="box bg-[var(--primary)] flex justify-center items-center z-50 rounded-[50%]"
                        style={{
                            height: "17vh",
                            width: "17vh",
                            marginBottom: "67dvh"
                        }}
                        data-aos="zoom-in-down"
                    >
                        <FontAwesomeIcon icon={faCircleUser} size="5x" color="white" />
                    </div>

                    <div
                        className="bg-[var(--tertiary)] h-[70dvh] w-[90%] max-w-[420px] container-login absolute z-10 rounded-2xl"
                        data-aos="zoom-in-up"
                    >
                        <form className="login-form flex justify-center text-white items-center flex-col" onSubmit={Login}>
                            <h1 className="text-5xl font-bold" style={{ margin: "12vh 0 2vh 0" }}>Login</h1>

                            <div style={{ marginBottom: "1.5rem", width: "85%" }}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="bg-white rounded-xl h-[7vh] text-black placeholder-gray-400 transition w-full"
                                    style={{padding: "10px"}}
                                    placeholder="Digite seu Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group relative" style={{ width: "85%", marginBottom: "1.5rem" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="bg-white rounded-xl h-[7vh] w-full text-black placeholder-gray-400"
                                    style={{padding: "10px"}}
                                    placeholder="Digite sua Senha"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[50%] text-gray-500 hover:text-gray-700 eyesPassword"
                                    style={{transform: "translateY(-50%)"}}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>

                            {error && <p className="error-message text-red-500 text-center">{error}</p>}
                            {loading && <div className="loader h-[45px] w-[45px]"></div>}

                            {button && <button
                                type="submit"
                                className="primary-button w-[85%] login-button rounded-xl"
                                style={{
                                    padding: "12px 0",
                                    marginTop: "1rem"
                                }}
                            >
                                Confirmar
                            </button>}

                            <Link
                                to="/cadastro"
                                className="text-[20px] text-[var(--secondary)] underline"
                                style={{ marginTop: "2vh" }}
                            >
                                Ainda não possuo uma conta
                            </Link>
                            <button
                                onClick={openModal}
                                className="text-[20px] text-[var(--secondary)] underline"
                                style={{ marginTop: "2vh" }}
                            >
                                Esqueci minha senha
                            </button>

                        </form>
                    </div>
                </div>

                {modal && <ModalForgotPassword setModal={setModal} />}
                <Footer />
            </section>
        </>

    );
};

export default Login;