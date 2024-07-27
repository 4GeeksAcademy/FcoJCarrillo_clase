from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
"""
git fetch
git branch -a
"""

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    firstname = db.Column(db.String(80), unique=False, nullable=False)
    lastname = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "username": self.username,
                "firtname": self.firtname,
                "lastname": self.lastname,
                "email": self.email}


class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id],
                                backref=db.backref('users_to', lazy='select'))

    def __repr__(self):
        return f'<Post {self.id} - {self.user_id}>'
    
    def serializa(self):
        return{"id": self.id,
                "user_id": self.user_id}


class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('video', 'image', name='media_type'), unique=False, nullable=True)
    url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    poster_id = db.relationship('Post', foreign_keys=[post_id],
                                backref=db.backref('media_to', lazy='select'))


    def __repr__(self):
        return f'<Post {self.id} - {self.media_type}>'
    

    def serializa(self):
        return{"id": self.id,
                "media_type": self.media_type,
                "url": self.url,
                "post_id": self.post_id}


class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    author_to = db.relationship('Users', foreign_keys=[author_id],
                                backref=db.backref('author_to', lazy='select'))
    post_to = db.relationship('Post', foreign_keys=[post_id],
                                backref=db.backref('post_to', lazy='select'))

    def __repr__(self):
        return f'<Comment {self.id} - {self.comment_text} - {self.author_id} - {self.post_id}>'
    

    def serializa(self):
        return{"id": self.id,
                "comment_text": self.comment_text,
                "author_id": self.author_id,
                "post_id": self.post_id}
