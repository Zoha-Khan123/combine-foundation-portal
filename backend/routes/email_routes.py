from fastapi import APIRouter
from utils.email_helper import generate_password, get_user_details, send_email, update_password
from validations.validation import EmailRequest

email_router = APIRouter()


@email_router.post("/send-password")
def send_password(req: EmailRequest):
    user = get_user_details(req.email)

    if not user:
        return {"message": "User not found."}

    password = generate_password()
    email_sent = send_email(req.email, password, user["name"])
    db_updated = update_password(req.email, password)

    if email_sent and db_updated:
        return {"message": "Email sent successfully."}
    elif not email_sent:
        return {"message": "Failed to send email."}
    else:
        return {"message": "Failed to update database."}



# Forgot Password With Email
@email_router.post("/forgot-password")
def forgot_password(req: EmailRequest):
    user = get_user_details(req.email)

    if not user:
        return {"message": "User not found."}

    if not user["password"]:  # Already blank or not set
        return {"message": "Password reset not allowed. Please contact support."}

    password = generate_password()
    email_sent = send_email(req.email, password, user["name"])
    db_updated = update_password(req.email, password)

    if email_sent and db_updated:
        return {"message": "Password reset email sent successfully."}
    elif not email_sent:
        return {"message": "Failed to send email."}
    else:
        return {"message": "Failed to update password in database."}