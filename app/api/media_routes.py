from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

media_routes = Blueprint('media', __name__)
