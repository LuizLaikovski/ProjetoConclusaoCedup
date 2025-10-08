import './css/Register.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import Checkbox from '../components/Checkbox';
import Footer from '../components/Footer';

const Register = () => {

    const [cpf, setCpf] = useState('');
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        password: '',
        cpf: '',
        telefone: '',
        rememberMe: false
    });
    
    const [showData, setShowData] = useState(false);

    const saveToDB = async (data: any) => {
        try {
            const resposnse =  await fetch('./UsersTest.json');
            const db = await resposnse.json();

            db.users.push(data);

            const jsonData = JSON.stringify(data, null, 2);
            console.log(jsonData); // Aqui você pode salvar o JSON em um arquivo ou enviar para um servidor
        } catch (error) {
            console.error('Erro ao converter dados para JSON:', error);
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setShowData(true);

        saveToDB(formData);
    }

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

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


    formData.cpf = cpf;


    return (
        <>
            <section id="register">
                <div className="box-register">
                    <FontAwesomeIcon icon={faCircleUser} size="4x" />
                </div>
                <div className="container-register">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <h1 className=''>Cadastro</h1>     

                        <div className="form-group">
                            <input
                                type="text"
                                id="nomeCompleto"
                                name="nomeCompleto"
                                value={formData.nomeCompleto}
                                className="h-[5dvh] w-[20dvw] placeholder-gray-400 text-black"
                                placeholder="Digite seu nome completo"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                value={formData.email}
                                className="h-[5dvh] w-[20dvw] placeholder-gray-400 text-black"
                                placeholder="Digite seu Email" 
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                className="h-[5dvh] w-[20dvw]  placeholder-gray-400 text-black"
                                placeholder="Digite sua Senha"   // ••••••••
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                value={formData.cpf}
                                className="h-[5dvh] w-[20dvw]  placeholder-gray-400 text-black"
                                placeholder="Digite seu CPF"
                                onChange={formatCPF}
                                inputMode="numeric" // Teclado numérico em dispositivos móveis
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="tel"
                                id="telefone"
                                name="telefone"
                                value={formData.telefone}
                                className="h-[5dvh] w-[20dvw]  placeholder-gray-400 text-black"
                                placeholder='Telefone(Opcional)'
                                onChange={handleChange}
                            />
                        </div>
            
                        <div className="form-group-small-box">
                            <Checkbox checked={formData.rememberMe} onChange={handleChange} />
                            <label htmlFor="rememberMe">Lembrar-me</label>
                        </div>

                        <button type="submit" className="register-button">Confirmar</button>
                    </form>

                    {showData && (
                        <div className="data-display">
                            <h2>Dados do Formulário</h2>
                            <p><strong>Nome Completo:</strong> {formData.nomeCompleto}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Senha:</strong> {formData.password}</p>
                            <p><strong>CPF:</strong> {formData.cpf}</p>
                            <p><strong>Telefone:</strong> {formData.telefone}</p>
                            <p><strong>Lembrar-me:</strong> {formData.rememberMe ? 'Sim' : 'Não'}</p>
                        </div>
                    )}
                </div>
                <Footer />
            </section>
        </>
    );
};

export default Register