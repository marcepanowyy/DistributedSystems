import json


def extract_json(data):

    data = json.loads(data)
    user_name = data['user_name']
    msg = data['msg']

    return user_name, msg


def to_json(user_name, msg):

    data = {
        'user_name': user_name,
        'msg': msg
    }

    json_data = json.dumps(data)
    return json_data


def read_ascii_art():

    with open('ascii_art.txt', 'r') as file:
        return file.read()

