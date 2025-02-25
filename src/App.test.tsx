import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// FILE: src/App.test.tsx

describe('App Component', () => {
  test('renders Vite and React logos', () => {
    render(<App />);
    const viteLogo = screen.getByAltText('Vite logo');
    const reactLogo = screen.getByAltText('React logo');
    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  test('initial count is 0', () => {
    render(<App />);
    const countButton = screen.getByRole('button', { name: /count is 0/i });
    expect(countButton).toBeInTheDocument();
  });

  test('increments count on button click', () => {
    render(<App />);
    const countButton = screen.getByRole('button', { name: /count is 0/i });
    fireEvent.click(countButton);
    expect(countButton).toHaveTextContent('count is 1');
  });
});