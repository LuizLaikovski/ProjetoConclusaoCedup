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
    const API_URL = import.meta.env.VITE_API_URL;
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

    const Login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
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
                                className="h-[7dvh] w-[70dvw] lg:w-[20dvw] transition placeholder-gray-400 bg-white rounded-xl text-black"
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
                                className="bg-white rounded-xl h-[7dvh] w-[70dvw] lg:w-[20dvw] placeholder-gray-400 text-black"
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
