from app.models.proxy.encryption_proxy import encryption_proxy

class EncryptionController:

    @encryption_proxy
    def encrypt(self, encrypted_password: str) -> str:
        """
        Recibe una contraseña encriptada y la devuelve.
        """
        return encrypted_password

    @encryption_proxy
    def verify(self, is_valid: bool) -> bool:
        """
        Recibe el resultado de la verificación de la contraseña y lo devuelve.
        """
        return is_valid
