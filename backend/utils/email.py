from email.message import EmailMessage
import aiosmtplib
from dns import message

from core.config import settings
from utils.template_loader import load_email_template

# Helper function to render email templates with dynamic data
def render_template(
    html: str,
    data: dict
):

    for key, value in data.items():
        html = html.replace(
            "{{" + key + "}}",
            str(value)
        )

    return html

# 
async def send_email(
    to_email: str,
    subject: str,
    body: str
):
    message = EmailMessage()

    message["From"] = settings.SMTP_FROM
    message["To"] = to_email
    message["Subject"] = subject

    message.set_content("Please view this email in an HTML compatible email client.")

    message.add_alternative(body, subtype="html")

    await aiosmtplib.send(
        message,
        hostname=settings.SMTP_HOST,
        port=settings.SMTP_PORT,
        username=settings.SMTP_EMAIL,
        password=settings.SMTP_PASSWORD,
        start_tls=True
    )