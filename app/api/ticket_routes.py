from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

ticket_routes = Blueprint('ticket', __name__)

@ticket_routes.route('/<int:id>')
def ticket(id):
    ticket = Ticket.query.get(id)
    return ticket.to_dict()
