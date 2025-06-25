import { useNavigate } from "react-router-dom";

interface RouteButtonProps {
    path: string;
    label: string;
}

const RouteButton = ({path, label}: RouteButtonProps) => {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate(path)}>{label}</button>
        </>
    );
};

export default RouteButton;