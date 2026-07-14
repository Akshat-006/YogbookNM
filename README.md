# Yogbook — Yoga Studio Management Platform

A full-stack yoga studio platform featuring dynamic class bookings, appointment scheduling, Razorpay payment integration, a comprehensive Admin Dashboard, and a complete Content Management System (CMS).

---

## 🌿 Features

### 🌐 Public Frontend
* **Responsive Landing Page:** Includes Hero, About, Benefits, Instructors, and Contact sections.
* **Class Catalog:** Browse upcoming classes, details, schedules, and active bookings.
* **One-on-One Consultations:** Book a free 30-minute private appointment.
* **AI Yoga Assistant:** Get instant practice recommendations based on experience, age, and goals.

### 👤 User Portal
* **Passwordless OTP Login:** Secure login via email OTP validation (no passwords to manage).
* **My Bookings:** View class booking details, schedule statuses, and join meeting links.
* **My Appointments:** Track scheduled consults and Google Calendar invites.
* **Transaction History:** Access past invoices, amounts, and payment statuses.

### 👑 Admin Workspace
* **Revenue Analytics:** Interactive charts for tracking monthly revenue and operations metrics.
* **Class Management (CRUD):** Manage the public catalog with support for daily, weekly, or custom recurring classes.
* **Appointment Manager:** View calendar bookings, schedules, and consult requests.
* **CMS Content Manager:** Instantly update landing page text, icons, CTAs, and FAQs without touching code.
* **Image Asset Uploader:** Integrated with Cloudinary for handling media uploads dynamically.

### ⚙️ Core Backend
* **Robust Auth:** JWT authentication for administrator sessions and OTP verification for users.
* **Payments Integration:** Razorpay order creation, client checkout signature verification, and webhook safety.
* **Automated Emails:** Custom-styled transactional HTML emails for OTP codes, bookings, consults, and invoice confirmations.
* **Google Calendar API:** Automated event scheduling with Google Meet links for consultations.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router) | Server-Side Rendering (SSR) & routing |
| **UI Library** | React 19 / Tailwind CSS | UI components & styling |
| **Component Kit** | Shadcn UI / Radix UI | Pre-built primitives & animations |
| **State Management** | TanStack React Query (v5) | Server state management & caching |
| **Forms & Validation** | React Hook Form & Zod | Client-side form handling and validation |
| **Backend Framework** | FastAPI (Python) | High-performance asynchronous API |
| **Async Web Server** | Uvicorn | ASGI server implementation |
| **Database** | MongoDB Atlas (Motor driver) | Asynchronous NoSQL database storage |
| **Payment Gateway** | Razorpay SDK | Payment checkout and webhook support |
| **Email Gateway** | aiosmtplib (SMTP) | Async transactional email dispatcher |
| **Storage CDN** | Cloudinary API | Media storage and asset delivery |
| **Integration API** | Google Calendar API | Meeting scheduling and calendar events |

---

## 🏛️ Architecture

The project adheres to a clean separation of concerns:

```
[ Frontend (Next.js Client) ]
       │
       ▼ (Axios Client / React Query)
[ REST API Gateway (/api/v1) ]
       │
       ▼
[ FastAPI App (Backend) ]
       ├── Routers      → Handle request parsing & HTTP responses
       ├── Services     → Core business logic & external integrations
       ├── Schemas      → Pydantic validation & Serialization
       └── Core         → Config loading, Auth, Security, Database
             │
             ├── [ MongoDB Atlas ]
             ├── [ Razorpay API ]
             ├── [ Gmail SMTP ]
             ├── [ Cloudinary CDN ]
             └── [ Google Calendar API ]
```

* **Backend Rule:** Routers only dispatch actions; they do not contain database operations or business logic. All DB operations are isolated inside Services.
* **Frontend Rule:** Components call hooks, hooks call services, and services trigger Axios requests. Components never call API endpoints directly.

---

## 📦 Installation & Setup

### Prerequisites
* **Python 3.10+**
* **Node.js 18+** & **npm**
* **MongoDB Atlas** database connection string
* **Razorpay** merchant account credentials
* **Google Cloud Console** service account JSON key (for Google Calendar integration)

