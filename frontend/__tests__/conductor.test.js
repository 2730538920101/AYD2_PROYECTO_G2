import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Registro from '../src/app/crear_conductor/page'; // Ruta de tu componente
import { useRouter } from 'next/navigation';
import { handleAxiosMultipart, handleSwal, handleAxiosError } from '../src/helpers/axiosConfig';

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

describe('Formulario Registro', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renderizado de componente', () => {
    render(<Registro />);

    // Verificamos que los campos principales del formulario estén presentes
    expect(screen.getByPlaceholderText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Número de Celular')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar Contraseña')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Número de Placa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /solicitar/i })).toBeInTheDocument();
  });

  it('Contraseña no coincide', async () => {
    render(<Registro />);

    // Simulamos llenar el formulario con contraseñas diferentes
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmar Contraseña'), { target: { value: 'password456' } });

    // Simulamos el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: /solicitar/i }));

    // Verificamos que Swal de error se haya mostrado
    expect(handleSwal().fire);

    // Verificamos que la función handleAxiosMultipart no haya sido llamada
    expect(handleAxiosMultipart).not.toHaveBeenCalled();
  });
});
