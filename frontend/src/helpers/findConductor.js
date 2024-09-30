import { handleAxiosError, handleAxios } from '@/helpers/axiosConfig';

export const FindConductor = async (email) => {
    try{
        const res = await handleAxios().get('conductores');
        const conductores = await res.data;
        for (let i = 0; i < conductores.length; i++) {
            console.log(conductores[i].correo, email)
            if (conductores[i].correo === email) {
                return conductores[i];
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
