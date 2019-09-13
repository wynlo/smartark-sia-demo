from flask import Flask
from config import Config

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

###################################################################

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


from app import routes, models



# ========================================================

# FLASK-ADMIN

# set optional bootswatch theme
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

admin = Admin(app, name='backend', template_mode='bootstrap3')
# Add administrative views here
admin.add_view(ModelView(models.Pin, db.session))

# ========================================================
