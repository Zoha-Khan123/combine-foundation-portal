from sqlalchemy import Column, Integer, String, Text, DateTime  # ← Add DateTime here
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)  # Unique ID with auto-increment
    role = Column(String(50), nullable=False)                    # Role (trustee, admin, etc.)
    name = Column(String(50), nullable=False)                   # Full name
    gender = Column(String(10), nullable=False)                  # Gender (Male/Female)
    date_of_birth = Column(String(25), nullable=False)           # Date of Birth (YYYY-MM-DD)
    phone_no = Column(String(15), nullable=False)                # Phone Number
    cnic = Column(String(15), unique=True, nullable=False)       # Unique CNIC (Pakistan National ID)
    email = Column(String(100), unique=True, nullable=False)     # Unique Email                # Password (can be empty initially)
    course = Column(String(50))                                 # Course (like "English")
    address = Column(Text)                                       # Address
    qualification = Column(String(50))                           # Qualification (Bachelor, PhD, etc.)
    skills = Column(String(100))  
    password = Column(String(100), nullable=True)   
    created_at = Column(DateTime, default = datetime.utcnow)                            # Skills (like "Developer")

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, role={self.role}, email={self.email})>"
