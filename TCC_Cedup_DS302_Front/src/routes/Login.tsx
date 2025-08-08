import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/Login.css';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Checkbox from '../components/Checkbox';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [showData, setShowData] = useState(false); // Estado para controlar a exibição dos dados

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setShowData(true); // Mostra os dados quando o formulário é submetido
        
        // Simulação de login (substitua pelo seu código real de API)
        console.log('Dados do formulário:', formData);
    };
    

    return(
        <>
            <section id="login">
                <div className="box">
                    <FontAwesomeIcon icon={faCircleUser} size="5x" />
                </div>
                <div className="container-login">
                    <form className="login-form" onSubmit={handleSubmit}>
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
                        
                        <button type="submit" className="login-button">Confirmar</button>
                        <Link to="/cadastro" className='link-return underline'>Ainda não possuo uma conta</Link>
                    </form>


                    {/* Área para exibir os dados do formulário */}
                    {showData && (
                        <div className="form-data-display">
                            <h3>Dados Informados:</h3>
                            <p></p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Senha:</strong> {formData.password}</p>
                            <p><strong>Lembrar-me:</strong> {formData.rememberMe ? 'Sim' : 'Não'}</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Login;