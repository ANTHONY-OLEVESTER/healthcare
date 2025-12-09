from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from groq import Groq
from sqlalchemy.orm import Session

from app.api import deps
from app.core.config import get_settings
from app.models.service import Service
from app.models.nav import NavItem

settings = get_settings()
router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


class ChatResponse(BaseModel):
    reply: str


def get_client():
    if not settings.GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="Chat API key not configured")
    return Groq(api_key=settings.GROQ_API_KEY)


def build_context(db: Session) -> str:
    services = db.query(Service).all()
    nav_items = db.query(NavItem).filter(NavItem.is_visible == True).all()  # noqa: E712

    services_text = "\n".join(
        f"- {svc.name} (/services/{svc.slug}): {svc.short_description or svc.hero_title or ''}"
        for svc in services
    )
    nav_text = "\n".join(f"- {item.label}: {item.path}" for item in nav_items)

    return (
        "Available services:\n"
        f"{services_text or '- (no services found)'}\n\n"
        "Key routes:\n"
        f"{nav_text or '- (no nav items found)'}\n\n"
        "Contact options:\n"
        "- Call: 505-321-4819\n"
        "- Referrals: /referrals\n"
        "- Contact: /contact\n"
        "- Careers: /careers\n"
    )


@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest, db: Session = Depends(deps.get_db)):
    client = get_client()
    context = build_context(db)
    system_prompt = (
        "You are Priya Caregiver, a friendly guide for Roadrunner Healthcare. "
        "Use the provided services and routes context to answer. "
        "Keep replies brief, actionable, and suggest one clear next step or link. "
        "If unsure, invite them to call 505-321-4819 or visit /contact or /referrals.\n\n"
        f"Context:\n{context}"
    )
    try:
        completion = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[{"role": "system", "content": system_prompt}]
            + [{"role": m.role, "content": m.content} for m in req.messages if m.content.strip()],
            temperature=0.2,
        )
        reply = completion.choices[0].message.content
        return ChatResponse(reply=reply)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Chat failed: {exc}")
