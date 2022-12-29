from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    comment_body = TextAreaField("Comment", validators=[DataRequired()])


