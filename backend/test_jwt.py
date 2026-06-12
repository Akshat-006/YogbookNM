from utils.security import create_access_token

token = create_access_token(
    {"sub": "admin@yogbook.com"}
)

print(token)