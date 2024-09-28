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


#instagram
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


#Starwars
class People(db.Model):
    __tablename__ = "people"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    height = db.Column(db.Integer)
    mass = db.Column(db.Integer)
    hair_color = db.Column(db.String(50))
    skin_color = db.Column(db.String(50))
    eye_color = db.Column(db.String(50))
    birth_year = db.Column(db.String(10))
    gender = db.Column(db.String(20))
    homeworld = db.Column(db.Integer, db.ForeignKey('planets.id'))
    url = db.Column(db.String(255))
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
    films = db.relationship('Film', secondary='film_people', back_populates='people')
    starships = db.relationship('Starship', secondary='people_starships', back_populates='people')
    vehicles = db.relationship('Vehicle', secondary='people_vehicles', back_populates='people')
    species = db.relationship('Species', secondary='people_species', back_populates='people')
    def __repr__(self):
        return f'<People {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "height": self.height,
            "mass": self.mass,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "gender": self.gender,
            "homeworld": self.homeworld,
            "url": self.url,
            "created": self.created,
            "edited": self.edited
        }
class Film(db.Model):
    __tablename__ = "films"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    episode_id = db.Column(db.Integer, nullable=False)
    opening_crawl = db.Column(db.Text)
    director = db.Column(db.String(100))
    producer = db.Column(db.String(255))
    release_date = db.Column(db.Date)
    url = db.Column(db.String(255))
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
    people = db.relationship('People', secondary='film_people', back_populates='films')
    starships = db.relationship('Starship', secondary='film_starships', back_populates='films')
    vehicles = db.relationship('Vehicle', secondary='film_vehicles', back_populates='films')
    species = db.relationship('Species', secondary='film_species', back_populates='films')
    planets = db.relationship('Planet', secondary='film_planets', back_populates='films')
    def __repr__(self):
        return f'<Film {self.title}>'
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "episode_id": self.episode_id,
            "opening_crawl": self.opening_crawl,
            "director": self.director,
            "producer": self.producer,
            "release_date": self.release_date,
            "url": self.url,
            "created": self.created,
            "edited": self.edited
        }
class Starship(db.Model):
    __tablename__ = "starships"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100))
    manufacturer = db.Column(db.String(255))
    cost_in_credits = db.Column(db.String(50))
    length = db.Column(db.String(50))
    max_atmosphering_speed = db.Column(db.String(50))
    crew = db.Column(db.String(50))
    passengers = db.Column(db.String(50))
    cargo_capacity = db.Column(db.String(50))
    consumables = db.Column(db.String(50))
    hyperdrive_rating = db.Column(db.String(50))
    MGLT = db.Column(db.String(50))
    starship_class = db.Column(db.String(100))
    url = db.Column(db.String(255))
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
    films = db.relationship('Film', secondary='film_starships', back_populates='starships')
    people = db.relationship('People', secondary='people_starships', back_populates='starships')
    def __repr__(self):
        return f'<Starship {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model,
            "manufacturer": self.manufacturer,
            "cost_in_credits": self.cost_in_credits,
            "length": self.length,
            "max_atmosphering_speed": self.max_atmosphering_speed,
            "crew": self.crew,
            "passengers": self.passengers,
            "cargo_capacity": self.cargo_capacity,
            "consumables": self.consumables,
            "hyperdrive_rating": self.hyperdrive_rating,
            "MGLT": self.MGLT,
            "starship_class": self.starship_class,
            "url": self.url,
            "created": self.created,
            "edited": self.edited
        }
class Vehicle(db.Model):
    __tablename__ = "vehicles"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100))
    manufacturer = db.Column(db.String(255))
    cost_in_credits = db.Column(db.String(50))
    length = db.Column(db.String(50))
    max_atmosphering_speed = db.Column(db.String(50))
    crew = db.Column(db.String(50))
    passengers = db.Column(db.String(50))
    cargo_capacity = db.Column(db.String(50))
    consumables = db.Column(db.String(50))
    vehicle_class = db.Column(db.String(100))
    url = db.Column(db.String(255))
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
    films = db.relationship('Film', secondary='film_vehicles', back_populates='vehicles')
    people = db.relationship('People', secondary='people_vehicles', back_populates='vehicles')
    def __repr__(self):
        return f'<Vehicle {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model,
            "manufacturer": self.manufacturer,
            "cost_in_credits": self.cost_in_credits,
            "length": self.length,
            "max_atmosphering_speed": self.max_atmosphering_speed,
            "crew": self.crew,
            "passengers": self.passengers,
            "cargo_capacity": self.cargo_capacity,
            "consumables": self.consumables,
            "vehicle_class": self.vehicle_class,
            "url": self.url,
            "created": self.created,
            "edited": self.edited
        }