### Step 1: Clone and Configure Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up a Python virtual environment:
   ```bash
   python -m venv venv
   # Activate on Windows:
   venv\Scripts\activate
   # Activate on macOS/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment variables template and configure it:
   ```bash
   cp .env.example .env
   # Edit .env with your database access, keys, and SMTP server
   ```
5. Initialize the admin user:
   ```bash
   python create_admin.py
   ```
6. Start the API server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   * The backend will run at `http://localhost:8000`.

### Step 2: Configure and Run Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install npm modules:
   ```bash
   npm install
   ```
3. Set environment variable:
   Create a `.env.local` file inside the `frontend` folder and add:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Run the Next.js development server:
   ```bash
   npm run dev
   ```
   * The frontend client will run at `http://localhost:3000`.

---

## 🐳 Docker Deployment

The application is fully containerized using Docker and Docker Compose. This starts both the FastAPI backend and Next.js frontend services simultaneously.

### Running with Docker Compose
1. Ensure your `backend/.env` file is properly configured.
2. In the project root directory, run the following commands:
   ```bash
   # Build the images and start the services in detached mode
   docker-compose up --build -d
   ```
3. Verify that both containers are active:
   ```bash
   docker-compose ps
   ```
4. Check the application logs:
   ```bash
   docker-compose logs -f
   ```
5. Shut down the deployment:
   ```bash
   docker-compose down
   ```

| Container Service | Host Port | Mapping URL |
| :--- | :--- | :--- |
| **Backend API** | `8000` | `http://localhost:8000` |
| **Frontend Client** | `3000` | `http://localhost:3000` |

---

## 🔑 Environment Variables

Copy `backend/.env.example` to `backend/.env` and update the values:

```env
# Database Settings
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=yoga
MONGODB_DB=Yogbook

# JWT Secret Key
SECRET_KEY=your_access_token_secret_key_here

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
SMTP_FROM=Yogbook <your_email@gmail.com>

# Razorpay Settings
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=your_optional_webhook_secret

# Google Service Account (Calendar API Integration)
GOOGLE_SERVICE_ACCOUNT=credentials/google-service-account.json
GOOGLE_CALENDAR_ID=primary
DEFAULT_APPOINTMENT_MEET_LINK=https://meet.google.com/abc-defg-hij

# CORS & Base URL configuration
BACKEND_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
FRONTEND_BASE_URL=http://localhost:3000

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 📚 API Documentation

FastAPI auto-generates documentation endpoints under `/docs` and `/redoc`. When the backend server is running locally, access these URLs to review and test endpoints:

* **Interactive Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs) (Allows direct execution of API requests)
* **ReDoc Documentation:** [http://localhost:8000/redoc](http://localhost:8000/redoc) (Clean, structured technical layout)
* **Raw OpenAPI Specification:** [http://localhost:8000/api/v1/openapi.json](http://localhost:8000/api/v1/openapi.json)

---

## 📸 Screenshots

| **Landing Page** |
| ![Landing Page Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Landing+Page+Preview) |
| ![Landing Page Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Landing+Page+Preview) |
| ![Landing Page Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Landing+Page+Preview) |
| ![Landing Page Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Landing+Page+Preview) |
| ![Landing Page Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Landing+Page+Preview) |
---

| **Admin Panel** |
| ![Admin Panel Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Admin+Dashboard+Preview) |
| ![Admin Panel Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Admin+Dashboard+Preview) |
| ![Admin Panel Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Admin+Dashboard+Preview) |
| ![Admin Panel Preview](https://via.placeholder.com/800x450.png?text=Yogbook+Admin+Dashboard+Preview) |

---
| **Interactive AI Assistant** |
| ![AI Recommendations](https://via.placeholder.com/800x450.png?text=AI+Yoga+Assistant+Preview) | 
---


| **User Panel** |
| ![User Bookings History](https://via.placeholder.com/800x450.png?text=User+Dashboard+Bookings+Preview) |
| ![User Bookings History](https://via.placeholder.com/800x450.png?text=User+Dashboard+Bookings+Preview) |
| ![User Bookings History](https://via.placeholder.com/800x450.png?text=User+Dashboard+Bookings+Preview) |
| ![User Bookings History](https://via.placeholder.com/800x450.png?text=User+Dashboard+Bookings+Preview) |



