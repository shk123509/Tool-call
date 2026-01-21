# flake8: noqa
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from typing import Annotated, Dict, List, Any, Optional
from langgraph.graph.message import add_messages
from langchain_google_genai import ChatGoogleGenerativeAI
from google import genai
import os
from dotenv import load_dotenv
import requests
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode, tools_condition
from serpapi import GoogleSearch
import smtplib
from email.message import EmailMessage
from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi
from twilio.rest import Client
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.runnables import RunnableConfig # <-- Very Important

load_dotenv()

# --- INITIALIZE CONSTANTS ---
TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_FROM = os.getenv("TWILIO_WHATSAPP_FROM")
RAPID_API_KEY = os.getenv("RAPID_API_KEY")
SERPAPI_KEY = os.getenv("SERPAPI_KEY")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

twilio_client = Client(TWILIO_SID, TWILIO_TOKEN)

# --- TOOLS DEFINITION ---

@tool()
def smart_job_apply_assistant(job_link: str, phone: str):
    """Generates Resume, Cover Letter and sends a WhatsApp alert."""
    role = "Full Stack Developer"
    if "intern" in job_link.lower(): role = "Full Stack Developer Intern"
    resume = f"NAME: Ankit Tiwari\nROLE: {role}\nSKILLS: React, Node.js, MongoDB, Python."
    cover_letter = f"Dear Manager,\nI am applying for the {role} role. Regards, Ankit."
    message = f"🎯 Job Ready!\nRole: {role}\nResume/Cover Letter generated.\nApply: {job_link}"
    twilio_client.messages.create(from_=TWILIO_WHATSAPP_FROM, to=f"whatsapp:{phone}", body=message)
    return {"status": "ready", "resume": resume, "cover_letter": cover_letter}

@tool()
def send_whatsapp_notification(phone: str, event: str, extra_data: dict | None = None):
    """Sends WhatsApp notification using Twilio."""
    phone = phone.replace("whatsapp:", "").strip()
    msg_map = {"job_match": "🎯 New job matching your profile!", "interview": "⏰ Interview Reminder!", "train_alert": "🚆 Train status update."}
    body = msg_map.get(event, "🔔 New notification.")
    if extra_data: body += f"\nDetails: {extra_data}"
    twilio_client.messages.create(from_=TWILIO_WHATSAPP_FROM, to=f"whatsapp:{phone}", body=body)
    return {"success": True}

@tool()
def find_jobs_from_query(user_query: str) -> Dict:
    """Fetches jobs from JSearch RapidAPI."""
    url = "https://jsearch.p.rapidapi.com/search"
    headers = {"X-RapidAPI-Key": RAPID_API_KEY, "X-RapidAPI-Host": "jsearch.p.rapidapi.com"}
    params = {"query": user_query, "num_pages": 1}
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else {"error": "API failed"}

@tool()
def get_live_train_status(train_number: str):
    """Fetches IRCTC live train status."""
    url = f"https://irctc-api2.p.rapidapi.com/liveTrain?trainNumber={train_number}&startDay=1"
    headers = {"x-rapidapi-key": RAPID_API_KEY, "x-rapidapi-host": "irctc-api2.p.rapidapi.com"}
    res = requests.get(url, headers=headers)
    return res.json()

@tool()
def realtime_web_search(query: str) -> str:
    """Web search using SerpAPI."""
    search = GoogleSearch({"q": query, "api_key": SERPAPI_KEY})
    results = search.get_dict().get("organic_results", [])
    return "\n".join([f"{r.get('title')}: {r.get('snippet')}" for r in results[:3]])

@tool()
def send_email(user_email: str, subject: str, message: str) -> str:
    """Sends Gmail SMTP email."""
    try:
        msg = EmailMessage()
        msg["From"], msg["To"], msg["Subject"] = EMAIL_USER, user_email, subject
        msg.set_content(message)
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
        return "✅ Email sent."
    except Exception as e: return str(e)

@tool()
def summarize_video(video_link: str, config: RunnableConfig):
    """Summarizes YouTube video via Gemini (Dynamic key)."""
    query = parse_qs(urlparse(video_link).query)
    v_id = query.get("v", [None])[0]
    if not v_id: return "Invalid link"
    
    api_key = config.get("configurable", {}).get("api_key")
    try:
        transcript = YouTubeTranscriptApi.get_transcript(v_id)
        text = " ".join([t["text"] for t in transcript])
        gen_client = genai.Client(api_key=api_key)
        res = gen_client.models.generate_content(model="gemini-2.0-flash", contents=f"Summarize this: {text}")
        return res.text
    except Exception as e: return f"Error: {str(e)}"

# --- LANGGRAPH SETUP ---

tools = [
    realtime_web_search, send_email, summarize_video,
    get_live_train_status, find_jobs_from_query,
    send_whatsapp_notification, smart_job_apply_assistant
]

class State(TypedDict):
    messages: Annotated[list, add_messages]

# FIX: Added RunnableConfig type hint to correctly receive 'config'
def chatbot(state: State, config: RunnableConfig):
    # Dynamic Key extraction safely from config
    api_key = config.get("configurable", {}).get("api_key")
    
    if not api_key:
        from langchain_core.messages import AIMessage
        return {"messages": [AIMessage(content="Error: Please provide a valid Gemini API Key.")]}

    llm = ChatGoogleGenerativeAI(
        model="gemini-flash-latest", 
        google_api_key=api_key,
        temperature=0
    )
    llm_with_tools = llm.bind_tools(tools)
    res = llm_with_tools.invoke(state["messages"])
    return {"messages": [res]}

tool_node = ToolNode(tools=tools)

builder = StateGraph(State)
builder.add_node("chatbot", chatbot)
builder.add_node("tools", tool_node)
builder.add_edge(START, "chatbot")
builder.add_conditional_edges("chatbot", tools_condition)
builder.add_edge("tools", "chatbot")
graph = builder.compile()

# --- FASTAPI SERVER ---

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ChatRequest(BaseModel):
    message: str
    api_key: str

SYSTEM_PROMPT = "You are a smart AI assistant. Help users with jobs, emails, and information."

@app.post("/chat")
async def chat_api(req: ChatRequest):
    # This config is passed into the graph
    config = {"configurable": {"api_key": req.api_key}}
    
    state = {
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": req.message}
        ]
    }

    try:
        final_reply = ""
        # graph.astream requires the config argument
        async for event in graph.astream(state, config=config, stream_mode="values"):
            if "messages" in event:
                final_reply = event["messages"][-1].content
        
        return {"reply": final_reply}
    except Exception as e:
        return {"reply": f"Backend Error: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)