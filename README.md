# Yogbook — Yoga Studio Management Platform

A full-stack yoga studio platform with class bookings, appointment scheduling, Razorpay payments, admin dashboard, and CMS.

---

## Features

**Public**
- Landing page with hero, about, benefits, instructors, and contact sections
- Browse and enroll in upcoming yoga classes
- Book free 30-minute one-on-one appointments
- AI yoga assistant for personalized recommendations

**Users**
- Passwordless OTP login (no passwords)
- Dashboard with booking, appointment, and payment history
- Profile management

**Admin**
- Dashboard with revenue stats and analytics
- Full CRUD for classes (with recurring daily/weekly support)
- Appointment calendar management
- CMS to edit website content without touching code
- Payment management and monthly revenue breakdown
- Cloudinary image uploads

**Backend**
- JWT auth for admins, OTP-based auth for users
- Razorpay payment order creation, verification, and webhook
- Branded HTML emails (OTP, booking, appointment, payment)
- Google Calendar integration for appointment events

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI |
| State & Forms | TanStack Query, React Hook Form, Zod |
| Backend | FastAPI, Python, Uvicorn |
| Database | MongoDB Atlas (Motor async driver) |
| Payments | Razorpay |
| Email | SMTP via aiosmtplib |
| Storage | Cloudinary |
| Calendar | Google Calendar API |

---

## Project Structure

```
YogbookNM/
├── backend/
│   ├── app/main.py          # FastAPI entry point
│   ├── api/v1/routers/      # API route handlers
│   ├── services/            # Business logic
│   ├── schemas/             # Pydantic models
│   ├── core/                # Config, database, security
│   ├── utils/               # Helpers (email, constants, datetime)
│   └── templates/           # HTML email templates
│
└── frontend/
    └── src/
        ├── app/             # Next.js App Router pages
        ├── features/        # Feature-based modules (auth, classes, bookings, etc.)
        ├── components/      # Shared UI components
        ├── providers/       # React Query, Theme providers
        └── services/        # Axios API client
```

---

## Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB Atlas account
- Razorpay account
- Gmail SMTP credentials (or any SMTP provider)

---

### Backend

```bash
# 1. Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cd backend
cp .env.example .env
# Fill in values in .env

# 4. Create first admin account
python create_admin.py

# 5. Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API runs at `http://localhost:8000`  
Swagger docs at `http://localhost:8000/api/v1/openapi.json`

---

### Frontend

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Set environment variable
# Create .env.local and add:
# NEXT_PUBLIC_API_URL=http://localhost:8000

# 3. Start dev server
npm run dev
```

App runs at `http://localhost:3000`

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
MONGODB_URL=mongodb+srv://...
MONGODB_DB=yogbook

SECRET_KEY=your-secret-key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=you@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=Yogbook <you@gmail.com>

RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your-secret
RAZORPAY_WEBHOOK_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GOOGLE_SERVICE_ACCOUNT=credentials/google-service-account.json
GOOGLE_CALENDAR_ID=primary
DEFAULT_APPOINTMENT_MEET_LINK=https://meet.google.com/your-link

BACKEND_CORS_ORIGINS=http://localhost:3000
FRONTEND_BASE_URL=http://localhost:3000
```

---

## API Overview

All endpoints are under `/api/v1`.

| Area | Endpoints |
|---|---|
| Admin Auth | `POST /admin/login`, `GET /admin/me` |
| User Auth (OTP) | `POST /otp/send`, `POST /otp/verify`, `GET /auth/me` |
| Classes | `GET /classes`, `POST /classes`, `PUT /classes/{id}`, `DELETE /classes/{id}` |
| Bookings | `POST /bookings`, `GET /bookings/my`, `GET /bookings` |
| Appointments | `POST /appointments`, `GET /appointments/slots`, `GET /appointments/calendar` |
| Payments | `POST /payments/create`, `POST /payments/verify`, `GET /payments/analytics` |
| Dashboard | `GET /dashboard/admin`, `GET /dashboard/user` |
| CMS | `GET /cms`, `PUT /cms/{section}` |
| Upload | `POST /upload/image` |

---

## Architecture

```
Frontend (Next.js)
    └── React Query + Axios
          └── REST API calls
                └── FastAPI Backend
                      ├── Routers      → handle HTTP
                      ├── Services     → business logic
                      ├── Schemas      → validation (Pydantic)
                      └── Core         → config, db, security
                            └── MongoDB Atlas
                            └── Razorpay / Email / Cloudinary / Google Calendar
```

**Key rules:**
- Routers call services; services call the database
- No business logic inside routers
- Frontend: components → hooks → services → API (no direct API calls from components)

---

## Payment Flow

```
Book Class → Create Razorpay Order → Razorpay Checkout Modal
→ Verify Signature → Mark Paid → Send Confirmation Email
```

## Appointment Flow

```
Pick Date → Select Slot → Fill Form → Submit
→ Google Calendar Event Created → Confirmation Email with Meet Link
```
