CREATE DATABASE IF NOT EXISTS PROYECTO_VIAJES;
USE PROYECTO_VIAJES;

-- Tabla Cliente
CREATE TABLE Cliente (
    CLI_ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(200) NOT NULL,
    FECHA_NACIMIENTO DATE NOT NULL,
    GENERO CHAR(1) NOT NULL,
    CORREO VARCHAR(200) NOT NULL UNIQUE,
    FOTO_DPI TEXT NOT NULL,
    TELEFONO BIGINT NOT NULL UNIQUE,
    CONTRASENIA VARCHAR(200) NOT NULL
);


-- Tabla Oferta
CREATE TABLE Oferta (
    OFERTA_ID INT PRIMARY KEY AUTO_INCREMENT,
    CLI_ID INT,
    FECHA_VENCIMIENTO DATE NOT NULL,
    CREDITO DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CLI_ID) REFERENCES Cliente(CLI_ID)
);

-- Tabla Conductor
CREATE TABLE Conductor (
    CON_ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(200) NOT NULL,
    TELEFONO BIGINT NOT NULL UNIQUE,
    ESTADO_CIVIL VARCHAR(150) NOT NULL,
    GENERO CHAR(1) NOT NULL,
    CORREO VARCHAR(200) NOT NULL UNIQUE,
    CODIGO_EMPLEADO VARCHAR(200) UNIQUE,
    CONTRASENIA VARCHAR(200) NOT NULL,
    FECHA_NACIMIENTO DATE NOT NULL,
    DIRECCION VARCHAR(250) NOT NULL,
    NUMERO_DPI BIGINT NOT NULL UNIQUE,
    NUMERO_CUENTA BIGINT UNIQUE,
    PAPELERIA TEXT NOT NULL,
    FOTOGRAFIA TEXT NOT NULL,
    MARCA_VEHICULO VARCHAR(100) NOT NULL,
    PLACA VARCHAR(100) NOT NULL UNIQUE,
    ANIO INT NOT NULL,
    ESTADO_INFORMACION VARCHAR(100) NOT NULL
);

-- Tabla Solicitud_Conductor
CREATE TABLE Solicitud_Conductor(
    SOL_CON_ID INT PRIMARY KEY AUTO_INCREMENT,
    CON_ID INT NOT NULL,
    TELEFONO BIGINT NOT NULL UNIQUE,
    ESTADO_CIVIL VARCHAR(150) NOT NULL,
    GENERO CHAR(1) NOT NULL,
    CORREO VARCHAR(200) NOT NULL UNIQUE,
    FECHA_NACIMIENTO DATE NOT NULL,
    DIRECCION VARCHAR(250) NOT NULL,
    NUMERO_DPI BIGINT NOT NULL UNIQUE,
    NUMERO_CUENTA BIGINT UNIQUE,
    PAPELERIA TEXT NOT NULL,
    FOTOGRAFIA TEXT NOT NULL,
    MARCA_VEHICULO VARCHAR(100) NOT NULL,
    PLACA VARCHAR(100) NOT NULL UNIQUE,
    ANIO INT NOT NULL,
    FOREIGN KEY (CON_ID) REFERENCES Conductor(CON_ID)
);

-- Tabla Justificacion de cancelacion de viajes del conductor
CREATE TABLE Justificacion_Conductor(
    JUS_CON_ID INT PRIMARY KEY AUTO_INCREMENT,
    CON_ID INT NOT NULL,
    FECHA_JUSTIFICACION DATE NOT NULL,
    DOCUMENTO TEXT NOT NULL,
    FOREIGN KEY (CON_ID) REFERENCES Conductor(CON_ID)
);

-- Tabla Viaje
CREATE TABLE Viaje (
    VIA_ID INT PRIMARY KEY AUTO_INCREMENT,
    CLI_ID INT,
    CONDUCTOR_CON_ID INT,
    ESTADO VARCHAR(100) NOT NULL,
    FECHA_INICIO DATE NOT NULL,
    FECHA_FIN DATE,
    ORIGEN VARCHAR(100) NOT NULL,
    DESTINO VARCHAR(100) NOT NULL,
    TOTAL DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CLI_ID) REFERENCES Cliente(CLI_ID),
    FOREIGN KEY (CONDUCTOR_CON_ID) REFERENCES Conductor(CON_ID)
);

-- Tabla Alerta
CREATE TABLE Alerta (
    ALERTA_ID INT PRIMARY KEY AUTO_INCREMENT,
    VIAJE_VIA_ID INT,
    TIPO_ALERTA VARCHAR(150) NOT NULL,
    MENSAJE VARCHAR(250) NOT NULL,
    ADJUNTO TEXT,
    FECHA_HORA DATETIME NOT NULL,
    FOREIGN KEY (VIAJE_VIA_ID) REFERENCES Viaje(VIA_ID)
);

-- Tabla Reporte para reportartar si el cliente no paga el viaje
CREATE TABLE Reporte_Pago (
    REPORTE_PAGO_ID INT PRIMARY KEY AUTO_INCREMENT,
    VIAJE_VIA_ID INT,
    MENSAJE VARCHAR(250) NOT NULL,
    FECHA_HORA DATETIME NOT NULL,
    FOREIGN KEY (VIAJE_VIA_ID) REFERENCES Viaje(VIA_ID)
);

