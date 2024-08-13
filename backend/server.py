from flask import Flask, request
from flask_cors import CORS
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/analyze", methods=['POST'])
def analyze():
    try:
        file = request.files['image']
        npimg = np.fromfile(file, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        return str(img.shape)
    except:
        return "An error occured."
    
if __name__ == "__main__":
    app.run(debug=True)