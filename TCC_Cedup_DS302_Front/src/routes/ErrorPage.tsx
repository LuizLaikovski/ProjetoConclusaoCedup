import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return(
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <h1>Error Page 404!</h1>


                <h3>Opss!</h3>
                <p>Desculpe, a página que você está procurando não existe.</p>
                <p>
                    <i>{(error as Error)?.message  || "Página não encontrada"}</i>
                </p>
            </div>
        </>
    );
};

export default ErrorPage;