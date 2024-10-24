import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterUser from '../src/app/registro_usuario/page'; // Ruta de tu componente
import { useRouter } from 'next/navigation';
import { handleAxiosMultipart, handleAxiosError, handleSwal } from '../src/helpers/axiosConfig';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/helpers/axiosConfig', () => ({
  handleAxiosMultipart: jest.fn(),
  handleAxiosError: jest.fn(),
  handleSwal: jest.fn(() => ({
    fire: jest.fn(() => Promise.resolve({})),
  })),
}));

describe('Formulario Cliente', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renderizado de componente', () => {
    render(<RegisterUser />);

    // Verificamos que los campos principales estén presentes
    expect(screen.getByPlaceholderText('Nombre Apellido')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('direccion@correo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('88888888')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('¿Cuál fue el nombre de mi primero mascota?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });
});
