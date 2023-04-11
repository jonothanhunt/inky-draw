from flask import Flask, jsonify
import time

app = Flask(__name__)

@app.route('/api/test')
def hello():
    return jsonify(time=time.time())