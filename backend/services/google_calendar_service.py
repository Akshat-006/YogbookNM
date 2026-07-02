from google.oauth2 import service_account
from googleapiclient.discovery import build

from core.config import settings
# import uuid

from datetime import timedelta

SCOPES = [
    "https://www.googleapis.com/auth/calendar"
]


def get_calendar_service():

    credentials = service_account.Credentials.from_service_account_file(
        settings.GOOGLE_SERVICE_ACCOUNT,
        scopes=SCOPES
    )

    return build(
        "calendar",
        "v3",
        credentials=credentials
    )



def create_calendar_event(
    summary,
    description,
    start_datetime,
    duration
    ):
        service = get_calendar_service()

        event = {
            "summary": summary,
            "description": description,
            "start": {
                "dateTime": start_datetime.isoformat(),
                "timeZone": "Asia/Kolkata"
            },
            "end": {
                "dateTime": (
                    start_datetime +
                    timedelta(minutes=duration)
                ).isoformat(),
                "timeZone": "Asia/Kolkata"
            }
        }

        # event["conferenceData"] = {
        #     "createRequest": {
        #         "requestId": str(uuid.uuid4()),
        #         "conferenceSolutionKey": {
        #             "type": "hangoutsMeet"
        #         }
        #     }
        # }
        
        created_event = service.events().insert(
            calendarId=settings.GOOGLE_CALENDAR_ID,
            body=event
            # conferenceDataVersion=1
        ).execute()

        return created_event