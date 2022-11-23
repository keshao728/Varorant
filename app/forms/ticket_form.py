from .db import db
from sqlalchemy.sql import func

class Comment(db.Model):
  __tablename__ = 'comments'


  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  request_type = db.Column(db.String(50), nullable=False)
  subject = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.current_timestamp())
  updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.current_timestamp())


  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "request_type": self.request_type,
      "subject": self.subject,
      "description": self.description,
      "created_at": self.created_at,
      "updated_at": self.updated_at
    }
