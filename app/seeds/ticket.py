from app.models import db, Ticket


def seed_tickets():
    ticket1 = Ticket(
        user_id=1,
        request_type="Discuss Personal Suspension or Restriction",
        subject="I was banned",
        description="I was banned for no reason",
        attachments="https://www.google.com"
    )

    ticket2 = Ticket(
        user_id=1,
        request_type="Techinical Issues: Install, Patch, Lag, or Crashes",
        subject="Cannot install game",
        description="I can no longer install this game after trying to move it to another folder",
        attachments="https://i.imgur.com/Kr6OTgC.png"
    )

    db.session.add(ticket1)
    db.session.add(ticket2)
    db.session.commit()


def undo_tickets():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
