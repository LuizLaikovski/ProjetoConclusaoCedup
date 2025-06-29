import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/Login.css';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
    return(
        <>
        
            <section id="login">
                <div className="box">
                    <FontAwesomeIcon icon={faCircleUser} size="5x" />
                </div>
                <div className="container-login">
                    <form className="login-form">
                        <h1>Login</h1>
                        
                        <div className="form-group">
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Digite seu Email" 
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Digite sua Senha"
                                // ••••••••
                                required 
                            />
                        </div>

                        <div className="form-group-small-box">
                            <input type="checkbox"
                            id=""
                            />
                            <h3>Lembrar-me</h3>
                        </div>
                        
                        <button type="submit" className="login-button">Confirmar</button>
                        <Link to="/cadastro" className='link-return' >Ainda não possou uma conta</Link>
                    </form>
                    
                </div>
            </section>
        </>
    );
};

export default Login;   