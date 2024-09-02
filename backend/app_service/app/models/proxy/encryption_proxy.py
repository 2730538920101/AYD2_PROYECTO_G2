from functools import wraps
from app.services.encryption_service import encrypt_password, check_password

def encryption_proxy(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        action = kwargs.pop('action', 'encrypt')  # Acción: 'encrypt' o 'check'
        password = kwargs.get('password') or (args[0] if args else None)
        
        if not password:
            raise ValueError("Password must be provided")
        
        if action == 'encrypt':
            encrypted_password = encrypt_password(password)
            return func(encrypted_password, *args[1:], **kwargs)
        elif action == 'check':
            hashed_password = kwargs.get('hashed_password') or (args[1] if len(args) > 1 else None)
            if not hashed_password:
                raise ValueError("Hashed password must be provided for verification")
            password_is_valid = check_password(password, hashed_password)
            return func(password_is_valid, *args[2:], **kwargs)
        else:
            raise ValueError("Invalid action provided. Use 'encrypt' or 'check'.")
    return wrapper
