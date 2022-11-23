from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Media

media_routes = Blueprint('media', __name__)

@media_routes.route('/')
def get_all_media():
    media = Media.query.all()
    return {'media': [media.to_dict() for media in media]}
