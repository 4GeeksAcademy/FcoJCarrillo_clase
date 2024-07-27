"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users


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
        response_body['message'] ="Recibí el POST request"
        return jsonify(response_body), 200
    pass

@api.route('/users/<int:user_id>', methods=['GET', 'PUT','DELETE'])
def handle_users_id(user_id):
    response_body = {}
    if request.method=='GET':
        response_body['message'] = f'Recibí el GET request {user_id}'
        return jsonify(response_body), 200
    if request.method=='PUT':
        response_body['message'] = f'Recibí el GET request {user_id}'
        return jsonify(response_body), 200
    if request.method=='DELETE':
        response_body['message'] = f'Recibí el GET request {user_id}'
        return jsonify(response_body), 200
