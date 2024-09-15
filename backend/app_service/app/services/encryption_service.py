import bcrypt

def encrypt_password(password: str) -> str:
    # Utiliza bcrypt para encriptar la contraseña
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hashed

def verify_password(password: str, hashed: str) -> bool:
    # Verifica si la contraseña coincide con el hash almacenado
    return bcrypt.checkpw(password.encode(), hashed.encode())
