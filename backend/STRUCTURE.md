# Yogbook Backend Structure

This document explains the purpose of each folder and file in the backend directory.

## Root Level

- **.env.example**: Example environment variables file. Copy to `.env` and fill in actual values.
- **requirements.txt**: Python package dependencies for the backend.
- **STRUCTURE.md**: This file.

## App Layer (`app/`)

Contains the FastAPI application instance and middleware configuration.

- `__init__.py`: Makes `app` a Python package.
- **main.py**: 
  - Creates the FastAPI app instance.
  - Configures CORS middleware.
  - Sets up startup/shutdown events for database connection.
  - Includes the API router.
  - Defines a basic health check endpoint (`/health`).

## Core Layer (`core/`)

Fundamental utilities and configurations used across the application.

- `__init__.py`: Makes `core` a Python package.
- **config.py**: 
  - Loads environment variables using Pydantic's `BaseSettings`.
  - Defines application settings (project name, API version, security, database, CORS).
  - Provides a singleton `settings` object.
- **database.py**: 
  - Handles asynchronous MongoDB connection using Motor.
  - Provides `connect_to_mongo()` and `close_mongo_connection()` functions.
  - Includes `get_database()` dependency for accessing the database instance.
- **security.py**: 
  - Placeholder for security-related utilities (password hashing, token generation, etc.).
  - Will be implemented in future steps (e.g., using Passlib for hashing, PyJWT for tokens).

## Database Models (`db/`)

Defines MongoDB document models and database schema.

- `__init__.py`: Makes `db` a Python package.
- **models.py**: 
  - Will contain Pydantic models or ODM (Object Document Mapper) schemas for MongoDB collections.
  - Currently empty; to be implemented with libraries like Beanie or Motor directly.

## API Layer (`api/`)

Contains all API-related code, including route definitions and dependencies.

- `__init__.py`: Makes `api` a Python package.
- **deps.py**: 
  - Defines FastAPI dependencies (e.g., database session, current user).
  - Will include reusable dependencies like `get_db`, `get_current_user`.
- **v1/**: Version 1 of the API.
  - `__init__.py`: Makes `api.v1` a Python package.
  - **deps.py**: API version-specific dependencies (if any).
  - **router.py**: 
    - Creates the main API router for v1.
    - Includes all version-specific routers (users, classes, bookings).
  - **routers/**: 
    - `__init__.py`: Makes `api.v1.routers` a Python package.
    - **users.py**: 
      - Will contain user-related endpoints (registration, login, profile, etc.).
    - **classes.py**: 
      - Will contain class-related endpoints (listing, creating, updating yoga classes).
    - **bookings.py**: 
      - Will contain booking-related endpoints (making, canceling, managing bookings).

## Schemas (`schemas/`)

Pydantic models for request/response validation and serialization.

- `__init__.py`: Makes `schemas` a Python package.
- **user.py**: 
  - Pydantic models for user data (UserCreate, UserUpdate, UserInDB, etc.).
- **class.py**: 
  - Pydantic models for class data (ClassCreate, ClassUpdate, ClassInDB, etc.).
- **booking.py**: 
  - Pydantic models for booking data (BookingCreate, BookingUpdate, BookingInDB, etc.).

## Services (`services/`)

Business logic layer that interacts with the database and encapsulates core operations.

- `__init__.py`: Makes `services` a Python package.
- **user_service.py**: 
  - Functions for user operations (create user, authenticate, get user by ID/email, etc.).
- **class_service.py**: 
  - Functions for class operations (create class, get classes, update class, etc.).
- **booking_service.py**: 
  - Functions for booking operations (create booking, get user bookings, cancel booking, etc.).

## Tests (`tests/`)

Directory for unit and integration tests. (To be implemented)

## Migrations (`migrations/`)

Directory for database migration scripts. (To be implemented, if using migration tools like Alembic for MongoDB or custom scripts)

## Notes on Architecture

1. **Separation of Concerns**: 
   - The app layer handles HTTP concerns (routing, middleware).
   - The core layer contains cross-cutting utilities (config, database, security).
   - The API layer defines endpoints and depends on services.
   - The schemas layer ensures data validation and serialization.
   - The services layer contains business logic and data access.

2. **Dependency Flow**: 
   - Routers → Services → Database (via Motor)
   - Services receive Pydantic schemas from routers and return them.
   - Config and database are accessed via dependency injection or singleton objects.

3. **Scalability**: 
   - Each major entity (user, class, booking) has its own router, schema, and service.
   - Easy to add new entities by following the same pattern.

4. **Production Readiness**: 
   - Environment configuration via `.env` (not committed).
   - CORS configuration.
   - Health check endpoint.
   - Structured error handling (to be added in services and routers).
   - Security foundations (secret key, token expiration).

## Next Steps

1. Implement security utilities in `core/security.py` (password hashing, JWT tokens).
2. Define Pydantic models in `schemas/` for each entity.
3. Implement service layer functions in `services/`.
4. Implement router endpoints in `api/v1/routers/`.
5. Add database connection and basic CRUD operations in services.
6. Write unit and integration tests in `tests/`.
7. Set up database migrations if needed (using MongoDB schema versioning or external tools).

This structure follows FastAPI best practices and provides a solid foundation for building the Yogbook platform.