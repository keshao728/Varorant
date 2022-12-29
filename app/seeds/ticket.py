from app.models import db, Ticket


def seed_tickets():
    ticket1 = Ticket(
        user_id=1,
        request_type="Discuss Personal Suspension or Restriction",
        subject="I was banned",
        description="I did not use a Third Party Program!!",
        attachments="https://imgur.com/ZnOWrc7.png"
    )

    ticket2 = Ticket(
        user_id=2,
        request_type="Discuss Personal Suspension or Restriction",
        subject="AFK Warning?",
        description="I only went AFK for 5 minutes and got banned, seems a bit harsh. What can I do to remove my ban?",
        attachments="https://imgur.com/LnoMb6J.png"
    )

    ticket3 = Ticket(
        user_id=1,
        request_type="Techinical Issues: Install, Patch, Lag, or Crashes",
        subject="Cannot install game",
        description="I can no longer install this game after trying to move it to another folder",
        attachments="https://i.imgur.com/Kr6OTgC.png"
    )


    ticket4 = Ticket(
        user_id=2,
        request_type="Account Management, Data Request, or Deletion",
        subject="Where is my EOY Summary",
        description="My friends have been receiving their End of Year gameplay summary but I have not received mine, is there anything that I need to do to receive it?",
        attachments=""
    )
    db.session.add(ticket1)
    db.session.add(ticket2)
    db.session.add(ticket3)
    db.session.add(ticket4)
    db.session.commit()


def undo_tickets():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
