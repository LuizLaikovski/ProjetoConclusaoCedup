import { useNavigate } from "react-router-dom";

interface RouteButtonProps {
    path: string;
    label?: React.ReactNode;
    img?: React.ReactNode;
    style?: React.CSSProperties; // o ? antes do : quer dizer que é opcional
}


const RouteButton = ({ path, label, img, style }: RouteButtonProps) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(path)} style={style} >
            {img && <span style={{ marginRight: label ? 8 : 0 }}>{img}</span>}
            {label}
        </button>
    );
};

export default RouteButton;