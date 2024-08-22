import React from "react";
import { useState, useRef } from "react";

import chest1 from "../assets/chest1.png";
import chest2 from "../assets/chest2.png";

export default function Upload({ handleUpload }) {
    const [hover, setHover] = useState(false);
    const input = useRef(null);

    return (
        <div
            className={
                hover
                    ? "flex flex-col justify-items-start items-center cursor-pointer w-1/2 animate-pulse"
                    : "flex flex-col justify-items-start items-center w-1/2"
            }
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => input.current.click()}
        >
            <img
                className="w-3/4"
                alt="upload"
                src={hover ? chest2 : chest1}
            ></img>
            <div className="text-white text-3xl text-center font-poppinsSemiBold m-2 p-2 w-3/4 border-white border-8 rounded-3xl">
                Upload screenshot above or paste from clipboard
            </div>
            <input
                className="hidden"
                ref={input}
                type="file"
                accept="image\png, image\jpeg, image\jpg, image\bmp"
                onChange={(e) => {
                    handleUpload(e.target.files[0]);
                    e.target.value = "";
                }}
            ></input>
        </div>
    );
}
