from app import db
import datetime

# class Component(db.Model):


# class Part(db.Model):


# class InventoryItem(db.Model):



# class Board(db.Model):


class Pin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.Column(db.String(64))

    part = db.Column(db.String(64))
    component = db.Column(db.String(64))
    content = db.Column(db.Text())
    actions = db.Column(db.Text())
    severity = db.Column(db.String(32))

    # inventory_used = db.relationship("InventoryUsedRecord")


    def __repr__(self):
        return '<Pin {}>'.format(self.username)


# class InventoryUsedRecord(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     pin_id = db.Column(db.Integer, db.ForeignKey('pin.id'))
