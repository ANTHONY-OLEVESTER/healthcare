from sqlalchemy.orm import Session

from app.db.session import SessionLocal, engine
from app.db.base import Base  # noqa
from app.models.user import User
from app.models.nav import NavItem
from app.models.service import Service
from app.models.faq import FAQ
from app.models.career import Career
from app.utils.password import get_password_hash


def seed_admin(db: Session):
    admin_email = "admin@roadrunnerhealthcare.com"
    existing = db.query(User).filter(User.email == admin_email).first()
    if existing:
        return
    admin = User(
        email=admin_email,
        full_name="Roadrunner Admin",
        hashed_password=get_password_hash("ChangeMe123!"),
        is_active=True,
        is_superuser=True,
    )
    db.add(admin)
    db.commit()


def seed_nav(db: Session):
    if db.query(NavItem).count() > 0:
        return

    items = [
        {"label": "Home", "path": "/", "order": 1, "parent": None},
        {"label": "About", "path": "/about", "order": 2, "parent": None},
        {"label": "Services", "path": "/services", "order": 3, "parent": None},
        {"label": "Hospice", "path": "/services/hospice", "order": 1, "parent": "Services"},
        {"label": "Home Health", "path": "/services/home-health", "order": 2, "parent": "Services"},
        {"label": "Primary Care", "path": "/services/medical-care", "order": 3, "parent": "Services"},
        {"label": "Referrals", "path": "/referrals", "order": 4, "parent": None},
        {"label": "Contact", "path": "/contact", "order": 5, "parent": None},
        {"label": "FAQ", "path": "/faq", "order": 6, "parent": None},
        {"label": "Careers", "path": "/careers", "order": 7, "parent": None},
    ]

    created = {}
    for item in items:
        nav_item = NavItem(
            label=item["label"],
            path=item["path"],
            order=item["order"],
            is_visible=True,
        )
        if item["parent"]:
            nav_item.parent_id = None  # temp
        db.add(nav_item)
        db.flush()
        created[item["label"]] = nav_item.id

    db.commit()

    # Assign parent relationships
    for item in items:
        if item["parent"]:
            child = db.query(NavItem).filter(NavItem.label == item["label"]).first()
            child.parent_id = created.get(item["parent"])
            db.add(child)
    db.commit()


def seed_services(db: Session):
    if db.query(Service).count() > 0:
        return

    services = [
        {
            "slug": "hospice",
            "name": "Hospice Care",
            "category": "hospice",
            "short_description": "Comfort-focused end-of-life care with 24/7 support for patients and families.",
            "long_description": "Hospice focuses on comfort, dignity, and quality of life when cure is no longer the goal. Our nurses, aides, social workers, chaplains, and physicians support patients and families at home.",
            "hero_title": "Hospice Care at Home",
            "hero_subtitle": "Comfort, dignity, and compassion for patients and families.",
            "hero_image_url": "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80",
            "highlight_points": [
                "24/7 nurse support and symptom management",
                "Equipment and medications delivered to the home",
                "Emotional, social work, and spiritual support",
                "Caregiver education and respite options",
            ],
            "gallery_image_urls": [
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80",
            ],
        },
        {
            "slug": "home-health",
            "name": "Home Health & In-Home Care",
            "category": "home_health",
            "short_description": "Skilled nursing, therapy, and caregiving to help you recover and stay independent at home.",
            "long_description": "Home health brings nurses, therapists, and caregivers to your home for recovery, chronic disease support, and daily living help.",
            "hero_title": "Care that comes to you",
            "hero_subtitle": "Nursing, therapy, and caregiving in the comfort of home.",
            "hero_image_url": "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1600&q=80",
            "highlight_points": [
                "Skilled nursing visits",
                "Physical, occupational, and speech therapy",
                "Personal care and daily living support",
                "Medication management and education",
            ],
            "gallery_image_urls": [
                "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1600&q=80",
            ],
        },
        {
            "slug": "medical-care",
            "name": "Homebound Primary Care",
            "category": "primary_care",
            "short_description": "Geriatric primary care for homebound patients, assisted living residents, and group homes.",
            "long_description": "Access Medical providers deliver ongoing primary care, manage chronic conditions, and coordinate with specialists without requiring office visits.",
            "hero_title": "Primary care without leaving home",
            "hero_subtitle": "Physician-led visits, telehealth, and coordination with your care team.",
            "hero_image_url": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
            "highlight_points": [
                "In-home and telehealth visits",
                "Chronic disease management",
                "Medication review and coordination with specialists",
                "Support for assisted living and group home residents",
            ],
            "gallery_image_urls": [
                "https://images.unsplash.com/photo-1582719478241-99d3d1c0aaee?auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
            ],
        },
    ]

    for svc in services:
        service = Service(**svc)
        db.add(service)
    db.commit()


def seed_faq(db: Session):
    if db.query(FAQ).count() > 0:
        return
    faqs = [
        {"question": "Do you accept Medicare?", "answer": "Yes, Medicare covers hospice and home health when eligible.", "category": "general", "order": 1},
        {"question": "Can I keep my doctor?", "answer": "Yes. We coordinate with your existing physicians and specialists.", "category": "general", "order": 2},
        {"question": "How do referrals work?", "answer": "Anyone can refer. We verify eligibility and coordinate with your physician.", "category": "referrals", "order": 1},
    ]
    for faq in faqs:
        db.add(FAQ(**faq))
    db.commit()


def seed_careers(db: Session):
    if db.query(Career).count() > 0:
        return
    careers = [
        {"title": "RN Case Manager", "location": "Albuquerque, NM", "department": "Hospice", "employment_type": "Full-time", "description": "Provide hospice nursing visits, symptom management, and family support.", "is_active": True},
        {"title": "Physical Therapist", "location": "Rio Rancho, NM", "department": "Home Health", "employment_type": "Part-time", "description": "Deliver in-home therapy focused on strength, balance, and fall prevention.", "is_active": True},
    ]
    for job in careers:
        db.add(Career(**job))
    db.commit()


def init():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_admin(db)
        seed_nav(db)
        seed_services(db)
        seed_faq(db)
        seed_careers(db)
    finally:
        db.close()


if __name__ == "__main__":
    init()
