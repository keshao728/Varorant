from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Ticket, db
from app.forms import TicketForm

ticket_routes = Blueprint('ticket', __name__)

#GET ALL TICKETS
@ticket_routes.route('/')
def get_all_ticket():
    ticket = Ticket.query.all()
    return {'ticket': [ticket.to_dict() for ticket in ticket]}

#GET ONE TICKET
@ticket_routes.route('/<int:id>')
def get_one_ticket(id):
    ticket = Ticket.query.get(id)
    return ticket.to_dict()

#CREATE A TICKET
@ticket_routes.route('/new', methods=['POST'])
@login_required
def create_ticket():
    form = TicketForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        ticket = Ticket(
            user_id = current_user.id,
            request_type=form.request_type.data,
            subject=form.subject.data,
            description=form.description.data,
            attachments=form.attachments.data,
        )
        db.session.add(ticket)
        db.session.commit()
        return ticket.to_dict()

#EDIT A TICKET
@ticket_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_ticket(id):
  form = TicketForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  ticket = Ticket.query.get(id)
  if current_user.id != ticket.user_id:
    return {'errors': 'Unauthorized', 'statusCode':401}

  if form.validate_on_submit():
    ticket.request = form.request.data
    ticket.subject = form.subject.data
    ticket.description = form.description.data
    ticket.attachments = form.attachments.data

    db.session.commit()
    return ticket.to_dict()
  return {'errors': 'Invalid ticket', 'statusCode': 401}

#DELETE A TICKET
@ticket_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_ticket(id):
  ticket = Ticket.query.get(id)
  if current_user.id != ticket.user_id:
    return {'errors': 'Unauthorized', 'statusCode':401}
  db.session.delete(ticket)
  db.session.commit()
  return {
    "message": "Successfully deleted",
    "statusCode": 200
    }
