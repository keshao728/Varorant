from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SelectField
from wtforms.validators import DataRequired, ValidationError


class MediaForm(FlaskForm):
  attachments = StringField("Attachments")
  title = StringField("Title", validators=[DataRequired()])
  description = TextAreaField("Description", validators=[DataRequired()])
