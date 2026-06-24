python -m venv venv
.\venv\Scripts\Activate.ps1
dir
pip install -r requirements.txt
tree /F
uvicorn main:app --reload
uvicorn app.main:app --reload