from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List
from validations.validation import UserCreate, UserResponse
from config.database import get_db
from models.user_model import User
from authentication.auth import authenticate  # Import the authentication dependency





user_router = APIRouter()

# POST route (Protected)
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError

@user_router.post("/", response_model=UserResponse)
def create_users(users: UserCreate, db: Session = Depends(get_db)):
    # created_users = []
    try:
        # for user in users:
        new_user = User(
            role=users.role,
            name=users.name,
            gender=users.gender,
            date_of_birth=users.date_of_birth,
            phone_no=users.phone_no,
            cnic=users.cnic,
            email=users.email,
            password=users.password or "default_password",  # default password if none
            course=users.course,
            address=users.address,
            qualification=users.qualification,
            skills=users.skills,
        )
        db.add(new_user)
        # created_users.append(new_user)

        db.commit()

    # for user in created_users:
        db.refresh(new_user)
        return new_user

    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Integrity error: Duplicate email or CNIC")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")



# PUT route (Protected)
@user_router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    existing_user.role = user.role
    existing_user.name = user.name
    existing_user.gender = user.gender
    existing_user.date_of_birth = user.date_of_birth
    existing_user.phone_no = user.phone_no
    existing_user.cnic = user.cnic
    existing_user.email = user.email
    existing_user.password = user.password
    existing_user.course = user.course
    existing_user.address = user.address
    existing_user.qualification = user.qualification
    existing_user.skills = user.skills

    try:
        db.commit()
        db.refresh(existing_user)
        return existing_user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Update failed: {str(e)}")
    

# GET route (Unprotected)
@user_router.get("/")
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users



# Get only volunteers
@user_router.get("/volunteers")
def read_volunteers(db: Session = Depends(get_db)):
    volunteers = db.query(User).filter(User.role == "volunteer").all()
    return volunteers







# DELETE route (Protected)
# , auth: bool = Depends(authenticate)
@user_router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    try:
        db.delete(existing_user)
        db.commit()
        return {"message": f"User with ID {user_id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Deletion failed: {str(e)}")



