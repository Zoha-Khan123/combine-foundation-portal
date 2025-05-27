from dotenv import load_dotenv
from fastapi import FastAPI
from routes.user_route import user_router
from routes.auth_routes import auth_router  
from routes.email_routes import email_router  
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://combine-foundation-portal.vercel.app","http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from Railway!"}


# Include routers correctly
app.include_router(user_router, prefix="/users", tags=["User"])
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])  
app.include_router(email_router, prefix="/email", tags=["Email"]) 
