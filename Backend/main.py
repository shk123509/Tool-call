# flake8: noqa
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from typing import Annotated
from langgraph.graph.message import add_messages
from langchain.chat_models import init_chat_model
from google import genai
import os
from dotenv import load_dotenv
import requests
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode, tools_condition
from duckduckgo_search import DDGS
from serpapi import GoogleSearch
from langchain_core.messages import AIMessage
import smtplib
from email.message import EmailMessage
from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi
from typing import Dict
# from langgraph.checkpoint.mongodb import MongoDBSaver
import uuid
import os
from twilio.rest import Client
import base64
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware






load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Twilio client
client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)

SERPAPI_KEY = os.getenv("SERPAPI_KEY")



@tool()
def smart_job_apply_assistant(job_link: str, phone: str):
    """
    ONE FUNCTION – REAL WORLD SAFE AGENT

    Input:
    - job_link: job/internship apply URL
    - phone: user phone number (+91...)

    Output:
    - Resume text
    - Cover letter text
    - WhatsApp notification
    """

    # STEP 1: Infer role from link (basic but effective)
    role = "Full Stack Developer"
    if "intern" in job_link.lower():
        role = "Full Stack Developer Intern"

    company = "Hiring Company"

    # STEP 2: Generate Resume
    resume = f"""
NAME: Ankit Tiwari
ROLE: {role}

SKILLS:
- React, Node.js, MongoDB
- Python, REST APIs
- Git, GitHub

PROJECTS:
- MERN Blog Application
- AI Chatbot with AI tools

EXPERIENCE:
- Fresher (Project based)

OBJECTIVE:
Seeking {role} opportunity to learn and contribute.
""".strip()

    # STEP 3: Generate Cover Letter
    cover_letter = f"""
Dear Hiring Manager,

I am applying for the {role} role.
I have built real-world projects using modern technologies
and I am eager to grow in a professional environment.

Regards,
Ankit Tiwari
""".strip()

    # STEP 4: WhatsApp Notification
    message = f"""
🎯 Job Apply Ready!

Role: {role}

✅ Resume generated
✅ Cover letter generated

👉 Apply here:
{job_link}

⚠️ Please submit the form manually.
"""

    client.messages.create(
        from_=os.getenv("TWILIO_WHATSAPP_FROM"),
        to=f"whatsapp:{phone}",
        body=message
    )

    # STEP 5: Return everything
    return {
        "status": "ready",
        "resume": resume,
        "cover_letter": cover_letter,
        "apply_link": job_link
    }


@tool()
def send_whatsapp_notification(phone: str, event: str, extra_data: dict | None = None):
    """
    Sends WhatsApp notification using Twilio
    """

    phone = phone.replace("whatsapp:", "").strip()

    if extra_data and not isinstance(extra_data, dict):
        extra_data = {"info": str(extra_data)}

    messages = {
        "job_match": "🎯 Good news!\nA new job or internship matches your profile 🚀",
        "interview": "⏰ Interview Reminder!\nYour interview is coming up 💼",
        "train_alert": "🚆 Train Update!\nYour train is delayed.",
        "custom": "🔔 You have a new notification."
    }

    message_body = messages.get(event, messages["custom"])

    if extra_data:
        message_body += "\n\n📌 Details:"
        for k, v in extra_data.items():
            message_body += f"\n• {k}: {v}"

    try:
        message = client.messages.create(
            from_=os.getenv("TWILIO_WHATSAPP_FROM"),
            to=f"whatsapp:{phone}",
            body=message_body
        )

        return {
            "success": True,
            "sid": message.sid
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }



