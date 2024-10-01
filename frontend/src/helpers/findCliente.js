import { handleAxiosError, handleAxios } from '@/helpers/axiosConfig';

export const FindCliente = async (email) => {
    try{
        const res = await handleAxios().get('clientes');
        const clientes = await res.data;
        for (let i = 0; i < clientes.length; i++) {
            console.log(clientes[i].correo, email)
            if (clientes[i].correo === email) {
                return clientes[i];
            }
        }
        console.log("not found")
        return null
    }catch(error){
        console.log(error)
        handleAxiosError(error);
        console.log("error")
        return null
    }
}
