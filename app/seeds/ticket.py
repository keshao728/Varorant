from app.models import db, Ticket

def seed_tickets():
  ticket1 = Ticket(
    user_id=1,
    request_type="Discuss Personal Suspension or Restriction",
    subject="I was banned for no reason",
    description="I was banned for no reason",
    attachments="https://www.google.com"
  )

  db.session.add(ticket1)
  db.session.commit()

def undo_tickets():
  db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
  db.session.commit()
