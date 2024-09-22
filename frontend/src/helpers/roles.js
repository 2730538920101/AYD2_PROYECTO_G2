export const GetRoleFromGroup = (group) => {
    if (group === "AdminGroup") {
        return "ADMINISTRADOR";
    }else if (group === "AssistantGroup") {
        return "ASISTENTE";
    }else if (group === "DriverGroup") {
        return "CONDUCTOR";
    }else if (group === "ClientGroup") {
        return "USUARIO";
    }

}
