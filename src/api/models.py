from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
"""
git fetch
git branch -a
"""

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    firstname = db.Column(db.String(80), nullable=True)
    lastname = db.Column(db.String(80), nullable=True)
    identification_type = db.Column(db.Enum('DNI', 'NIE', 'Passport', name='identification_type'), nullable=True)
    identification_number = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'firstname': self.firstname,
                'lastname': self.lastname,
                'identification_type': self.identification_type,
                'identification_number': self.identification_number,
                'is_active': self.is_active,
                'is_admin': self.is_admin}


class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id],
                                backref=db.backref('users_to', lazy='select'))

    def __repr__(self):
        return f'<User {self.email}>'
    
    def serialize(self):
        return{"id": self.id,
                "user_id": self.user_id}


class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('video', 'image', name='media_type'), unique=False, nullable=True)
    url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    poster_id = db.relationship('Posts', foreign_keys=[post_id],
                                backref=db.backref('media_to', lazy='select'))


    def __repr__(self):
        return f'<Post {self.id} - {self.media_type}>'
    

    def serialize(self):
        return{"id": self.id,
                "media_type": self.media_type,
                "url": self.url,
                "post_id": self.post_id}


class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    author_to = db.relationship('Users', foreign_keys=[author_id],
                                backref=db.backref('author_to', lazy='select'))
    post_to = db.relationship('Posts', foreign_keys=[post_id],
                                backref=db.backref('post_to', lazy='select'))

    def __repr__(self):
        return f'<Comment {self.id} - {self.comment_text} - {self.author_id} - {self.post_id}>'
    

    def serialize(self):
        return{"id": self.id,
                "comment_text": self.comment_text,
                "author_id": self.author_id,
                "post_id": self.post_id}


class Favourites(db.Model):
    __tablename__ = 'favourites'
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(120))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id],
                                backref=db.backref('user_to', lazy='select'))

    def __repr__(self):
        return f'El item favorite de {self.user_id} es {self.item}'

    def serialize(self):
        return{"id": self.id,
                "item": self.item,
                "user_id": self.user_id}


# class Species(db.Model):
#     pass


# class People(db.Model):
#     pass


# class Planet(db.Model):
#     pass