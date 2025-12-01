import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Props {
    oldPassword: string;
    onOldPasswordChange: (v: string) => void;

    newPassword: string;
    onNewPasswordChange: (v: string) => void;

    newPasswordConfirm: string;
    onNewPasswordConfirmChange: (v: string) => void;
    error?: string;
}

const NewPassword = ({
    oldPassword, onOldPasswordChange,
    newPassword, onNewPasswordChange,
    newPasswordConfirm, onNewPasswordConfirmChange, error
}: Props) => {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <div className="relative">
                <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Senha Antiga"
                    value={oldPassword}
                    onChange={(e) => onOldPasswordChange(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    style={{ padding: "6px", paddingRight: "40px" }}
                />

                <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                >
                    <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                </button>
            </div>

            <div className="relative">
                <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Nova Senha"
                    value={newPassword}
                    onChange={(e) => onNewPasswordChange(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    style={{ padding: "6px", paddingRight: "40px" }}
                />

                <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                >
                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                </button>
            </div>

            <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar Nova Senha"
                    value={newPasswordConfirm}
                    onChange={(e) => onNewPasswordConfirmChange(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    style={{ padding: "6px", paddingRight: "40px" }}
                />

                <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
            </div>

            <div className="flex justify-center items-center">
                <p className="text-red-500 text-[12px]">{error}</p>
            </div>
        </>
    );
};

export default NewPassword;