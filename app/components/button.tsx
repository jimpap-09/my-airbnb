interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: React.ReactElement;
}

const Button = ({ label, onClick, disabled, outline, small, icon }: ButtonProps) => {
    return (
        <button className="bg-rose-500 text-white py-3 px-4 rounded-lg hover:opacity-80 transition" onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default Button;