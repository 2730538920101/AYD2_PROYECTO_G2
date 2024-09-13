from functools import wraps
from app.services.encryption_service import encrypt_password, verify_password

def encryption_proxy(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        action = kwargs.pop('action', 'encrypt')  # Acción: 'encrypt' o 'verify'
        password = kwargs.get('password') or (args[0] if args else None)
        
        if not password:
            raise ValueError("Password must be provided")
        
        if action == 'encrypt':
            encrypted_password = encrypt_password(password)
            return encrypted_password
        elif action == 'verify':
            hashed_password = kwargs.get('hashed_password') or (args[1] if len(args) > 1 else None)
            if not hashed_password:
                raise ValueError("Hashed password must be provided for verification")
            password_is_valid = verify_password(password, hashed_password)
            return password_is_valid
        else:
            raise ValueError("Invalid action provided. Use 'encrypt' or 'verify'.")
    return wrapper
