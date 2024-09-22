import jwt
import requests
from jose import jwk, jwt
from jose.utils import base64url_decode
from flask import request, jsonify
from functools import wraps
import time
import boto3
from config import Config

class AuthService:
    def __init__(self):
        self.cognito_client = boto3.client('cognito-idp', region_name=Config.AWS_REGION)
        self.jwks_url = f"https://cognito-idp.{Config.AWS_REGION}.amazonaws.com/{Config.COGNITO_USER_POOL_ID}/.well-known/jwks.json"
        self.jwks_cache = None
        self.jwks_cache_expiry = 0

    def _get_jwks(self):
        """Obtiene las claves públicas de Cognito y las almacena en caché."""
        # Si el JWKS está en caché y no ha expirado, devolverlo
        if self.jwks_cache and time.time() < self.jwks_cache_expiry:
            return self.jwks_cache

        # Si no está en caché o ha expirado, hacer la solicitud
        try:
            response = requests.get(self.jwks_url)
            self.jwks_cache = response.json()
            self.jwks_cache_expiry = time.time() + 3600  # Caché válida por 1 hora
            return self.jwks_cache
        except Exception as e:
            print(f"Error fetching JWKS: {e}")
            return None

    def verify_token(self, token):
        """Verifica si el token de ID es válido, incluyendo la firma y expiración."""
        try:
            # Decodificar el encabezado sin verificar la firma para extraer el kid
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header['kid']

            # Obtener el JWKS y encontrar la clave correcta
            jwks = self._get_jwks()
            key = next((k for k in jwks['keys'] if k['kid'] == kid), None)
            if key is None:
                raise ValueError("Public key not found.")

            # Construir la clave pública para la verificación
            public_key = jwk.construct(key)
            message, encoded_signature = str(token).rsplit('.', 1)
            decoded_signature = base64url_decode(encoded_signature.encode('utf-8'))

            # Verificar la firma del token
            if not public_key.verify(message.encode("utf8"), decoded_signature):
                raise jwt.JWTError("Signature verification failed")

            # Decodificar el token con la verificación completa
            decoded_token = jwt.decode(token, public_key.to_pem(), algorithms=['RS256'])

            # Verificar la expiración del token
            current_time = time.time()
            if decoded_token['exp'] < current_time:
                raise jwt.ExpiredSignatureError("Token has expired")

            return decoded_token
        except Exception as e:
            print(f"Error decoding token: {e}")
            return None

    def get_user_groups(self, decoded_token):
        """Obtiene los grupos a los que pertenece el usuario desde el ID Token decodificado."""
        try:
            groups = decoded_token.get("cognito:groups", [])
            return groups
        except Exception as e:
            print(f"Error getting user groups: {e}")
            return []

    def is_authorized(self, allowed_groups):
        """Verifica si el usuario pertenece a alguno de los grupos permitidos."""
        def wrapper(func):
            @wraps(func)
            def decorated_function(*args, **kwargs):
                auth_header = request.headers.get("Authorization")
                if not auth_header:
                    return jsonify({"error": "Missing Authorization header"}), 401

                try:
                    token = auth_header.split(" ")[1]
                except IndexError:
                    return jsonify({"error": "Invalid Authorization header format"}), 401

                decoded_token = self.verify_token(token)
                if not decoded_token:
                    return jsonify({"error": "Invalid or expired token"}), 403

                user_groups = self.get_user_groups(decoded_token)
                if not any(group in allowed_groups for group in user_groups):
                    return jsonify({"error": "User not authorized"}), 403

                return func(*args, **kwargs)
            return decorated_function
        return wrapper
