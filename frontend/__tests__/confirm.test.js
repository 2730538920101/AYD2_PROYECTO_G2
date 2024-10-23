import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Confirm from '../src/app/confirm/page';
import { useRouter } from 'next/navigation';
import { handleAxios, handleAxiosError, handleSwal } from '../src/helpers/axiosConfig';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/helpers/axiosConfig', () => ({
  handleAxios: jest.fn(),
  handleAxiosError: jest.fn(),
  handleSwal: jest.fn(() => ({
    fire: jest.fn(() => Promise.resolve({})),
  })),
}));

describe('Confirmación de cuenta', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renderizado de componente', () => {
    render(<Confirm />);

    // Verificamos que el título del formulario esté presente
    expect(screen.getByRole('heading', { name: /confirmar cuenta/i })).toBeInTheDocument();

    // Verificamos que los campos de correo electrónico y código de confirmación estén presentes
    expect(screen.getByPlaceholderText('mail@mail.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Código')).toBeInTheDocument();

    // Verificamos que el botón de confirmar esté presente
    expect(screen.getByRole('button', { name: /confirmar cuenta/i })).toBeInTheDocument();
  });

  it('Respuesta de Api', async () => {
    const mockRouterPush = jest.fn();
    const mockAxiosResponse = {
      status: 200,
      data: {},
    };

    useRouter.mockImplementation(() => ({
      push: mockRouterPush,
    }));
    
    handleAxios.mockResolvedValue(mockAxiosResponse);

    render(<Confirm />);

    // Simulamos llenar el formulario
    fireEvent.change(screen.getByPlaceholderText('mail@mail.com'), { target: { value: 'test@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Código'), { target: { value: '123456' } });

    // Simulamos el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: /confirmar cuenta/i }));

    // Verificamos que se haya hecho la llamada a la API con los datos correctos
    expect(handleAxios).toHaveBeenCalledTimes(1);
  });
});
