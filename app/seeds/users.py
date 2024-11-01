from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    # Clear existing users first
    undo_users()

    demo = User(
        username='o冏o', email='demo@aa.io', password='password')
    marnie = User(
        username='FFGummyBear', email='marnie@aa.io', password='password')
    bobbie = User(
        username='Effy', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('DELETE FROM users;')
    try:
        db.session.execute('DELETE FROM sqlite_sequence WHERE name="users";')
    except:
        pass  # sqlite_sequence table may not exist yet
    db.session.commit()