@tool()
def find_jobs_from_query(user_query: str) -> Dict:
    """
    Takes a user career-related query and returns real-time jobs/internships
    using RapidAPI JSearch (Google Jobs / LinkedIn sources).
    """

    url = "https://jsearch.p.rapidapi.com/search"

    headers = {
        "X-RapidAPI-Key": os.getenv("RAPID_API_KEY"),
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }

    params = {
        "query": user_query,
        "page": 1,
        "num_pages": 1,
        "employment_types": "FULLTIME,INTERN",
        "date_posted": "week"
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code != 200:
        return {
            "error": "Unable to fetch jobs",
            "status_code": response.status_code,
            "raw": response.text
        }

    data = response.json().get("data", [])

    results = []
    for job in data[:5]:
        results.append({
            "job_title": job.get("job_title"),
            "company": job.get("employer_name"),
            "location": job.get("job_city") or job.get("job_country"),
            "job_type": job.get("job_employment_type"),
            "apply_link": job.get("job_apply_link"),
            "source": job.get("job_publisher")
        })

    return {
        "query": user_query,
        "jobs_found": len(results),
        "results": results
    }


@tool()
def get_live_train_status(train_number: str):
    """
    Fetches real-time live status of an Indian train using its train number.
    Returns current location, delay, next station, and running status
    """
    import http.client
    import os
    import json

    conn = http.client.HTTPSConnection("irctc-api2.p.rapidapi.com")

    headers = {
        "x-rapidapi-key": os.getenv("RAPID_API_KEY"),
        "x-rapidapi-host": "irctc-api2.p.rapidapi.com"
    }

    endpoint = f"/liveTrain?trainNumber={train_number}&startDay=1"

    conn.request("GET", endpoint, headers=headers)

    res = conn.getresponse()
    data = res.read()

    return json.loads(data.decode("utf-8"))


@tool()
def realtime_web_search(query: str) -> str:
    """
    Realtime web search using SerpAPI (Google).
    Input: non-empty search query string.
    Output: top 5 clean search results.
    """

    if not query or not isinstance(query, str):
        return "Search query is missing or invalid."

    api_key = os.getenv("SERPAPI_KEY")
    if not api_key:
        return "SERPAPI_KEY is not set in environment variables."

    params = {
        "engine": "google",
        "q": query,
        "num": 5,
        "api_key": api_key
    }

    try:
        search = GoogleSearch(params)
        results = search.get_dict()

        organic = results.get("organic_results", [])
        if not organic:
            return "No results found."

        output = []
        for i, r in enumerate(organic[:5], 1):
            title = r.get("title", "No title")
            snippet = r.get("snippet", "No description available")
            output.append(f"{i}. {title}\n   {snippet}")

        return "\n\n".join(output)

    except Exception as e:
        return f"Web search error: {str(e)}"



@tool()
def send_email(user_email: str, subject: str, message: str) -> str:
    """
    Sends an email using Gmail SMTP.
    Requires:
      EMAIL_USER & EMAIL_PASS in environment variables.
    """

    if not user_email or not subject or not message:
        return "❌ Email, subject, or message is missing."

    EMAIL_USER = os.getenv("EMAIL_USER")
    EMAIL_PASS = os.getenv("EMAIL_PASS")

    if not EMAIL_USER or not EMAIL_PASS:
        return "❌ Email credentials not set in environment variables."

    try:
        msg = EmailMessage()
        msg["From"] = EMAIL_USER
        msg["To"] = user_email
        msg["Subject"] = subject
        msg.set_content(message)

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)

        return "✅ Email sent successfully."

    except Exception as e:
        return f"❌ Failed to send email: {str(e)}"


@tool()
def summarize_video(video_link: str) -> dict:
    """
    Takes a YouTube video link and returns:
    - Summary
    - Key Concepts
    - Important Takeaways
    """

    # 1. Extract video ID
    query = parse_qs(urlparse(video_link).query)
    video_id = query.get("v", [None])[0]

    if not video_id:
        return {"error": "Invalid YouTube link"}

    # 2. Get transcript
    try:
        transcript_data = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([item["text"] for item in transcript_data])
    except Exception:
        return {"error": "Transcript not available for this video"}

    # 3. LLM prompt
    prompt = f"""
You are an expert content analyst.

TASK:
- Ignore ads, greetings, filler words
- Extract ONLY useful information

Return STRICTLY in this format:

Summary:
(5–6 lines max)

Key Concepts:
- concept 1
- concept 2
- concept 3

Important Takeaways:
- takeaway 1
- takeaway 2

Transcript:
{transcript}
"""

    # 4. gemini call
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    res = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    output = res.text

    return {
        "video_link": video_link,
        "analysis": output
    }


