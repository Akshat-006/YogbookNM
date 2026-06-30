from fastapi import APIRouter, Depends
from fastapi import Query
from schemas.appointment import AppointmentCreate, AppointmentUpdate
from services.appointment_service import (
    create_appointment,
    get_all_appointments,
    get_appointment_by_id,
    update_appointment,
    delete_appointment,
    get_available_slots,
    get_calendar_appointments
)
from api.v1.deps import get_current_admin

router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.post("")
async def create_new_appointment(appointment_data: AppointmentCreate):
    return await create_appointment(appointment_data)


@router.get("")
async def fetch_all_appointments(
    current_admin: str = Depends(get_current_admin)
):
    return await get_all_appointments()

# Calender slot appointment availability
@router.get("/availability")
async def appointment_availability(
    date: str = Query(...)
):
    return await get_available_slots(date)


@router.get("/calendar")
async def appointment_calendar(
    current_admin: str = Depends(get_current_admin)
):
    return await get_calendar_appointments()

@router.get("/{appointment_id}")
async def fetch_appointment_by_id(
    appointment_id: str,
    current_admin: str = Depends(get_current_admin)
):
    return await get_appointment_by_id(appointment_id)


@router.put("/{appointment_id}")
async def update_existing_appointment(
    appointment_id: str,
    appointment_data: AppointmentUpdate,
    current_admin: str = Depends(get_current_admin)
):
    return await update_appointment(appointment_id, appointment_data)


@router.delete("/{appointment_id}")
async def delete_existing_appointment(
    appointment_id: str,
    current_admin: str = Depends(get_current_admin)
):
    return await delete_appointment(appointment_id) 

