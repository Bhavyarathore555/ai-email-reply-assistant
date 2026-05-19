from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.ai_reply import generate_ai_reply

# Create FastAPI app
app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class EmailRequest(BaseModel):
    email_content: str
    user_name: str
    additional_context: str

# Home route
@app.get("/")
def home():
    return {
        "message": "AI Email Reply Assistant Backend Running"
    }

# AI reply route
@app.post("/generate-reply")
def generate_reply(request: EmailRequest):

    ai_reply = generate_ai_reply(
        request.email_content,
          request.user_name,
          request.additional_context
    )

    return {
        "reply": ai_reply
    }