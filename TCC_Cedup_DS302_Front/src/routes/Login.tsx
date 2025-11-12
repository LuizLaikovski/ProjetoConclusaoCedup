import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/Login.css';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

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
    const navigate = useNavigate();

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

        const bodyData = {
            email: formData.email.trim(),
            password: formData.password.trim()
        }       

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify(bodyData)
            });

            const data = await response.json();
            console.log(data);
            
            
            if (response.ok) {
                const dataUser = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    booksFavorited: data.booksFavorited || []
                }
                
                localStorage.setItem("idUser", JSON.stringify(dataUser.id))
                localStorage.setItem("nameUser", JSON.stringify(dataUser.name))
                localStorage.setItem("emailUser", JSON.stringify(dataUser.email))
                localStorage.setItem("booksFavorited", JSON.stringify(dataUser.booksFavorited.path))

                navigate("/home");
            } else {
                alert("Email ou senha incorretos")
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <section id="login" className='flex justify-center items-center relative min-h-[100dvh]'>
                <div className="box flex justify-center items-center z-50 h-[17vh] w-[17vh] rounded-[50%]">
                    <FontAwesomeIcon icon={faCircleUser} size="5x" color='white' />
                </div>
                <div className="container-login absolute z-10 w-[30vw] h-[64vh] rounded-2xl">
                    <form className="login-form flex justify-center text-white items-center flex-col" onSubmit={Login}>
                        <h1>Login</h1>
                        
                        <div className="form-group">
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                className="h-[7dvh] w-[100%] lg:w-[20dvw] transition placeholder-gray-400 bg-white rounded-xl text-black"
                                style={{padding: "10px"}}
                                placeholder="Digite seu Email" 
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                className="bg-white rounded-xl h-[7dvh] w-[100%] lg:w-[20dvw] placeholder-gray-400 text-black"
                                style={{padding: "10px"}}
                                placeholder="Digite sua Senha"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <button type="submit" className="login-button w-[20dvw] ">Confirmar</button>
                        <Link to="/cadastro" className='link-return underline'>Ainda não possuo uma conta</Link>
                    </form>

                </div>
                <Footer />
            </section>
        </>
    );
};

export default Login;