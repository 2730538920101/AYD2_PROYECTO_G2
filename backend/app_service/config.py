import os

from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

class Config:
    APP_PORT = os.getenv('APP_PORT',5000)
    APP_HOST = os.getenv('APP_HOST','0.0.0.0')
    MYSQL_DATABASE=os.getenv('MYSQL_DATABASE', '')
    MYSQL_USER=os.getenv('MYSQL_USER', '')
    MYSQL_PASSWORD=os.getenv('MYSQL_PASSWORD', '')
    MYSQL_HOST=os.getenv('MYSQL_HOST','localhost')
    DATABASE_PORT=os.getenv('DATABASE_PORT', 3306)
    AWS_REGION=os.getenv('AWS_REGION', '')
    AWS_BUCKET_NAME=os.getenv('AWS_BUCKET_NAME', '') 
    AWS_ACCESS_KEY_ID=os.getenv('AWS_ACCESS_KEY_ID','')
    AWS_SECRET_ACCESS_KEY=os.getenv('AWS_SECRET_ACCESS_KEY','')
    COGNITO_USER_POOL_ID=os.getenv('COGNITO_USER_POOL_ID', '')
    COGNITO_USER_POOL_CLIENT_ID=os.getenv('COGNITO_USER_POOL_CLIENT_ID', '')
    COGNITO_IDENTITY_POOL_ID=os.getenv('COGNITO_IDENTITY_POOL_ID', '')
    ADMIN_EMAIL=os.getenv('ADMIN_EMAIL','')
    ADMIN_PASSWORD=os.getenv('ADMIN_PASSWORD','')
    ADMIN_VALIDATION=os.getenv('ADMIN_VALIDATION','')

