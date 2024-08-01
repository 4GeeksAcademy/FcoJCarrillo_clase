"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Media, Post, Comment
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] ="Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return jsonify(response_body), 200

@api.route('/users', methods= ['GET', 'POST'])
def handle_users():
    response_body = {}
    if request.method=='GET':
        list_user = db.session.execute(db.select(Users)).scalars()
        rows = [row.serialize() for row in list_user]
        print(rows)
        response_body['message'] ="Recibí el GET request"
        response_body['result'] = rows
        return jsonify(response_body), 200
    if request.method=='POST':
        data = request.json
        user = Users(
                username=data['username'],
                firstname=data['firstname'],
                lastname=data['lastname'],
                email=data['email']
        )
        db.session.add(user)
        db.session.commit()
        response_body['message'] =f"Recibí el POST request"
        return jsonify(response_body), 201
    pass

@api.route('/users/<int:user_id>', methods=['GET', 'PUT','DELETE'])
def handle_users_id(user_id):
    response_body = {}
    if request.method=='GET':
        list_user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        response_body['message'] = f'Recibí el GET request {list_user.id}, su Nickname es {list_user.username}, su firstname es {list_user.firstname}, su lastname es {list_user.lastname} y su email es {list_user.email}'
        return jsonify(response_body), 200
    if request.method=='PUT':
        list_user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        data = request.json
        list_user.username = data['username'],
        list_user.firstname = data['firstname'],
        list_user.lastname = data['lastname'],
        list_user.email = data['email']
        db.session.commit()
        response_body['message'] = f'Recibí el GET request  {list_user}, {data}'
        return jsonify(response_body), 200
    if request.method=='DELETE':
        list_user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        db.session.delete(list_user)
        db.session.commit()
        response_body['message'] = f'Recibí el GET request {user_id}'
        return jsonify(response_body), 200

@api.route("/comment", methods=["GET", "POST"])
def handle_comments():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(Comment)).scalars()
        results = [row.serialize() for row in rows] 
        response_body["results"] = results
        response_body["message"] = "GET request"
        return response_body, 200
    if request.method == "POST":
        data = request.json
        comment = Comment(
                comment_text = data["comment_text"],
                author_id = data["author_id"],
                post_id = data["post_id"])
        db.session.add(comment)
        db.session.commit()
        response_body["message"] = "POST request"
        return response_body, 201

@api.route("/comment/<int:post_id>", methods=["DELETE", "PUT"])
def handle_comment_id(post_id):
    response_body = {}
    list_comment = db.session.execute(db.select(Comment).where(Comment.id == post_id)).scalar()
    if request.method == "DELETE":
        db.session.delete(list_comment)
        db.session.commit()
        response_body['message'] = f'Comentario borrado'
        return jsonify(response_body), 200
    if request.method == "PUT":     
        data = request.json
        list_comment.comment_text = data['comment_text']
        db.session.commit()
        response_body['message'] = f'Comentario con id {post_id} actualizado'
        return jsonify(response_body), 200
        # if list_comment.author_id == data['author_id']:
        #     list_comment.comment_text = data['comment_text']
        #     db.session.commit()
        #     response_body['message'] = f'Comentario con id {post_id} actualizado'
        #     return jsonify(response_body), 200
        # response_body['message'] = f'El autor , no coincide con el comentario'


@api.route("/posts/<int:user_id>", methods=["POST"])
def handle_post(user_id):
    post = Posts(user_id=user_id)
    db.session.add(post)
    db.session.commit()
    return "post realizado", 201


# @api.route('/comment/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
# def handle_comment_id(comment_id):
#     response_body = {}
#     if request.method == 'GET':
#         response_body['message'] = f'Recibí el GET request {comment_id}'
#         return jsonify(response_body), 200
#     if request.method == 'PUT':
#         response_body['message'] = f'Recibí el PUT request {comment_id}'
#         return jsonify(response_body), 200
#     if request.method == 'DELETE':
#         response_body['message'] = f'Recibí el DELETE request {comment_id}'
#         return jsonify(response_body), 200

@api.route('/media', methods=['GET', 'POST'])
def handle_media():
    response_body = {}
    if request.method == 'GET':
        list_media = db.session.execute(db.select(Media)).scalars()
        rows = [row.serialize() for row in list_media]
        print(rows)
        response_body['message'] = "Recibí el GET request"
        response_body['result'] = rows
        return jsonify(response_body), 200
    if request.method == 'POST':
        response_body['message'] = "Recibí el POST request"
        return jsonify(response_body), 200

@api.route('/media/<int:media_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_media_id(media_id):
    response_body = {}
    if request.method == 'GET':
        response_body['message'] = f'Recibí el GET request {media_id}'
        return jsonify(response_body), 200
    if request.method == 'PUT':
        response_body['message'] = f'Recibí el PUT request {media_id}'
        return jsonify(response_body), 200
    if request.method == 'DELETE':
        response_body['message'] = f'Recibí el DELETE request {media_id}'
        return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    # TODO: realizar la lógica para verificar en nuestra DB
    email = data.get("email", None)
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not user:
        response_body['message'] = 'Authorization denied. email, password incorrect or user inactive'
        return response_body, 401
    access_token = create_access_token(identity={'email': email, 'user_id': user.id, 'is_admin': user.is_admin})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User logged'
    response_body['access_token'] = access_token
    return response_body, 201


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    current_user = get_jwt_identity()  # Access the identity of the current user with get_jwt_identity
    if current_user['is_admin']:
        response_body['message'] = f'Acceso concedido a {current_user["email"]}'
        response_body['user_data'] = current_user
        return response_body, 200
    response_body['message'] = f'Acceso dengado porque no eres Administrador'
    response_body['user_data'] = {}
    return response_body, 40