import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/Login.css';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Checkbox from '../components/Checkbox';
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

    const [showData, setShowData] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowData(true);
        console.log('Dados do formulário:', formData);
    };

    return (
        <>
            <section id="login" className='flex justify-center items-center relative min-h-[100dvh]'>
                <div className="box flex justify-center items-center z-50 h-[17vh] w-[17vh] rounded-[50%]">
                    <FontAwesomeIcon icon={faCircleUser} size="5x" />
                </div>
                <div className="container-login absolute z-10 w-[30vw] h-[64vh] rounded-2xl">
                    <form className="login-form flex justify-center items-center flex-col" onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        
                        <div className="form-group">
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                className="input-login h-[5dvh] w-[20dvw]  placeholder-gray-400 text-black"
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
                                className="input-login h-[5dvh] w-[20dvw] placeholder-gray-400 text-black"
                                placeholder="Digite sua Senha"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-small-box">
                            <Checkbox checked={formData.rememberMe} onChange={handleChange} />
                            <label htmlFor="rememberMe">Lembrar-me</label>
                        </div>
                        
                        <button type="submit" className="login-button w-[20dvw] ">Confirmar</button>
                        <Link to="/cadastro" className='link-return underline'>Ainda não possuo uma conta</Link>
                    </form>

                    {showData && (
                        <div className="form-data-display">
                            <h3>Dados Informados:</h3>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Senha:</strong> {formData.password}</p>
                            <p><strong>Lembrar-me:</strong> {formData.rememberMe ? 'Sim' : 'Não'}</p>
                        </div>
                    )}
                </div>
                <Footer />
            </section>
        </>
    );
};

export default Login;