class Species(db.Model):
    __tablename__ = "species"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    classification = db.Column(db.String(100))
    designation = db.Column(db.String(100))
    average_height = db.Column(db.String(50))
    skin_colors = db.Column(db.String(255))
    hair_colors = db.Column(db.String(255))
    eye_colors = db.Column(db.String(255))
    average_lifespan = db.Column(db.String(50))
    homeworld = db.Column(db.Integer, db.ForeignKey('planets.id'))
    language = db.Column(db.String(100))
    url = db.Column(db.String(255))
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
    films = db.relationship('Film', secondary='film_species', back_populates='species')
    people = db.relationship('People', secondary='people_species', back_populates='species')
    def __repr__(self):
        return f'<Species {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "classification": self.classification,
            "designation": self.designation,
            "average_height": self.average_height,
            "skin_colors": self.skin_colors,
            "hair_colors": self.hair_colors,
            "eye_colors": self.eye_colors,
            "average_lifespan": self.average_lifespan,
            "homeworld": self.homeworld,
            "language": self.language,
            "url": self.url,
            "created": self.created,
            "edited": self.edited
        }
class Planet(db.Model):
    __tablename__ = "planets"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    rotation_period = db.Column(db.String(50))
    orbital_period = db.Column(db.String(50))
    diameter = db.Column(db.String(50))
    climate = db.Column(db.String(255))
    gravity = db.Column(db.String(50))
    terrain = db.Column(db.String(255))
    surface_water = db.Column(db.String(50))
    population = db.Column(db.String(50))
    url = db.Column(db.String(255))
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
    films = db.relationship('Film', secondary='film_planets', back_populates='planets')
    species = db.relationship('Species', backref='planet')
    people = db.relationship('People', backref='planet')
    def __repr__(self):
        return f'<Planet {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "diameter": self.diameter,
            "climate": self.climate,
            "gravity": self.gravity,
            "terrain": self.terrain,
            "surface_water": self.surface_water,
            "population": self.population,
            "url": self.url,
            "created": self.created,
            "edited": self.edited
        }


class FilmPeople(db.Model):
    __tablename__ = "film_people"
    film_id = db.Column(db.Integer, db.ForeignKey('films.id'), primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey('people.id'), primary_key=True)


class FilmStarships(db.Model):
    __tablename__ = "film_starships"
    film_id = db.Column(db.Integer, db.ForeignKey('films.id'), primary_key=True)
    starship_id = db.Column(db.Integer, db.ForeignKey('starships.id'), primary_key=True)


class FilmVehicles(db.Model):
    __tablename__ = "film_vehicles"
    film_id = db.Column(db.Integer, db.ForeignKey('films.id'), primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'), primary_key=True)


class FilmSpecies(db.Model):
    __tablename__ = "film_species"
    film_id = db.Column(db.Integer, db.ForeignKey('films.id'), primary_key=True)
    species_id = db.Column(db.Integer, db.ForeignKey('species.id'), primary_key=True)


class FilmPlanets(db.Model):
    __tablename__ = "film_planets"
    film_id = db.Column(db.Integer, db.ForeignKey('films.id'), primary_key=True)
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), primary_key=True)


class PeopleStarships(db.Model):
    __tablename__ = "people_starships"
    person_id = db.Column(db.Integer, db.ForeignKey('people.id'), primary_key=True)
    starship_id = db.Column(db.Integer, db.ForeignKey('starships.id'), primary_key=True)


class PeopleVehicles(db.Model):
    __tablename__ = "people_vehicles"
    person_id = db.Column(db.Integer, db.ForeignKey('people.id'), primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'), primary_key=True)


class PeopleSpecies(db.Model):
    __tablename__ = "people_species"
    person_id = db.Column(db.Integer, db.ForeignKey('people.id'), primary_key=True)
    species_id = db.Column(db.Integer, db.ForeignKey('species.id'), primary_key=True)
