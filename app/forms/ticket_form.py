from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SelectField
from wtforms.validators import DataRequired, ValidationError

# choice = [
#   "Discuss Personal Suspension or Restriction",
#   "Recover My Account",
#   "In-Game Question/Issue & In-Game Content Refund",
#   "Techinical Issues: Install, Patch, Lag, or Crashes",
#   "Report a Player",
#   "Account Management, Data Request, or Deletion",
#   "Billing Payment and Premium Currency Refunds",
#   "General Question"
# ]

class TicketForm(FlaskForm):
  request_type = StringField('Request', validators=[DataRequired()])
  # request_type = SelectField("Request", validators=[DataRequired()], choices=[choice])
  subject = StringField("Subject", validators=[DataRequired()])
  description = TextAreaField("Description", validators=[DataRequired()])
  attachments = StringField("Attachments")
