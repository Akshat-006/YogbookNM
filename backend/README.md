# Yogbook Backend

AI-Powered Yoga Management Platform backend built with FastAPI.

## Technology Stack

- **Framework**: FastAPI
- **Database**: MongoDB (with Motor async driver)
- **Authentication**: JWT (to be implemented)
- **Environment**: Python 3.8+

## Project Structure

See [STRUCTURE.md](STRUCTURE.md) for detailed explanation of each folder and file.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

5. Access the API documentation at:
   - Swagger UI: http://localhost:8000/api/v1/docs
   - ReDoc: http://localhost:8000/api/v1/redoc

## Health Check

Endpoint: `GET /health`
Returns: `{"status": "ok"}`

## API Versioning

All API endpoints are versioned under `/api/v1`.

## License

[MIT](LICENSE)