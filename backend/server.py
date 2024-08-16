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
        rawimg = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
        height = rawimg.shape[0]
        factor = 270/height
        img = cv2.resize(rawimg, None, fx=factor, fy=factor)
        img2 = img.copy()
        if all:
            for active in os.listdir('backend\\static\\actives'):
                templ = cv2.imread(f'backend\\static\\actives\\{active}', cv2.IMREAD_UNCHANGED)
                h, w = templ.shape[:-1]
                alpha_channel = np.array(cv2.split(templ)[3])
                result = cv2.matchTemplate(img2, templ, cv2.TM_SQDIFF_NORMED, mask=alpha_channel)
                min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
                if (min_val <= 0.1):
                    print(active)
                    color = (0, 0, 255, 255)
                    cv2.rectangle(img, min_loc, (min_loc[0] + w, min_loc[1] + h), color, 2)
            for gun in os.listdir('backend\\static\\guns'):
                templ = cv2.imread(f'backend\\static\\guns\\{gun}', cv2.IMREAD_UNCHANGED)
                h, w = templ.shape[:-1]
                alpha_channel = np.array(cv2.split(templ)[3])
                result = cv2.matchTemplate(img2, templ, cv2.TM_SQDIFF_NORMED, mask=alpha_channel)
                min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
                if (min_val <= 0.1):
                    print(gun)
                    color = (255, 0, 0, 255)
                    cv2.rectangle(img, min_loc, (min_loc[0] + w, min_loc[1] + h), color, 2)
            for passive in os.listdir('backend\\static\\passives'):
                templ = cv2.imread(f'backend\\static\\passives\\{passive}', cv2.IMREAD_UNCHANGED)
                h, w = templ.shape[:-1]
                alpha_channel = np.array(cv2.split(templ)[3])
                result = cv2.matchTemplate(img2, templ, cv2.TM_SQDIFF_NORMED, mask=alpha_channel)
                min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
                if (min_val <= 0.1):
                    print(passive)
                    color = (0, 255, 0, 255)
                    cv2.rectangle(img, min_loc, (min_loc[0] + w, min_loc[1] + h), color, 2)
        else:
            templ = cv2.imread('backend\\static\\passives\\Super_Hot_Watch.png', cv2.IMREAD_UNCHANGED)
            h, w = templ.shape[:-1]
            alpha_channel = np.array(cv2.split(templ)[3])
            result = cv2.matchTemplate(img, templ, cv2.TM_SQDIFF_NORMED, mask=alpha_channel)
            min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
            color = (0, 255, 0, 255)
            print(min_val)
            cv2.rectangle(img, min_loc, (min_loc[0] + w, min_loc[1] + h), color, 2)
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
    
if __name__ == "__main__":
    app.run(debug=True)