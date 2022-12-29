from flask.cli import AppGroup
from .users import seed_users, undo_users
from .ticket import seed_tickets, undo_tickets
from .media import seed_media, undo_media
from .comment import seed_comments, undo_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users(),
    seed_tickets(),
    seed_media()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users(),
    undo_tickets(),
    undo_media(),
    undo_comments()
    # Add other undo functions here
