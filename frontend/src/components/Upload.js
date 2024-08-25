import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import chest1 from "../assets/chest1.png";
import chest2 from "../assets/chest2.png";

export default function Upload({ handleUpload }) {
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);

    const onDrop = useCallback((files) => {
        handleUpload(files[0]);
    });
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
        },
    });

    useEffect(() => {
        const listener = (e) => {
            if (e.clipboardData.files.length) {
                handleUpload(e.clipboardData.files[0]);
            }
        };
        window.addEventListener("paste", listener);

        return () => window.removeEventListener("paste", listener);
    }, []);

    return (
        <div
            {...getRootProps({
                className:
                    hover || isDragActive
                        ? "grid grid-rows-12 place-items-center w-full h-full cursor-pointer bg-slate-300 dark:bg-slate-700 border-blurple border-4 border-dashed rounded-3xl box-content"
                        : "grid grid-rows-12 place-items-center w-full h-full cursor-pointer",
                onMouseOver: () => setHover(true),
                onMouseLeave: () => setHover(false),
            })}
        >
            <img
                className="w-1/3 row-span-8 self-end"
                alt="upload"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                src={open || isDragActive ? chest2 : chest1}
            ></img>
            <div className="text-blurple text-lg text-center font-poppinsSemiBold m-2 w-full">
                Upload, drag/drop, or paste screenshot
            </div>
            <input {...getInputProps()}></input>
        </div>
    );
}
