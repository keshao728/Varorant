from .db import db
from sqlalchemy.sql import func


class Media(db.Model):
    __tablename__ = 'medias'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    attachment = db.Column(db.String(255), nullable=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "attactment": self.attachment,
            "title": self.title,
            "description": self.description,
        }
