from ..models.proxy.encryption_proxy import encryption_proxy

class EncryptionController:

    @encryption_proxy
    def encrypt(self, password: str) -> str:
        """
        Recibe una contraseña en texto plano, la encripta y la devuelve.
        """
        return password  # Este método será reemplazado por el proxy

    @encryption_proxy
    def verify(self, is_valid: bool) -> bool:
        """
        Recibe el resultado de la verificación de la contraseña y lo devuelve.
        """
        return is_valid
