from flask import Blueprint, render_template, redirect, request, jsonify
from app.models import db, Comment, Ticket
from app.forms import CommentForm
from flask_login import login_required, current_user

comment_routes = Blueprint('comments', __name__)

#POST A COMMENT
@comment_routes.route('/<int:id>/comment', methods=["POST"])
@login_required
def create_comments(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            ticket_id=id,
            user_id=current_user.id,
            comment_body=form.comment_body.data
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': "Invalid Comment", "statusCode": 401}

#DELETE A COMMENT
@comment_routes.route('/<int:comment_id>', methods=["DELETE"])
@login_required
def delete_comment(comment_id):
    delete_user_comment = Comment.query.get(comment_id)

    if not delete_user_comment:
        return {'errors': 'Ticket not found', 'statusCode': 404}

    if current_user.id != delete_user_comment.user_id:
        return {'errors': 'Unauthorized', 'statusCode': 401}


    # print('----------------------------delete_user_comment---------------------------------',delete_user_comment)

    db.session.delete(delete_user_comment)
    db.session.commit()
    return {
        "message": "Successfully deleted",
        "statusCode": 200
    }

#EDIT A COMMENT
@comment_routes.route('/<int:comment_id>/edit', methods=["PUT"])
@login_required
def edit_comment(comment_id):
    edit_user_comment = Comment.query.get(comment_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not edit_user_comment:
        return {'errors': 'Ticket not found', 'statusCode': 404}

    if current_user.id != edit_user_comment.user_id:
        return {'errors': 'Unauthorized', 'statusCode': 401}

    if form.validate_on_submit():
        edit_user_comment.comment_body = form.comment_body.data
        db.session.commit()
        return edit_user_comment.to_dict()
    return {'errors': 'Invalid comment', 'statusCode': 401}
