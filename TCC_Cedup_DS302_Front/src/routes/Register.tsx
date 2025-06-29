import './css/Register.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const Register = () => {

    const [cpf, setCpf] = useState('');

    const formatCPF = (e: any) => {
        // Remove tudo que não for dígito
        let value = e.target.value.replace(/\D/g, '');
        
        // Limita a 11 caracteres (tamanho do CPF)
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        // Aplica a formatação do CPF (XXX.XXX.XXX-XX)
        if (value.length > 3 && value.length <= 6) {
            value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
        } else if (value.length > 6 && value.length <= 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        }
        
        setCpf(value);
    };

    return (
        <>
            <section id="register">
                <div className="box">
                    <FontAwesomeIcon icon={faCircleUser} size="4x" />
                </div>
                <div className="container-register">
                    <form className="register-form">
                        <h1>Cadastro</h1>     

                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Digite seu nome completo"
                                id="nameUser"
                                required
                            />
                        </div>

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

                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Digite seu CPF"
                                id='cpfUser'
                                value={cpf}
                                onChange={formatCPF}
                                inputMode="numeric" // Teclado numérico em dispositivos móveis
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="tel"
                                placeholder='Telefone(Opcional)'
                                id="telUser" />
                        </div>
            
                        <div className="form-group-small-box">
                            <input type="checkbox"
                                id=""
                            />
                            <h3>Lembrar-me</h3>
                        </div>

                        <button type="submit" className="register-button">Confirmar</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Register