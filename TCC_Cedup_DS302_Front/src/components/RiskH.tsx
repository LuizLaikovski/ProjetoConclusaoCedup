interface RiskHProps {
    largura?: number; // largura em dvw (opcional)
    grossura?: number; // grossura em px (opcional)
    margens?: number; // margens em px (opcional)
}

const RiskH = ({ 
    largura = 50,  // Valor padrão: 100 (se undefined/null)
    grossura = 2,   // Valor padrão: 2 (se undefined/null)
    margens = 1     // Valor padrão: 0 (se undefined/null)
}: RiskHProps) => {
    
    return (
        <div
            style={{
                width: `${largura}dvw`,
                height: `${grossura}px`,
                backgroundColor: 'black',
                marginTop: `${margens}px`,
                marginBottom: `${margens}px`,
            }}
            className="RiscoH"
        />
    );
};

export default RiskH;