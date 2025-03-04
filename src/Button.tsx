import React, { PropsWithChildren } from 'react';

interface ButtonProps {
    onClick: () => void;
    label?: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ onClick, label, children }) => {
    return (
        <button onClick={onClick}>
            {label || children} This is a button
        </button>
    );
};

export default Button;