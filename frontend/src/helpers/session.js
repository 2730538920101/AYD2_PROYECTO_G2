import Cookies from 'js-cookie';

export const crearSession = (data) => {
    Cookies.set('auth', JSON.stringify(data), { expires: 1 / 24 });
};

export const cerrarSesion = () => {
    Cookies.remove('auth');
};

export const obtenerDatosUsuario = () => {
    const authData = Cookies.get('auth');
    if (!authData) {
        return null;
    }
    return JSON.parse(authData);
};
