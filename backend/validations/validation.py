from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# User creation model
class UserCreate(BaseModel):
    role: str
    name: str
    gender: str
    date_of_birth: str
    phone_no: str
    cnic: str
    email: str
    course: Optional[str] = None
    address: Optional[str] = None
    qualification: Optional[str] = None
    skills: Optional[str] = None
    password: Optional[str] = None  # Password can be optional (nullable)

# User response model
class UserResponse(UserCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # Updated to comply with Pydantic v2

# ✅ LoginUser ko alag define karen
class LoginUser(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True

# Email validation model
class EmailRequest(BaseModel):
    email: str
