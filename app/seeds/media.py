from app.models import db, Media


def seed_media():
    media1 = Media(
        user_id=1,
        title="HARBOR WALLPAPER",
        attachment="https://imgur.com/1VKZ3GF.jpg"
    )

    media2 = Media(
        user_id=1,
        title="SAGE LUNAR NEW YEAR TRIP WALLPAPERS",
        attachment="https://imgur.com/x22QmH1.jpg"
    )

    media3 = Media(
        user_id=2,
        title="SOVA WALLPAPER",
        attachment="https://imgur.com/RqthP8C.jpg"
    )

    media4 = Media(
        user_id=2,
        title="VIPER WALLPAPER",
        attachment="https://imgur.com/UHaoEb0.jpg"
    )

    db.session.add(media1)
    db.session.add(media2)
    db.session.add(media3)
    db.session.add(media4)
    db.session.commit()


def undo_media():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
