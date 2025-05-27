import os
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2
from utils.password_helper import hash_password

def generate_password() -> str:
    return secrets.token_urlsafe(8)

def send_email(to_email: str, password: str, user_name: str) -> bool:
    from_email = os.getenv("EMAIL_HOST_USER")
    from_password = os.getenv("EMAIL_HOST_PASSWORD")

    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            
            <div style="text-align: center;">
                <img src="https://combinegrp.com/wp-content/uploads/2023/05/color-of-combine-logo02-150x150-1.png" alt="Company Logo" style="width: 100px; margin-bottom: 20px;" />
                <h2 style="color: #003366;">Welcome to Combine Group!</h2>
            </div>

            <p>Dear <strong>{user_name}</strong>,</p>

            <p>Congratulations! You have been <strong>selected</strong> for enrollment in our upcoming course.</p>
            <p>As part of our selection process, you passed the initial test and have been shortlisted. We're excited to have you on board!</p>
            
            <p>Please use the following password to log in and access your student dashboard:</p>

            <p style="text-align: center; font-size: 20px; font-weight: bold; color: #003366;">{password}</p>

            <p>If you need any assistance, feel free to contact our support team.</p>

            <p>Thank you for your trust in our services. We’re honored to support your learning journey.</p>

            <p style="margin-top: 30px;">Best regards,<br/><strong>Combine Group Team</strong></p>
        </div>
    </body>
    </html>
    """

    msg = MIMEMultipart("alternative")
    msg["From"] = from_email
    msg["To"] = to_email
    msg["Subject"] = "Your Login Password"
    msg.attach(MIMEText(html, "html"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(from_email, from_password)
        server.sendmail(from_email, to_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def update_password(email: str, password: str) -> bool:
    try:
        conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        cur = conn.cursor()
        hashed_pw = hash_password(password)
        cur.execute('UPDATE users SET "password" = %s WHERE email = %s', (hashed_pw, email))
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"DB error: {e}")
        return False

def get_user_details(email: str) -> dict | None:
    try:
        conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        cur = conn.cursor()
        cur.execute("SELECT name, password FROM users WHERE email = %s", (email,))
        result = cur.fetchone()
        print(result)
        cur.close()
        conn.close()
        if result:
            return {"name": result[0], "password": result[1]}
        return None
    except Exception as e:
        print(f"DB error: {e}")
        return None
