import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const MySwal = withReactContent(Swal);

export const handleAxiosMsg = (response, icon_response = "success") => {
    return new Promise((resolve) => {
        const Toast = MySwal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = MySwal.stopTimer;
                toast.onmouseleave = MySwal.resumeTimer;
                resolve();
            }
        });
        Toast.fire({
            icon: icon_response,
            title: "Hecho",
            text: response
        });
    });
}

export const handleAxiosError = (error) => {

    console.log(error)
    // Se verifica si error.response.data.message es un array
    if (error.response){
        if (Array.isArray(error.response.data.message)) {
            let messages = "";
            error.response.data.message.forEach((message) => {
                messages += message.msg + "<br>";
            });
            return MySwal.fire({
                title: 'Aviso',
                html: messages,
                icon: 'warning'
            });
        }

        MySwal.fire({
            title: 'Aviso',
            html: error.response.data.error,
            icon: 'warning'
        });
    }else{
        MySwal.fire({
            title: 'Aviso',
            html: error,
            icon: 'warning'
        });

    }
};

export const handleSwal = () => {
    return MySwal;
}

export const handleAxios = () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios;
};

export const handleAxiosMultipart = () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    return axios;
};

export const handleAxiosJWT = () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.interceptors.request.use(
        (config) => {
            const access_token = localStorage.getItem('accessToken');
            if (access_token) {
                config.headers.Authorization = `Bearer ${access_token}`;
            }
            return config
        },
        (error) => {
            return Promise.reject(error);
        }

    );
    
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // NOTE: Aquí se implementaría el refresh del token, de ser necesario
            return Promise.reject(error);
        }
    );
    return axios;
}

export const handleAxiosMultipartJWT = () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    axios.interceptors.request.use(
        (config) => {
            const access_token = localStorage.getItem('accessToken');
            if (access_token) {
                config.headers.Authorization = `Bearer ${access_token}`;
            }
            return config
        },
        (error) => {
            return Promise.reject(error);
        }

    );
    
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // NOTE: Aquí se implementaría el refresh del token, de ser necesario
            return Promise.reject(error);
        }
    );
    return axios;
}
