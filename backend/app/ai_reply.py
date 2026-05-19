from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create Groq client
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

# Generate AI email reply
def generate_ai_reply(email_content, user_name, additional_context):

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",

                "content": f"""
                You are an advanced professional AI email assistant.

                The user's name is {user_name}.

                Your task is to generate:
                - professional
                - natural
                - human-like
                - well-structured
                email replies.

                Always:
                - maintain a polite tone
                - keep formatting clean
                - end professionally using the user's name
                - adapt based on the provided context
                """
            },

            {
                "role": "user",

                "content": f"""
                EMAIL CONTENT:
                {email_content}

                ADDITIONAL CONTEXT:
                {additional_context}

                Write a professional email reply.
                """
            }
        ]
    )

    return response.choices[0].message.content