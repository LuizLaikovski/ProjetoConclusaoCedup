import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate()

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Oops! Página não encontrada</h1>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <button onClick={() => navigate('/')}>
                Voltar para a página inicial
            </button>
        </div>
    )
}

export default ErrorPage;