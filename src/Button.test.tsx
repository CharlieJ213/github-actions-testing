import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

// FILE: src/Button.test.tsx


describe('Button Component', () => {
    test('renders button with correct label', () => {
        render(<Button onClick={() => {}} label="Click Me" />);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls onClick function when button is clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick} label="Click Me" />);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});