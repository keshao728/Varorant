from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from operator import itemgetter
from app.models import Ticket, db
from app.forms import TicketForm

ticket_routes = Blueprint('ticket', __name__)

#GET ALL TICKETS
@ticket_routes.route('/')
def get_all_ticket():
    ticket = Ticket.query.all()

    ticket_list=[]
    for ticket in ticket:
        ticket_list.append(ticket.to_dict())

    return jsonify(ticket_list)

#GET ALL USER TICKETS
@ticket_routes.route('/my-tickets')
def get_all_user_ticket():
    ticket = Ticket.query.order_by(Ticket.id.desc()).all()

    ticket_list=[]
    for ticket in ticket:
        ticket_list.append(ticket.to_dict())

    return jsonify(ticket_list)

#GET ONE TICKET
@ticket_routes.route('/<int:id>')
def get_one_ticket(id):
    ticket = Ticket.query.get(id)
    my_ticket = ticket.to_dict()
    return jsonify(my_ticket)

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
            status=False
        )
        db.session.add(ticket)
        db.session.commit()
        return ticket.to_dict()
    return {'errors': "error"}, 401

#EDIT A TICKET
@ticket_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_ticket(id):
  form = TicketForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  ticket = Ticket.query.get(id)
  if current_user.id != ticket.user_id:
    return {'errors': 'Unauthorized', 'statusCode':401}

  status = itemgetter('status')(request.json)

  if form.validate_on_submit():
    ticket.subject = form.subject.data
    ticket.description = form.description.data
    # ticket.status = form.status.data
    if status == 'Solved':
      ticket.status = True
    else:
      ticket.status = False

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
