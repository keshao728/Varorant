from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Media, db
from app.forms import MediaForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

media_routes = Blueprint('media', __name__)


@media_routes.route('/')
def get_all_media():
    media = Media.query.all()
    media_list = []

    for media in media:
        media_list.append(media.to_dict())

    return jsonify(media_list)


# @media_routes.route('/<int:id>')
# def get_one_media(id):
#     media = Media.query.get(id)
#     return media.to_dict()

# CREATE A MEDIA

@media_routes.route("/new", methods=["POST"])
@login_required
def upload_image():
    # form = MediaForm()

    if "attachment" not in request.files:
        return {"errors": "attachment required"}, 400

    attachment = request.files["attachment"]

    if not allowed_file(attachment.filename):
        return {"errors": "file type not permitted"}, 400

    attachment.filename = get_unique_filename(attachment.filename)

    upload = upload_file_to_s3(attachment)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    # print("FORM------------------------------", request.form)
    data = request.form
    # print("wow------------------------------", data)
    attachment = upload["url"]

    # flask_login allows us to get the current user from the request
    new_image = Media(
        user_id=current_user.id,
        title=data['title'],
        # title= form.title.data,
        attachment=attachment
        )
    db.session.add(new_image)
    db.session.commit()
    return {"attachment": attachment}

# @media_routes.route('/new', methods=['POST'])
# @login_required
# def create_media():
#     form = MediaForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         media = Media(
#             user_id=current_user.id,
#             attachment=form.attachment.data,
#             title=form.title.data,
#         )
#         db.session.add(media)
#         db.session.commit()
#         return media.to_dict()
#     return {'errors': "error"}, 401


# # EDIT A MEDIA
# @media_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_media(id):
#     media = Media.query.get(id)
#     form = MediaForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if current_user.id != media.user_id:
#         return {'errors': 'Unauthorized', 'statusCode': 401}

#     if form.validate_on_submit():
#         media.title = form.title.data
#         media.attachment = form.attachment.data

#         db.session.commit()
#         return media.to_dict()
#     return {'errors': 'Invalid media', 'statusCode': 401}

# DELETE A MEDIA
@media_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_media(id):
    media = Media.query.get(id)
    if current_user.id != media.user_id:
        return {'errors': 'Unauthorized', 'statusCode': 401}
    db.session.delete(media)
    db.session.commit()
    return {
        "message": "Successfully deleted",
        "statusCode": 200
    }
