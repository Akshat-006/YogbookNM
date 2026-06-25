from fastapi import APIRouter, Depends

from schemas.class_booking import ClassBookingCreate, ClassBookingUpdate
from services.class_booking_service import (
    create_class_booking,
    get_all_class_bookings,
    get_class_booking_by_id,
    update_class_booking,
    delete_class_booking
)
from api.v1.deps import get_current_admin

router = APIRouter(prefix="/class-bookings", tags=["Class Bookings"])


@router.post("")
async def create_new_class_booking(booking_data: ClassBookingCreate):
    return await create_class_booking(booking_data)


@router.get("")
async def fetch_all_class_bookings(
    current_admin: str = Depends(get_current_admin)
):
    return await get_all_class_bookings()


@router.get("/{booking_id}")
async def fetch_class_booking_by_id(
    booking_id: str,
    current_admin: str = Depends(get_current_admin)
):
    return await get_class_booking_by_id(booking_id)


@router.put("/{booking_id}")
async def update_existing_class_booking(
    booking_id: str,
    booking_data: ClassBookingUpdate,
    current_admin: str = Depends(get_current_admin)
):
    return await update_class_booking(booking_id, booking_data)


@router.delete("/{booking_id}")
async def delete_existing_class_booking(
    booking_id: str,
    current_admin: str = Depends(get_current_admin)
):
    return await delete_class_booking(booking_id)