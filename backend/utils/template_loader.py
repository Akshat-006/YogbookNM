from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

EMAIL_TEMPLATE_DIR = BASE_DIR / "templates" / "emails"


def load_email_template(template_name: str) -> str:
    template_path = EMAIL_TEMPLATE_DIR / template_name

    with open(template_path, "r", encoding="utf-8") as file:
        return file.read()