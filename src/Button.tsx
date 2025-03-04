import React, { PropsWithChildren, useEffect } from 'react';

interface ButtonProps {
    onClick: () => void;
    label?: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ onClick, label, children }) => {

    useEffect(() => {
        console.log('Button component mounted');
        return () => {
            console.log('Button component unmounted');
        };
    })

    return (
        <button onClick={onClick}>
            {label || children}
        </button>
    );
};

export default Button;