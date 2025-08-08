import { useNavigate } from "react-router-dom";

interface RouteButtonProps {
    path: string;
    label?: React.ReactNode;
    img?: React.ReactNode;
    style?: React.CSSProperties;
    classe?: string;     // o ? antes do : quer dizer que é opcional
}


const RouteButton = ({ path, label, img, style, classe }: RouteButtonProps) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(path)} style={style} className={classe} >
            {img && <span style={{ marginRight: label ? 8 : 0 }}>{img}</span>}
            {label}
        </button>
    );
};

export default RouteButton;