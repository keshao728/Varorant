from app.models import db, Comment


def seed_comments():
    comment1 = Comment(
        user_id=1,
        ticket_id=1,
        comment_body='He knows how to get people in their feelings that they hide…',
    )

    comment2 = Comment(
        user_id=3,
        ticket_id=1,
        comment_body='i wanna cry'
    )

    comment3 = Comment(
        user_id=2,
        ticket_id=4,
        comment_body='this song is everything to me'
    )
    # comment4 = Comment(
    #   user_id=1,
    #   ticket_id=3,
    #   comment_body='this song at 3 am hits different 😭😭'
    # )

    # comment5 = Comment(
    #   user_id=2,
    #   ticket_id=5,
    #   comment_body='This song is a masterpiece'
    # )

    all_comments = [comment1, comment2, comment3]
    saved_comments = [db.session.add(comment) for comment in all_comments]
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
