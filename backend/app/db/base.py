from app.db.base_class import Base

# Import models so Alembic/metadata knows them
from app.models.user import User  # noqa: E402,F401
from app.models.nav import NavItem  # noqa: E402,F401
from app.models.service import Service  # noqa: E402,F401
from app.models.faq import FAQ  # noqa: E402,F401
from app.models.career import Career  # noqa: E402,F401
