from flask import Flask, request, send_file
from flask_cors import CORS
import cv2
import numpy as np
import tempfile

app = Flask(__name__)
# CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/analyze", methods=['POST'])
def analyze():
    try:
        file = request.files['image']
        npimg = np.fromfile(file, np.uint8)
        rawimg = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
        rawimg_gray = cv2.cvtColor(rawimg, cv2.COLOR_BGR2GRAY)
        height = rawimg.shape[0]
        factor = 270/height
        img = cv2.resize(rawimg_gray, None, fx=factor, fy=factor)
        templ = cv2.imread('backend\\static\\items\\Liquid_Valkyrie.png', 0)
        h, w = templ.shape
        result = cv2.matchTemplate(img, templ, cv2.TM_SQDIFF_NORMED)
        # min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        threshold = 0.1
        loc = np.where(result <= threshold)
        for pt in zip(*loc[::-1]):
            cv2.rectangle(img, pt, (pt[0] + w, pt[1] + h), 255, 1)
        status, buffer = cv2.imencode('.png', img)
        data = np.array(buffer)
        bytes = data.tobytes()
        temp = tempfile.TemporaryFile()
        temp.write(bytes)
        temp.seek(0)
        return send_file(temp, download_name="temp.png")
    except Exception as e:
        return str(e)
    
if __name__ == "__main__":
    app.run(debug=True)