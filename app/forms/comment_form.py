from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired, ValidationError

# def valid_comment(form, field):
#     comment = field.data
#     if len(comment) <= 0 or len(comment) > 200:
#         raise ValidationError('Comment must be between 1 and 500 characters')

class CommentForm(FlaskForm):
    comment_body = TextAreaField("Comment", validators=[DataRequired()])