-- Tabla Cancelado
CREATE TABLE  Cancelado(
    CANCELADO_ID INT PRIMARY KEY AUTO_INCREMENT,
    VIAJE_VIA_ID INT,
    TIPO_CANCELACION VARCHAR(150) NOT NULL,
    MENSAJE VARCHAR(250) NOT NULL,
    FECHA_HORA DATETIME NOT NULL,
    FOREIGN KEY (VIAJE_VIA_ID) REFERENCES Viaje(VIA_ID)
);

-- Tabla Asistente
CREATE TABLE Asistente (
    ASISTENTE_ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(200) NOT NULL,
    TELEFONO BIGINT NOT NULL UNIQUE,
    ESTADO_CIVIL VARCHAR(150) NOT NULL,
    GENERO CHAR(1) NOT NULL,
    CORREO VARCHAR(200) NOT NULL UNIQUE,
    CODIGO_USUARIO VARCHAR(200) NOT NULL UNIQUE,
    CONTRASENIA VARCHAR(200) NOT NULL,
    FECHA_NACIMIENTO DATE NOT NULL,
    DIRECCION VARCHAR(250) NOT NULL,
    NUMERO_DPI BIGINT NOT NULL UNIQUE,
    NUMERO_CUENTA BIGINT UNIQUE,
    PAPELERIA TEXT
);

-- Tabla Tarifa
CREATE TABLE Tarifa (
    TARIFA_ID INT PRIMARY KEY AUTO_INCREMENT,
    ORIGEN VARCHAR(100) NOT NULL,
    DESTINO VARCHAR(100) NOT NULL,
    MONTO DECIMAL(10, 2) NOT NULL,
    UNIQUE (ORIGEN, DESTINO)
);

-- Tabla Administrador
CREATE TABLE Administrador (
    ADMIN_ID INT PRIMARY KEY AUTO_INCREMENT,
    USUARIO VARCHAR(100) NOT NULL UNIQUE,
    CONTRASENIA VARCHAR(200) NOT NULL,
    VALIDACION VARCHAR(200) NOT NULL
);


DELIMITER $$

CREATE PROCEDURE ChangePassword(
    IN p_email VARCHAR(255),
    IN p_new_password VARCHAR(255),
    IN p_user_type ENUM('Asistente', 'Conductor', 'Cliente', 'Administrador')
)
BEGIN
    IF p_user_type = 'Administrador' THEN
        UPDATE Administrador
        SET CONTRASENIA = p_new_password
        WHERE USUARIO = p_email;
    ELSEIF p_user_type = 'Asistente' THEN
        UPDATE Asistente
        SET CONTRASENIA = p_new_password
        WHERE CORREO = p_email;
    ELSEIF p_user_type = 'Conductor' THEN
        UPDATE Conductor
        SET CONTRASENIA = p_new_password
        WHERE CORREO = p_email;
    ELSEIF p_user_type = 'Cliente' THEN
        UPDATE Cliente
        SET CONTRASENIA = p_new_password
        WHERE CORREO = p_email;
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE GetPassword(
    IN p_email VARCHAR(255),
    IN p_user_type VARCHAR(50)
)
BEGIN
    CASE 
        WHEN p_user_type = 'Cliente' THEN 
            SELECT CONTRASENIA FROM Cliente WHERE CORREO = p_email;
        WHEN p_user_type = 'Conductor' THEN 
            SELECT CONTRASENIA FROM Conductor WHERE CORREO = p_email;
        WHEN p_user_type = 'Asistente' THEN 
            SELECT CONTRASENIA FROM Asistente WHERE CORREO = p_email;
        WHEN p_user_type = 'Administrador' THEN 
            SELECT CONTRASENIA FROM Administrador WHERE USUARIO = p_email;
        ELSE 
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid user type';
    END CASE;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE ValidateUser(
    IN p_input VARCHAR(255)
)
BEGIN
    DECLARE v_email VARCHAR(255);
    
    SELECT CORREO INTO v_email
    FROM Cliente
    WHERE CORREO = p_input;

    IF v_email IS NOT NULL THEN
        SELECT v_email AS validacion;
    ELSE
        SELECT CORREO INTO v_email
        FROM Conductor
        WHERE CORREO = p_input;

        IF v_email IS NOT NULL THEN
            SELECT v_email AS validacion;
        ELSE
            SELECT CORREO INTO v_email
            FROM Asistente
            WHERE CORREO = p_input;

            IF v_email IS NOT NULL THEN
                SELECT v_email AS validacion;
            ELSE
                SELECT USUARIO INTO v_email
                FROM Administrador
                WHERE USUARIO = p_input;

                IF v_email IS NOT NULL THEN
                    SELECT v_email AS validacion;
                ELSE
                    SELECT CORREO INTO v_email
                    FROM Conductor
                    WHERE CODIGO_EMPLEADO = p_input;

                    IF v_email IS NOT NULL THEN
                        SELECT v_email AS validacion;
                    ELSE
                        SELECT CORREO INTO v_email
                        FROM Asistente
                        WHERE CODIGO_USUARIO = p_input;

                        IF v_email IS NOT NULL THEN
                            SELECT v_email AS validacion;
                        ELSE
                            SELECT NULL AS validacion;
                        END IF;
                    END IF;
                END IF;
            END IF;
        END IF;
    END IF;
END$$

DELIMITER ;