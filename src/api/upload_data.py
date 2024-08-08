from flask import Flask, request, jsonify, url_for, Blueprint

import requests
    
url = 'https://randomuser.me/api/?nat=es&results=20'
response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    print(data['results'])
    for row in data['results']:
        email = row['email']
        firstname = row['login']['password']
        lastname = row['name']['first']
        email = row['name']['last']
        user = Users()
        user.email = email
        user.password = password
        user.is_active = True
        user.is_admin = False
        db.session.add(user)
        db.session.commit()
        #Cargar otros datos

    return response_body, 200