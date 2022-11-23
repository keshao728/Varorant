from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

media_routes = Blueprint('media', __name__)

@media_routes.route('/<int:id>')
def random():
  pass
