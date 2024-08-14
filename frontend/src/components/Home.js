import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from 'axios'

import chest1 from '../assets/chest1.png';
import chest2 from '../assets/chest2.png';

export default function Home(){
  const [ image, setImage ] = useState(null);
  const [hover, setHover] = useState(false);
  const hiddenInput = useRef(null);

  useEffect(() => {
    const analyze = async () => {
      try {
        var form = new FormData();
        form.append("image", image);
        console.log(image);
        const response = await axios.post('http://localhost:5000/analyze', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
      } catch(error) {
        console.error('Error analyzing data: ' + error);
      }
    }

    analyze();    
  }, [image])

  return (
    <div
        className="bg-blurple w-screen h-screen flex flex-col place-items-center"
        onPaste={(e) => {
          if (e.clipboardData.files.length) {
              console.log("pasted");
              setImage(e.clipboardData.files[0])
          }
        }}>
        <h1 className="m-8 text-white text-9xl font-poppinsBlack">
          BOWL3R
        </h1>
        <div className='grid grid-cols-3 place-items-center w-3/4 h-3/4 border-white border-8 rounded-3xl'>
        <div>
          <input
                  className="hidden"
                  ref={hiddenInput}
                  type="file"
                  accept="image\png, image\jpeg, image\jpg, image\bmp"
                  onChange={(e) => {
                      setImage(e.target.files[0])
                      e.target.value = ''
                  }}
          >
          </input>
        </div>
        <div
          className={hover ? "flex flex-col items-center cursor-pointer justify-end h-1/2 animate-pulse"
            : "flex flex-col items-center justify-end h-1/2"}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => hiddenInput.current.click()}
        >
          <img
            className='w-3/4'
            alt="upload"
            src={hover ? chest2 : chest1}
          >
          </img>
          <div className='text-white text-lg text-center font-poppinsRegular m-4 p-4 w-3/4 border-white border-2 rounded-3xl'>
            Upload screenshot above or paste from clipboard
          </div>
          </div>
        </div>
        <div></div>
    </div>
  );
}