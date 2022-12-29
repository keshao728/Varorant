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

    media5 = Media(
        user_id=2,
        title="REYNA WALLPAPER",
        attachment="https://imgur.com/TPskSfe.jpg"
    )

    media6 = Media(
        user_id=2,
        title="SKYE WALLPAPER",
        attachment="https://imgur.com/QP8uIJp.jpg"
    )

    media7 = Media(
        user_id=2,
        title="RAZE WALLPAPER",
        attachment="https://imgur.com/voNsLOd.jpg"
    )

    media8 = Media(
        user_id=2,
        title="SAGE WALLPAPER",
        attachment="https://imgur.com/gZJQJP9.jpg"
    )

    media9 = Media(
        user_id=2,
        title="KILLJOY WALLPAPER",
        attachment="https://imgur.com/CvLcw2Q.jpg"
    )

    media10 = Media(
        user_id=2,
        title="JETT AND PHOENIX WALLPAPER",
        attachment="https://imgur.com/1amFKwQ.jpg"
    )

    media11 = Media(
        user_id=2,
        title="PHOENIX WALLPAPER",
        attachment="https://imgur.com/c39Gh3m.jpg"
    )

    media12 = Media(
        user_id=2,
        title="OMEN WALLPAPER",
        attachment="https://imgur.com/F80ZMSf.jpg"
    )

    media13 = Media(
        user_id=2,
        title="JETT WALLPAPER",
        attachment="https://imgur.com/DMyFdZV.jpg"
    )
    media14 = Media(
        user_id=2,
        title="DEATHMATCH WALLPAPER",
        attachment="https://imgur.com/wc5Aua3.jpg"
    )

    media15 = Media(
        user_id=2,
        title="AGENT WALLPAPER",
        attachment="https://imgur.com/ECIfs6p.jpg"
    )

    media16 = Media(
        user_id=2,
        title="BREACH WALLPAPER",
        attachment="https://imgur.com/LljcKYC.jpg"
    )

    media17 = Media(
        user_id=2,
        title="BRIMSTONE WALLPAPER",
        attachment="https://imgur.com/mBXHL7J.jpg"
    )

    media18 = Media(
        user_id=2,
        title="CYPHER WALLPAPER",
        attachment="https://imgur.com/jjIZ10S.jpg"
    )

    # media19 = Media(
    #     user_id=2,
    #     title="TEST",
    #     attachment="https://varorant.s3.us-west-1.amazonaws.com/24bb0e5ffad041d7a15a0550f605efa5.png"
    # )

    db.session.add(media1)
    db.session.add(media2)
    db.session.add(media3)
    db.session.add(media4)
    db.session.add(media5)
    db.session.add(media6)
    db.session.add(media7)
    db.session.add(media8)
    db.session.add(media9)
    db.session.add(media10)
    db.session.add(media11)
    db.session.add(media12)
    db.session.add(media13)
    db.session.add(media14)
    db.session.add(media15)
    db.session.add(media16)
    db.session.add(media17)
    db.session.add(media18)
    # db.session.add(media19)
    db.session.commit()


def undo_media():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
