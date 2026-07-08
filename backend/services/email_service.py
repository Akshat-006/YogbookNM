from utils.email import send_email
from utils.template_loader import load_email_template
from utils.email import render_template

class EmailService:

    async def send_booking_email(
        self,
        email,
        name,
        class_name,
        instructor,
        date,
        duration,
        meet_link
    ):

        html = load_email_template(
            "booking_confirmation.html"
        )

        html = render_template(
            html,
            {
                "name": name,
                "class_name": class_name,
                "instructor": instructor,
                "date": date,
                "duration": duration,
                "meet_link": meet_link
            }
        )

        await send_email(
            email,
            "Booking Confirmed",
            html
        )

    async def send_payment_email(
        self,
        email,
        amount
    ):
        html = load_email_template(
            "payment_success.html"
        )

        from core.config import settings

        html = render_template(
            html,
            {
                "amount": f"₹{amount}",
                "frontend_base_url": settings.FRONTEND_BASE_URL,
            }
        )

        await send_email(
            email,
            "Payment Successful | Yogbook",
            html
        )

    async def send_appointment_email(
        self,
        email,
        name,
        appointment_date,
        meet_link
        
    ):

        html = load_email_template(
            "appointment_confirmation.html"
        )

        from core.config import settings

        html = render_template(
            html,
            {
                "name": name,
                "appointment_date": appointment_date,
                "meet_link": meet_link,
                "frontend_base_url": settings.FRONTEND_BASE_URL,
                }
        )

        await send_email(
            email,
            "Appointment Confirmed",
            html
        )

    async def send_otp_email(
        self,
        email,
        otp
    ):

        html = load_email_template(
            "otp_verification.html"
        )

        html = render_template(
            html,
            {
                "otp": otp,
                "expiry": "5 Minutes"
            }
        )

        await send_email(
            email,
            "Your Yogbook Verification Code",
            html
        )

email_service = EmailService()