import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/app/login/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Login', () => {
  it('Renderizado de componente', () => {
    render(<Login />);

    // Verificamos que el título del formulario de inicio de sesión esté presente
    expect(screen.getByRole('heading', { name: /inicio de sesión/i })).toBeInTheDocument();

    // Verificamos que los campos del formulario estén presentes
    expect(screen.getByPlaceholderText('mail@mail.com')).toBeInTheDocument(); // Selección por placeholder
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();    // Selección por placeholder

    // Verificamos que el botón de iniciar sesión esté presente
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });
});