tools = [
    realtime_web_search,
    send_email,summarize_video,
    get_live_train_status,
    find_jobs_from_query,
    send_whatsapp_notification,
    smart_job_apply_assistant,
    ]

class State(TypedDict):
    
    messages: Annotated[list, add_messages]

llm = init_chat_model(model_provider="google_genai", model="gemini-flash-latest") 
llm_with_tools = llm.bind_tools(tools)   

def chatbot(state:State):
    res = llm_with_tools.invoke(state["messages"])
    
    return {"messages" : [res]}

tool_node = ToolNode(tools=tools)

garph_bilder = StateGraph(State)

garph_bilder.add_node("chatbot", chatbot)
garph_bilder.add_node("tools", tool_node)


garph_bilder.add_edge(START, "chatbot")

garph_bilder.add_conditional_edges(
    "chatbot",
    tools_condition,
)

garph_bilder.add_edge("tools", "chatbot")



garph = garph_bilder.compile()

# def compile_graph_with_checkpointer(checkpointer):
#     graph_with_checkpointers = garph_bilder.compile(checkpointer=checkpointer)
    
#     return graph_with_checkpointers


app = FastAPI(title="LangGraph AI Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # React / Next frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = """
You are a smart AI assistant with access to multiple tools.

Your job is to decide:
- WHETHER a tool is needed
- WHICH tool is best suited
- WHEN to call it
- HOW to present the result cleanly to the user

You may have many tools (weather, math, web search, database, etc.).
You must choose tools intelligently.

--------------------------------
TOOL USAGE RULES
--------------------------------

1. Call a tool ONLY if:
   - The user's question cannot be answered reliably without external data
   - OR the user explicitly asks for real-time, calculated, or fetched information

2. NEVER call tools for:
   - greetings
   - casual chat
   - opinions
   - explanations
   - future events with unknown outcomes

3. Use ONLY ONE tool per question unless absolutely necessary.

4. Never guess tool input.
   - Extract clean, meaningful parameters from the user query.

5. If no tool fits the question:
   - Answer directly using reasoning.

--------------------------------
FUTURE & UNKNOWN EVENTS
--------------------------------

If the user asks about:
- future match result
- tomorrow’s winner
- unplayed event outcome
- predictions framed as facts

Then:
- DO NOT call any tool
- Clearly say the result is not available yet
- Never fabricate or guess
- You MAY offer:
  - past data
  - analysis
  - possible scenarios
  - predictions clearly labeled as opinions

--------------------------------
AFTER TOOL EXECUTION
--------------------------------

When a tool returns data:
- DO NOT dump raw output
- DO NOT repeat tool text blindly

Instead:
- Understand the result
- Structure it clearly
- Summarize it in simple language
- Answer exactly what the user asked

Format responses as:
- Clear heading (if useful)
- Short summary
- Bullet points if needed
- One clean final answer

--------------------------------
FAILURES & EDGE CASES
--------------------------------

If a tool:
- fails
- returns empty data
- has outdated info

Then:
- Explain politely that the data is unavailable
- Do NOT retry blindly
- Do NOT hallucinate

--------------------------------
GOAL
--------------------------------

Your goal is to behave like a calm, intelligent assistant:
- minimal tool calls
- maximum clarity
- zero confusion
- user-first answers

---------------------------------------
IMPORTANT RULES:
- If user says "yes", "send message", "notify me", "ok send", "inform me"
- DO NOT ask any follow-up questions
- Always call the WhatsApp notification tool directly
- Phone number is already known from conversation context
- Message type should be inferred from last task (job search → job_match)

IMPORTANT:
- extra_data MUST always be a dictionary
- Never pass string, list, or raw text to extra_data
- If you have a summary, wrap it inside a dict
  Example:
  extra_data = { "summary": "text here" }
---------------------------------------

do not return 
signature': 'CtMHAXLI2nxVFBe9Es2bZv1+e4nKi8kwtbpOx4uhmX0T4OJ2ZN0HsFRII39P5cIGwONuzvxMjsyPVyRgtHe27KXRYIW96OpoyqE+TFIJM7pHUnFDDdLb2G2xpTEfxVSh/WAUJQu/ujnLhv031gWc1W4KAnbkd9X1WuiEuW7GBBaj/JRj5fC5kEJL34u+TKj1/esmvbXtNY+bJMLBw7BNu0tWAytUwfjxklC2c/PxP//itL8AaN4FrWRph0av7NYqtgfrXeSp7WmxcJE+OmGXvqEmUOInVYKqCg+LxlZRxmIF8evyz2IbdiJLVTHjhGLImql4PF5ptkKBBX3EJPBWI8UVrUWgLBGoggFN+dmg96EqhIN6GMeXf/TvLVqjWj6t90179n77wGSS1kaBphGP3zDj3DX9t2vGEXeT5kIeR+xxLfpI9ot0WDosZsti9i1hyDFC728QpSSOPYIMbqvKySXhTuQ4gBrlkAFGcpW7wFCPTzkTTdSkMy6WnKeUaoSWCL+tIAY1oGbwvvrLN4RpThfw1MAdl3PfP4L3HLN2GY591T9lMHDI0YIR3cgpXAYiV/+lWixlWBleMTQkUK8N8IOLGDn83nTw3VvFrHDtElwiiqVmk1cFf3NablByPyUAK8uH2VihOs/qnErWweDWg0+mfL7x7+1yaFfRQHFT108JVfU7/16uxumtEzxhfJzpGzxOVXqZvEXzKHUWWgWagUKmoUSN73nnW8BpFkoiTBHIgwEPq+4yyCy581QN9fGD/TBiA53ZFY69qCKYNeX6J4r8Kf+5qKcbQhT92QpN+8cHuUT0o43DZg8jUeShv4CaVsN1/z6v0xPou8oSPXs2NBTq2UH7uAAOMDtdvS7Xjt+JiRysxOuTNfWjCUVBEB1XgHLn1eVDrhFCQZLrG1NbOGp1kdCY6QA91/mtIk+O+qDYahaKI94CuQ3XesDpvXFSwKHPSKIMv1Ey64HuWl9pQ0XTnmhw8GHxpsy4Ev97iQnFcsUzjUNEeWRf+hRogWgFQhUxZtP8HH6Cb730kVPxmZ1jQ3NTuk6jjfcynB9Qb2g/YeEe+v1DztgPfNfpCts18k6rb/s7nSH39uJEwus9XVj/M/4ecee26/yT3QaBzQCniLahuPQoYQCZkOry/Fmnv/eoTvF7AT+BQcb2MSkboLrHYbU9SZo93biWn1ho95bBVEPY9Xd4TWU1KziGL/S3Z/cy8FWFAEkjNDEedlwlCmnlnB733rqL4tI7W+BgmUhMa7GkX/zIpIakOGbKZ46qz2NVa+nRu9FZcFeOa83TvklnoCEzZA=='}}
ok no no no no no...


"""


class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str    


@app.post("/chat", response_model=ChatResponse)
def chat_api(req: ChatRequest):
    state = {
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": req.message}
        ]
    }

    final_answer = ""

    try:
        # Stream through the graph
        for event in garph.stream(state, stream_mode="values"):
            if "messages" in event:
                last_msg = event["messages"][-1]

                # If AIMessage object
                if hasattr(last_msg, "content"):
                    final_answer = str(last_msg.content)

                # If dict (fallback)
                elif isinstance(last_msg, dict) and "content" in last_msg:
                    final_answer = str(last_msg["content"])

        # Safety check: if empty
        if not final_answer:
            final_answer = "Sorry, I couldn't generate a response."

    except Exception as e:
        final_answer = f"Error generating response: {str(e)}"

    return {"reply": final_answer}
