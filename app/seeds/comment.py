from app.models import db, Comment


def seed_comments():
    comment1 = Comment(
        user_id=1,
        ticket_id=1,
        comment_body='i wanna cry',
    )

    comment2 = Comment(
        user_id=3,
        ticket_id=1,
        comment_body="In order to further look into the matter, we'll need a few logs created by our Riot Repair Tool: Just right click & run it as admin, select the game, and then wait for the tool to collect the necessary files. Once it's finished, open the 'Riot Logs' folder from your Desktop, and attach the .zip files that it contains to your ticket (there should be a folder called 'System Logs', and a folder with the Logs for the game)."
    )

    comment3 = Comment(
        user_id=2,
        ticket_id=2,
        comment_body='This kind of thing normally happens when something is keeping Vanguard from starting. This can be a conflicting program/driver, corrupt files, or even an antivirus. What is the entire message you are seeing? If you can send me a screen shot or tell me exactly tell me what it reads, that will help me figure out exactly what is going wrong here. Thanks!'
    )

    comment4 = Comment(
      user_id=3,
      ticket_id=2,
      comment_body="make sure you've installed the latest Windows Updates. VALORANT is optimized to work best when on the latest version of Windows and updating can resolve a number of issues."
    )


    all_comments = [comment1, comment2, comment3, comment4]
    saved_comments = [db.session.add(comment) for comment in all_comments]
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
