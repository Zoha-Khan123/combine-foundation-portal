
from fastapi import APIRouter , Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from models.user_model import User
from utils.password_helper import verify_password
from utils.token_helper import create_access_token
from validations.validation import LoginUser

auth_router = APIRouter()




@auth_router.post("/login")
def login_user(user: LoginUser, db:Session=Depends(get_db)):
   
        db_user = db.query(User).filter(User.email == user.email).first()
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        if not verify_password(user.password, db_user.password):
            raise HTTPException(status_code=401, detail="Invalid password")
        try:
            token = create_access_token(data={"sub": db_user.email, "name": db_user.name, "role": db_user.role})
            return {"data":token, "message":"User logged in successfully", "status":"success"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")


