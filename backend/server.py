from flask import Flask, request, send_file
from flask_cors import CORS
import cv2
import numpy as np
import tempfile
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/analyze", methods=['POST'])
def analyze():
    try:
        all = True
        file = request.files['image']
        npimg = np.fromfile(file, np.uint8)
        rawimg = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        height = rawimg.shape[0]
        factor = 270/height
        img = cv2.resize(rawimg, None, fx=factor, fy=factor)
        img2 = img.copy()
        if all:
            match(img, img2, 'actives', cv2.TM_SQDIFF_NORMED, 0.02, (0, 0, 255, 255))
            match(img, img2, 'guns', cv2.TM_SQDIFF_NORMED, 0.02, (255, 0, 0, 255))
            match(img, img2, 'passives', cv2.TM_SQDIFF_NORMED, 0.02, (0, 255, 0, 255))
        status, buffer = cv2.imencode('.png', img)
        data = np.array(buffer)
        bytes = data.tobytes()
        temp = tempfile.TemporaryFile()
        temp.write(bytes)
        temp.seek(0)
        return send_file(temp, download_name="temp.png")
    except Exception as e:
        print(e)
        return str(e)
    
def match(img, img2, type, method, threshold, color):
    for item in os.listdir(f'backend\\static\\{type}'):
                templ = cv2.imread(f'backend\\static\\{type}\\{item}', cv2.IMREAD_UNCHANGED)
                h, w = templ.shape[:-1]
                alpha_channel = np.array(cv2.split(templ)[3])
                result = cv2.matchTemplate(img2, cv2.cvtColor(templ, cv2.COLOR_BGRA2BGR), method, mask=alpha_channel)
                min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
                if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED] and min_val <= threshold:
                    cv2.rectangle(img, min_loc, (min_loc[0] + w, min_loc[1] + h), color, 1)
                elif method in [cv2.TM_CCOEFF, cv2.TM_CCOEFF_NORMED, cv2.TM_CCORR, cv2.TM_CCORR_NORMED] and cv2.max_val >= threshold:
                    cv2.rectangle(img, max_loc, (max_loc[0] + w, max_loc[1] + h), color, 1)

if __name__ == "__main__":
    app.run(debug=True)