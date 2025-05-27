from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import os

# Create a security scheme
security = HTTPBasic()

# Hardcoded email and password
VALID_EMAIL = os.getenv("EMAIL_HOST_USER")
print(VALID_EMAIL)
VALID_PASSWORD = os.getenv("AUTH_PASSWORD")
print(VALID_PASSWORD)

def authenticate(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != VALID_EMAIL or credentials.password != VALID_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return True