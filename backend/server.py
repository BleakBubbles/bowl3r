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
        rawimg = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        height, width, channels = rawimg.shape
        factor = 270/height
        img = cv2.resize(rawimg, None, fx=factor, fy=factor)
        templ = cv2.imread('./static/items/Liquid_Valkyrie.png')
        result = cv2.matchTemplate(img, templ, cv2.TM_CCOEFF)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        return str(max_loc)
    except:
        return "An error occured."
    
if __name__ == "__main__":
    app.run(debug=True)