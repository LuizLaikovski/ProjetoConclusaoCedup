import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/Login.css';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        try {
            const response = await fetch('URL_DO_SEU_BACKEND/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok) {
                throw new Error('Erro no login');
            }

            const data = await response.json();
            
            // Armazena o token se necessário
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            
            // Redireciona o usuário após login bem-sucedido
            // window.location.href = '/dashboard';
            
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Aqui você pode adicionar tratamento de erros, como mostrar uma mensagem para o usuário
        }
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
                                placeholder="Digite sua Senha"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-small-box">
                            <input 
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <h3>Lembrar-me</h3>
                        </div>
                        
                        <Link to='/home'><button type="submit" className="login-button" >Confirmar</button></Link>
                        <Link to="/cadastro" className='link-return'>Ainda não possuo uma conta</Link>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;